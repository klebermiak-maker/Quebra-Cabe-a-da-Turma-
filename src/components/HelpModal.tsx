import { BookOpen, CheckCircle2, Gamepad2, Paintbrush, Trophy, Users, X } from 'lucide-react';
import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-amber-50/60">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧩</span>
            <div>
              <h2 className="text-base font-bold text-slate-800">Guia de Jogo · 5º Ano</h2>
              <p className="text-xs text-slate-500">Como se divertir e aprender em equipe!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200/50 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 overflow-y-auto p-6 text-xs text-slate-600">
          {/* Section 1: Como Montar */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4">
            <h3 className="flex items-center gap-1.5 font-bold text-slate-800 text-sm mb-2">
              <Gamepad2 className="h-4 w-4 text-amber-600" />
              1. Como Montar o Quebra-Cabeça
            </h3>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                <strong>Clique ou Toque:</strong> Escolha uma peça na <em>Bandeja</em> e depois clique no quadrado correspondente no tabuleiro.
              </li>
              <li>
                <strong>Modo Fantasma:</strong> Ative o botão <em>Fantasma</em> para ver uma marca d’água da imagem e se orientar melhor.
              </li>
              <li>
                <strong>Dica de Peça:</strong> Se tiver dúvida, o botão <em>Dica</em> pisca onde uma peça deve ser colocada!
              </li>
            </ul>
          </div>

          {/* Section 2: Modos Multiplayer */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="flex items-center gap-1.5 font-bold text-amber-900 text-sm mb-2">
              <Users className="h-4 w-4 text-amber-600" />
              2. Modos Multiplayer Online
            </h3>
            <div className="space-y-2">
              <div>
                <strong className="text-amber-800">🤝 Modo Cooperativo (Turma Unida):</strong>
                <p className="mt-0.5 text-slate-600">
                  Todos os alunos conectados jogam no <strong>mesmo tabuleiro ao vivo</strong>. Quando alguém encaixa uma peça, todos veem em tempo real e colaboram para vencer juntos!
                </p>
              </div>
              <div>
                <strong className="text-blue-800">🏁 Modo Corrida (Batalha da Turma):</strong>
                <p className="mt-0.5 text-slate-600">
                  Cada aluno monta o seu quebra-cabeça ao mesmo tempo. Há uma barra de progresso ao vivo e quem completar primeiro ganha o 1º lugar no pódio!
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Personalização */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4">
            <h3 className="flex items-center gap-1.5 font-bold text-blue-900 text-sm mb-2">
              <Paintbrush className="h-4 w-4 text-blue-600" />
              3. Quebra-Cabeças Personalizados
            </h3>
            <p className="leading-relaxed">
              Você pode desenhar seu próprio quebra-cabeça na <strong>Lousa Criativa</strong> com cores e carimbos, ou enviar uma foto da sua turma e de projetos escolares!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-3.5 text-right">
          <button
            onClick={onClose}
            className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-white hover:bg-amber-600 transition-colors shadow-xs"
          >
            Entendido, Vamos Jogar!
          </button>
        </div>
      </div>
    </div>
  );
};
