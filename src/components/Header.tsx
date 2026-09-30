import {
  BookOpen,
  Gamepad2,
  HelpCircle,
  Puzzle,
  Share2,
  Star,
  Users,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
} from 'lucide-react';
import React, { useState } from 'react';
import { GameMode } from '../types/game';
import { getMuted, setMuted } from '../utils/audio';

interface HeaderProps {
  mode: GameMode;
  roomId: string | null;
  isConnected: boolean;
  totalXp?: number;
  onOpenMultiplayer: () => void;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  roomId,
  isConnected,
  totalXp = 0,
  onOpenMultiplayer,
  onOpenHelp,
}) => {
  const [muted, setSoundMuted] = useState(getMuted());

  const toggleSound = () => {
    const next = !muted;
    setSoundMuted(next);
    setMuted(next);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-amber-200/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white shadow-md shadow-amber-500/20">
            <Puzzle className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
                Quebra-Cabeça da Turma
              </h1>
              <span className="hidden sm:inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-800">
                5º Ano
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500">
              Desafios educativos e modo multiplayer ao vivo
            </p>
          </div>
        </div>

        {/* Center / Mode indicator */}
        <div className="hidden md:flex items-center gap-2 rounded-xl bg-slate-100/90 p-1 border border-slate-200/60">
          <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700">
            {roomId ? (
              <>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sala: <strong className="font-mono text-amber-700">{roomId}</strong></span>
                <span className="text-slate-300">|</span>
                <span>{mode === 'coop' ? '🤝 Cooperativo' : '🏁 Corrida'}</span>
              </>
            ) : (
              <>
                <Gamepad2 className="h-3.5 w-3.5 text-slate-500" />
                <span>Treino Individual</span>
              </>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* XP & Level Star Badge */}
          <div
            className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-900 shadow-2xs"
            title="Pontos de Experiência e Estrelas acumuladas das Missões do 5º Ano"
          >
            <Star className="h-4 w-4 fill-amber-400 text-amber-500 animate-pulse" />
            <span>{totalXp} XP</span>
          </div>

          {/* Multiplayer Button */}
          <button
            onClick={onOpenMultiplayer}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-xs ${
              roomId
                ? 'bg-amber-100 border border-amber-300 text-amber-900 hover:bg-amber-200'
                : 'bg-amber-500 text-white hover:bg-amber-600 active:scale-95'
            }`}
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">
              {roomId ? 'Configurar Sala' : 'Jogar em Turma Online'}
            </span>
            <span className="sm:hidden">Multiplayer</span>
          </button>

          {/* Tutorial Button */}
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors shadow-2xs"
            title="Ver Tutorial e Regras da Turma"
          >
            <BookOpen className="h-3.5 w-3.5 text-amber-600" />
            <span className="hidden sm:inline">Tutorial</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            title={muted ? 'Ativar Sons' : 'Desativar Sons'}
          >
            {muted ? <VolumeX className="h-4 w-4 text-slate-400" /> : <Volume2 className="h-4 w-4 text-amber-600" />}
          </button>

          {/* Help Modal Button */}
          <button
            onClick={onOpenHelp}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            title="Como Jogar e Instruções"
          >
            <HelpCircle className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
