'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { DEMO_LEADERBOARD } from '@/lib/demoData';
import { MemeSvg } from '@/components/memes/MemeSvg';
import { Trophy, Medal, Award, Flame, Zap, Coins, TrendingUp } from 'lucide-react';

export function LeaderboardView() {
  const { setViewingProfile, user } = useGame();
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'all'>('all');
  const [metricFilter, setMetricFilter] = useState<'credits' | 'multiplier' | 'wins'>('credits');

  // Sort and filter entries
  const sortedEntries = [...DEMO_LEADERBOARD].sort((a, b) => {
    if (metricFilter === 'multiplier') {
      return b.highestMultiplier - a.highestMultiplier;
    }
    if (metricFilter === 'wins') {
      return b.wins - a.wins;
    }
    return b.creditsWon - a.creditsWon;
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-amber-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-300" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="font-black text-slate-500 text-sm">#{rank}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl bg-slate-900/80 border border-slate-800 p-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Championship Leaderboard
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Top players across the meme multiverse. Click any player to view their battle profile.
          </p>
        </div>

        {/* Time Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {(['today', 'week', 'all'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setTimeFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                timeFilter === tab
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'today' ? 'Today' : tab === 'week' ? 'This Week' : 'All-Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setMetricFilter('credits')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold border transition-all ${
            metricFilter === 'credits'
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/80'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-900'
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          <span>Total Virtual Credits Won</span>
        </button>

        <button
          onClick={() => setMetricFilter('multiplier')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold border transition-all ${
            metricFilter === 'multiplier'
              ? 'bg-purple-500/20 text-purple-300 border-purple-400/80'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Highest Multiplier Record</span>
        </button>

        <button
          onClick={() => setMetricFilter('wins')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold border transition-all ${
            metricFilter === 'wins'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/80'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Most Clashes Won</span>
        </button>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 font-bold text-center w-16">Rank</th>
                <th className="py-3.5 px-4 font-bold">Champion</th>
                <th className="py-3.5 px-4 font-bold">Favorite Faction</th>
                <th className="py-3.5 px-4 font-bold text-right">Win Rate</th>
                <th className="py-3.5 px-4 font-bold text-right">High Multiplier</th>
                <th className="py-3.5 px-4 font-bold text-right">VC Won</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sortedEntries.map((player, index) => {
                const rank = index + 1;
                const isCurrent = player.uid === user.uid;

                return (
                  <tr
                    key={player.uid}
                    onClick={() => {
                      setViewingProfile({
                        uid: player.uid,
                        username: player.username,
                        displayName: player.displayName,
                        avatar: player.avatar,
                        credits: player.totalCredits,
                        wins: player.wins,
                        losses: player.gamesPlayed - player.wins,
                        gamesPlayed: player.gamesPlayed,
                        highestMultiplier: player.highestMultiplier,
                        favoriteFaction: player.favoriteFaction,
                        role: 'player',
                        createdAt: Date.now() - 86400000 * 10,
                        updatedAt: Date.now()
                      });
                    }}
                    className={`hover:bg-slate-800/40 cursor-pointer transition-colors ${
                      isCurrent ? 'bg-amber-500/10' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex justify-center items-center">
                        {getRankBadge(rank)}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-800 p-1 flex-shrink-0">
                          <MemeSvg id={player.avatar} className="w-full h-full" />
                        </div>
                        <div>
                          <span className="font-bold text-white block text-sm">
                            {player.displayName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            @{player.username}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-950 border border-slate-800 text-slate-300">
                        {player.favoriteFaction}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="font-bold text-slate-200">
                        {player.winRate}%
                      </span>
                      <span className="block text-[10px] text-slate-500">
                        ({player.wins}/{player.gamesPlayed})
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-purple-400 text-sm">
                      {player.highestMultiplier.toFixed(2)}x
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-400 text-sm">
                      +{player.creditsWon.toLocaleString()} <span className="text-[10px] text-amber-500">VC</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
