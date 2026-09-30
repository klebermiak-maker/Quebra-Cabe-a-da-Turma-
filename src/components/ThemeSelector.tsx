import { Check, ImagePlus, Paintbrush, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { PuzzleTheme } from '../types/game';

interface ThemeSelectorProps {
  themes: PuzzleTheme[];
  selectedTheme: PuzzleTheme;
  onSelectTheme: (theme: PuzzleTheme) => void;
  onOpenDrawing: () => void;
  onOpenUpload: () => void;
}

const CATEGORIES = ['Todos', 'Ciências', 'Geografia', 'História', 'Artes', 'Matemática', 'Personalizado'] as const;

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  selectedTheme,
  onSelectTheme,
  onOpenDrawing,
  onOpenUpload,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const filteredThemes = themes.filter((t) => {
    if (activeCategory === 'Todos') return true;
    return t.category === activeCategory;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Category Filter & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeCategory === cat
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDrawing}
            className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors shadow-2xs"
          >
            <Paintbrush className="h-3.5 w-3.5 text-amber-600" />
            Desenhar Lousa
          </button>
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 rounded-xl border border-blue-300 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100 transition-colors shadow-2xs"
          >
            <ImagePlus className="h-3.5 w-3.5 text-blue-600" />
            Carregar Foto
          </button>
        </div>
      </div>

      {/* Grid of themes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredThemes.map((t) => {
          const isSelected = selectedTheme.id === t.id;
          return (
            <div
              key={t.id}
              onClick={() => onSelectTheme(t)}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-3 cursor-pointer transition-all hover:shadow-md ${
                isSelected
                  ? 'border-amber-500 ring-2 ring-amber-400/50 shadow-md'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Image Preview */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={t.imageUrl}
                  alt={t.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {isSelected && (
                  <div className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white shadow-xs">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Theme Info */}
              <div className="mt-3 flex flex-1 flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                    <span className="font-semibold text-slate-700">{t.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{t.defaultGrid}x{t.defaultGrid} peças</span>
                    {t.author && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="truncate max-w-[80px]">{t.author}</span>
                      </>
                    )}
                  </div>

                  <h3 className="mt-1 text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
                    {t.title}
                  </h3>
                </div>

                <p className="mt-1.5 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {t.curiosity}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
