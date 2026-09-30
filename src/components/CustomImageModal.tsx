import { ImagePlus, Link, Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { PuzzleTheme } from '../types/game';

interface CustomImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTheme: (theme: PuzzleTheme) => void;
}

export const CustomImageModal: React.FC<CustomImageModalProps> = ({ isOpen, onClose, onSaveTheme }) => {
  const [title, setTitle] = useState('');
  const [curiosity, setCuriosity] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState('');
  const [gridSize, setGridSize] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImageUrl(result);
      if (!title) {
        const defaultName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitle(defaultName.charAt(0).toUpperCase() + defaultName.slice(1));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlLoad = () => {
    setErrorMsg('');
    if (!inputUrl.trim()) return;
    setImageUrl(inputUrl.trim());
    if (!title) {
      setTitle('Imagem da Internet');
    }
  };

  const handleSave = () => {
    if (!imageUrl) {
      setErrorMsg('Escolha ou envie uma imagem primeiro!');
      return;
    }

    const newTheme: PuzzleTheme = {
      id: `custom_upload_${Date.now()}`,
      title: title.trim() || 'Meu Quebra-Cabeça Personalizado',
      category: 'Personalizado',
      imageUrl,
      curiosity: curiosity.trim() || 'Quebra-cabeça com foto personalizada da turma!',
      defaultGrid: gridSize,
      author: 'Aluno / Professor',
    };

    onSaveTheme(newTheme);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <ImagePlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Carregar Imagem da Turma</h2>
              <p className="text-xs text-slate-500">Transforme qualquer foto da turma em quebra-cabeça!</p>
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
          {/* Tabs */}
          <div className="flex rounded-lg bg-slate-100 p-1">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'upload' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="h-3.5 w-3.5" />
              Arquivo do Computador/Celular
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'url' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Link className="h-3.5 w-3.5" />
              Link da Web
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-6 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-xs font-semibold text-slate-700">Clique para escolher uma foto</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Fotos da feira de ciências, desenhos ou fotos da turma</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://exemplo.com/minha-imagem.jpg"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
              />
              <button
                onClick={handleUrlLoad}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
              >
                Carregar
              </button>
            </div>
          )}

          {/* Preview */}
          {imageUrl && (
            <div className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500">Prévia da Imagem:</span>
              <img
                src={imageUrl}
                alt="Prévia"
                className="h-44 w-auto max-w-full rounded-lg object-contain shadow-xs"
              />
            </div>
          )}

          {errorMsg && <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>}

          {/* Title & Curiosity Form */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600">Título do Quebra-Cabeça</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Nossa Feira de Ciências 2026"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                maxLength={40}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600">Curiosidade ou Mensagem Didática</label>
              <textarea
                value={curiosity}
                onChange={(e) => setCuriosity(e.target.value)}
                placeholder="Uma mensagem ou curiosidade que aparece na tela de vitória!"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                rows={2}
                maxLength={150}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600">Dificuldade</label>
              <div className="mt-1 flex gap-2">
                {[
                  { g: 3, label: '3x3 (9 peças - Fácil)' },
                  { g: 4, label: '4x4 (16 peças - Ideal)' },
                  { g: 5, label: '5x5 (25 peças - Desafio)' },
                ].map((item) => (
                  <button
                    key={item.g}
                    onClick={() => setGridSize(item.g)}
                    className={`flex-1 rounded-md py-1.5 text-center text-xs font-medium border ${
                      gridSize === item.g
                        ? 'border-blue-500 bg-blue-50 text-blue-800 font-bold'
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

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!imageUrl}
            className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Criar Quebra-Cabeça
          </button>
        </div>
      </div>
    </div>
  );
};
