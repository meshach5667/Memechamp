'use client';

import React from 'react';
import { MemeSvg } from '@/components/memes/MemeSvg';
import { MemeFighterStats } from '@/types/game';
import { Users, CheckCircle2, Flame, ShieldAlert } from 'lucide-react';

interface Props {
  fighter: MemeFighterStats;
  opponent: MemeFighterStats;
  isSelected: boolean;
  onSelect: () => void;
  position: 'left' | 'right';
  isRoundActive: boolean;
  isCrashed: boolean;
  isWinner: boolean;
}

export function MemeFighterCard({
  fighter,
  opponent,
  isSelected,
  onSelect,
  position,
  isRoundActive,
  isCrashed,
  isWinner,
}: Props) {
  const totalSupporters = (fighter.supporters || 0) + (opponent.supporters || 0);
  const supportPercent = totalSupporters > 0
    ? Math.round((fighter.supporters / totalSupporters) * 100)
    : 50;

  // Dynamic combat status based on round state
  let combatStatus = 'READY TO CLASH';
  if (isCrashed) {
    combatStatus = isWinner ? 'VICTORIOUS CHAMP' : 'FALLEN IN COMBAT';
  } else if (isRoundActive) {
    combatStatus = position === 'left' ? 'ATTACKING RALLY' : 'COUNTER SURGE';
  }

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-3xl p-4 sm:p-6 transition-all duration-300 cursor-pointer border select-none overflow-hidden ${
        isSelected
          ? 'bg-slate-900/90 border-2 border-amber-400 shadow-xl shadow-amber-500/10 scale-[1.02]'
          : 'bg-slate-900/50 border-slate-800/90 hover:border-slate-700/80 hover:bg-slate-900/70'
      }`}
    >
      {/* Background Accent Ambient Glow */}
      <div
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: fighter.color }}
      />

      {/* Header Faction Tag & Selection status */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="px-2.5 py-1 text-[10px] font-black tracking-wider uppercase rounded-lg border"
          style={{
            backgroundColor: `${fighter.color}15`,
            borderColor: `${fighter.color}40`,
            color: fighter.color
          }}
        >
          {fighter.category}
        </span>

        {isSelected ? (
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SELECTED</span>
          </span>
        ) : (
          <span className="text-[11px] font-semibold text-slate-500 hover:text-slate-300">
            Click to back
          </span>
        )}
      </div>

      {/* Avatar & Main Fighter Info */}
      <div className="flex flex-col items-center text-center py-2">
        <div
          className={`relative p-3 rounded-2xl mb-3 transition-transform duration-300 ${
            isRoundActive ? 'scale-110 animate-pulse' : ''
          }`}
          style={{ backgroundColor: `${fighter.color}18` }}
        >
          <MemeSvg id={fighter.id} className="w-20 h-20 sm:w-24 sm:h-24" />

          {/* Active battle status indicator */}
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-[9px] font-bold text-slate-300 flex items-center gap-1 shadow">
            {isCrashed ? (
              <ShieldAlert className="w-2.5 h-2.5 text-rose-400" />
            ) : (
              <Flame className="w-2.5 h-2.5 text-amber-400 animate-spin" />
            )}
            <span>{combatStatus}</span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {fighter.name}
        </h3>
        <p className="text-xs text-slate-400 italic line-clamp-1 mt-0.5">
          &quot;{fighter.tagline}&quot;
        </p>
      </div>

      {/* Support Percentage Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
          <div className="flex items-center gap-1 text-slate-300">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{fighter.supporters.toLocaleString()} supporters</span>
          </div>
          <span style={{ color: fighter.color }}>{supportPercent}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${supportPercent}%`,
              backgroundColor: fighter.color
            }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-medium">
          <span>Staked: {fighter.totalStaked.toLocaleString()} VC</span>
          <span>{position === 'left' ? 'Faction Alpha' : 'Faction Beta'}</span>
        </div>
      </div>

      {/* Select Faction CTA */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`w-full mt-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border ${
          isSelected
            ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
            : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700/60'
        }`}
      >
        {isSelected ? `Backing Team ${fighter.name}` : `Join Team ${fighter.name}`}
      </button>
    </div>
  );
}
