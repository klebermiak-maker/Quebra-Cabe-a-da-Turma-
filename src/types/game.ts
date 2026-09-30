export type GameMode = 'coop' | 'race' | 'solo';

export interface Mission {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  type: 'complete' | 'edges' | 'speed' | 'accuracy' | 'grid_master';
  targetValue?: number;
}

export interface PuzzleTheme {
  id: string;
  title: string;
  category: 'Ciências' | 'Geografia' | 'História' | 'Artes' | 'Matemática' | 'Personalizado';
  imageUrl: string;
  curiosity: string;
  defaultGrid: number;
  author?: string;
  themeColor?: {
    primary: string;
    bgBadge: string;
    textBadge: string;
    border: string;
    accent: string;
  };
  missions?: Mission[];
}

export interface PuzzlePiece {
  id: number;
  correctRow: number;
  correctCol: number;
  currentSlot: number | null; // null means it's in the tray; number is board index
  isPlaced: boolean;
  placedBy?: {
    id: string;
    name: string;
    avatar: string;
  } | null;
  // Edge connector shapes: 0 = flat edge, 1 = tab outward, -1 = blank/tab inward
  edges: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  color: string;
  score: number; // pieces placed in coop
  raceProgress: number; // 0 to 100%
  piecesPlaced: number;
  totalPieces: number;
  isFinished: boolean;
  finishTime?: number | null;
  isHost: boolean;
  joinedAt: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  type: 'chat' | 'system' | 'reaction';
  timestamp: number;
}

export interface RoomState {
  id: string;
  name: string;
  mode: GameMode;
  gridSize: number;
  theme: PuzzleTheme;
  status: 'waiting' | 'playing' | 'completed';
  players: Player[];
  // Board state for co-op mode: array of pieceIds placed in each slot (null if empty)
  board: (number | null)[];
  // Co-op shared pieces pool
  pieces: PuzzlePiece[];
  messages: ChatMessage[];
  startedAt: number | null;
  completedAt: number | null;
  seed: number;
}

export type ClientMessage =
  | {
      type: 'join_room';
      roomId: string;
      playerName: string;
      playerAvatar: string;
      playerColor?: string;
      mode?: GameMode;
      theme?: PuzzleTheme;
      gridSize?: number;
    }
  | {
      type: 'leave_room';
    }
  | {
      type: 'start_game';
      theme?: PuzzleTheme;
      gridSize?: number;
      mode?: GameMode;
    }
  | {
      type: 'place_piece_coop';
      pieceId: number;
      slotIndex: number;
    }
  | {
      type: 'return_piece_coop';
      pieceId: number;
    }
  | {
      type: 'update_race_progress';
      piecesPlaced: number;
      totalPieces: number;
      isFinished: boolean;
      finishTime?: number;
    }
  | {
      type: 'send_chat';
      text: string;
      messageType?: 'chat' | 'reaction';
    }
  | {
      type: 'restart_game';
    };

export type ServerMessage =
  | {
      type: 'room_state';
      state: RoomState;
      playerId: string;
    }
  | {
      type: 'player_joined';
      player: Player;
      messages: ChatMessage[];
    }
  | {
      type: 'player_left';
      playerId: string;
      messages: ChatMessage[];
    }
  | {
      type: 'game_started';
      state: RoomState;
    }
  | {
      type: 'piece_placed_sync';
      pieceId: number;
      slotIndex: number;
      board: (number | null)[];
      pieces: PuzzlePiece[];
      player: Player;
      isCompleted: boolean;
    }
  | {
      type: 'race_progress_sync';
      players: Player[];
      winner?: Player;
    }
  | {
      type: 'chat_received';
      message: ChatMessage;
    }
  | {
      type: 'game_completed';
      state: RoomState;
      curiosity: string;
    }
  | {
      type: 'error';
      message: string;
    };
