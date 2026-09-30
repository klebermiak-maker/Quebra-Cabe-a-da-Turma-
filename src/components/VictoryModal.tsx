import confetti from 'canvas-confetti';
import { Award, BookOpen, Clock, RefreshCw, Sparkles, Trophy, Users, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { GameMode, Player, PuzzleTheme } from '../types/game';
import { playCelebrateSound } from '../utils/audio';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  onChangeTheme: () => void;
  theme: PuzzleTheme;
  gridSize?: number;
  totalXp?: number;
  mode: GameMode;
  elapsedSeconds: number;
  players?: Player[];
  winner?: Player | null;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  onPlayAgain,
  onChangeTheme,
  theme,
  gridSize,
  totalXp = 0,
  mode,
  elapsedSeconds,
  players = [],
  winner,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    playCelebrateSound();

    // Trigger colorful celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6'],
    });

    const timer = setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const timeFormatted = `${minutes > 0 ? `${minutes}m ` : ''}${seconds}s`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col items-center rounded-3xl bg-white p-6 sm:p-8 text-center shadow-2xl border border-amber-200 overflow-hidden">
        {/* Decorative Top Sunburst Accent */}
        <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-amber-200/50 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-blue-200/50 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Badge / Trophy Icon */}
        <div className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-300 text-white shadow-lg ring-8 ring-amber-100">
          <Trophy className="h-10 w-10 drop-shadow-xs" />
          <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-amber-600 animate-spin" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-slate-900">
          {mode === 'race' && winner
            ? `Vitória de ${winner.name}!`
            : 'Parabéns, Turma do 5º Ano!'}
        </h2>
        <p className="mt-1 text-xs text-slate-500 font-medium">
          Quebra-cabeça "{theme.title}" montado com perfeição!
        </p>

        {/* Stats Row */}
        <div className="my-4 flex w-full items-center justify-center gap-4 rounded-2xl bg-amber-50/70 p-3 border border-amber-200/60">
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <Clock className="h-3 w-3" /> Tempo
            </span>
            <span className="text-sm font-bold text-slate-800">{timeFormatted}</span>
          </div>

          <div className="h-8 w-px bg-amber-200/60" />

          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <Award className="h-3 w-3" /> Peças
            </span>
            <span className="text-sm font-bold text-slate-800">
              {(gridSize || theme.defaultGrid) * (gridSize || theme.defaultGrid)} Encaixadas
            </span>
          </div>

          <div className="h-8 w-px bg-amber-200/60" />

          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <Sparkles className="h-3 w-3 text-amber-500" /> Total XP
            </span>
            <span className="text-sm font-bold text-amber-800">
              {totalXp} ⭐
            </span>
          </div>

          {mode === 'coop' && players.length > 0 && (
            <>
              <div className="h-8 w-px bg-amber-200/60" />
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <Users className="h-3 w-3" /> Turma
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {players.length} Alunos
                </span>
              </div>
            </>
          )}
        </div>

        {/* Educational Didactic Curiosity Banner */}
        <div className="w-full text-left rounded-2xl border border-blue-200 bg-blue-50/60 p-4 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500 text-white">
              <BookOpen className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-bold text-blue-900">
              Curiosidade Pedagógica do 5º Ano
            </span>
          </div>
          <p className="text-xs text-blue-800/90 leading-relaxed font-normal">
            {theme.curiosity}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex w-full flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={onPlayAgain}
            className="flex flex-1 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 active:scale-95 transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Jogar Novamente
          </button>
          <button
            onClick={onChangeTheme}
            className="flex flex-1 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            Escolher Outro Quebra-Cabeça
          </button>
        </div>
      </div>
    </div>
  );
};
