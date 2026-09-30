import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  Flame,
  Gamepad2,
  HelpCircle,
  LayoutGrid,
  Lock,
  MousePointerClick,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';

interface TutorialModalProps {
  isOpen: boolean;
  onComplete: () => void;
  canCloseWithoutConfirm?: boolean;
  onClose?: () => void;
}

interface TutorialStep {
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  render: () => React.ReactNode;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onComplete,
  canCloseWithoutConfirm = false,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState<boolean>(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(false);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0]);

  if (!isOpen) return null;

  const steps: TutorialStep[] = [
    {
      title: 'Passo 1: Como Encaixar as Peças',
      subtitle: 'Mecânica simples e tátil para alunos do 5º ano',
      badge: 'Básico',
      icon: '🧩',
      render: () => (
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
            <h4 className="text-sm font-bold text-amber-950 flex items-center gap-1.5 mb-2">
              <MousePointerClick className="h-4 w-4 text-amber-600" />
              Regra de Movimentação:
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-xs text-amber-900 leading-relaxed font-medium">
              <li>
                <strong>Selecione uma peça:</strong> Clique ou toque em qualquer peça na <em>Bandeja</em> à direita.
              </li>
              <li>
                <strong>Encaixe no tabuleiro:</strong> Clique no quadrado correspondente no tabuleiro à esquerda.
              </li>
              <li>
                <strong>Encaixe Inteligente:</strong> Ao acertar a posição correta, a peça se fixa com um som de clique (*snap*) e você ganha pontos para a turma!
              </li>
            </ol>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <span className="text-xl">👉</span>
              <p className="font-bold text-slate-800 mt-1">1º Clique</p>
              <p className="text-[11px] text-slate-500">Na bandeja de peças</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <span className="text-xl">🎯</span>
              <p className="font-bold text-slate-800 mt-1">2º Clique</p>
              <p className="text-[11px] text-slate-500">No tabuleiro do jogo</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Passo 2: Ferramentas e Dicas',
      subtitle: 'Recursos especiais para facilitar a resolução',
      badge: 'Ajuda',
      icon: '💡',
      render: () => (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-3 flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white mb-2 shadow-2xs">
              <Eye className="h-5 w-5" />
            </div>
            <h5 className="text-xs font-bold text-blue-900">Modo Fantasma</h5>
            <p className="mt-1 text-[11px] text-blue-800/80 leading-snug">
              Ativa uma marca d'água semi-transparente no fundo do tabuleiro para guiar o olhar!
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3 flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white mb-2 shadow-2xs">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h5 className="text-xs font-bold text-amber-900">Botão Dica</h5>
            <p className="mt-1 text-[11px] text-amber-800/80 leading-snug">
              Dúvidas? O botão Dica seleciona uma peça e faz o slot correto piscar na tela!
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3 flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white mb-2 shadow-2xs">
              <Flame className="h-5 w-5" />
            </div>
            <h5 className="text-xs font-bold text-emerald-900">Filtro Bordas</h5>
            <p className="mt-1 text-[11px] text-emerald-800/80 leading-snug">
              Isola as peças da moldura exterior para você começar montando as bordas primeiro!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Passo 3: Modos Multiplayer Online',
      subtitle: 'Trabalho colaborativo e competição saudável',
      badge: 'Multijogador',
      icon: '🤝',
      render: () => (
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-amber-600" />
              <h5 className="text-xs font-bold text-amber-950">🤝 Modo Cooperativo da Turma</h5>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              Todos os colegas jogam no <strong>mesmo tabuleiro simultaneamente</strong>. As peças encaixadas por cada aluno aparecem ao vivo com seu avatar!
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-3.5">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-4 w-4 text-blue-600" />
              <h5 className="text-xs font-bold text-blue-950">🏁 Modo Corrida / Desafio</h5>
            </div>
            <p className="text-xs text-blue-900 leading-relaxed font-medium">
              Cada aluno monta seu próprio quebra-cabeça com barra de progresso em tempo real e pódio comemorativo para os mais velozes!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Passo 4: Missões Pedagógicas e XP',
      subtitle: 'Aprenda conteúdos do 5º ano e suba de nível',
      badge: 'Missões',
      icon: '🎯',
      render: () => (
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-3.5">
            <div className="flex items-center gap-2 mb-1.5">
              <Target className="h-4 w-4 text-purple-600" />
              <h5 className="text-xs font-bold text-purple-950">Missões Temáticas por Disciplina</h5>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed">
              Cada tema (Sistema Solar, Amazônia, Regiões do Brasil, Egito, Frações) possui 4 missões didáticas. Cumpra-as para ganhar <strong>Estrelas XP</strong> e subir de nível na turma!
            </p>
          </div>

          {/* Interactive Confirmation Checklist */}
          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 p-3.5 mt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={hasAcceptedTerms}
                onChange={(e) => setHasAcceptedTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded-md border-emerald-400 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
              <span className="text-xs font-bold text-emerald-950 leading-snug">
                ✅ Li com atenção e entendi todas as regras do quebra-cabeça da turma do 5º ano! Estou pronto para iniciar o desafio.
              </span>
            </label>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (!visitedSteps.includes(next)) {
        setVisitedSteps((prev) => [...prev, next]);
      }
      if (next === steps.length - 1) {
        setHasScrolledToEnd(true);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const canStartGame = isLastStep && hasAcceptedTerms;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-md">
      <div className="relative flex max-h-[95vh] w-full max-w-xl flex-col rounded-3xl bg-white shadow-2xl border-2 border-amber-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-amber-100 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-6 py-4 text-white shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl drop-shadow-xs">🎓</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight text-white sm:text-lg">
                  Tutorial Obrigatório da Turma
                </h2>
                <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                  5º Ano
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                Leia as instruções para liberar o jogo e começar o desafio!
              </p>
            </div>
          </div>

          {canCloseWithoutConfirm && onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Step Tabs indicator */}
        <div className="flex border-b border-slate-100 bg-slate-50 px-6 py-2.5">
          <div className="flex flex-1 items-center justify-between gap-1">
            {steps.map((st, idx) => {
              const isCurrent = idx === currentStep;
              const isPassed = visitedSteps.includes(idx);
              return (
                <button
                  key={st.title}
                  onClick={() => {
                    setCurrentStep(idx);
                    if (!visitedSteps.includes(idx)) setVisitedSteps((prev) => [...prev, idx]);
                    if (idx === steps.length - 1) setHasScrolledToEnd(true);
                  }}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-amber-500 text-white shadow-xs scale-102'
                      : isPassed
                      ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <span className="text-sm">{st.icon}</span>
                  <span className="hidden sm:inline">Passo {idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 uppercase tracking-wide">
                {steps[currentStep].badge} · Passo {currentStep + 1} de {steps.length}
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              {steps[currentStep].title}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {steps[currentStep].subtitle}
            </p>
          </div>

          {/* Active step content */}
          {steps[currentStep].render()}
        </div>

        {/* Footer Navigation & Game Release */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/90 px-6 py-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Anterior
            </button>
            <span className="text-xs text-slate-500 font-medium">
              Passo {currentStep + 1} / {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {!isLastStep ? (
              <button
                onClick={handleNext}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 active:scale-95 transition-all w-full sm:w-auto"
              >
                Próximo Passo
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (canStartGame) {
                    onComplete();
                  }
                }}
                disabled={!canStartGame}
                className={`flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-black transition-all shadow-md w-full sm:w-auto ${
                  canStartGame
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 scale-102 animate-pulse cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
                title={!canStartGame ? 'Marque a caixinha de confirmação acima para liberar o jogo!' : 'Iniciar o quebra-cabeça da turma'}
              >
                {!canStartGame ? (
                  <>
                    <Lock className="h-4 w-4" />
                    Confirme a leitura acima para jogar
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Começar o Jogo da Turma!
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
