type LogoIconProps = {
  size?: number;
};

export default function LogoIcon({ size = 36 }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nevraxia icon"
    >
      <defs>
        <radialGradient id="nx-center" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#388BFD" />
          <stop offset="100%" stopColor="#1256C9" />
        </radialGradient>
        <linearGradient id="nx-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1D6FEB" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#39D0D8" stopOpacity="0.35" />
        </linearGradient>
        <filter id="nx-glow-sat">
          <feGaussianBlur stdDeviation="0.8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="nx-glow-center">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Lines */}
      <line x1="18" y1="18" x2="18" y2="7"  stroke="url(#nx-line)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="18" y1="18" x2="28" y2="25" stroke="url(#nx-line)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="18" y1="18" x2="8"  y2="25" stroke="url(#nx-line)" strokeWidth="1.3" strokeLinecap="round" />

      {/* Satellite nodes — hollow */}
      <circle cx="18" cy="7"  r="3"   stroke="#1D6FEB" strokeWidth="1.4" fill="none" filter="url(#nx-glow-sat)" />
      <circle cx="28" cy="25" r="3"   stroke="#39D0D8" strokeWidth="1.4" fill="none" filter="url(#nx-glow-sat)" />
      <circle cx="8"  cy="25" r="3"   stroke="#388BFD" strokeWidth="1.4" fill="none" filter="url(#nx-glow-sat)" />

      {/* Central node — filled */}
      <circle cx="18" cy="18" r="7"   fill="url(#nx-center)" filter="url(#nx-glow-center)" />
      {/* Highlight */}
      <circle cx="15.5" cy="15.5" r="2" fill="white" opacity="0.2" />

      {/* IA text inside center */}
      <text
        x="18" y="21"
        textAnchor="middle"
        fill="white"
        fontSize="6.5"
        fontWeight="700"
        fontFamily="Space Grotesk, Inter, sans-serif"
        letterSpacing="0.5"
      >
        IA
      </text>
    </svg>
  );
}
