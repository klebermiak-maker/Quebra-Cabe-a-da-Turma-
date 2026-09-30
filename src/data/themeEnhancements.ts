import { Mission, PuzzleTheme } from '../types/game';

export interface ThemeVisuals {
  primary: string;
  bgBadge: string;
  textBadge: string;
  border: string;
  accent: string;
  bannerGradient: string;
  tagline: string;
  bgBoard: string;
}

export const THEME_VISUALS: Record<string, ThemeVisuals> = {
  'solar-system': {
    primary: '#6366f1',
    bgBadge: 'bg-indigo-100',
    textBadge: 'text-indigo-800',
    border: 'border-indigo-300',
    accent: '#818cf8',
    bannerGradient: 'from-slate-900 via-indigo-950 to-slate-900',
    tagline: '5º Ano · Astronomia e Ciências Espaciais',
    bgBoard: 'bg-indigo-950/20',
  },
  'amazon-fauna': {
    primary: '#16a34a',
    bgBadge: 'bg-emerald-100',
    textBadge: 'text-emerald-800',
    border: 'border-emerald-300',
    accent: '#4ade80',
    bannerGradient: 'from-emerald-900 via-teal-950 to-emerald-900',
    tagline: '5º Ano · Biodiversidade e Biomas Brasileiros',
    bgBoard: 'bg-emerald-950/20',
  },
  'brazil-regions': {
    primary: '#0284c7',
    bgBadge: 'bg-sky-100',
    textBadge: 'text-sky-800',
    border: 'border-sky-300',
    accent: '#38bdf8',
    bannerGradient: 'from-sky-900 via-blue-950 to-cyan-900',
    tagline: '5º Ano · Divisão Regional e Geografia do Brasil',
    bgBoard: 'bg-sky-950/20',
  },
  'ancient-egypt': {
    primary: '#d97706',
    bgBadge: 'bg-amber-100',
    textBadge: 'text-amber-800',
    border: 'border-amber-300',
    accent: '#fbbf24',
    bannerGradient: 'from-amber-950 via-stone-900 to-amber-950',
    tagline: '5º Ano · Civilizações Antigas e o Rio Nilo',
    bgBoard: 'bg-amber-950/20',
  },
  'dinosaurs-brazil': {
    primary: '#ea580c',
    bgBadge: 'bg-orange-100',
    textBadge: 'text-orange-800',
    border: 'border-orange-300',
    accent: '#fb923c',
    bannerGradient: 'from-orange-950 via-stone-900 to-amber-950',
    tagline: '5º Ano · Paleontologia e Fósseis no Brasil',
    bgBoard: 'bg-orange-950/20',
  },
  'geometry-fractions': {
    primary: '#8b5cf6',
    bgBadge: 'bg-purple-100',
    textBadge: 'text-purple-800',
    border: 'border-purple-300',
    accent: '#a78bfa',
    bannerGradient: 'from-slate-900 via-purple-950 to-slate-900',
    tagline: '5º Ano · Frações Equivalentes e Geometria Espacial',
    bgBoard: 'bg-purple-950/20',
  },
  'deep-ocean': {
    primary: '#0891b2',
    bgBadge: 'bg-cyan-100',
    textBadge: 'text-cyan-800',
    border: 'border-cyan-300',
    accent: '#22d3ee',
    bannerGradient: 'from-cyan-950 via-blue-950 to-teal-950',
    tagline: '5º Ano · Ecossistemas Marinhos e Vida Aquática',
    bgBoard: 'bg-cyan-950/20',
  },
  'brazilian-modern-art': {
    primary: '#e11d48',
    bgBadge: 'bg-rose-100',
    textBadge: 'text-rose-800',
    border: 'border-rose-300',
    accent: '#fb7185',
    bannerGradient: 'from-rose-950 via-slate-900 to-amber-950',
    tagline: '5º Ano · Semana de Arte Moderna de 1922',
    bgBoard: 'bg-rose-950/20',
  },
};

export const THEME_MISSIONS: Record<string, Mission[]> = {
  'solar-system': [
    {
      id: 'solar-complete',
      title: 'Astrônomo do 5º Ano',
      description: 'Encaixar todas as peças do Sistema Solar!',
      icon: '🪐',
      xp: 100,
      type: 'complete',
    },
    {
      id: 'solar-edges',
      title: 'Cinturão de Asteroides',
      description: 'Montar as peças das bordas siderais primeiro!',
      icon: '✨',
      xp: 50,
      type: 'edges',
    },
    {
      id: 'solar-accuracy',
      title: 'Telescópio de Precisão',
      description: 'Acertar 4 peças seguidas sem errar o slot!',
      icon: '🔭',
      xp: 60,
      type: 'accuracy',
      targetValue: 4,
    },
    {
      id: 'solar-speed',
      title: 'Velocidade da Luz',
      description: 'Concluir o desafio cósmico em até 150 segundos!',
      icon: '⚡',
      xp: 80,
      type: 'speed',
      targetValue: 150,
    },
  ],
  'amazon-fauna': [
    {
      id: 'amazon-complete',
      title: 'Guardião da Amazônia',
      description: 'Descobrir e proteger toda a fauna e flora!',
      icon: '🌿',
      xp: 100,
      type: 'complete',
    },
    {
      id: 'amazon-edges',
      title: 'Margens do Rio Amazonas',
      description: 'Encaixar a moldura exterior primeiro!',
      icon: '🧭',
      xp: 50,
      type: 'edges',
    },
    {
      id: 'amazon-grid',
      title: 'Expedição Botânica 5x5',
      description: 'Vencer o desafio em grade 5x5 ou 6x6!',
      icon: '🐆',
      xp: 120,
      type: 'grid_master',
      targetValue: 5,
    },
    {
      id: 'amazon-speed',
      title: 'Voo Veloz da Arara',
      description: 'Terminar a montagem em menos de 120s!',
      icon: '🦜',
      xp: 80,
      type: 'speed',
      targetValue: 120,
    },
  ],
  'brazil-regions': [
    {
      id: 'brazil-complete',
      title: 'Cartógrafo Brasileiro',
      description: 'Unir todas as 5 regiões do nosso mapa!',
      icon: '🗺️',
      xp: 100,
      type: 'complete',
    },
    {
      id: 'brazil-edges',
      title: 'Litoral Atlântico',
      description: 'Montar as bordas oceânicas e fronteiras primeiro!',
      icon: '⛵',
      xp: 50,
      type: 'edges',
    },
    {
      id: 'brazil-accuracy',
      title: 'Conhecedor dos Estados',
      description: 'Fazer 5 encaixes perfeitos em sequência!',
      icon: '🎯',
      xp: 70,
      type: 'accuracy',
      targetValue: 5,
    },
    {
      id: 'brazil-speed',
      title: 'Viagem Expressa pelo Brasil',
      description: 'Completar o mapa em até 140 segundos!',
      icon: '✈️',
      xp: 80,
      type: 'speed',
      targetValue: 140,
    },
  ],
  'ancient-egypt': [
    {
      id: 'egypt-complete',
      title: 'Arqueólogo de Gizé',
      description: 'Decifrar o enigma das grandes pirâmides!',
      icon: '🏺',
      xp: 100,
      type: 'complete',
    },
    {
      id: 'egypt-edges',
      title: 'Fundação dos Monumentos',
      description: 'Construir a moldura ao redor do Nilo primeiro!',
      icon: '🧱',
      xp: 50,
      type: 'edges',
    },
    {
      id: 'egypt-speed',
      title: 'A Escrita dos Escribas',
      description: 'Terminar o quebra-cabeça em menos de 130s!',
      icon: '⏳',
      xp: 90,
      type: 'speed',
      targetValue: 130,
    },
  ],
  'dinosaurs-brazil': [
    {
      id: 'dino-complete',
      title: 'Paleontólogo do Araripe',
      description: 'Reconstruir os fósseis do Oxalaia quilombensis!',
      icon: '🦖',
      xp: 100,
      type: 'complete',
    },
    {
      id: 'dino-grid',
      title: 'Giga Desafio Pré-Histórico',
      description: 'Montar com maestria no modo 5x5 ou 6x6!',
      icon: '🌋',
      xp: 120,
      type: 'grid_master',
      targetValue: 5,
    },
    {
      id: 'dino-accuracy',
      title: 'Pincel Delicado de Fóssil',
      description: 'Acertar 4 peças sem errar o ponto de escavação!',
      icon: '🔍',
      xp: 60,
      type: 'accuracy',
      targetValue: 4,
    },
  ],
  'geometry-fractions': [
    {
      id: 'math-complete',
      title: 'Gênio das Frações',
      description: 'Completar as figuras e formar o inteiro perfeito!',
      icon: '📐',
      xp: 100,
      type: 'complete',
    },
    {
      id: 'math-accuracy',
      title: 'Raciocínio Lógico',
      description: 'Encaixar 5 frações seguidas com máxima precisão!',
      icon: '🧮',
      xp: 80,
      type: 'accuracy',
      targetValue: 5,
    },
    {
      id: 'math-speed',
      title: 'Cálculo Mental Ninja',
      description: 'Resolver todo o quebra-cabeça em até 100 segundos!',
      icon: '⚡',
      xp: 90,
      type: 'speed',
      targetValue: 100,
    },
  ],
  'deep-ocean': [
    {
      id: 'ocean-complete',
      title: 'Biólogo Marinho',
      description: 'Proteger o oceano e a baleia-jubarte!',
      icon: '🐋',
      xp: 100,
      type: 'complete',
    },
    {
      id: 'ocean-edges',
      title: 'Arrecife Costeiro',
      description: 'Montar as bordas de corais primeiro!',
      icon: '🪸',
      xp: 50,
      type: 'edges',
    },
    {
      id: 'ocean-accuracy',
      title: 'Mergulho Profundo',
      description: 'Encaixar 4 peças seguidas sem hesitar!',
      icon: '🤿',
      xp: 60,
      type: 'accuracy',
      targetValue: 4,
    },
  ],
  'brazilian-modern-art': [
    {
      id: 'art-complete',
      title: 'Mestre Modernista',
      description: 'Dar vida às cores e traços de Tarsila!',
      icon: '🎨',
      xp: 100,
      type: 'complete',
    },
    {
      id: 'art-edges',
      title: 'Moldura do Museu',
      description: 'Fixar todas as bordas da tela primeiro!',
      icon: '🖼️',
      xp: 50,
      type: 'edges',
    },
    {
      id: 'art-grid',
      title: 'Bienal de Artes',
      description: 'Montar a obra de arte no tamanho 5x5 ou 6x6!',
      icon: '⭐',
      xp: 120,
      type: 'grid_master',
      targetValue: 5,
    },
  ],
};

const DEFAULT_GENERIC_MISSIONS: Mission[] = [
  {
    id: 'generic-complete',
    title: 'Explorador Conquistador',
    description: 'Completar 100% das peças do quebra-cabeça!',
    icon: '🏆',
    xp: 100,
    type: 'complete',
  },
  {
    id: 'generic-edges',
    title: 'Mestre da Moldura',
    description: 'Encaixar todas as peças das bordas primeiro!',
    icon: '🧭',
    xp: 50,
    type: 'edges',
  },
  {
    id: 'generic-accuracy',
    title: 'Foco Total',
    description: 'Encaixar 4 peças seguidas com precisão!',
    icon: '🎯',
    xp: 60,
    type: 'accuracy',
    targetValue: 4,
  },
];

export function getThemeVisuals(themeId: string): ThemeVisuals {
  return (
    THEME_VISUALS[themeId] || {
      primary: '#d97706',
      bgBadge: 'bg-amber-100',
      textBadge: 'text-amber-800',
      border: 'border-amber-300',
      accent: '#f59e0b',
      bannerGradient: 'from-amber-950 via-slate-900 to-amber-950',
      tagline: '5º Ano · Criação Personalizada da Turma',
      bgBoard: 'bg-amber-950/20',
    }
  );
}

export function getThemeMissions(theme: PuzzleTheme): Mission[] {
  if (theme.missions && theme.missions.length > 0) {
    return theme.missions;
  }
  return THEME_MISSIONS[theme.id] || DEFAULT_GENERIC_MISSIONS;
}
