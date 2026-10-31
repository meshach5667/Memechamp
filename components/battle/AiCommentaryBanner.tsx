'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { Sparkles, Mic, Radio } from 'lucide-react';

export function AiCommentaryBanner() {
  const { latestAiCommentary, isAiLoading } = useGame();

  return (
    <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 p-3.5 sm:p-4 text-xs shadow-lg">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-purple-500/20 text-purple-300">
            <Mic className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-purple-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            Ringside AI Commentary
            <Sparkles className="w-3 h-3 text-amber-400" />
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-purple-400">
          <Radio className="w-3 h-3 animate-pulse text-purple-400" />
          <span>Gemini Live Feed</span>
        </div>
      </div>

      <div className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed italic pl-1 border-l-2 border-purple-500/40 my-1">
        {isAiLoading ? (
          <span className="text-slate-400 animate-pulse">
            Analyzing crowd hype and meme momentum...
          </span>
        ) : (
          <span>&quot;{latestAiCommentary}&quot;</span>
        )}
      </div>
    </div>
  );
}
