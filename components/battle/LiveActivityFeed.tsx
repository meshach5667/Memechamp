'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { ActivityItem } from '@/types/game';
import { Zap, UserPlus, AlertOctagon, Trophy, Radio } from 'lucide-react';

export function LiveActivityFeed() {
  const { activityFeed, setViewingProfile, user } = useGame();

  const getEventIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'cashout':
        return <Zap className="w-3.5 h-3.5 text-emerald-400" />;
      case 'join':
        return <UserPlus className="w-3.5 h-3.5 text-cyan-400" />;
      case 'crash':
        return <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />;
      case 'reward':
        return <Trophy className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Radio className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5 flex flex-col h-[400px]">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">
            Live Arena Feed
          </h4>
        </div>
        <span className="text-[10px] text-slate-500 font-medium">Real-time Stream</span>
      </div>

      <div className="space-y-2 overflow-y-auto pr-1 flex-1 text-xs">
        {activityFeed.map((item) => {
          const isOwn = item.username === user.username;
          return (
            <div
              key={item.id}
              className={`p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                item.type === 'cashout'
                  ? 'bg-emerald-950/20 border-emerald-500/20 text-slate-200'
                  : item.type === 'crash'
                  ? 'bg-rose-950/20 border-rose-500/20 text-rose-200'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-300'
              } ${isOwn ? 'ring-1 ring-amber-400/40' : ''}`}
            >
              <div className="mt-0.5 flex-shrink-0 p-1 rounded-lg bg-slate-900 border border-slate-800">
                {getEventIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span
                    onClick={() => {
                      if (item.username && item.username !== 'SYSTEM') {
                        setViewingProfile({
                          uid: `user_${item.username}`,
                          username: item.username,
                          displayName: item.username,
                          avatar: item.faction || 'doge',
                          credits: 5000,
                          wins: 32,
                          losses: 14,
                          gamesPlayed: 46,
                          highestMultiplier: item.multiplier || 3.5,
                          favoriteFaction: item.faction || 'doge',
                          role: 'player',
                          createdAt: Date.now() - 86400000 * 3,
                          updatedAt: Date.now()
                        });
                      }
                    }}
                    className={`font-bold cursor-pointer hover:underline truncate ${
                      isOwn ? 'text-amber-300' : 'text-slate-200'
                    }`}
                  >
                    {item.username}
                  </span>
                  <span className="text-[10px] text-slate-500 whitespace-nowrap">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <p className="text-[11px] leading-snug text-slate-300 break-words">
                  {item.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
