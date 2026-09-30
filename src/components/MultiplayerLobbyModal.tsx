import { Copy, PlusCircle, Sparkles, Trophy, Users, X } from 'lucide-react';
import React, { useState } from 'react';
import { GameMode, PuzzleTheme } from '../types/game';

interface MultiplayerLobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinRoom: (params: {
    roomId: string;
    playerName: string;
    playerAvatar: string;
    mode?: GameMode;
    theme?: PuzzleTheme;
    gridSize?: number;
  }) => void;
  themes: PuzzleTheme[];
  defaultRoomId?: string;
}

const AVATARS = ['🦁', '🦉', '🚀', '🤖', '🐼', '🦊', '🦖', '🐱', '🐬', '🎨'];

export const MultiplayerLobbyModal: React.FC<MultiplayerLobbyModalProps> = ({
  isOpen,
  onClose,
  onJoinRoom,
  themes,
  defaultRoomId = '',
}) => {
  const [tab, setTab] = useState<'create' | 'join'>('create');
  const [playerName, setPlayerName] = useState('Aluno Explorador');
  const [selectedAvatar, setSelectedAvatar] = useState('🦁');
  const [roomCode, setRoomCode] = useState(defaultRoomId || 'TURMA5');
  const [mode, setMode] = useState<GameMode>('coop');
  const [selectedThemeId, setSelectedThemeId] = useState(themes[0]?.id || 'solar-system');
  const [gridSize, setGridSize] = useState<number>(4);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleAction = () => {
    setErrorMsg('');
    const trimmedCode = roomCode.trim().toUpperCase();
    if (!trimmedCode) {
      setErrorMsg('Digite um código de sala!');
      return;
    }
    const name = playerName.trim() || 'Aluno Explorador';

    const chosenTheme = themes.find((t) => t.id === selectedThemeId) || themes[0];

    onJoinRoom({
      roomId: trimmedCode,
      playerName: name,
      playerAvatar: selectedAvatar,
      mode: tab === 'create' ? mode : undefined,
      theme: tab === 'create' ? chosenTheme : undefined,
      gridSize: tab === 'create' ? gridSize : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[92vh] w-full max-w-xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Modo Multiplayer Online</h2>
              <p className="text-xs text-slate-500">Jogue com seus colegas e professor em tempo real!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 overflow-y-auto p-6">
          {/* Player Profile Selection */}
          <div className="flex flex-col gap-2 rounded-xl bg-slate-50 p-4 border border-slate-200/70">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-600 mb-1">Seu Mascote</span>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border-2 border-amber-300 text-3xl shadow-xs">
                  {selectedAvatar}
                </div>
              </div>

              <div className="flex-1 w-full">
                <label className="text-xs font-semibold text-slate-600">Seu Nome / Apelido na Turma</label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Ex: Pedro, Luiza, Prof. Rafael"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-amber-500 focus:outline-hidden"
                  maxLength={20}
                />
              </div>
            </div>

            {/* Avatar Picker */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-200/50">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  onClick={() => setSelectedAvatar(av)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg transition-transform ${
                    selectedAvatar === av
                      ? 'bg-amber-100 border-2 border-amber-500 scale-110 shadow-xs'
                      : 'bg-white border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Create or Join Tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => setTab('create')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
                tab === 'create' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PlusCircle className="h-4 w-4 text-amber-600" />
              Criar Nova Sala da Turma
            </button>
            <button
              onClick={() => setTab('join')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
                tab === 'join' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="h-4 w-4 text-blue-600" />
              Entrar com Código
            </button>
          </div>

          {tab === 'create' ? (
            <div className="flex flex-col gap-4">
              {/* Room Code */}
              <div>
                <label className="text-xs font-semibold text-slate-600">Código da Sala</label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ''))}
                    placeholder="Ex: TURMA5A"
                    className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold tracking-wider text-slate-800 uppercase focus:border-amber-500 focus:outline-hidden"
                    maxLength={10}
                  />
                  <button
                    onClick={() => setRoomCode(`TURMA${Math.floor(10 + Math.random() * 90)}`)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Gerar Outro
                  </button>
                </div>
              </div>

              {/* Game Mode */}
              <div>
                <label className="text-xs font-semibold text-slate-600">Modo de Jogo</label>
                <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setMode('coop')}
                    className={`cursor-pointer rounded-xl border p-3 transition-all ${
                      mode === 'coop'
                        ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-800">Modo Cooperativo</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 leading-tight">
                      A turma inteira colabora no <strong>mesmo tabuleiro</strong> ao vivo!
                    </p>
                  </div>

                  <div
                    onClick={() => setMode('race')}
                    className={`cursor-pointer rounded-xl border p-3 transition-all ${
                      mode === 'race'
                        ? 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-400 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-bold text-slate-800">Modo Corrida / Batalha</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 leading-tight">
                      Cada um monta o seu e quem terminar primeiro sobe no <strong>pódio</strong>!
                    </p>
                  </div>
                </div>
              </div>

              {/* Theme & Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Tema do Quebra-Cabeça</label>
                  <select
                    value={selectedThemeId}
                    onChange={(e) => setSelectedThemeId(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-amber-500 focus:outline-hidden"
                  >
                    {themes.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} ({t.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">Dificuldade</label>
                  <div className="mt-1 flex gap-1.5">
                    {[
                      { g: 3, label: '3x3 (9)' },
                      { g: 4, label: '4x4 (16)' },
                      { g: 5, label: '5x5 (25)' },
                    ].map((item) => (
                      <button
                        key={item.g}
                        onClick={() => setGridSize(item.g)}
                        className={`flex-1 rounded-lg py-1.5 text-center text-xs font-bold border transition-colors ${
                          gridSize === item.g
                            ? 'border-amber-500 bg-amber-50 text-amber-800'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 py-2">
              <div>
                <label className="text-xs font-semibold text-slate-600">Código Fornecido pelo Professor ou Colega</label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ''))}
                  placeholder="Ex: TURMA5"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold tracking-widest text-slate-800 uppercase focus:border-blue-500 focus:outline-hidden"
                  maxLength={10}
                />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Peça o código da sala para quem criou ou digite o código da turma para entrar na mesma mesa de jogo!
              </p>
            </div>
          )}

          {errorMsg && <p className="text-xs text-rose-600 font-semibold">{errorMsg}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAction}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 active:scale-95 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            {tab === 'create' ? 'Iniciar Sala da Turma' : 'Entrar na Sala'}
          </button>
        </div>
      </div>
    </div>
  );
};
