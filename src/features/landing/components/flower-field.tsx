"use client";

import { FLOWERS } from "../constants/flowers";

function Flower({ size, hue }: { size: number; hue: number }) {
  const id = `petal-${hue}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <radialGradient id={`${id}-petal`} cx="50%" cy="80%" r="80%">
          <stop offset="0%" stopColor="#fff0e0" />
          <stop offset="100%" stopColor={`hsl(${hue}, 85%, 72%)`} />
        </radialGradient>
        <radialGradient id={`${id}-center`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="100%" stopColor="#ffb088" />
        </radialGradient>
      </defs>
      <g transform="translate(50,50)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M0,-4 C10,-20 14,-38 0,-46 C-14,-38 -10,-20 0,-4 Z"
            fill={`url(#${id}-petal)`}
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="10" fill={`url(#${id}-center)`} />
      </g>
    </svg>
  );
}

export function FlowerField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {FLOWERS.map((f, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            animation: `sway ${f.duration}s ease-in-out ${f.delay}s infinite`,
          }}
        >
          <Flower size={f.size} hue={f.hue} />
        </div>
      ))}
      <style>{`
        @keyframes sway {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-14px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}