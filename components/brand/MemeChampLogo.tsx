'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function MemeChampLogo({ size = 'md', showTagline = false }: LogoProps) {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-12 h-12' : 'w-9 h-9';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl';

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Championship Belt & Multiplier Sparkle SVG Badge */}
      <div className={`relative ${iconSize} flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 p-[2px] shadow-lg shadow-rose-500/20`}>
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
            {/* Belt strap */}
            <path d="M 2 16 Q 8 13 16 13 Q 24 13 30 16 L 30 19 Q 24 16 16 16 Q 8 16 2 19 Z" fill="#F59E0B" fillOpacity="0.8" />
            {/* Championship Plate */}
            <path d="M 10 10 L 22 10 L 25 16 L 22 22 L 10 22 L 7 16 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
            {/* Rising Multiplier Arrow / Lightning */}
            <path d="M 16 7 L 18 13 L 22 13 L 15 25 L 17 17 L 12 17 Z" fill="#00F5D4" stroke="#0F172A" strokeWidth="0.8" />
            {/* Corner Stars */}
            <polygon points="12,12 13,14 15,14 13.5,15.5 14,17.5 12,16 10,17.5 10.5,15.5 9,14 11,14" fill="#FFFFFF" />
            <polygon points="20,12 21,14 23,14 21.5,15.5 22,17.5 20,16 18,17.5 18.5,15.5 17,14 19,14" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className={`font-black tracking-tight ${titleSize} text-white`}>
            MEME<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">CHAMP</span>
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/30 rounded">
            LIVE
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-slate-400 font-medium tracking-wide">
            MULTIPLAYER MEME BATTLE MULTIPLIER
          </span>
        )}
      </div>
    </div>
  );
}
