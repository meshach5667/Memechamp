'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { MemeSvg } from '@/components/memes/MemeSvg';
import { Users, Check, AlertCircle } from 'lucide-react';

export function LiveBetsRoster() {
  const { activeRoundBets, round, user, setViewingProfile } = useGame();

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5 flex flex-col h-[400px]">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">
            Round Participants ({activeRoundBets.length})
          </h4>
        </div>
        <span className="text-[10px] text-slate-500 font-medium">Active Stakes</span>
      </div>

      <div className="space-y-2 overflow-y-auto pr-1 flex-1 text-xs">
        {activeRoundBets.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            No entries placed yet. Be the first to back a meme!
          </div>
        ) : (
          activeRoundBets.map(bet => {
            const isOwn = bet.uid === user.uid;
            const isCashed = bet.status === 'cashed_out';
            const isCrashed = bet.status === 'crashed';

            return (
              <div
                key={bet.id}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                  isCashed
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : isCrashed
                    ? 'bg-rose-950/20 border-rose-500/20'
                    : 'bg-slate-950/50 border-slate-800/80'
                } ${isOwn ? 'ring-1 ring-amber-400/50' : ''}`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <MemeSvg id={bet.avatar} className="w-6 h-6" />
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setViewingProfile({
                          uid: bet.uid,
                          username: bet.username,
                          displayName: bet.username,
                          avatar: bet.avatar,
                          credits: 12000,
                          wins: 48,
                          losses: 22,
                          gamesPlayed: 70,
                          highestMultiplier: bet.cashedOutAt || 4.2,
                          favoriteFaction: bet.faction,
                          role: 'player',
                          createdAt: Date.now() - 86400000 * 4,
                          updatedAt: Date.now()
                        });
                      }}
                      className="font-bold text-slate-200 hover:text-amber-300 text-left block text-xs"
                    >
                      {bet.username} {isOwn && <span className="text-amber-400">(You)</span>}
                    </button>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Team {bet.faction}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-slate-200 text-xs">
                    {bet.amount} VC
                  </div>
                  {isCashed ? (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-400">
                      <Check className="w-3 h-3" />
                      {bet.cashedOutAt?.toFixed(2)}x (+{bet.payout})
                    </span>
                  ) : isCrashed ? (
                    <span className="text-[10px] font-semibold text-rose-400">
                      Crashed
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-amber-400 animate-pulse">
                      In Play
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
