import {
  BookOpen,
  ChevronRight,
  Flame,
  LayoutGrid,
  Paintbrush,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { CustomImageModal } from './components/CustomImageModal';
import { Header } from './components/Header';
import { HelpModal } from './components/HelpModal';
import { MissionsPanel } from './components/MissionsPanel';
import { MultiplayerLobbyModal } from './components/MultiplayerLobbyModal';
import { MultiplayerSidebar } from './components/MultiplayerSidebar';
import { PuzzleBoard } from './components/PuzzleBoard';
import { PuzzleDrawingModal } from './components/PuzzleDrawingModal';
import { ThemeSelector } from './components/ThemeSelector';
import { TutorialModal } from './components/TutorialModal';
import { VictoryModal } from './components/VictoryModal';
import { EDUCATIONAL_THEMES } from './data/puzzleThemes';
import {
  ChatMessage,
  ClientMessage,
  GameMode,
  Mission,
  Player,
  PuzzlePiece,
  PuzzleTheme,
  ServerMessage,
} from './types/game';
import { generatePuzzlePieces } from './utils/puzzleMath';

export default function App() {
  const [themes, setThemes] = useState<PuzzleTheme[]>(EDUCATIONAL_THEMES);
  const [activeTheme, setActiveTheme] = useState<PuzzleTheme>(EDUCATIONAL_THEMES[0]);
  const [gridSize, setGridSize] = useState<number>(4);
  const [mode, setMode] = useState<GameMode>('solo');
  const [roomId, setRoomId] = useState<string | null>(null);

  // Local game board pieces
  const [pieces, setPieces] = useState<PuzzlePiece[]>(() =>
    generatePuzzlePieces(4, Math.floor(Math.random() * 10000))
  );
  const [board, setBoard] = useState<(number | null)[]>(() => new Array(16).fill(null));

  // Multiplayer state
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | null>(null);

  // Missions & Progression State (persisted to localStorage)
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('turma5_missions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [totalXp, setTotalXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('turma5_xp');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [streakCount, setStreakCount] = useState<number>(0);
  const [activeMissionToast, setActiveMissionToast] = useState<Mission | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('turma5_missions', JSON.stringify(completedMissionIds));
    } catch {}
  }, [completedMissionIds]);

  useEffect(() => {
    try {
      localStorage.setItem('turma5_xp', String(totalXp));
    } catch {}
  }, [totalXp]);

  const handleMissionCompleted = (mission: Mission) => {
    if (completedMissionIds.includes(mission.id)) return;
    setCompletedMissionIds((prev) => [...prev, mission.id]);
    setTotalXp((prev) => prev + mission.xp);
    setActiveMissionToast(mission);
    setTimeout(() => {
      setActiveMissionToast(null);
    }, 4500);
  };

  // View & Modals
  const [activeTab, setActiveTab] = useState<'game' | 'themes'>('game');
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isLobbyOpen, setIsLobbyOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

  // Tutorial Gatekeeper State (must read before game starts)
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState<boolean>(() => {
    try {
      return localStorage.getItem('turma5_tutorial_read') === 'true';
    } catch {
      return false;
    }
  });

  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('turma5_tutorial_read') !== 'true';
    } catch {
      return true;
    }
  });

  const handleCompleteTutorial = () => {
    setHasCompletedTutorial(true);
    setIsTutorialOpen(false);
    try {
      localStorage.setItem('turma5_tutorial_read', 'true');
    } catch {}
  };

  // Timer: only runs once tutorial has been completed and game is playing
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const wsRef = useRef<WebSocket | null>(null);

  // Check room from URL query on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam) {
      setRoomId(roomParam.toUpperCase());
      setIsLobbyOpen(true);
    }
  }, []);

  // Timer counter
  useEffect(() => {
    if (!isPlaying || !hasCompletedTutorial) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, hasCompletedTutorial]);

  // WebSocket Connection Manager
  const connectWebSocket = (onOpenCallback?: (ws: WebSocket) => void) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      if (onOpenCallback) onOpenCallback(wsRef.current);
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const ws = new WebSocket(`${protocol}//${host}`);

    ws.onopen = () => {
      setIsConnected(true);
      if (onOpenCallback) onOpenCallback(ws);
    };

    ws.onmessage = (event) => {
      try {
        const data: ServerMessage = JSON.parse(event.data);
        handleServerMessage(data);
      } catch (err) {
        console.error('Error parsing WS message:', err);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      wsRef.current = null;
    };

    ws.onerror = (err) => {
      console.warn('WS error:', err);
    };

    wsRef.current = ws;
  };

  const sendWsMessage = (msg: ClientMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  const handleServerMessage = (data: ServerMessage) => {
    switch (data.type) {
      case 'room_state': {
        const state = data.state;
        setRoomId(state.id);
        setMode(state.mode);
        setGridSize(state.gridSize);
        setActiveTheme(state.theme);
        setPlayers(state.players);
        setMessages(state.messages);

        const me = state.players.find((p) => p.id === data.playerId) || null;
        setCurrentPlayer(me);

        if (state.mode === 'coop') {
          setBoard(state.board);
          setPieces(state.pieces);
        } else {
          // Race mode: initialize local pieces with the synchronized seed
          const initialPieces = generatePuzzlePieces(state.gridSize, state.seed);
          setPieces(initialPieces);
          setBoard(new Array(state.gridSize * state.gridSize).fill(null));
        }

        setElapsedSeconds(0);
        setIsPlaying(true);
        setIsVictoryOpen(false);
        break;
      }

      case 'player_joined': {
        setPlayers((prev) => {
          const exists = prev.some((p) => p.id === data.player.id);
          if (exists) return prev;
          return [...prev, data.player];
        });
        setMessages(data.messages);
        break;
      }

      case 'player_left': {
        setPlayers((prev) => prev.filter((p) => p.id !== data.playerId));
        setMessages(data.messages);
        break;
      }

      case 'game_started': {
        const state = data.state;
        setActiveTheme(state.theme);
        setGridSize(state.gridSize);
        setMode(state.mode);
        setPlayers(state.players);
        setWinner(null);
        setElapsedSeconds(0);
        setIsPlaying(true);
        setIsVictoryOpen(false);

        if (state.mode === 'coop') {
          setBoard(state.board);
          setPieces(state.pieces);
        } else {
          const freshPieces = generatePuzzlePieces(state.gridSize, state.seed);
          setPieces(freshPieces);
          setBoard(new Array(state.gridSize * state.gridSize).fill(null));
        }
        break;
      }

      case 'piece_placed_sync': {
        if (mode === 'coop') {
          setBoard(data.board);
          setPieces(data.pieces);
          setPlayers((prev) =>
            prev.map((p) => (p.id === data.player.id ? { ...p, score: data.player.score } : p))
          );
          if (data.isCompleted) {
            setIsPlaying(false);
            setIsVictoryOpen(true);
          }
        }
        break;
      }

      case 'race_progress_sync': {
        setPlayers(data.players);
        if (data.winner) {
          setWinner(data.winner);
          setIsPlaying(false);
          setIsVictoryOpen(true);
        }
        break;
      }

      case 'chat_received': {
        setMessages((prev) => [...prev.slice(-49), data.message]);
        break;
      }

      case 'game_completed': {
        setIsPlaying(false);
        setIsVictoryOpen(true);
        break;
      }
    }
  };

  // Start fresh game locally
  const startNewLocalGame = (theme: PuzzleTheme, size: number) => {
    setActiveTheme(theme);
    setGridSize(size);
    const newPieces = generatePuzzlePieces(size, Math.floor(Math.random() * 100000));
    setPieces(newPieces);
    setBoard(new Array(size * size).fill(null));
    setElapsedSeconds(0);
    setIsPlaying(true);
    setIsVictoryOpen(false);
    setWinner(null);
  };

  const handleSelectTheme = (theme: PuzzleTheme) => {
    setActiveTheme(theme);
    if (mode === 'solo') {
      startNewLocalGame(theme, theme.defaultGrid);
      setActiveTab('game');
    } else {
      // In multiplayer, send start_game with new theme if host
      sendWsMessage({
        type: 'start_game',
        theme,
        gridSize: theme.defaultGrid,
      });
      setActiveTab('game');
    }
  };

  const handlePlacePiece = (pieceId: number, slotIndex: number) => {
    if (!hasCompletedTutorial) {
      setIsTutorialOpen(true);
      return;
    }

    if (mode === 'coop' && roomId) {
      sendWsMessage({
        type: 'place_piece_coop',
        pieceId,
        slotIndex,
      });
    } else {
      // Solo or Race mode (local board)
      const nextPieces = pieces.map((p) =>
        p.id === pieceId
          ? {
              ...p,
              isPlaced: true,
              currentSlot: slotIndex,
              placedBy: currentPlayer
                ? {
                    id: currentPlayer.id,
                    name: currentPlayer.name,
                    avatar: currentPlayer.avatar,
                  }
                : null,
            }
          : p
      );

      const nextBoard = [...board];
      nextBoard[slotIndex] = pieceId;

      setPieces(nextPieces);
      setBoard(nextBoard);

      const placedCount = nextPieces.filter((p) => p.isPlaced).length;
      const total = nextPieces.length;
      const isComplete = placedCount === total;

      if (mode === 'race' && roomId) {
        sendWsMessage({
          type: 'update_race_progress',
          piecesPlaced: placedCount,
          totalPieces: total,
          isFinished: isComplete,
          finishTime: elapsedSeconds * 1000,
        });
      }

      if (isComplete) {
        setIsPlaying(false);
        setIsVictoryOpen(true);
      }
    }
  };

  const handleJoinMultiplayerRoom = (params: {
    roomId: string;
    playerName: string;
    playerAvatar: string;
    mode?: GameMode;
    theme?: PuzzleTheme;
    gridSize?: number;
  }) => {
    connectWebSocket((ws) => {
      ws.send(
        JSON.stringify({
          type: 'join_room',
          roomId: params.roomId,
          playerName: params.playerName,
          playerAvatar: params.playerAvatar,
          mode: params.mode || 'coop',
          theme: params.theme || activeTheme,
          gridSize: params.gridSize || gridSize,
        } as ClientMessage)
      );
    });
  };

  const handleLeaveRoom = () => {
    sendWsMessage({ type: 'leave_room' });
    if (wsRef.current) {
      wsRef.current.close();
    }
    setRoomId(null);
    setMode('solo');
    setPlayers([]);
    setCurrentPlayer(null);
    setMessages([]);
    startNewLocalGame(activeTheme, gridSize);
  };

  const handleRestart = () => {
    if (roomId) {
      sendWsMessage({ type: 'restart_game' });
    } else {
      startNewLocalGame(activeTheme, gridSize);
    }
  };

  const handleGridSizeChange = (newSize: number) => {
    if (newSize === gridSize) return;
    setGridSize(newSize);
    if (roomId) {
      sendWsMessage({
        type: 'start_game',
        theme: activeTheme,
        gridSize: newSize,
        mode,
      });
    } else {
      startNewLocalGame(activeTheme, newSize);
    }
  };

  const handleSaveCustomTheme = (newTheme: PuzzleTheme) => {
    setThemes((prev) => [newTheme, ...prev]);
    setActiveTheme(newTheme);
    if (roomId) {
      sendWsMessage({
        type: 'start_game',
        theme: newTheme,
        gridSize: newTheme.defaultGrid,
      });
    } else {
      startNewLocalGame(newTheme, newTheme.defaultGrid);
    }
    setActiveTab('game');
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40 text-slate-800">
      {/* Header */}
      <Header
        mode={mode}
        roomId={roomId}
        isConnected={isConnected}
        totalXp={totalXp}
        onOpenMultiplayer={() => setIsLobbyOpen(true)}
        onOpenHelp={() => setIsTutorialOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-6 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Navigation Tabs (Quebra-Cabeça vs Biblioteca de Temas) */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('game')}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'game'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Mesa de Jogo
            </button>
            <button
              onClick={() => setActiveTab('themes')}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'themes'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Galeria de Temas ({themes.length})
            </button>
          </div>

          {/* Quick theme trigger badge */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDrawingOpen(true)}
              className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100/70 hover:bg-amber-200/80 px-3 py-1.5 rounded-xl border border-amber-300/60 transition-colors shadow-2xs"
            >
              <Paintbrush className="h-3.5 w-3.5 text-amber-600" />
              Lousa Criativa
            </button>
          </div>
        </div>

        {activeTab === 'themes' ? (
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
              <h2 className="text-base font-bold text-amber-900">
                Temas Educativos e Personalizados para o 5º Ano
              </h2>
              <p className="mt-0.5 text-xs text-amber-800/80">
                Ciências, Geografia, História, Artes e Matemática. Escolha um desafio ou crie o seu desenhando na lousa!
              </p>
            </div>

            <ThemeSelector
              themes={themes}
              selectedTheme={activeTheme}
              onSelectTheme={handleSelectTheme}
              onOpenDrawing={() => setIsDrawingOpen(true)}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Thematic Missions Panel */}
            <MissionsPanel
              theme={activeTheme}
              gridSize={gridSize}
              pieces={pieces}
              board={board}
              elapsedSeconds={elapsedSeconds}
              streakCount={streakCount}
              completedMissionIds={completedMissionIds}
              onMissionCompleted={handleMissionCompleted}
              totalXp={totalXp}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left or Main Board Area */}
              <div className={roomId ? 'lg:col-span-8' : 'lg:col-span-12'}>
                <PuzzleBoard
                  theme={activeTheme}
                  gridSize={gridSize}
                  pieces={pieces}
                  board={board}
                  onPlacePiece={handlePlacePiece}
                  onRestart={handleRestart}
                  onChangeGridSize={handleGridSizeChange}
                  streakCount={streakCount}
                  onCorrectPlacement={() => setStreakCount((prev) => prev + 1)}
                  onErrorPlacement={() => setStreakCount(0)}
                  isCoopMode={mode === 'coop'}
                  activePlayers={players}
                  currentPlayer={currentPlayer}
                />
              </div>

              {/* Right Multiplayer Sidebar (visible when in a multiplayer room) */}
              {roomId && (
                <div className="lg:col-span-4 sticky top-20">
                  <MultiplayerSidebar
                    roomId={roomId}
                    mode={mode}
                    players={players}
                    currentPlayerId={currentPlayer?.id || null}
                    messages={messages}
                    onSendMessage={(text, type) =>
                      sendWsMessage({ type: 'send_chat', text, messageType: type })
                    }
                    onLeaveRoom={handleLeaveRoom}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating Mission Achievement Toast */}
      {activeMissionToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white shadow-2xl border-2 border-emerald-300 animate-bounce">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-3xl">
            {activeMissionToast.icon}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-yellow-300 animate-spin" />
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-200">
                Missão Cumprida!
              </span>
            </div>
            <h4 className="text-sm font-black text-white">{activeMissionToast.title}</h4>
            <p className="text-xs text-emerald-100 font-semibold">
              + {activeMissionToast.xp} Estrelas XP para a sua turma! ⭐
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      <PuzzleDrawingModal
        isOpen={isDrawingOpen}
        onClose={() => setIsDrawingOpen(false)}
        onSaveTheme={handleSaveCustomTheme}
      />

      <CustomImageModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSaveTheme={handleSaveCustomTheme}
      />

      <MultiplayerLobbyModal
        isOpen={isLobbyOpen}
        onClose={() => setIsLobbyOpen(false)}
        onJoinRoom={handleJoinMultiplayerRoom}
        themes={themes}
        defaultRoomId={roomId || ''}
      />

      {/* Required Interactive Tutorial Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onComplete={handleCompleteTutorial}
        canCloseWithoutConfirm={hasCompletedTutorial}
        onClose={() => setIsTutorialOpen(false)}
      />

      <VictoryModal
        isOpen={isVictoryOpen}
        onClose={() => setIsVictoryOpen(false)}
        onPlayAgain={handleRestart}
        onChangeTheme={() => {
          setIsVictoryOpen(false);
          setActiveTab('themes');
        }}
        theme={activeTheme}
        gridSize={gridSize}
        totalXp={totalXp}
        mode={mode}
        elapsedSeconds={elapsedSeconds}
        players={players}
        winner={winner}
      />
    </div>
  );
}
