import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocket, WebSocketServer } from 'ws';
import { EDUCATIONAL_THEMES } from './src/data/puzzleThemes';
import {
  ChatMessage,
  ClientMessage,
  GameMode,
  Player,
  PuzzlePiece,
  PuzzleTheme,
  RoomState,
  ServerMessage,
} from './src/types/game';
import { generatePuzzlePieces } from './src/utils/puzzleMath';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3000;

interface ConnectedPlayer extends Player {
  ws: WebSocket;
}

interface ServerRoom {
  id: string;
  name: string;
  mode: GameMode;
  gridSize: number;
  theme: PuzzleTheme;
  status: 'waiting' | 'playing' | 'completed';
  players: Map<string, ConnectedPlayer>;
  board: (number | null)[];
  pieces: PuzzlePiece[];
  messages: ChatMessage[];
  startedAt: number | null;
  completedAt: number | null;
  seed: number;
  cleanupTimeout?: NodeJS.Timeout;
}

const rooms = new Map<string, ServerRoom>();

function broadcast(roomId: string, message: ServerMessage, excludeWs?: WebSocket) {
  const room = rooms.get(roomId);
  if (!room) return;

  const payload = JSON.stringify(message);
  for (const player of room.players.values()) {
    if (player.ws !== excludeWs && player.ws.readyState === WebSocket.OPEN) {
      player.ws.send(payload);
    }
  }
}

function getSerializableRoomState(room: ServerRoom): RoomState {
  return {
    id: room.id,
    name: room.name,
    mode: room.mode,
    gridSize: room.gridSize,
    theme: room.theme,
    status: room.status,
    players: Array.from(room.players.values()).map(({ ws, ...rest }) => rest),
    board: room.board,
    pieces: room.pieces,
    messages: room.messages,
    startedAt: room.startedAt,
    completedAt: room.completedAt,
    seed: room.seed,
  };
}

wss.on('connection', (ws: WebSocket) => {
  let currentRoomId: string | null = null;
  let currentPlayerId: string | null = null;

  ws.on('message', (data: string) => {
    try {
      const msg: ClientMessage = JSON.parse(data.toString());

      if (msg.type === 'join_room') {
        const rawRoomId = msg.roomId ? msg.roomId.trim().toUpperCase() : 'TURMA5';
        const roomId = rawRoomId || 'TURMA5';
        let room = rooms.get(roomId);

        // Cancel cleanup if room was pending deletion
        if (room?.cleanupTimeout) {
          clearTimeout(room.cleanupTimeout);
          room.cleanupTimeout = undefined;
        }

        const isNewRoom = !room;
        if (!room) {
          const defaultTheme = msg.theme || EDUCATIONAL_THEMES[0];
          const gridSize = msg.gridSize || defaultTheme.defaultGrid || 4;
          const seed = Math.floor(Math.random() * 100000);
          const pieces = generatePuzzlePieces(gridSize, seed);
          const board = new Array(gridSize * gridSize).fill(null);

          room = {
            id: roomId,
            name: `Sala da Turma ${roomId}`,
            mode: msg.mode || 'coop',
            gridSize,
            theme: defaultTheme,
            status: 'playing',
            players: new Map(),
            board,
            pieces,
            messages: [
              {
                id: 'welcome',
                senderId: 'system',
                senderName: 'Mestre da Turma',
                senderAvatar: '🎓',
                text: `Bem-vindos à sala ${roomId}! Escolham as peças e divirtam-se em equipe!`,
                type: 'system',
                timestamp: Date.now(),
              },
            ],
            startedAt: Date.now(),
            completedAt: null,
            seed,
          };
          rooms.set(roomId, room);
        }

        const playerId = `p_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const isHost = isNewRoom || room.players.size === 0;

        const colors = ['#2563eb', '#16a34a', '#d97706', '#9333ea', '#db2777', '#0891b2', '#ea580c'];
        const assignedColor = msg.playerColor || colors[room.players.size % colors.length];

        const player: ConnectedPlayer = {
          id: playerId,
          name: msg.playerName ? msg.playerName.trim().substring(0, 20) : 'Aluno Explorador',
          avatar: msg.playerAvatar || '🦁',
          color: assignedColor,
          score: 0,
          raceProgress: 0,
          piecesPlaced: 0,
          totalPieces: room.gridSize * room.gridSize,
          isFinished: false,
          finishTime: null,
          isHost,
          joinedAt: Date.now(),
          ws,
        };

        room.players.set(playerId, player);
        currentRoomId = roomId;
        currentPlayerId = playerId;

        // Send full state to newly joined player
        const roomState = getSerializableRoomState(room);
        ws.send(
          JSON.stringify({
            type: 'room_state',
            state: roomState,
            playerId,
          } as ServerMessage)
        );

        // Announce player joined to others
        const joinMsg: ChatMessage = {
          id: `sys_${Date.now()}`,
          senderId: 'system',
          senderName: 'Turma',
          senderAvatar: '👋',
          text: `${player.name} entrou na sala!`,
          type: 'system',
          timestamp: Date.now(),
        };
        room.messages.push(joinMsg);
        if (room.messages.length > 50) room.messages.shift();

        const { ws: _, ...publicPlayer } = player;
        broadcast(
          roomId,
          {
            type: 'player_joined',
            player: publicPlayer,
            messages: room.messages,
          },
          ws
        );
      } else if (msg.type === 'start_game') {
        if (!currentRoomId) return;
        const room = rooms.get(currentRoomId);
        if (!room) return;

        if (msg.theme) room.theme = msg.theme;
        if (msg.gridSize) room.gridSize = msg.gridSize;
        if (msg.mode) room.mode = msg.mode;

        room.seed = Math.floor(Math.random() * 100000);
        room.pieces = generatePuzzlePieces(room.gridSize, room.seed);
        room.board = new Array(room.gridSize * room.gridSize).fill(null);
        room.status = 'playing';
        room.startedAt = Date.now();
        room.completedAt = null;

        // Reset player progress
        for (const p of room.players.values()) {
          p.piecesPlaced = 0;
          p.raceProgress = 0;
          p.isFinished = false;
          p.finishTime = null;
          p.totalPieces = room.gridSize * room.gridSize;
        }

        const startMsg: ChatMessage = {
          id: `start_${Date.now()}`,
          senderId: 'system',
          senderName: 'Mestre da Turma',
          senderAvatar: '🚀',
          text: `Novo desafio iniciado: "${room.theme.title}" (${room.gridSize}x${room.gridSize} peças)!`,
          type: 'system',
          timestamp: Date.now(),
        };
        room.messages.push(startMsg);

        broadcast(currentRoomId, {
          type: 'game_started',
          state: getSerializableRoomState(room),
        });
      } else if (msg.type === 'place_piece_coop') {
        if (!currentRoomId || !currentPlayerId) return;
        const room = rooms.get(currentRoomId);
        if (!room || room.mode !== 'coop') return;

        const player = room.players.get(currentPlayerId);
        if (!player) return;

        const piece = room.pieces.find((p) => p.id === msg.pieceId);
        if (!piece) return;

        // Validate correct slot
        if (piece.id === msg.slotIndex && !piece.isPlaced) {
          piece.isPlaced = true;
          piece.currentSlot = msg.slotIndex;
          piece.placedBy = {
            id: player.id,
            name: player.name,
            avatar: player.avatar,
          };
          room.board[msg.slotIndex] = piece.id;
          player.score += 1;
          player.piecesPlaced += 1;

          const isCompleted = room.pieces.every((p) => p.isPlaced);
          if (isCompleted && room.status !== 'completed') {
            room.status = 'completed';
            room.completedAt = Date.now();
            const victoryMsg: ChatMessage = {
              id: `win_${Date.now()}`,
              senderId: 'system',
              senderName: 'Mestre da Turma',
              senderAvatar: '🏆',
              text: `PARABÉNS TURMA! Quebra-cabeça concluído com sucesso em equipe!`,
              type: 'system',
              timestamp: Date.now(),
            };
            room.messages.push(victoryMsg);
          }

          const { ws: _, ...publicPlayer } = player;
          broadcast(currentRoomId, {
            type: 'piece_placed_sync',
            pieceId: piece.id,
            slotIndex: msg.slotIndex,
            board: room.board,
            pieces: room.pieces,
            player: publicPlayer,
            isCompleted,
          });

          if (isCompleted) {
            broadcast(currentRoomId, {
              type: 'game_completed',
              state: getSerializableRoomState(room),
              curiosity: room.theme.curiosity,
            });
          }
        }
      } else if (msg.type === 'update_race_progress') {
        if (!currentRoomId || !currentPlayerId) return;
        const room = rooms.get(currentRoomId);
        if (!room || room.mode !== 'race') return;

        const player = room.players.get(currentPlayerId);
        if (!player) return;

        player.piecesPlaced = msg.piecesPlaced;
        player.totalPieces = msg.totalPieces;
        player.raceProgress = Math.min(100, Math.round((msg.piecesPlaced / msg.totalPieces) * 100));

        if (msg.isFinished && !player.isFinished) {
          player.isFinished = true;
          player.finishTime = msg.finishTime || Date.now() - (room.startedAt || Date.now());

          const finishMsg: ChatMessage = {
            id: `finish_${Date.now()}`,
            senderId: 'system',
            senderName: 'Juiz da Corrida',
            senderAvatar: '🏁',
            text: `${player.name} completou o quebra-cabeça em ${(player.finishTime / 1000).toFixed(1)}s!`,
            type: 'system',
            timestamp: Date.now(),
          };
          room.messages.push(finishMsg);

          const { ws: _, ...publicWinner } = player;
          broadcast(currentRoomId, {
            type: 'race_progress_sync',
            players: Array.from(room.players.values()).map(({ ws, ...rest }) => rest),
            winner: publicWinner,
          });
        } else {
          broadcast(currentRoomId, {
            type: 'race_progress_sync',
            players: Array.from(room.players.values()).map(({ ws, ...rest }) => rest),
          });
        }
      } else if (msg.type === 'send_chat') {
        if (!currentRoomId || !currentPlayerId) return;
        const room = rooms.get(currentRoomId);
        if (!room) return;

        const player = room.players.get(currentPlayerId);
        if (!player) return;

        const chatMsg: ChatMessage = {
          id: `chat_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
          senderId: player.id,
          senderName: player.name,
          senderAvatar: player.avatar,
          text: msg.text.trim().substring(0, 120),
          type: msg.messageType || 'chat',
          timestamp: Date.now(),
        };

        room.messages.push(chatMsg);
        if (room.messages.length > 50) room.messages.shift();

        broadcast(currentRoomId, {
          type: 'chat_received',
          message: chatMsg,
        });
      } else if (msg.type === 'restart_game') {
        if (!currentRoomId) return;
        const room = rooms.get(currentRoomId);
        if (!room) return;

        room.seed = Math.floor(Math.random() * 100000);
        room.pieces = generatePuzzlePieces(room.gridSize, room.seed);
        room.board = new Array(room.gridSize * room.gridSize).fill(null);
        room.status = 'playing';
        room.startedAt = Date.now();
        room.completedAt = null;

        for (const p of room.players.values()) {
          p.piecesPlaced = 0;
          p.raceProgress = 0;
          p.isFinished = false;
          p.finishTime = null;
          p.score = 0;
        }

        broadcast(currentRoomId, {
          type: 'game_started',
          state: getSerializableRoomState(room),
        });
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
    }
  });

  ws.on('close', () => {
    if (currentRoomId && currentPlayerId) {
      const room = rooms.get(currentRoomId);
      if (room) {
        const player = room.players.get(currentPlayerId);
        room.players.delete(currentPlayerId);

        if (player) {
          const leaveMsg: ChatMessage = {
            id: `leave_${Date.now()}`,
            senderId: 'system',
            senderName: 'Turma',
            senderAvatar: '👋',
            text: `${player.name} saiu da sala.`,
            type: 'system',
            timestamp: Date.now(),
          };
          room.messages.push(leaveMsg);

          broadcast(currentRoomId, {
            type: 'player_left',
            playerId: currentPlayerId,
            messages: room.messages,
          });
        }

        // Reassign host if needed
        if (room.players.size > 0) {
          const firstPlayer = room.players.values().next().value;
          if (firstPlayer && !Array.from(room.players.values()).some((p) => p.isHost)) {
            firstPlayer.isHost = true;
          }
        } else {
          // Schedule room cleanup after 10 minutes of inactivity
          room.cleanupTimeout = setTimeout(() => {
            rooms.delete(currentRoomId!);
          }, 10 * 60 * 1000);
        }
      }
    }
  });
});

// JSON API
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', activeRooms: rooms.size, timestamp: Date.now() });
});

// Rooms info endpoint
app.get('/api/rooms/:id', (req, res) => {
  const roomId = req.params.id.toUpperCase();
  const room = rooms.get(roomId);
  if (!room) {
    res.status(404).json({ exists: false });
    return;
  }
  res.json({
    exists: true,
    name: room.name,
    playerCount: room.players.size,
    mode: room.mode,
    themeTitle: room.theme.title,
    gridSize: room.gridSize,
  });
});

// Dev vs Prod Vite Integration
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} in ${isProd ? 'production' : 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
