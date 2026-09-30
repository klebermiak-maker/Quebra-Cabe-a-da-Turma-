import { Award, CheckCircle2, ChevronDown, ChevronUp, Clock, Flame, ShieldAlert, Sparkles, Star, Target, Trophy } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { getThemeMissions, getThemeVisuals } from '../data/themeEnhancements';
import { Mission, PuzzlePiece, PuzzleTheme } from '../types/game';
import { playMissionCompleteSound } from '../utils/audio';

interface MissionsPanelProps {
  theme: PuzzleTheme;
  gridSize: number;
  pieces: PuzzlePiece[];
  board: (number | null)[];
  elapsedSeconds: number;
  streakCount: number;
  completedMissionIds: string[];
  onMissionCompleted: (mission: Mission) => void;
  totalXp: number;
}

export const MissionsPanel: React.FC<MissionsPanelProps> = ({
  theme,
  gridSize,
  pieces,
  board,
  elapsedSeconds,
  streakCount,
  completedMissionIds,
  onMissionCompleted,
  totalXp,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const visuals = getThemeVisuals(theme.id);
  const missions = useMemo(() => getThemeMissions(theme), [theme]);

  // Compute borders info
  const borderPieces = useMemo(() => {
    return pieces.filter(
      (p) =>
        p.correctRow === 0 ||
        p.correctRow === gridSize - 1 ||
        p.correctCol === 0 ||
        p.correctCol === gridSize - 1
    );
  }, [pieces, gridSize]);

  const placedBorderCount = borderPieces.filter((p) => p.isPlaced).length;
  const allBordersPlaced = borderPieces.length > 0 && placedBorderCount === borderPieces.length;
  const isComplete = pieces.length > 0 && pieces.every((p) => p.isPlaced);

  // Check mission fulfillments dynamically
  useEffect(() => {
    missions.forEach((m) => {
      if (completedMissionIds.includes(m.id)) return;

      let isFulfilled = false;

      if (m.type === 'complete' && isComplete) {
        isFulfilled = true;
      } else if (m.type === 'edges' && allBordersPlaced) {
        isFulfilled = true;
      } else if (m.type === 'accuracy' && streakCount >= (m.targetValue || 4)) {
        isFulfilled = true;
      } else if (m.type === 'speed' && isComplete && elapsedSeconds <= (m.targetValue || 120)) {
        isFulfilled = true;
      } else if (m.type === 'grid_master' && isComplete && gridSize >= (m.targetValue || 5)) {
        isFulfilled = true;
      }

      if (isFulfilled) {
        playMissionCompleteSound();
        onMissionCompleted(m);
      }
    });
  }, [
    missions,
    isComplete,
    allBordersPlaced,
    streakCount,
    elapsedSeconds,
    gridSize,
    completedMissionIds,
    onMissionCompleted,
  ]);

  // Rank calculation
  const rankInfo = useMemo(() => {
    if (totalXp < 100) return { title: 'Recruta do 5º Ano', level: 1, next: 100 };
    if (totalXp < 250) return { title: 'Detetive Curioso', level: 2, next: 250 };
    if (totalXp < 450) return { title: 'Cientista Mirim', level: 3, next: 450 };
    if (totalXp < 700) return { title: 'Mestre da Turma', level: 4, next: 700 };
    return { title: 'Lenda da Escola', level: 5, next: 1000 };
  }, [totalXp]);

  const completedCount = missions.filter((m) => completedMissionIds.includes(m.id)).length;

  return (
    <div className="w-full rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-xs overflow-hidden transition-all">
      {/* Header bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex cursor-pointer items-center justify-between p-3.5 bg-gradient-to-r from-amber-500/10 via-amber-100/40 to-amber-500/10 hover:bg-amber-100/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500 text-white shadow-2xs">
            <Target className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wide text-slate-800 uppercase">
                Missões Temáticas da Turma
              </span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                {completedCount}/{missions.length} Concluídas
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Cumpra os desafios pedagógicos para ganhar Estrelas de XP!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Level Badge */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900 shadow-2xs">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span>Nível {rankInfo.level}: {rankInfo.title}</span>
            <span className="text-amber-700/70 font-semibold">({totalXp} XP)</span>
          </div>

          <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200/60 hover:text-slate-600 transition-colors">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Missions List */}
      {isExpanded && (
        <div className="p-3.5 flex flex-col gap-2.5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {missions.map((mission) => {
              const isDone = completedMissionIds.includes(mission.id);

              // Progress calculation helper
              let progressText = '';
              let progressPercent = 0;

              if (mission.type === 'complete') {
                const placed = pieces.filter((p) => p.isPlaced).length;
                progressPercent = pieces.length > 0 ? (placed / pieces.length) * 100 : 0;
                progressText = `${placed}/${pieces.length} peças`;
              } else if (mission.type === 'edges') {
                progressPercent = borderPieces.length > 0 ? (placedBorderCount / borderPieces.length) * 100 : 0;
                progressText = `${placedBorderCount}/${borderPieces.length} bordas`;
              } else if (mission.type === 'accuracy') {
                const target = mission.targetValue || 4;
                progressPercent = Math.min(100, (streakCount / target) * 100);
                progressText = `${Math.min(streakCount, target)}/${target} seguidas`;
              } else if (mission.type === 'speed') {
                const target = mission.targetValue || 120;
                const remaining = Math.max(0, target - elapsedSeconds);
                progressText = isDone ? 'Concluída a tempo!' : remaining > 0 ? `${remaining}s restantes` : 'Tempo esgotado';
                progressPercent = isDone ? 100 : remaining > 0 ? 50 : 0;
              } else if (mission.type === 'grid_master') {
                const target = mission.targetValue || 5;
                progressText = gridSize >= target ? `${gridSize}x${gridSize} (Ativo)` : `Requer ${target}x${target}`;
                progressPercent = isDone ? 100 : gridSize >= target ? 60 : 0;
              }

              return (
                <div
                  key={mission.id}
                  className={`flex flex-col justify-between rounded-xl border p-2.5 transition-all ${
                    isDone
                      ? 'border-emerald-300 bg-emerald-50/70 shadow-2xs ring-1 ring-emerald-300'
                      : 'border-slate-200/90 bg-slate-50/60 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">{mission.icon}</span>
                        <h4 className="text-xs font-bold text-slate-800 leading-tight">
                          {mission.title}
                        </h4>
                      </div>

                      {isDone ? (
                        <span className="flex items-center gap-0.5 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-black text-emerald-700">
                          <CheckCircle2 className="h-3 w-3 stroke-[3]" />
                          + {mission.xp} XP
                        </span>
                      ) : (
                        <span className="rounded-md bg-amber-100/80 px-1.5 py-0.5 text-[10px] font-black text-amber-800">
                          +{mission.xp} XP
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-[11px] text-slate-500 leading-snug">
                      {mission.description}
                    </p>
                  </div>

                  {/* Progress tracker */}
                  <div className="mt-2.5 pt-2 border-t border-slate-200/50">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                      <span>Status</span>
                      <span className={isDone ? 'text-emerald-700 font-bold' : 'text-slate-700'}>
                        {isDone ? 'Concluída!' : progressText}
                      </span>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-slate-200/70 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isDone
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-amber-400 to-amber-500'
                        }`}
                        style={{ width: `${isDone ? 100 : Math.min(100, Math.round(progressPercent))}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Educational Encouragement Footer */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-1.5 border border-slate-200/60 text-[11px] text-slate-600">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <strong>Dica Pedagógica:</strong> {theme.title} ensina conteúdos alinhados com o currículo do 5º ano!
            </span>
            <span className="font-semibold text-amber-700 hidden sm:inline">
              Sequência de Acertos: {streakCount} 🔥
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
