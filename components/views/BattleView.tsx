'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { MemeFighterCard } from '@/components/battle/MemeFighterCard';
import { MultiplierDisplay } from '@/components/battle/MultiplierDisplay';
import { StakeController } from '@/components/battle/StakeController';
import { LiveActivityFeed } from '@/components/battle/LiveActivityFeed';
import { LiveBetsRoster } from '@/components/battle/LiveBetsRoster';
import { ProvablyFairCard } from '@/components/battle/ProvablyFairCard';
import { AiCommentaryBanner } from '@/components/battle/AiCommentaryBanner';
import { Flame, History } from 'lucide-react';

export function BattleView() {
  const { round, selectedFaction, setSelectedFaction, recentRounds } = useGame();

  const isRoundActive = round.state === 'ACTIVE';
  const isCrashed = round.state === 'CRASHED';

  return (
    <div className="space-y-6">
      {/* Recent Crash Multipliers Ticker */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none select-none">
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1 flex-shrink-0">
          <History className="w-3.5 h-3.5 text-cyan-400" />
          <span>Recent:</span>
        </div>
        <div className="flex items-center gap-1.5 flex-1 overflow-x-auto">
          {recentRounds.slice(0, 10).map((r, i) => {
            const mult = r.crashPoint || 1.0;
            const isHigh = mult >= 2.0;
            const isMega = mult >= 5.0;

            return (
              <span
                key={r.id || i}
                className={`px-2.5 py-1 rounded-lg font-mono font-black text-xs flex-shrink-0 border transition-all ${
                  isMega
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm shadow-purple-500/20'
                    : isHigh
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700/60'
                }`}
              >
                {mult.toFixed(2)}x
              </span>
            );
          })}
        </div>
      </div>

      {/* Main Battle Clash Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Fighter: Meme A */}
        <div className="lg:col-span-3 flex flex-col">
          <MemeFighterCard
            fighter={round.memeA}
            opponent={round.memeB}
            isSelected={selectedFaction === round.memeA.id}
            onSelect={() => setSelectedFaction(round.memeA.id)}
            position="left"
            isRoundActive={isRoundActive}
            isCrashed={isCrashed}
            isWinner={round.winningFaction === round.memeA.name}
          />
        </div>

        {/* Center Multiplier Arena */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <MultiplierDisplay round={round} />
          <AiCommentaryBanner />
        </div>

        {/* Right Fighter: Meme B */}
        <div className="lg:col-span-3 flex flex-col">
          <MemeFighterCard
            fighter={round.memeB}
            opponent={round.memeA}
            isSelected={selectedFaction === round.memeB.id}
            onSelect={() => setSelectedFaction(round.memeB.id)}
            position="right"
            isRoundActive={isRoundActive}
            isCrashed={isCrashed}
            isWinner={round.winningFaction === round.memeB.name}
          />
        </div>
      </div>

      {/* Stake Controls & Real-Time Feeds Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Stake Controller */}
        <div className="lg:col-span-4">
          <StakeController />
        </div>

        {/* Live Activity Feed */}
        <div className="lg:col-span-4">
          <LiveActivityFeed />
        </div>

        {/* Live Bets Roster */}
        <div className="lg:col-span-4">
          <LiveBetsRoster />
        </div>
      </div>

      {/* Provably Fair Audit Card */}
      <ProvablyFairCard />
    </div>
  );
}
