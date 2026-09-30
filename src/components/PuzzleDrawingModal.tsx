import { Eraser, Paintbrush, RotateCcw, Sparkles, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { PuzzleTheme } from '../types/game';

interface PuzzleDrawingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTheme: (theme: PuzzleTheme) => void;
}

const PALETTE = [
  '#ef4444', // Red
  '#f97316', // Orange
  '#facc15', // Yellow
  '#22c55e', // Green
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#854d0e', // Brown
  '#1e293b', // Slate Dark
  '#ffffff', // White
];

const STAMPS = ['⭐', '🚀', '❤️', '☀️', '🌿', '🐱', '🦖', '👑'];

export const PuzzleDrawingModal: React.FC<PuzzleDrawingModalProps> = ({ isOpen, onClose, onSaveTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState<string>('#3b82f6');
  const [lineWidth, setLineWidth] = useState<number>(8);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);
  const [title, setTitle] = useState('Meu Desenho Incrível');
  const [curiosity, setCuriosity] = useState('Desenho exclusivo feito por um aluno do 5º ano!');
  const [gridSize, setGridSize] = useState<number>(3);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill initial canvas with clean white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [isOpen]);

  if (!isOpen) return null;

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    if (selectedStamp) {
      // Stamp emoji
      ctx.font = '54px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedStamp, x, y);
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || selectedStamp) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineWidth = isEraser ? lineWidth * 2.5 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageUrl = canvas.toDataURL('image/png');

    const newTheme: PuzzleTheme = {
      id: `custom_draw_${Date.now()}`,
      title: title.trim() || 'Meu Quebra-Cabeça Desenhado',
      category: 'Personalizado',
      imageUrl,
      curiosity: curiosity.trim() || 'Quebra-cabeça original criado por um colega da turma!',
      defaultGrid: gridSize,
      author: 'Aluno Artista',
    };

    onSaveTheme(newTheme);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[95vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Paintbrush className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Lousa Criativa da Turma</h2>
              <p className="text-xs text-slate-500">Desenhe seu próprio quebra-cabeça para a sala jogar!</p>
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
        <div className="flex flex-1 flex-col md:flex-row overflow-y-auto">
          {/* Canvas Area */}
          <div className="flex flex-1 flex-col items-center justify-center bg-slate-100 p-4">
            <div className="relative overflow-hidden rounded-xl border-4 border-amber-200 bg-white shadow-inner">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="h-[280px] w-[370px] sm:h-[360px] sm:w-[480px] lg:h-[420px] lg:w-[560px] touch-none cursor-crosshair bg-white"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">Dica: use cores vivas e figuras marcantes para ficar mais divertido!</p>
          </div>

          {/* Tools & Details Sidebar */}
          <div className="flex w-full md:w-80 flex-col gap-4 border-t md:border-t-0 md:border-l border-slate-100 p-5 bg-white">
            {/* Color Palette */}
            <div>
              <label className="text-xs font-semibold text-slate-600">Cores do Pincel</label>
              <div className="mt-2 grid grid-cols-6 gap-2">
                {PALETTE.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setColor(c);
                      setIsEraser(false);
                      setSelectedStamp(null);
                    }}
                    style={{ backgroundColor: c }}
                    className={`h-8 w-8 rounded-lg border border-slate-200 transition-transform ${
                      color === c && !isEraser && !selectedStamp
                        ? 'ring-2 ring-amber-500 ring-offset-2 scale-110'
                        : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Brush & Eraser */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-600">Ferramenta</label>
                <button
                  onClick={clearCanvas}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Limpar Lousa
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsEraser(false);
                    setSelectedStamp(null);
                  }}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-colors ${
                    !isEraser && !selectedStamp
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Paintbrush className="h-3.5 w-3.5" />
                  Pincel
                </button>
                <button
                  onClick={() => {
                    setIsEraser(true);
                    setSelectedStamp(null);
                  }}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-colors ${
                    isEraser
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Eraser className="h-3.5 w-3.5" />
                  Borracha
                </button>
              </div>

              {/* Stroke width */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Espessura:</span>
                {[4, 8, 14, 22].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setLineWidth(sz)}
                    className={`flex h-7 w-7 items-center justify-center rounded-md border text-xs font-bold ${
                      lineWidth === sz ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Stamps */}
            <div>
              <label className="text-xs font-semibold text-slate-600">Carimbos / Figurinhas</label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {STAMPS.map((stamp) => (
                  <button
                    key={stamp}
                    onClick={() => {
                      setSelectedStamp(selectedStamp === stamp ? null : stamp);
                      setIsEraser(false);
                    }}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-xl border transition-transform ${
                      selectedStamp === stamp
                        ? 'border-amber-500 bg-amber-50 scale-110 ring-2 ring-amber-400'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    {stamp}
                  </button>
                ))}
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <div>
                <label className="text-xs font-semibold text-slate-600">Título do Quebra-Cabeça</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: O Castelo Medieval"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-hidden"
                  maxLength={35}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Mensagem Secreta / Curiosidade</label>
                <textarea
                  value={curiosity}
                  onChange={(e) => setCuriosity(e.target.value)}
                  placeholder="Os colegas vão ler essa mensagem ao resolver o quebra-cabeça!"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-hidden"
                  rows={2}
                  maxLength={120}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Dificuldade Inicial</label>
                <div className="mt-1 flex gap-2">
                  {[
                    { g: 3, label: '3x3 (9 peças)' },
                    { g: 4, label: '4x4 (16 peças)' },
                    { g: 5, label: '5x5 (25 peças)' },
                  ].map((item) => (
                    <button
                      key={item.g}
                      onClick={() => setGridSize(item.g)}
                      className={`flex-1 rounded-md py-1 text-center text-[11px] font-medium border ${
                        gridSize === item.g
                          ? 'border-amber-500 bg-amber-50 text-amber-800 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-sm font-bold text-white shadow-md hover:bg-amber-600 active:scale-95 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Transformar em Quebra-Cabeça!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
