import { PuzzleTheme } from '../types/game';

// Helper to encode SVGs cleanly to data URIs
function svgToUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export const EDUCATIONAL_THEMES: PuzzleTheme[] = [
  {
    id: 'solar-system',
    title: 'O Fantástico Sistema Solar',
    category: 'Ciências',
    defaultGrid: 4,
    curiosity: 'Você sabia? Júpiter é tão gigantesco que caberiam mais de 1.300 planetas Terra inteiros dentro dele! E seus anéis mais famosos não são dele, mas sim do vizinho Saturno, formados por pedaços de gelo e rocha.',
    imageUrl: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="spaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0b1026" />
            <stop offset="50%" stop-color="#141b4d" />
            <stop offset="100%" stop-color="#2a124d" />
          </linearGradient>
          <radialGradient id="sunGrad" cx="10%" cy="50%" r="70%">
            <stop offset="0%" stop-color="#fff59d" />
            <stop offset="30%" stop-color="#ffb300" />
            <stop offset="70%" stop-color="#ff6f00" />
            <stop offset="100%" stop-color="#d84315" />
          </radialGradient>
          <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#4fc3f7" />
            <stop offset="55%" stop-color="#0288d1" />
            <stop offset="100%" stop-color="#01579b" />
          </radialGradient>
          <radialGradient id="marsGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#ff8a65" />
            <stop offset="70%" stop-color="#d84315" />
            <stop offset="100%" stop-color="#bf360c" />
          </radialGradient>
          <radialGradient id="jupiterGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#ffe0b2" />
            <stop offset="35%" stop-color="#ffb74d" />
            <stop offset="70%" stop-color="#f57c00" />
            <stop offset="100%" stop-color="#b05204" />
          </radialGradient>
          <radialGradient id="saturnGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#fff9c4" />
            <stop offset="50%" stop-color="#ffe082" />
            <stop offset="100%" stop-color="#ffb300" />
          </radialGradient>
        </defs>

        <!-- Espaço e estrelas -->
        <rect width="800" height="600" fill="url(#spaceGrad)" />
        
        <!-- Fundo estelar -->
        <g fill="#ffffff">
          <circle cx="95" cy="80" r="1.5" opacity="0.8" />
          <circle cx="210" cy="45" r="2" opacity="0.9" />
          <circle cx="340" cy="110" r="1.5" opacity="0.7" />
          <circle cx="480" cy="65" r="2.5" opacity="1" />
          <circle cx="620" cy="90" r="1.8" opacity="0.8" />
          <circle cx="750" cy="40" r="1.5" opacity="0.6" />
          <circle cx="150" cy="220" r="1.5" opacity="0.6" />
          <circle cx="280" cy="280" r="2.2" opacity="0.9" />
          <circle cx="430" cy="200" r="1.5" opacity="0.8" />
          <circle cx="590" cy="260" r="2" opacity="0.7" />
          <circle cx="710" cy="190" r="2.5" opacity="1" />
          <circle cx="120" cy="420" r="2" opacity="0.9" />
          <circle cx="250" cy="510" r="1.5" opacity="0.7" />
          <circle cx="390" cy="460" r="1.8" opacity="0.8" />
          <circle cx="560" cy="530" r="2" opacity="0.9" />
          <circle cx="690" cy="480" r="1.5" opacity="0.7" />
          <circle cx="770" cy="550" r="2.5" opacity="1" />
        </g>

        <!-- Órbitas pontilhadas -->
        <ellipse cx="0" cy="300" rx="220" ry="170" fill="none" stroke="#4fc3f7" stroke-width="1.2" stroke-dasharray="6,8" opacity="0.25" />
        <ellipse cx="0" cy="300" rx="330" ry="240" fill="none" stroke="#4fc3f7" stroke-width="1.2" stroke-dasharray="6,8" opacity="0.25" />
        <ellipse cx="0" cy="300" rx="460" ry="320" fill="none" stroke="#4fc3f7" stroke-width="1.2" stroke-dasharray="6,8" opacity="0.25" />
        <ellipse cx="0" cy="300" rx="640" ry="430" fill="none" stroke="#4fc3f7" stroke-width="1.2" stroke-dasharray="6,8" opacity="0.25" />

        <!-- Sol Majestoso -->
        <circle cx="0" cy="300" r="140" fill="url(#sunGrad)" />
        <circle cx="0" cy="300" r="160" fill="none" stroke="#ffb300" stroke-width="8" opacity="0.25" />
        <circle cx="0" cy="300" r="185" fill="none" stroke="#ff6f00" stroke-width="4" opacity="0.15" />

        <!-- Mercúrio -->
        <circle cx="160" cy="260" r="12" fill="#b0bec5" />
        <text x="160" y="288" fill="#eceff1" font-size="11" font-weight="bold" font-family="sans-serif" text-anchor="middle">Mercúrio</text>

        <!-- Vênus -->
        <circle cx="215" cy="360" r="20" fill="#ffd54f" />
        <text x="215" y="396" fill="#eceff1" font-size="11" font-weight="bold" font-family="sans-serif" text-anchor="middle">Vênus</text>

        <!-- Terra e Lua -->
        <g transform="translate(300, 240)">
          <circle cx="0" cy="0" r="32" fill="url(#earthGrad)" />
          <!-- Continentes -->
          <path d="M-15,-15 Q-5,-25 10,-20 Q20,-10 15,5 Q10,20 -5,18 Q-20,10 -15,-15 Z" fill="#66bb6a" opacity="0.85" />
          <path d="M-22,5 Q-15,-2 -5,5 Q5,15 -5,25 Q-20,20 -22,5 Z" fill="#81c784" opacity="0.8" />
          <!-- Lua -->
          <circle cx="46" cy="-22" r="7" fill="#cfd8dc" />
          <ellipse cx="0" cy="0" rx="46" ry="24" fill="none" stroke="#ffffff" stroke-width="0.8" stroke-dasharray="2,3" opacity="0.4" />
          <text x="0" y="46" fill="#e1f5fe" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Terra</text>
        </g>

        <!-- Marte -->
        <circle cx="410" cy="350" r="18" fill="url(#marsGrad)" />
        <circle cx="406" cy="344" r="5" fill="#ffffff" opacity="0.4" />
        <text x="410" y="382" fill="#ffe0b2" font-size="11" font-weight="bold" font-family="sans-serif" text-anchor="middle">Marte</text>

        <!-- Júpiter e Mancha Vermelha -->
        <g transform="translate(530, 200)">
          <circle cx="0" cy="0" r="56" fill="url(#jupiterGrad)" />
          <!-- Faixas -->
          <path d="M-54,-10 Q0,-5 54,-10" stroke="#d84315" stroke-width="9" fill="none" opacity="0.45" />
          <path d="M-52,15 Q0,10 52,15" stroke="#ef6c00" stroke-width="11" fill="none" opacity="0.4" />
          <ellipse cx="22" cy="18" rx="10" ry="7" fill="#c62828" opacity="0.75" />
          <text x="0" y="74" fill="#ffe0b2" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="middle">Júpiter</text>
        </g>

        <!-- Saturno com anéis -->
        <g transform="translate(680, 390)">
          <!-- Anel de trás -->
          <ellipse cx="0" cy="0" rx="90" ry="28" fill="none" stroke="#ffe082" stroke-width="14" opacity="0.75" transform="rotate(-22)" />
          <ellipse cx="0" cy="0" rx="72" ry="22" fill="none" stroke="#ffb300" stroke-width="7" opacity="0.9" transform="rotate(-22)" />
          <!-- Planeta -->
          <circle cx="0" cy="0" r="44" fill="url(#saturnGrad)" />
          <!-- Anel da frente cortado -->
          <ellipse cx="0" cy="0" rx="90" ry="28" fill="none" stroke="#ffe082" stroke-width="14" opacity="0.85" stroke-dasharray="140 180" transform="rotate(-22)" />
          <text x="0" y="66" fill="#fff9c4" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="middle">Saturno</text>
        </g>

        <!-- Foguete Espacial e Cometa -->
        <g transform="translate(320, 90) rotate(35)">
          <path d="M0,0 L26,0 L20,12 L6,12 Z" fill="#b0bec5" />
          <path d="M5,0 Q13,-25 21,0 Z" fill="#ef5350" />
          <rect x="7" y="0" width="12" height="22" fill="#eceff1" rx="2" />
          <circle cx="13" cy="10" r="4" fill="#0288d1" />
          <path d="M7,22 L13,34 L19,22 Z" fill="#ff7043" />
          <path d="M9,22 L13,29 L17,22 Z" fill="#ffeb3b" />
        </g>

        <!-- Cometa Cauda Longa -->
        <g transform="translate(600, 70)">
          <line x1="0" y1="0" x2="80" y2="-40" stroke="#80d8ff" stroke-width="3" stroke-linecap="round" opacity="0.8" />
          <line x1="0" y1="0" x2="95" y2="-32" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />
          <circle cx="0" cy="0" r="5" fill="#ffffff" />
        </g>
      </svg>
    `),
  },
  {
    id: 'amazon-fauna',
    title: 'Fauna e Flora da Floresta Amazônica',
    category: 'Ciências',
    defaultGrid: 4,
    curiosity: 'A Amazônia abriga mais de 40.000 espécies de plantas e 1.300 espécies de aves! A vitória-régia, planta aquática símbolo da região, possui folhas gigantescas que podem aguentar até 40 quilos sem afundar na água!',
    imageUrl: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="skyJungle" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#b2ebf2" />
            <stop offset="40%" stop-color="#e0f2f1" />
            <stop offset="70%" stop-color="#fff9c4" />
            <stop offset="100%" stop-color="#ffcc80" />
          </linearGradient>
          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#00695c" />
            <stop offset="50%" stop-color="#00897b" />
            <stop offset="100%" stop-color="#26a69a" />
          </linearGradient>
          <linearGradient id="jaguarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffb74d" />
            <stop offset="60%" stop-color="#ffa726" />
            <stop offset="100%" stop-color="#f57c00" />
          </linearGradient>
        </defs>

        <!-- Céu dourado de fim de tarde -->
        <rect width="800" height="600" fill="url(#skyJungle)" />

        <!-- Camadas de Floresta Tropical no Horizonte -->
        <path d="M0,230 Q120,180 260,220 Q400,260 540,200 Q680,160 800,210 L800,600 L0,600 Z" fill="#2e7d32" opacity="0.6" />
        <path d="M0,280 Q160,230 320,270 Q500,310 660,250 Q750,220 800,260 L800,600 L0,600 Z" fill="#1b5e20" opacity="0.8" />

        <!-- Rio Amazonas e Curvas -->
        <path d="M100,600 Q250,460 380,440 Q520,420 580,360 Q620,320 650,280 L720,290 Q670,350 630,390 Q540,460 380,510 Q260,540 180,600 Z" fill="url(#riverGrad)" />

        <!-- Ilhotas e Vitórias-Régias -->
        <g transform="translate(420, 480)">
          <!-- Vitória régia 1 -->
          <ellipse cx="0" cy="0" rx="55" ry="24" fill="#43a047" stroke="#2e7d32" stroke-width="4" />
          <ellipse cx="0" cy="0" rx="46" ry="18" fill="#66bb6a" />
          <!-- Flor branca e rosa -->
          <circle cx="8" cy="-3" r="11" fill="#ffffff" />
          <circle cx="8" cy="-3" r="6" fill="#f48fb1" />
        </g>
        <g transform="translate(560, 440)">
          <!-- Vitória régia 2 -->
          <ellipse cx="0" cy="0" rx="42" ry="18" fill="#43a047" stroke="#2e7d32" stroke-width="3" />
          <ellipse cx="0" cy="0" rx="35" ry="14" fill="#66bb6a" />
          <circle cx="5" cy="-2" r="8" fill="#ffffff" />
          <circle cx="5" cy="-2" r="4" fill="#f48fb1" />
        </g>

        <!-- Galho de Árvore Gigante em Primeiro Plano -->
        <path d="M-20,120 Q120,100 240,160 Q340,210 440,190" stroke="#5d4037" stroke-width="42" stroke-linecap="round" fill="none" />
        <path d="M220,150 Q280,240 330,300" stroke="#4e342e" stroke-width="22" stroke-linecap="round" fill="none" />

        <!-- Folhas de Costela-de-Adão e Trepadeiras -->
        <g fill="#2e7d32">
          <path d="M60,60 Q110,40 130,90 Q90,130 60,60 Z" />
          <path d="M120,70 Q180,50 190,110 Q140,140 120,70 Z" fill="#388e3c" />
          <path d="M20,120 Q60,160 30,210 Q-10,180 20,120 Z" fill="#1b5e20" />
        </g>

        <!-- Tucano no Galho -->
        <g transform="translate(140, 60)">
          <!-- Corpo Preto -->
          <ellipse cx="40" cy="70" rx="26" ry="42" fill="#212121" transform="rotate(-15 40 70)" />
          <!-- Peito Branco/Amarelo -->
          <path d="M38,40 Q55,60 52,85 Q40,92 30,80 Z" fill="#fff9c4" />
          <!-- Olho azul e anel laranja -->
          <circle cx="48" cy="46" r="8" fill="#ff9800" />
          <circle cx="48" cy="46" r="4" fill="#0288d1" />
          <circle cx="49" cy="45" r="1.5" fill="#ffffff" />
          <!-- Bico Magnífico Amarelo e Laranja -->
          <path d="M52,42 Q95,30 115,55 Q95,75 52,62 Z" fill="#ffb300" />
          <path d="M90,44 Q115,55 110,65 Z" fill="#d84315" />
          <!-- Rabo Preto -->
          <path d="M25,100 L18,150 L32,150 L35,100 Z" fill="#212121" />
          <!-- Patas cinzas segurando o galho -->
          <circle cx="36" cy="108" r="5" fill="#78909c" />
          <circle cx="48" cy="106" r="5" fill="#78909c" />
        </g>

        <!-- Arara-Vermelha em Voo -->
        <g transform="translate(560, 110) rotate(-10)">
          <!-- Asa Superior Azul e Amarela -->
          <path d="M0,30 Q60,-20 120,-30 Q90,20 40,40 Z" fill="#1976d2" />
          <path d="M20,25 Q70, -5 100,-10 Q80,25 40,35 Z" fill="#fbc02d" />
          <!-- Asa Inferior Aberta -->
          <path d="M10,40 Q60,70 100,100 Q60,75 25,50 Z" fill="#d32f2f" />
          <!-- Corpo Vermelho Escarlate -->
          <ellipse cx="25" cy="35" rx="20" ry="12" fill="#e53935" />
          <!-- Cabeça e Bico -->
          <circle cx="8" cy="30" r="11" fill="#e53935" />
          <path d="M8,30 Q-6,30 -8,40 Q-2,36 8,34 Z" fill="#37474f" />
          <circle cx="6" cy="27" r="2.5" fill="#ffffff" />
          <!-- Cauda Longa Vermelha e Azul -->
          <path d="M35,38 Q80,50 140,55 Q80,44 35,35 Z" fill="#c62828" />
          <path d="M60,43 Q100,52 135,55 Z" fill="#1565c0" />
        </g>

        <!-- Onça-Pintada Observando Tranquila -->
        <g transform="translate(40, 380)">
          <!-- Corpo -->
          <ellipse cx="140" cy="120" rx="90" ry="50" fill="url(#jaguarGrad)" />
          <!-- Patas Dianteiras e Traseiras -->
          <rect x="90" y="140" width="26" height="60" rx="12" fill="#ffa726" />
          <rect x="130" y="145" width="24" height="55" rx="12" fill="#f57c00" />
          <rect x="180" y="140" width="26" height="60" rx="12" fill="#ffa726" />
          <!-- Cabeça -->
          <circle cx="70" cy="95" r="38" fill="url(#jaguarGrad)" />
          <!-- Orelhas com interior claro -->
          <circle cx="50" cy="65" r="12" fill="#f57c00" />
          <circle cx="50" cy="65" r="6" fill="#fff3e0" />
          <circle cx="90" cy="65" r="12" fill="#f57c00" />
          <circle cx="90" cy="65" r="6" fill="#fff3e0" />
          <!-- Focinho e bigodes -->
          <ellipse cx="58" cy="108" rx="16" ry="12" fill="#fff8e1" />
          <polygon points="54,102 62,102 58,108" fill="#e91e63" />
          <!-- Olhos espertos dourados -->
          <ellipse cx="52" cy="88" rx="5" ry="6" fill="#fbc02d" />
          <circle cx="52" cy="88" r="3" fill="#212121" />
          <ellipse cx="76" cy="88" rx="5" ry="6" fill="#fbc02d" />
          <circle cx="76" cy="88" r="3" fill="#212121" />
          <!-- Pintas da Onça (Rosetas características) -->
          <g fill="#3e2723" opacity="0.85">
            <circle cx="120" cy="95" r="5" />
            <circle cx="150" cy="105" r="6" />
            <circle cx="180" cy="100" r="5" />
            <circle cx="130" cy="130" r="6" />
            <circle cx="165" cy="135" r="7" />
            <circle cx="195" cy="125" r="5" />
            <circle cx="85" cy="115" r="4" />
            <circle cx="100" cy="160" r="3" />
            <circle cx="190" cy="160" r="4" />
          </g>
          <!-- Cauda Elegante -->
          <path d="M225,125 Q270,120 280,75" stroke="#f57c00" stroke-width="16" stroke-linecap="round" fill="none" />
        </g>
      </svg>
    `),
  },
  {
    id: 'brazil-regions',
    title: 'Mapa e Regiões do Brasil',
    category: 'Geografia',
    defaultGrid: 4,
    curiosity: 'O Brasil é o 5º maior país do mundo em extensão territorial e é dividido em 5 regiões oficiais: Norte, Nordeste, Centro-Oeste, Sudeste e Sul. Temos 26 estados mais o Distrito Federal, onde fica Brasília, a nossa capital planejada!',
    imageUrl: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="oceanBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e0f7fa" />
            <stop offset="100%" stop-color="#b2ebf2" />
          </linearGradient>
        </defs>

        <!-- Fundo Oceano Atlântico -->
        <rect width="800" height="600" fill="url(#oceanBg)" />

        <!-- Grade de coordenadas náuticas decorativa -->
        <g stroke="#80deea" stroke-width="0.75" stroke-dasharray="4,6">
          <line x1="0" y1="150" x2="800" y2="150" />
          <line x1="0" y1="300" x2="800" y2="300" />
          <line x1="0" y1="450" x2="800" y2="450" />
          <line x1="200" y1="0" x2="200" y2="600" />
          <line x1="400" y1="0" x2="400" y2="600" />
          <line x1="600" y1="0" x2="600" y2="600" />
        </g>

        <!-- Rosa dos Ventos no Canto -->
        <g transform="translate(100, 110)">
          <circle cx="0" cy="0" r="38" fill="#ffffff" opacity="0.9" stroke="#00838f" stroke-width="2" />
          <polygon points="0,-32 7,-8 0,0" fill="#d32f2f" />
          <polygon points="0,-32 -7,-8 0,0" fill="#b71c1c" />
          <polygon points="0,32 7,8 0,0" fill="#00838f" />
          <polygon points="0,32 -7,8 0,0" fill="#006064" />
          <polygon points="32,0 8,7 0,0" fill="#00838f" />
          <polygon points="32,0 8,-7 0,0" fill="#006064" />
          <polygon points="-32,0 -8,7 0,0" fill="#00838f" />
          <polygon points="-32,0 -8,-7 0,0" fill="#006064" />
          <text x="0" y="-36" font-size="12" font-weight="bold" fill="#b71c1c" text-anchor="middle">N</text>
          <text x="0" y="48" font-size="11" font-weight="bold" fill="#006064" text-anchor="middle">S</text>
          <text x="44" y="4" font-size="11" font-weight="bold" fill="#006064" text-anchor="middle">L</text>
          <text x="-44" y="4" font-size="11" font-weight="bold" fill="#006064" text-anchor="middle">O</text>
        </g>

        <!-- MAPA DO BRASIL: 5 REGIÕES COLORIDAS -->
        <!-- Região Norte (Verde Floresta) -->
        <g id="regiao-norte">
          <path d="M190,130 Q280,90 380,105 Q440,110 470,160 Q490,200 480,240 Q410,270 340,290 Q240,290 190,270 Q150,220 160,170 Z" fill="#2e7d32" stroke="#ffffff" stroke-width="3" />
          <text x="310" y="195" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif">NORTE</text>
          <text x="310" y="215" fill="#c8e6c9" font-size="12" font-family="sans-serif">7 Estados</text>
        </g>

        <!-- Região Nordeste (Laranja Solar) -->
        <g id="regiao-nordeste">
          <path d="M470,160 Q560,165 640,200 Q660,250 630,300 Q560,340 510,330 Q490,260 480,240 Z" fill="#f57c00" stroke="#ffffff" stroke-width="3" />
          <text x="540" y="240" fill="#ffffff" font-size="15" font-weight="bold" font-family="sans-serif">NORDESTE</text>
          <text x="540" y="260" fill="#ffe0b2" font-size="12" font-family="sans-serif">9 Estados</text>
        </g>

        <!-- Região Centro-Oeste (Amarelo Dourado / Cerrado) -->
        <g id="regiao-centro-oeste">
          <path d="M340,290 Q410,270 480,260 Q490,320 470,390 Q400,430 350,420 Q320,360 340,290 Z" fill="#fbc02d" stroke="#ffffff" stroke-width="3" />
          <text x="365" y="340" fill="#3e2723" font-size="14" font-weight="bold" font-family="sans-serif">CENTRO-</text>
          <text x="375" y="360" fill="#3e2723" font-size="14" font-weight="bold" font-family="sans-serif">OESTE</text>
          <!-- Ponto de Brasília / DF -->
          <circle cx="445" cy="335" r="6" fill="#d32f2f" stroke="#ffffff" stroke-width="2" />
          <text x="455" y="338" fill="#b71c1c" font-size="11" font-weight="bold">DF</text>
        </g>

        <!-- Região Sudeste (Azul Marinho Tecnológico) -->
        <g id="regiao-sudeste">
          <path d="M480,330 Q540,340 550,380 Q520,430 460,440 Q450,390 470,360 Z" fill="#1976d2" stroke="#ffffff" stroke-width="3" />
          <text x="475" y="395" fill="#ffffff" font-size="14" font-weight="bold" font-family="sans-serif">SUDESTE</text>
          <text x="478" y="413" fill="#bbdefb" font-size="11" font-family="sans-serif">4 Estados</text>
        </g>

        <!-- Região Sul (Roxo / Vinho Acolhedor) -->
        <g id="regiao-sul">
          <path d="M400,430 Q460,440 440,500 Q410,545 380,550 Q360,510 370,460 Z" fill="#7b1fa2" stroke="#ffffff" stroke-width="3" />
          <text x="390" y="490" fill="#ffffff" font-size="14" font-weight="bold" font-family="sans-serif">SUL</text>
          <text x="382" y="508" fill="#e1bee7" font-size="11" font-family="sans-serif">3 Estados</text>
        </g>

        <!-- Legenda e Detalhes Educativos -->
        <g transform="translate(40, 480)">
          <rect width="240" height="95" rx="8" fill="#ffffff" opacity="0.9" stroke="#b0bec5" stroke-width="1.5" />
          <text x="12" y="24" font-size="13" font-weight="bold" fill="#263238">5º Ano • Geografia</text>
          <circle cx="20" cy="45" r="6" fill="#2e7d32" />
          <text x="32" y="49" font-size="11" fill="#37474f">Norte (Verde)</text>
          <circle cx="130" cy="45" r="6" fill="#f57c00" />
          <text x="142" y="49" font-size="11" fill="#37474f">Nordeste (Laranja)</text>
          <circle cx="20" cy="68" r="6" fill="#fbc02d" />
          <text x="32" y="72" font-size="11" fill="#37474f">C.-Oeste (Amarelo)</text>
          <circle cx="130" cy="68" r="6" fill="#1976d2" />
          <text x="142" y="72" font-size="11" fill="#37474f">Sudeste (Azul)</text>
          <circle cx="20" cy="86" r="5" fill="#7b1fa2" />
          <text x="32" y="89" font-size="11" fill="#37474f">Sul (Roxo)</text>
        </g>
      </svg>
    `),
  },
  {
    id: 'ancient-egypt',
    title: 'Mistérios do Egito Antigo',
    category: 'História',
    defaultGrid: 4,
    curiosity: 'As Pirâmides de Gizé têm mais de 4.500 anos! Elas foram construídas com blocos maciços de pedra calcária que pesavam em média 2,5 toneladas cada um. O Rio Nilo era essencial, pois fornecia água e fertilidade para plantar no deserto.',
    imageUrl: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="egyptSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4a148c" />
            <stop offset="35%" stop-color="#d81b60" />
            <stop offset="70%" stop-color="#fb8c00" />
            <stop offset="100%" stop-color="#ffd54f" />
          </linearGradient>
          <linearGradient id="pyrLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffe082" />
            <stop offset="100%" stop-color="#ffb300" />
          </linearGradient>
          <linearGradient id="pyrDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffb300" />
            <stop offset="100%" stop-color="#bf360c" />
          </linearGradient>
        </defs>

        <!-- Céu dramático de pôr do sol -->
        <rect width="800" height="600" fill="url(#egyptSky)" />

        <!-- Grande Sol Poente Ra/Amon -->
        <circle cx="480" cy="280" r="85" fill="#fff9c4" opacity="0.9" />
        <circle cx="480" cy="280" r="105" fill="#ffe082" opacity="0.3" />

        <!-- Dunas de Areia Distantes -->
        <path d="M0,380 Q240,320 480,360 Q700,390 800,350 L800,600 L0,600 Z" fill="#e65100" opacity="0.4" />

        <!-- A Grande Pirâmide de Quéops -->
        <g id="pyramid-main">
          <!-- Face Iluminada -->
          <polygon points="340,160 170,410 370,410" fill="url(#pyrLight)" />
          <!-- Face Sombreada -->
          <polygon points="340,160 370,410 490,390" fill="url(#pyrDark)" />
          <!-- Linhas de blocos de pedra -->
          <line x1="205" y1="360" x2="395" y2="360" stroke="#ffa000" stroke-width="2" />
          <line x1="240" y1="310" x2="420" y2="310" stroke="#ffa000" stroke-width="2" />
          <line x1="275" y1="260" x2="445" y2="260" stroke="#ffa000" stroke-width="2" />
          <line x1="310" y1="210" x2="470" y2="210" stroke="#ffa000" stroke-width="2" />
        </g>

        <!-- Segunda Pirâmide (Kéfren) ao fundo -->
        <g id="pyramid-second">
          <polygon points="600,210 480,390 630,390" fill="url(#pyrLight)" opacity="0.85" />
          <polygon points="600,210 630,390 710,380" fill="url(#pyrDark)" opacity="0.85" />
        </g>

        <!-- Rio Nilo Azul Reluzente -->
        <path d="M0,450 Q280,430 460,470 Q660,510 800,470 L800,600 L0,600 Z" fill="#00838f" />
        <path d="M0,465 Q280,445 460,485 Q660,525 800,485 L800,600 L0,600 Z" fill="#006064" />

        <!-- Margem com Palmeiras e Papiro -->
        <g fill="#2e7d32">
          <!-- Palmeira Esquerda -->
          <path d="M90,540 Q105,420 130,340" stroke="#4e342e" stroke-width="12" fill="none" stroke-linecap="round" />
          <ellipse cx="130" cy="335" rx="35" ry="12" transform="rotate(-30 130 335)" />
          <ellipse cx="130" cy="335" rx="35" ry="12" transform="rotate(30 130 335)" />
          <ellipse cx="130" cy="335" rx="35" ry="12" transform="rotate(-70 130 335)" />
          <ellipse cx="130" cy="335" rx="35" ry="12" transform="rotate(70 130 335)" />
          <!-- Palmeira Direita -->
          <path d="M60,560 Q80,450 75,370" stroke="#4e342e" stroke-width="10" fill="none" stroke-linecap="round" />
          <ellipse cx="75" cy="365" rx="30" ry="10" transform="rotate(-40 75 365)" />
          <ellipse cx="75" cy="365" rx="30" ry="10" transform="rotate(40 75 365)" />
        </g>

        <!-- Camelo e Guia em Silhueta -->
        <g transform="translate(620, 480)" fill="#212121">
          <!-- Corpo do camelo -->
          <ellipse cx="60" cy="40" rx="30" ry="18" />
          <!-- Corcunda -->
          <circle cx="62" cy="22" r="14" />
          <!-- Pescoço e Cabeça -->
          <path d="M35,42 Q20,30 25,12 Q28,6 38,10" stroke="#212121" stroke-width="8" fill="none" stroke-linecap="round" />
          <!-- Pernas -->
          <line x1="42" y1="56" x2="40" y2="92" stroke="#212121" stroke-width="4" />
          <line x1="50" y1="56" x2="52" y2="90" stroke="#212121" stroke-width="4" />
          <line x1="75" y1="56" x2="72" y2="92" stroke="#212121" stroke-width="4" />
          <line x1="84" y1="56" x2="86" y2="90" stroke="#212121" stroke-width="4" />
          <!-- Pessoa com cajado -->
          <circle cx="10" cy="45" r="6" />
          <rect x="6" y="52" width="9" height="36" rx="2" />
          <line x1="18" y1="38" x2="18" y2="92" stroke="#212121" stroke-width="2" />
        </g>
      </svg>
    `),
  },
  {
    id: 'dinosaurs-brazil',
    title: 'Dinossauros Fósseis do Brasil',
    category: 'História',
    defaultGrid: 4,
    curiosity: 'O Brasil é um dos lugares mais ricos do mundo em fósseis! Na Chapada do Araripe (no Ceará) e no Rio Grande do Sul foram descobertos dinossauros incríveis como o Oxalaia quilombensis (primo gigante do Espinossauro) e pterossauros alados com cristas coloridas!',
    imageUrl: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="dinoSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ff7043" />
            <stop offset="50%" stop-color="#ffa726" />
            <stop offset="100%" stop-color="#fff59d" />
          </linearGradient>
          <linearGradient id="spinoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#388e3c" />
            <stop offset="60%" stop-color="#2e7d32" />
            <stop offset="100%" stop-color="#1b5e20" />
          </linearGradient>
        </defs>

        <rect width="800" height="600" fill="url(#dinoSky)" />

        <!-- Chapadas e Mesas Geológicas ao Fundo -->
        <polygon points="0,320 180,240 320,240 400,340 0,350" fill="#8d6e63" opacity="0.6" />
        <polygon points="360,330 460,260 620,260 720,330 360,340" fill="#6d4c41" opacity="0.5" />

        <!-- Vulcão pré-histórico com fumaça -->
        <polygon points="680,230 750,330 630,330" fill="#5d4037" />
        <path d="M680,230 Q670,180 700,140 Q740,110 710,70" stroke="#b0bec5" stroke-width="12" fill="none" opacity="0.6" stroke-linecap="round" />

        <!-- Pterossauro (Tupandactylus imperator) voando com crista gigante -->
        <g transform="translate(480, 110) scale(0.9)">
          <!-- Asas -->
          <polygon points="60,30 0,-10 30,35" fill="#f57c00" />
          <polygon points="60,30 140,-15 80,35" fill="#f57c00" />
          <!-- Crista Gigante Típica do Brasil -->
          <path d="M55,20 Q65,-40 85,-45 Q75,-10 65,15 Z" fill="#e53935" />
          <!-- Cabeça e Bico -->
          <polygon points="50,22 68,20 62,35" fill="#ffd54f" />
        </g>

        <!-- Terreno com Samambaias Gigantes -->
        <path d="M0,420 Q200,380 400,410 Q600,440 800,390 L800,600 L0,600 Z" fill="#33691e" />
        <path d="M0,470 Q250,450 500,480 Q650,460 800,490 L800,600 L0,600 Z" fill="#1b5e20" />

        <!-- Dinossauro Carnívoro Gigante (Oxalaia Quilombensis) -->
        <g transform="translate(180, 240)">
          <!-- Vela / Crista Dorsal com Cores Vibrantes -->
          <path d="M80,120 Q160,-20 250,110 Z" fill="#d84315" stroke="#bf360c" stroke-width="4" />
          <path d="M100,115 Q165,10 230,110 Z" fill="#fbc02d" opacity="0.8" />
          <!-- Cauda Longa e Poderosa -->
          <path d="M240,120 Q360,110 440,60 Q380,150 220,160 Z" fill="url(#spinoGrad)" />
          <!-- Corpo Robusto -->
          <ellipse cx="170" cy="140" rx="90" ry="50" fill="url(#spinoGrad)" />
          <!-- Perna Traseira Poderosa -->
          <path d="M170,140 Q210,190 200,260 L170,260 Q170,200 140,160 Z" fill="#2e7d32" />
          <!-- Garras do pé -->
          <polygon points="170,260 205,260 190,270" fill="#212121" />
          <!-- Braço dianteiro com garra grande -->
          <path d="M90,160 Q80,200 110,210" stroke="#2e7d32" stroke-width="14" fill="none" stroke-linecap="round" />
          <!-- Pescoço e Cabeça estilo Crocodilo alongado -->
          <path d="M100,125 Q40,110 0,110 Q-30,110 -60,115 Q-40,135 10,150 Q70,160 110,140 Z" fill="url(#spinoGrad)" />
          <!-- Olho e Narina -->
          <circle cx="-10" cy="115" r="5" fill="#fbc02d" />
          <circle cx="-10" cy="115" r="2.5" fill="#000000" />
          <!-- Dentes Afiados -->
          <polygon points="-45,123 -40,128 -35,123" fill="#ffffff" />
          <polygon points="-25,124 -20,129 -15,124" fill="#ffffff" />
          <polygon points="-5,125 0,130 5,125" fill="#ffffff" />
        </g>
      </svg>
    `),
  },
  {
    id: 'geometry-fractions',
    title: 'Frações e Matemática Divertida',
    category: 'Matemática',
    defaultGrid: 3,
    curiosity: 'Uma fração representa partes de um todo! Quando você divide uma pizza em 4 pedaços iguais e come 1 pedaço, você comeu 1/4 da pizza e sobraram 3/4. Se juntarmos 1/2 com 2/4, temos exatamente 1 inteiro!',
    imageUrl: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="mathBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e1e2f" />
            <stop offset="100%" stop-color="#2d3748" />
          </linearGradient>
          <linearGradient id="cubeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#42a5f5" />
            <stop offset="100%" stop-color="#1e88e5" />
          </linearGradient>
          <linearGradient id="cubeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#90caf9" />
            <stop offset="100%" stop-color="#64b5f6" />
          </linearGradient>
          <linearGradient id="cubeGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1565c0" />
            <stop offset="100%" stop-color="#0d47a1" />
          </linearGradient>
        </defs>

        <!-- Fundo lousa mágica moderna -->
        <rect width="800" height="600" fill="url(#mathBg)" />

        <!-- Linhas quadriculadas do caderno de matemática -->
        <g stroke="#ffffff" stroke-width="0.5" stroke-dasharray="3,6" opacity="0.15">
          <line x1="0" y1="100" x2="800" y2="100" />
          <line x1="0" y1="200" x2="800" y2="200" />
          <line x1="0" y1="300" x2="800" y2="300" />
          <line x1="0" y1="400" x2="800" y2="400" />
          <line x1="0" y1="500" x2="800" y2="500" />
          <line x1="100" y1="0" x2="100" y2="600" />
          <line x1="200" y1="0" x2="200" y2="600" />
          <line x1="300" y1="0" x2="300" y2="600" />
          <line x1="400" y1="0" x2="400" y2="600" />
          <line x1="500" y1="0" x2="500" y2="600" />
          <line x1="600" y1="0" x2="600" y2="600" />
          <line x1="700" y1="0" x2="700" y2="600" />
        </g>

        <!-- Pizza de Frações (Círculo de 4/4) -->
        <g transform="translate(220, 200)">
          <!-- Fatia 1 (destacada 1/4) -->
          <g transform="translate(-12, -12)">
            <path d="M0,0 L0,-110 A110,110 0 0,0 -110,0 Z" fill="#ff5252" stroke="#ffffff" stroke-width="4" />
            <text x="-55" y="-45" fill="#ffffff" font-size="24" font-weight="bold" font-family="sans-serif">1/4</text>
          </g>
          <!-- Fatias restantes (3/4) -->
          <path d="M0,0 L0,-110 A110,110 0 0,1 110,0 Z" fill="#ffb142" stroke="#ffffff" stroke-width="4" />
          <text x="45" y="-45" fill="#ffffff" font-size="20" font-weight="bold" font-family="sans-serif">1/4</text>
          <path d="M0,0 L110,0 A110,110 0 0,1 0,110 Z" fill="#33d9b2" stroke="#ffffff" stroke-width="4" />
          <text x="45" y="60" fill="#ffffff" font-size="20" font-weight="bold" font-family="sans-serif">1/4</text>
          <path d="M0,0 L0,110 A110,110 0 0,1 -110,0 Z" fill="#706fd3" stroke="#ffffff" stroke-width="4" />
          <text x="-55" y="60" fill="#ffffff" font-size="20" font-weight="bold" font-family="sans-serif">1/4</text>
          <text x="0" y="145" fill="#fffa65" font-size="16" font-weight="bold" text-anchor="middle">Círculo Inteiro = 4/4</text>
        </g>

        <!-- Cubo 3D Isométrico com Geometria -->
        <g transform="translate(560, 220)">
          <!-- Topo -->
          <polygon points="0,-80 75,-40 0,0 -75,-40" fill="url(#cubeGrad2)" stroke="#ffffff" stroke-width="2" />
          <!-- Lado Esquerdo -->
          <polygon points="-75,-40 0,0 0,85 -75,45" fill="url(#cubeGrad1)" stroke="#ffffff" stroke-width="2" />
          <!-- Lado Direito -->
          <polygon points="0,0 75,-40 75,45 0,85" fill="url(#cubeGrad3)" stroke="#ffffff" stroke-width="2" />
          <!-- Carinha fofa no cubo -->
          <circle cx="-35" cy="20" r="5" fill="#ffffff" />
          <circle cx="-15" cy="22" r="5" fill="#ffffff" />
          <path d="M-30,34 Q-22,44 -14,34" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" />
          <text x="0" y="125" fill="#64b5f6" font-size="16" font-weight="bold" text-anchor="middle">Cubo: 6 Faces, 8 Vértices</text>
        </g>

        <!-- Régua, Transferidor e Equações Divertidas -->
        <g transform="translate(100, 430)">
          <!-- Barra de Fração Comparativa -->
          <rect x="50" y="20" width="300" height="40" rx="8" fill="#474787" stroke="#ffffff" stroke-width="2" />
          <rect x="50" y="20" width="150" height="40" rx="8" fill="#ff793f" />
          <text x="125" y="46" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle">1/2</text>
          <text x="275" y="46" fill="#f7f1e3" font-size="18" font-weight="bold" text-anchor="middle">1/2</text>
        </g>

        <!-- Fórmula e Balões Matemáticos -->
        <g transform="translate(480, 440)">
          <rect x="0" y="0" width="260" height="75" rx="14" fill="#2c2c54" stroke="#706fd3" stroke-width="2" />
          <text x="130" y="32" fill="#fffa65" font-size="20" font-weight="bold" text-anchor="middle">1/2 + 2/4 = 1 Inteiro!</text>
          <text x="130" y="58" fill="#34ace0" font-size="14" font-weight="bold" text-anchor="middle">5º Ano • Frações Equivalentes</text>
        </g>
      </svg>
    `),
  },
  {
    id: 'deep-ocean',
    title: 'A Vida no Fundo do Oceano',
    category: 'Ciências',
    defaultGrid: 4,
    curiosity: 'A baleia-jubarte faz acrobacias incríveis saltando para fora da água e viaja mais de 8.000 quilômetros da Antártida até o litoral da Bahia (Parque Nacional de Abrolhos) todos os anos para ter seus filhotes em águas mornas e calmas!',
    imageUrl: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="oceanDeep" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4dd0e1" />
            <stop offset="40%" stop-color="#0288d1" />
            <stop offset="80%" stop-color="#01579b" />
            <stop offset="100%" stop-color="#002f6c" />
          </linearGradient>
        </defs>

        <!-- Água azul com raios de sol penetrando -->
        <rect width="800" height="600" fill="url(#oceanDeep)" />
        <polygon points="120,0 200,0 360,600 240,600" fill="#ffffff" opacity="0.12" />
        <polygon points="340,0 460,0 620,600 480,600" fill="#ffffff" opacity="0.1" />

        <!-- Bolhas de ar subindo -->
        <g fill="#ffffff" opacity="0.6">
          <circle cx="280" cy="380" r="6" />
          <circle cx="295" cy="340" r="9" />
          <circle cx="275" cy="290" r="12" />
          <circle cx="310" cy="240" r="7" />
          <circle cx="560" cy="420" r="5" />
          <circle cx="575" cy="370" r="8" />
        </g>

        <!-- Baleia Jubarte Majestosa -->
        <g transform="translate(180, 160)">
          <!-- Nadadeira Caudal -->
          <path d="M420,70 Q480,30 520,20 Q480,80 530,120 Q460,100 400,90 Z" fill="#37474f" />
          <!-- Corpo Cinza Azulado -->
          <path d="M0,80 Q100,0 260,10 Q380,25 430,80 Q360,150 200,160 Q80,160 0,80 Z" fill="#455a64" />
          <!-- Ventre Estriado Branco -->
          <path d="M40,90 Q120,150 240,140 Q150,110 50,85 Z" fill="#eceff1" opacity="0.9" />
          <!-- Nadadeira Peitoral Longa -->
          <path d="M140,110 Q160,200 130,260 Q110,210 120,115 Z" fill="#37474f" />
          <!-- Olho Amigável -->
          <circle cx="70" cy="75" r="4.5" fill="#212121" />
          <circle cx="71" cy="74" r="1.5" fill="#ffffff" />
        </g>

        <!-- Tartaruga Marinha Nadando Graciosa -->
        <g transform="translate(120, 360) rotate(-15)">
          <!-- Casco Oval com Padrão -->
          <ellipse cx="60" cy="40" rx="38" ry="26" fill="#558b2f" stroke="#33691e" stroke-width="3" />
          <ellipse cx="60" cy="40" rx="26" ry="18" fill="#7cb342" />
          <!-- Cabeça -->
          <ellipse cx="12" cy="40" rx="14" ry="10" fill="#689f38" />
          <circle cx="8" cy="37" r="2.5" fill="#212121" />
          <!-- Nadadeiras Dianteiras Grandiosas -->
          <path d="M35,22 Q30,-20 65,-25 Q60,10 45,26 Z" fill="#689f38" />
          <path d="M35,58 Q30,100 65,105 Q60,70 45,54 Z" fill="#689f38" />
        </g>

        <!-- Corais e Anêmonas Multicoloridas no Fundo -->
        <g transform="translate(0, 480)">
          <!-- Rocha de Fundo -->
          <path d="M0,120 Q180,60 360,90 Q540,50 800,80 L800,120 L0,120 Z" fill="#263238" />
          <!-- Corais Cérebro e Ramificados -->
          <path d="M600,70 Q620,0 650,20 Q680,-10 700,30 Q720,10 740,70 Z" fill="#e91e63" />
          <path d="M480,80 Q495,20 515,40 Q535,15 550,80 Z" fill="#ff7043" />
          <path d="M220,90 Q240,40 260,50 Q280,30 300,90 Z" fill="#9c27b0" />
          <!-- Peixinho Palhaço nos Corais -->
          <g transform="translate(640, 20)">
            <ellipse cx="0" cy="0" rx="16" ry="10" fill="#ff5722" />
            <polygon points="12,0 24,-8 24,8" fill="#ff5722" />
            <rect x="-4" y="-9" width="5" height="18" fill="#ffffff" rx="2" />
            <circle cx="-10" cy="-2" r="2" fill="#212121" />
          </g>
        </g>
      </svg>
    `),
  },
  {
    id: 'brazilian-modern-art',
    title: 'Arte e Cores do Brasil (Modernismo)',
    category: 'Artes',
    defaultGrid: 3,
    curiosity: 'A Semana de Arte Moderna de 1922 revolucionou a cultura brasileira! Artistas como Tarsila do Amaral pintavam as cores vivas e quentes da nossa terra, o cacto do sertão, o sol radiante e a imaginação poética do nosso povo.',
    imageUrl: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="artSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#29b6f6" />
            <stop offset="60%" stop-color="#81d4fa" />
            <stop offset="100%" stop-color="#fff59d" />
          </linearGradient>
        </defs>

        <rect width="800" height="600" fill="url(#artSky)" />

        <!-- Grande Sol Amarelo Modernista Radiante -->
        <circle cx="200" cy="170" r="95" fill="#fbc02d" />
        <circle cx="200" cy="170" r="115" fill="#fff176" opacity="0.4" />

        <!-- Colinas Verdes e Azuis Onduladas -->
        <path d="M0,380 Q220,280 440,360 Q660,440 800,340 L800,600 L0,600 Z" fill="#43a047" />
        <path d="M0,450 Q300,380 550,470 Q700,420 800,460 L800,600 L0,600 Z" fill="#2e7d32" />

        <!-- Cacto Majestoso com Flor (Inspirado em Tarsila) -->
        <g transform="translate(180, 260)">
          <!-- Tronco Principal -->
          <rect x="80" y="40" width="46" height="220" rx="23" fill="#00897b" stroke="#004d40" stroke-width="4" />
          <!-- Braço Esquerdo -->
          <path d="M80,120 L30,120 L30,60" stroke="#00897b" stroke-width="36" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M80,120 L30,120 L30,60" stroke="#004d40" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Braço Direito -->
          <path d="M126,160 L180,160 L180,90" stroke="#00897b" stroke-width="36" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M126,160 L180,160 L180,90" stroke="#004d40" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Flor Vermelha no Topo -->
          <circle cx="103" cy="35" r="16" fill="#e53935" />
          <circle cx="103" cy="35" r="8" fill="#ffeb3b" />
        </g>

        <!-- Casinhas Coloniais Alegres Coloridas -->
        <g transform="translate(520, 360)">
          <!-- Casinha 1 (Azul e Vermelho) -->
          <rect x="0" y="60" width="90" height="90" fill="#0288d1" stroke="#01579b" stroke-width="3" />
          <polygon points="-10,60 45,10 100,60" fill="#d32f2f" stroke="#b71c1c" stroke-width="3" />
          <!-- Janela e Porta -->
          <rect x="15" y="80" width="22" height="25" rx="3" fill="#ffffff" />
          <rect x="50" y="95" width="26" height="55" rx="3" fill="#fff9c4" />

          <!-- Casinha 2 (Amarela e Verde) -->
          <rect x="110" y="80" width="80" height="70" fill="#fbc02d" stroke="#f57f17" stroke-width="3" />
          <polygon points="100,80 150,35 200,80" fill="#388e3c" stroke="#1b5e20" stroke-width="3" />
          <rect x="125" y="100" width="20" height="22" rx="3" fill="#ffffff" />
          <rect x="155" y="105" width="24" height="45" rx="3" fill="#5d4037" />
        </g>
      </svg>
    `),
  },
];
