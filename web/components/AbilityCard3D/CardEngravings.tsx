/**
 * Original SVG filigree made specifically for this portfolio card.
 * The source website was used only as a visual reference; its card
 * plate, photographs, background images and branding are not copied.
 */
import { useId } from "react";

interface ScrollworkProps {
  transform: string;
}

function BaroqueCorner({ transform }: ScrollworkProps) {
  return (
    <g transform={transform} fill="none" stroke="url(#ac-gold-engraving)" strokeLinecap="round" strokeLinejoin="round">
      <g filter="url(#ac-relief)">
        <path d="M 5 132 C 6 75 12 37 37 17 C 61 -1 105 5 151 5" strokeWidth="10" />
        <path d="M 18 127 C 17 80 21 43 44 26 C 66 10 106 19 143 19" strokeWidth="3" />
        <path d="M 12 74 C 23 48 35 43 49 52 C 70 67 58 94 42 91 C 28 89 28 72 39 72 C 46 72 48 82 42 83" strokeWidth="5.5" />
        <path d="M 42 17 C 70 30 70 53 55 61 C 35 70 28 53 37 44 C 44 38 54 46 49 52" strokeWidth="5" />
        <path d="M 66 21 C 89 21 99 38 90 55 C 79 73 61 56 70 45 C 75 39 81 44 80 48" strokeWidth="4" />
        <path d="M 9 101 C 37 101 46 124 32 140 C 22 152 7 139 17 129 C 21 125 27 130 23 134" strokeWidth="4" />
        <path d="M 82 10 C 89 27 107 26 119 34 C 143 53 134 81 115 78 C 99 75 108 60 120 64" strokeWidth="4.5" />
        <path d="M 18 36 C 30 33 36 25 36 11 M 34 86 C 55 101 66 101 85 91 M 18 111 C 27 114 32 119 32 125" strokeWidth="2.5" />
        <path d="M 73 29 Q 54 13 47 31 C 44 47 62 43 60 34 M 84 18 C 111 7 118 16 124 23 M 8 84 C 24 85 19 107 29 110" strokeWidth="2" />
        <path d="M 59 89 C 71 75 83 74 91 80 M 26 57 C 36 49 44 50 47 58 M 94 42 C 104 49 104 60 100 65" strokeWidth="1.8" />
      </g>
      <g fill="url(#ac-gold-fill)" stroke="#765017" strokeWidth="1.2">
        <path d="M 48 104 Q 61 83 79 88 Q 73 105 48 104 Z" />
        <path d="M 84 56 Q 103 42 113 48 Q 104 63 84 56 Z" />
        <path d="M 26 113 Q 7 107 12 88 Q 30 95 26 113 Z" />
        <path d="M 115 33 Q 134 22 145 30 Q 133 43 115 33 Z" />
        <circle cx="20" cy="20" r="10" fill="#5a1727" strokeWidth="3" />
        <circle cx="20" cy="20" r="5" fill="#a12e40" strokeWidth="1" />
        <circle cx="93" cy="53" r="5" fill="#642c48" strokeWidth="1.7" />
        <circle cx="36" cy="88" r="4" fill="#7f3353" strokeWidth="1.4" />
        <circle cx="117" cy="22" r="3" fill="#d98b70" strokeWidth="1" />
      </g>
    </g>
  );
}

function FiligreeDiamond({ x, y, size = 13 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M 0 ${-size * 1.45} L ${size} 0 L 0 ${size * 1.45} L ${-size} 0 Z`}
        fill="url(#ac-gold-fill)"
        stroke="#754d19"
        strokeWidth="2"
      />
      <path
        d={`M 0 ${-size * .8} L ${size * .53} 0 L 0 ${size * .8} L ${-size * .53} 0 Z`}
        fill="#6e4254"
        stroke="#fff1aa"
        strokeWidth="1.4"
      />
      <circle r="3.2" fill="#fff0b5" />
    </g>
  );
}

function CScroll({ x, y, scaleX = 1, scaleY = 1 }: { x: number; y: number; scaleX?: number; scaleY?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scaleX} ${scaleY})`} fill="none" stroke="url(#ac-gold-engraving)" strokeLinecap="round">
      <path d="M 2 47 C -4 16 19 1 40 10 C 54 16 54 35 42 41 C 28 47 21 29 33 26 C 43 23 42 34 37 35" strokeWidth="5.5" />
      <path d="M 7 49 C 25 58 42 52 54 40 M 10 8 C 19 17 26 17 34 11 M 13 52 C 26 67 39 66 55 56" strokeWidth="2" />
      <path d="M 50 38 Q 60 26 66 31 Q 63 44 50 38 Z" fill="url(#ac-gold-fill)" strokeWidth="1.5" />
      <circle cx="13" cy="11" r="5.5" fill="#6e2030" strokeWidth="2" />
    </g>
  );
}

function HorizontalScroll({ y, from = 87, to = 629 }: { y: number; from?: number; to?: number }) {
  const center = (from + to) / 2;
  return (
    <g stroke="url(#ac-gold-engraving)" fill="none" strokeLinecap="round">
      <path d={`M ${from} ${y} H ${to}`} strokeWidth="3" />
      <path d={`M ${from + 11} ${y - 6} H ${center - 33} M ${center + 33} ${y - 6} H ${to - 11}`} strokeWidth="1.25" />
      <path d={`M ${from + 11} ${y + 5} H ${center - 34} M ${center + 34} ${y + 5} H ${to - 11}`} strokeWidth="1.25" />
      <path d={`M ${center - 32} ${y} q 15 -22 29 -3 q 3 7 -2 8 q -10 3 -9 -7 M ${center + 32} ${y} q -15 -22 -29 -3 q -3 7 2 8 q 10 3 9 -7`} strokeWidth="2.4" />
      <FiligreeDiamond x={center} y={y} size={9} />
    </g>
  );
}

export function GiltFrame() {
  const unique = useId().replaceAll(":", "");
  return (
    <svg className="ability-gilt-frame" viewBox="0 0 716 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ac-gold-engraving" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6e4014" />
          <stop offset=".13" stopColor="#c89542" />
          <stop offset=".26" stopColor="#fff3b5" />
          <stop offset=".48" stopColor="#b07822" />
          <stop offset=".63" stopColor="#fff0a6" />
          <stop offset=".8" stopColor="#e4b455" />
          <stop offset="1" stopColor="#754615" />
        </linearGradient>
        <linearGradient id="ac-gold-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c1842c" />
          <stop offset=".22" stopColor="#fff0a7" />
          <stop offset=".55" stopColor="#92621d" />
          <stop offset=".78" stopColor="#f4d87b" />
          <stop offset="1" stopColor="#754915" />
        </linearGradient>
        <linearGradient id={`ac-rim-${unique}`} x1="0" y1="0" x2="1" y2=".8">
          <stop offset="0" stopColor="#d69b33" />
          <stop offset=".26" stopColor="#fff1ab" />
          <stop offset=".5" stopColor="#9c6215" />
          <stop offset=".76" stopColor="#f3cf70" />
          <stop offset="1" stopColor="#7c4413" />
        </linearGradient>
        <filter id="ac-relief" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="1.2" dy="2" stdDeviation="1.2" floodColor="#24110d" floodOpacity=".85" />
          <feDropShadow dx="-1" dy="-1" stdDeviation=".75" floodColor="#fff5c2" floodOpacity=".45" />
        </filter>
        <filter id="ac-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Continuous metal edge. Three individually embossed rims create card thickness. */}
      <g fill="none" strokeLinejoin="round">
        <rect x="4" y="4" width="708" height="992" rx="24" stroke="#2b1b12" strokeWidth="7" />
        <rect x="6.5" y="6.5" width="703" height="987" rx="21" stroke={`url(#ac-rim-${unique})`} strokeWidth="11" />
        <rect x="14" y="14" width="688" height="972" rx="16" stroke="#fff2aa" strokeWidth="2.3" />
        <rect x="20" y="20" width="675" height="960" rx="13" stroke="#744717" strokeWidth="3.5" />
        <rect x="28" y="27" width="661" height="947" rx="12" stroke="#ebc365" strokeWidth="1.6" />
      </g>

      {/* Raised nameplate with baroque mountings and ruby finials. */}
      <rect x="117" y="43" width="483" height="77" rx="34" fill="none" stroke="#654014" strokeWidth="13" />
      <rect x="117" y="43" width="483" height="77" rx="34" fill="none" stroke="url(#ac-gold-engraving)" strokeWidth="8" />
      <rect x="123" y="49" width="471" height="65" rx="30" fill="none" stroke="#fff0b6" strokeWidth="1.7" />
      <CScroll x={76} y={45} />
      <CScroll x={639} y={45} scaleX={-1} />
      <FiligreeDiamond x={357} y={40} size={12} />
      <FiligreeDiamond x={357} y={121} size={11} />

      {/* Ornate rectangular portrait opening, with gold inset bevel and scrolled terminals. */}
      <rect x="55" y="137" width="606" height="377" rx="8" fill="none" stroke="#3a231b" strokeWidth="13" />
      <rect x="57" y="139" width="602" height="372" rx="6" fill="none" stroke="url(#ac-gold-engraving)" strokeWidth="8" />
      <rect x="65" y="147" width="586" height="358" rx="2" fill="none" stroke="#fff0b6" strokeWidth="1.5" />
      <CScroll x={45} y={123} />
      <CScroll x={668} y={123} scaleX={-1} />
      <CScroll x={45} y={528} scaleY={-1} />
      <CScroll x={668} y={528} scaleX={-1} scaleY={-1} />
      <HorizontalScroll y={137} from={143} to={575} />
      <HorizontalScroll y={514} from={143} to={575} />
      <FiligreeDiamond x={357} y={514} size={9} />

      {/* Small ornamental blank plaque below the portrait. */}
      <g fill="none" stroke="url(#ac-gold-engraving)" strokeWidth="3.5">
        <rect x="139" y="532" width="438" height="44" rx="20" stroke="#643817" strokeWidth="8" />
        <rect x="139" y="532" width="438" height="44" rx="20" />
      </g>
      <CScroll x={108} y={524} />
      <CScroll x={608} y={524} scaleX={-1} />

      {/* Four-stat parchment, located at 60-83% height like the reference. */}
      <rect x="49" y="591" width="617" height="235" rx="13" fill="none" stroke="#5b361b" strokeWidth="13" />
      <rect x="49" y="591" width="617" height="235" rx="13" fill="none" stroke="url(#ac-gold-engraving)" strokeWidth="8" />
      <rect x="59" y="601" width="596" height="213" rx="6" fill="none" stroke="#fff0b6" strokeWidth="1.6" />
      <CScroll x={41} y={582} />
      <CScroll x={675} y={582} scaleX={-1} />
      <CScroll x={41} y={834} scaleY={-1} />
      <CScroll x={675} y={834} scaleX={-1} scaleY={-1} />
      <HorizontalScroll y={593} from={131} to={588} />
      <HorizontalScroll y={824} from={131} to={588} />

      {/* Bottom location / work / reply metadata plaque. */}
      <rect x="104" y="852" width="506" height="46" rx="22" fill="none" stroke="#633918" strokeWidth="11" />
      <rect x="104" y="852" width="506" height="46" rx="22" fill="none" stroke="url(#ac-gold-engraving)" strokeWidth="6" />
      <rect x="112" y="859" width="490" height="32" rx="17" fill="none" stroke="#fff1ac" strokeWidth="1.2" />
      <CScroll x={70} y={846} />
      <CScroll x={645} y={846} scaleX={-1} />

      {/* Four large corner mounts complete the collectable-card silhouette. */}
      <BaroqueCorner transform="translate(17 18) scale(.89 .89)" />
      <BaroqueCorner transform="translate(699 18) scale(-.89 .89)" />
      <BaroqueCorner transform="translate(17 982) scale(.89 -.89)" />
      <BaroqueCorner transform="translate(699 982) scale(-.89 -.89)" />
      <g fill="url(#ac-gold-fill)">
        <circle cx="31" cy="970" r="5" />
        <circle cx="685" cy="970" r="5" />
        <circle cx="31" cy="30" r="5" />
        <circle cx="685" cy="30" r="5" />
      </g>
    </svg>
  );
}

export function Compass() {
  const ticks = Array.from({ length: 24 }, (_, i) => i);
  const small = Array.from({ length: 48 }, (_, i) => i);
  return (
    <svg className="ability-compass-graphic" viewBox="0 0 716 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ac-compass-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a57230" />
          <stop offset=".23" stopColor="#f0d68b" />
          <stop offset=".5" stopColor="#986c2b" />
          <stop offset=".72" stopColor="#fff0b1" />
          <stop offset="1" stopColor="#9d6a26" />
        </linearGradient>
        <pattern id="ac-crosshatch" width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M 0 0 H 13 M 0 6.5 H 13" stroke="#cfb279" strokeWidth=".35" opacity=".20" />
          <path d="M 6.5 0 V 13" stroke="#d8bb8d" strokeWidth=".28" opacity=".16" />
        </pattern>
        <radialGradient id="ac-back-shade" cx="50%" cy="48%" r="77%">
          <stop offset="0" stopColor="#31251f" />
          <stop offset=".7" stopColor="#1c1716" />
          <stop offset="1" stopColor="#090807" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="716" height="1000" rx="18" fill="url(#ac-back-shade)" />
      <rect x="0" y="0" width="716" height="1000" rx="18" fill="url(#ac-crosshatch)" />
      <g fill="none" stroke="url(#ac-compass-gold)" strokeLinejoin="round">
        <rect x="22" y="21" width="672" height="958" rx="25" strokeWidth="5" />
        <rect x="36" y="35" width="644" height="930" rx="17" strokeWidth="2" />
        <rect x="46" y="45" width="624" height="910" rx="11" strokeWidth=".9" opacity=".74" />
        <circle cx="358" cy="500" r="292" strokeWidth="5.3" />
        <circle cx="358" cy="500" r="279" strokeWidth="8.8" strokeDasharray="20 12" opacity=".88" />
        <circle cx="358" cy="500" r="268" strokeWidth="2" />
        <circle cx="358" cy="500" r="229" strokeWidth="2.8" />
        <circle cx="358" cy="500" r="123" strokeWidth="4.4" />
        <circle cx="358" cy="500" r="126" strokeWidth=".8" opacity=".75" />
      </g>
      <g fill="none" stroke="url(#ac-compass-gold)" strokeLinecap="round">
        {ticks.map((item) => {
          const angle = (item * Math.PI) / 12;
          const outer = 256;
          const inner = item % 2 === 0 ? 208 : 233;
          const x1 = 358 + inner * Math.sin(angle);
          const y1 = 500 - inner * Math.cos(angle);
          const x2 = 358 + outer * Math.sin(angle);
          const y2 = 500 - outer * Math.cos(angle);
          return <path key={item} d={`M ${x1} ${y1} L ${x2} ${y2}`} strokeWidth={item % 2 === 0 ? 3.8 : 1.6} />;
        })}
        {small.map((item) => {
          const angle = (item * Math.PI) / 24;
          const x1 = 358 + 285 * Math.sin(angle);
          const y1 = 500 - 285 * Math.cos(angle);
          const x2 = 358 + 290 * Math.sin(angle);
          const y2 = 500 - 290 * Math.cos(angle);
          return <path key={`small-${item}`} d={`M ${x1} ${y1} L ${x2} ${y2}`} strokeWidth="1.3" opacity=".78" />;
        })}
      </g>
      <g fill="none" stroke="url(#ac-compass-gold)" strokeWidth="4.1" strokeLinejoin="miter">
        <path d="M358 319 L374 379 L342 379 Z" />
        <path d="M358 681 L374 621 L342 621 Z" />
        <path d="M177 500 L237 484 L237 516 Z" />
        <path d="M539 500 L479 484 L479 516 Z" />
        <path d="M358 318 L358 373 M358 627 L358 682 M181 500 L230 500 M487 500 L535 500" strokeWidth="1.25" />
      </g>
      <circle cx="358" cy="500" r="121" fill="#130d0b" opacity=".96" />
      <circle cx="358" cy="500" r="122" fill="none" stroke="url(#ac-compass-gold)" strokeWidth="4" />
      <circle cx="358" cy="500" r="115" fill="none" stroke="#674d2f" strokeWidth=".7" opacity=".56" />
    </svg>
  );
}
