'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { MemeSvg } from '@/components/memes/MemeSvg';
import { Trophy, Coins, Zap, Swords, X } from 'lucide-react';

export function PublicProfileModal() {
  const { viewingProfile, setViewingProfile } = useGame();

  if (!viewingProfile) return null;

  const winRate = viewingProfile.gamesPlayed > 0
    ? Math.round((viewingProfile.wins / viewingProfile.gamesPlayed) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 max-w-sm w-full shadow-2xl relative text-center">
        <button
          onClick={() => setViewingProfile(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Avatar */}
        <div className="w-20 h-20 rounded-2xl bg-slate-800 p-2 border-2 border-amber-400 shadow-lg mx-auto mb-3 flex items-center justify-center">
          <MemeSvg id={viewingProfile.avatar} className="w-16 h-16" />
        </div>

        <h3 className="text-xl font-black text-white">{viewingProfile.displayName}</h3>
        <p className="text-xs text-slate-400 font-mono">@{viewingProfile.username}</p>

        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] text-amber-300 font-bold uppercase tracking-wider">
          <span>Faction: {viewingProfile.favoriteFaction}</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mt-5 text-left text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Clashes Won</span>
            <span className="text-base font-black text-white">{viewingProfile.wins}</span>
            <span className="text-[10px] text-slate-400 block">{winRate}% Win Rate</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Record Multiplier</span>
            <span className="text-base font-black text-purple-400 font-mono">
              {viewingProfile.highestMultiplier.toFixed(2)}x
            </span>
            <span className="text-[10px] text-slate-400 block">Personal Best</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 col-span-2 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block text-[10px] font-bold uppercase">Virtual Credits</span>
              <span className="text-base font-black text-amber-400 font-mono">
                {viewingProfile.credits.toLocaleString()} VC
              </span>
            </div>
            <span className="text-[9px] text-slate-500">No monetary value</span>
          </div>
        </div>

        <button
          onClick={() => setViewingProfile(null)}
          className="w-full mt-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Close Profile
        </button>
      </div>
    </div>
  );
}
