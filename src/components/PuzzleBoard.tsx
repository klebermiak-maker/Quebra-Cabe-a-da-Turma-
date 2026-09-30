import {
  Check,
  Eye,
  EyeOff,
  Flame,
  Grid3x3,
  HelpCircle,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sliders,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import React, { useId, useMemo, useState } from 'react';
import { getThemeVisuals } from '../data/themeEnhancements';
import { Player, PuzzlePiece, PuzzleTheme } from '../types/game';
import { getMuted, playErrorSound, playPickSound, playSnapSound, setMuted } from '../utils/audio';
import { getPieceSvgPath } from '../utils/puzzleMath';

interface PuzzleBoardProps {
  theme: PuzzleTheme;
  gridSize: number;
  pieces: PuzzlePiece[];
  board: (number | null)[];
  onPlacePiece: (pieceId: number, slotIndex: number) => void;
  onRestart: () => void;
  onChangeGridSize?: (newSize: number) => void;
  streakCount?: number;
  onCorrectPlacement?: () => void;
  onErrorPlacement?: () => void;
  isCoopMode?: boolean;
  activePlayers?: Player[];
  currentPlayer?: Player | null;
}

export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  theme,
  gridSize,
  pieces,
  board,
  onPlacePiece,
  onRestart,
  onChangeGridSize,
  streakCount = 0,
  onCorrectPlacement,
  onErrorPlacement,
  isCoopMode = false,
  activePlayers = [],
  currentPlayer,
}) => {
  const [selectedPieceId, setSelectedPieceId] = useState<number | null>(null);
  const [showGhost, setShowGhost] = useState<boolean>(true);
  const [showModelModal, setShowModelModal] = useState<boolean>(false);
  const [hintSlot, setHintSlot] = useState<number | null>(null);
  const [soundMuted, setSoundMuted] = useState<boolean>(getMuted());
  const [filterEdgesOnly, setFilterEdgesOnly] = useState<boolean>(false);

  const uid = useId().replace(/:/g, '');
  const visuals = getThemeVisuals(theme.id);

  // Fixed reference board dimensions
  const BOARD_W = 600;
  const BOARD_H = 450;
  const cellW = BOARD_W / gridSize;
  const cellH = BOARD_H / gridSize;
  const tabH = cellH * 0.22;

  // Unplaced pieces in the tray
  const unplacedPieces = useMemo(() => {
    let list = pieces.filter((p) => !p.isPlaced);
    if (filterEdgesOnly) {
      list = list.filter(
        (p) =>
          p.correctRow === 0 ||
          p.correctRow === gridSize - 1 ||
          p.correctCol === 0 ||
          p.correctCol === gridSize - 1
      );
    }
    return list;
  }, [pieces, filterEdgesOnly, gridSize]);

  const placedCount = pieces.filter((p) => p.isPlaced).length;
  const totalCount = pieces.length;
  const progressPercent = Math.round((placedCount / totalCount) * 100);

  const handleSelectPiece = (piece: PuzzlePiece) => {
    if (piece.isPlaced) return;
    if (selectedPieceId === piece.id) {
      setSelectedPieceId(null);
    } else {
      setSelectedPieceId(piece.id);
      playPickSound();
    }
  };

  const tryPlacePiece = (pieceId: number, slotIndex: number) => {
    // Correct slot check: piece.id matches slotIndex
    if (pieceId === slotIndex) {
      playSnapSound();
      onCorrectPlacement?.();
      onPlacePiece(pieceId, slotIndex);
      setSelectedPieceId(null);
      setHintSlot(null);
    } else {
      playErrorSound();
      onErrorPlacement?.();
      // Show subtle red flash or feedback
      setHintSlot(null);
    }
  };

  const handleSlotClick = (slotIndex: number) => {
    if (board[slotIndex] !== null) return; // already occupied
    if (selectedPieceId !== null) {
      tryPlacePiece(selectedPieceId, slotIndex);
    }
  };

  const handleGiveHint = () => {
    const unplaced = pieces.filter((p) => !p.isPlaced);
    if (unplaced.length === 0) return;

    // Pick first edge or random unplaced piece
    const edgePiece =
      unplaced.find(
        (p) =>
          p.correctRow === 0 ||
          p.correctRow === gridSize - 1 ||
          p.correctCol === 0 ||
          p.correctCol === gridSize - 1
      ) || unplaced[0];

    setSelectedPieceId(edgePiece.id);
    setHintSlot(edgePiece.id);
    playPickSound();
  };

  const toggleSound = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    setMuted(next);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto">
      {/* Thematic Educational Banner */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl p-3 sm:p-3.5 border shadow-2xs ${visuals.bgBadge} ${visuals.border}`}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-2xs text-2xl border border-slate-200/50">
            {theme.category === 'Ciências' ? '🔬' :
             theme.category === 'Geografia' ? '🌎' :
             theme.category === 'História' ? '📜' :
             theme.category === 'Matemática' ? '📐' :
             theme.category === 'Artes' ? '🎨' : '⭐'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/90 shadow-2xs ${visuals.textBadge}`}>
                {theme.category} · 5º Ano
              </span>
              <span className="text-xs font-bold text-slate-700">
                {visuals.tagline}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 leading-tight mt-0.5">
              {theme.title}
            </h3>
          </div>
        </div>

        {streakCount >= 2 && (
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-xs animate-pulse">
            <Flame className="h-4 w-4 fill-white" />
            <span>{streakCount} Acertos Consecutivos!</span>
          </div>
        )}
      </div>

      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Progress & Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Progresso:</span>
            <div className="h-3 w-28 md:w-36 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-amber-700">
              {placedCount}/{totalCount} ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Dynamic Grid Size Slider Control (3x3 to 6x6) */}
        {onChangeGridSize && (
          <div className="flex items-center gap-2.5 bg-slate-50/90 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Grid3x3 className="h-4 w-4 text-amber-600" />
              <span className="text-xs font-bold text-slate-700">Grade:</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="range"
                min={3}
                max={6}
                step={1}
                value={gridSize}
                onChange={(e) => onChangeGridSize(Number(e.target.value))}
                className="h-2 w-24 sm:w-28 cursor-pointer accent-amber-500 bg-slate-200 rounded-lg transition-all"
                title={`Ajustar tamanho da grade: ${gridSize}x${gridSize}`}
              />

              <div className="flex items-center gap-1">
                {[3, 4, 5, 6].map((size) => (
                  <button
                    key={size}
                    onClick={() => onChangeGridSize(size)}
                    className={`h-6 px-1.5 rounded-md text-[11px] font-bold transition-all ${
                      gridSize === size
                        ? 'bg-amber-500 text-white shadow-2xs scale-105'
                        : 'bg-white text-slate-600 border border-slate-200/70 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                    title={`${size}x${size} (${size * size} peças)`}
                  >
                    {size}x{size}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md hidden xl:inline">
              {gridSize * gridSize} peças
            </span>
          </div>
        )}

        {/* Board Tools */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Edge Pieces Filter */}
          <button
            onClick={() => setFilterEdgesOnly(!filterEdgesOnly)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              filterEdgesOnly
                ? 'border-amber-500 bg-amber-50 text-amber-800'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Flame className="h-3.5 w-3.5 text-amber-500" />
            Bordas ({filterEdgesOnly ? 'Ativo' : 'Todas'})
          </button>

          {/* Ghost Watermark Toggle */}
          <button
            onClick={() => setShowGhost(!showGhost)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              showGhost
                ? 'border-blue-400 bg-blue-50 text-blue-800'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
            title="Alternar imagem fantasma de fundo"
          >
            {showGhost ? <Eye className="h-3.5 w-3.5 text-blue-600" /> : <EyeOff className="h-3.5 w-3.5" />}
            Fantasma
          </button>

          {/* Model Image Modal */}
          <button
            onClick={() => setShowModelModal(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Ver Imagem
          </button>

          {/* Hint Button */}
          <button
            onClick={handleGiveHint}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
            Dica
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            title={soundMuted ? 'Ativar Som' : 'Silenciar Som'}
          >
            {soundMuted ? <VolumeX className="h-4 w-4 text-slate-400" /> : <Volume2 className="h-4 w-4 text-amber-600" />}
          </button>

          {/* Restart */}
          <button
            onClick={onRestart}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
            title="Reiniciar Quebra-Cabeça"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Playing Area: Board + Tray */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Main Column: Puzzle Board */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="relative w-full max-w-[620px] aspect-4/3 rounded-2xl border-4 border-amber-200/90 bg-amber-100/30 p-2 shadow-lg backdrop-blur-xs select-none">
            {/* SVG Workspace */}
            <svg
              viewBox={`0 0 ${BOARD_W} ${BOARD_H}`}
              className="w-full h-full rounded-xl overflow-visible"
              style={{ touchAction: 'none' }}
            >
              <defs>
                {/* SVG ClipPaths for each piece */}
                {pieces.map((piece) => {
                  const path = getPieceSvgPath(piece.edges, cellW, cellH);
                  return (
                    <clipPath id={`${uid}-clip-${piece.id}`} key={piece.id}>
                      <path d={path} />
                    </clipPath>
                  );
                })}
              </defs>

              {/* Ghost background image (watermark scaffold for 5th graders) */}
              {showGhost && (
                <image
                  href={theme.imageUrl}
                  x={0}
                  y={0}
                  width={BOARD_W}
                  height={BOARD_H}
                  preserveAspectRatio="none"
                  opacity={0.22}
                  className="pointer-events-none"
                />
              )}

              {/* Board Grid Slots */}
              {Array.from({ length: gridSize * gridSize }).map((_, slotIdx) => {
                const r = Math.floor(slotIdx / gridSize);
                const c = slotIdx % gridSize;
                const x = c * cellW;
                const y = r * cellH;
                const isOccupied = board[slotIdx] !== null;
                const isHinted = hintSlot === slotIdx;

                return (
                  <g
                    key={`slot-${slotIdx}`}
                    transform={`translate(${x}, ${y})`}
                    onClick={() => handleSlotClick(slotIdx)}
                    className="cursor-pointer"
                  >
                    {/* Slot Background Outline */}
                    <rect
                      x={0}
                      y={0}
                      width={cellW}
                      height={cellH}
                      fill={isHinted ? '#fef08a' : isOccupied ? 'transparent' : 'rgba(255, 255, 255, 0.45)'}
                      stroke={isHinted ? '#eab308' : '#cbd5e1'}
                      strokeWidth={isHinted ? 2.5 : 1}
                      strokeDasharray={isOccupied ? 'none' : '4,4'}
                      opacity={isOccupied ? 0 : 0.8}
                      className="transition-colors"
                    />

                    {/* Hint indicator */}
                    {isHinted && !isOccupied && (
                      <circle
                        cx={cellW / 2}
                        cy={cellH / 2}
                        r={12}
                        fill="#f59e0b"
                        className="animate-ping opacity-75"
                      />
                    )}
                  </g>
                );
              })}

              {/* Render Placed Pieces on the board */}
              {pieces
                .filter((p) => p.isPlaced)
                .map((piece) => {
                  const x = piece.correctCol * cellW;
                  const y = piece.correctRow * cellH;
                  const piecePath = getPieceSvgPath(piece.edges, cellW, cellH);

                  return (
                    <g
                      key={`placed-${piece.id}`}
                      transform={`translate(${x}, ${y})`}
                      className="transition-transform duration-200"
                    >
                      {/* Clipped image slice */}
                      <g clipPath={`url(#${uid}-clip-${piece.id})`}>
                        <image
                          href={theme.imageUrl}
                          x={-piece.correctCol * cellW}
                          y={-piece.correctRow * cellH}
                          width={BOARD_W}
                          height={BOARD_H}
                          preserveAspectRatio="none"
                        />
                      </g>

                      {/* Tactile border and subtle highlight */}
                      <path
                        d={piecePath}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeOpacity="0.7"
                      />
                      <path
                        d={piecePath}
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="0.8"
                        strokeOpacity="0.25"
                      />

                      {/* Co-op Player Avatar Pin on placed piece */}
                      {isCoopMode && piece.placedBy && (
                        <g
                          transform={`translate(${cellW / 2 - 12}, ${cellH / 2 - 12})`}
                          className="opacity-70 hover:opacity-100 transition-opacity"
                        >
                          <circle cx={12} cy={12} r={11} fill="#ffffff" stroke="#cbd5e1" strokeWidth={1} />
                          <text
                            x={12}
                            y={16}
                            fontSize="11"
                            textAnchor="middle"
                            className="pointer-events-none select-none"
                          >
                            {piece.placedBy.avatar}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between w-full max-w-[620px] px-2 text-xs text-slate-500">
            <span>
              Clique em uma peça da bandeja e depois clique no tabuleiro para encaixar!
            </span>
            <span className="font-semibold text-slate-700">{theme.title}</span>
          </div>
        </div>

        {/* Right Column: Piece Tray (Bandeja de Peças) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-slate-800">Bandeja de Peças</h4>
              <span className="text-xs text-slate-500 font-medium">
                ({unplacedPieces.length} restantes)
              </span>
            </div>

            {selectedPieceId !== null && (
              <button
                onClick={() => setSelectedPieceId(null)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Desmarcar
              </button>
            )}
          </div>

          {/* Scrollable Tray */}
          <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs max-h-[500px] overflow-y-auto">
            {unplacedPieces.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center col-span-3 w-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-2">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                <p className="text-xs font-bold text-slate-800">Todas as peças encaixadas!</p>
                <p className="text-[11px] text-slate-500 mt-1">Parabéns pelo trabalho na turma!</p>
              </div>
            ) : (
              unplacedPieces.map((piece) => {
                const isSelected = selectedPieceId === piece.id;
                const path = getPieceSvgPath(piece.edges, cellW, cellH);

                return (
                  <div
                    key={`tray-piece-${piece.id}`}
                    onClick={() => handleSelectPiece(piece)}
                    className={`group relative flex items-center justify-center p-2 rounded-xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/80 ring-3 ring-amber-400 shadow-md scale-105'
                        : 'border-slate-200/80 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-100/60 hover:scale-102'
                    }`}
                  >
                    {/* SVG Thumbnail of the piece */}
                    <div className="relative h-20 w-24 sm:h-22 sm:w-26 overflow-visible flex items-center justify-center">
                      <svg
                        viewBox={`-${tabH} -${tabH} ${cellW + 2 * tabH} ${cellH + 2 * tabH}`}
                        className="h-full w-full overflow-visible drop-shadow-xs"
                      >
                        <g clipPath={`url(#${uid}-clip-${piece.id})`}>
                          <image
                            href={theme.imageUrl}
                            x={-piece.correctCol * cellW}
                            y={-piece.correctRow * cellH}
                            width={BOARD_W}
                            height={BOARD_H}
                            preserveAspectRatio="none"
                          />
                        </g>
                        {/* Piece contour */}
                        <path
                          d={path}
                          fill="none"
                          stroke={isSelected ? '#f59e0b' : '#ffffff'}
                          strokeWidth={isSelected ? '2' : '1.2'}
                        />
                        <path
                          d={path}
                          fill="none"
                          stroke="#0f172a"
                          strokeWidth="0.8"
                          strokeOpacity="0.3"
                        />
                      </svg>
                    </div>

                    {/* Edge tag badge */}
                    {(piece.correctRow === 0 ||
                      piece.correctRow === gridSize - 1 ||
                      piece.correctCol === 0 ||
                      piece.correctCol === gridSize - 1) && (
                      <span className="absolute top-1 left-1.5 text-[9px] font-semibold text-slate-500">
                        Borda
                      </span>
                    )}

                    {isSelected && (
                      <span className="absolute bottom-1 right-1.5 text-[9px] font-bold text-amber-700 bg-amber-100 px-1 rounded-sm">
                        Selecionada
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Model Image Modal */}
      {showModelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="flex max-w-xl flex-col rounded-2xl bg-white p-5 shadow-2xl overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">{theme.title}</h3>
              <button
                onClick={() => setShowModelModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 overflow-hidden rounded-xl bg-slate-100 aspect-4/3">
              <img
                src={theme.imageUrl}
                alt={theme.title}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-slate-600 leading-relaxed bg-amber-50/60 p-3 rounded-xl border border-amber-200/50">
              💡 <span className="font-semibold">Curiosidade:</span> {theme.curiosity}
            </p>
            <button
              onClick={() => setShowModelModal(false)}
              className="mt-4 rounded-xl bg-slate-800 py-2.5 text-xs font-bold text-white hover:bg-slate-900 transition-colors"
            >
              Voltar ao Jogo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
