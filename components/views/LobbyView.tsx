'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { MemeSvg } from '@/components/memes/MemeSvg';
import { MEME_ROSTER, MATCHUP_PAIRS } from '@/lib/memeRoster';
import { Swords, ArrowRight, Zap, Trophy, Users, Flame, Clock } from 'lucide-react';

export function LobbyView() {
  const { setActiveTab, round, setSelectedFaction } = useGame();

  return (
    <div className="space-y-8">
      {/* Lobby Hero: Active Featured Clash Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-black tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span>MAIN ARENA • ROUND #{round.roundNumber}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {round.memeA.name} <span className="text-amber-400">VS</span> {round.memeB.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live multiplier is at <strong className="text-emerald-400 font-mono text-base">{round.multiplier.toFixed(2)}x</strong>. {round.memeA.supporters + round.memeB.supporters} total fighters in arena!
            </p>

            <div className="mt-5 flex flex-wrap gap-3 justify-center sm:justify-start">
              <button
                onClick={() => {
                  setSelectedFaction(round.memeA.id);
                  setActiveTab('battle');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Back {round.memeA.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setSelectedFaction(round.memeB.id);
                  setActiveTab('battle');
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Back {round.memeB.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Dual Avatar Clash */}
          <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex flex-col items-center">
              <MemeSvg id={round.memeA.id} className="w-16 h-16" />
              <span className="text-xs font-bold text-white mt-1">{round.memeA.name}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-black text-rose-400">
              VS
            </div>
            <div className="flex flex-col items-center">
              <MemeSvg id={round.memeB.id} className="w-16 h-16" />
              <span className="text-xs font-bold text-white mt-1">{round.memeB.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Upcoming Battles & Faction Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Battle Queue */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-slate-800 p-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Upcoming Arena Matchups
              </h3>
            </div>
            <span className="text-[10px] text-slate-500">Auto-Rotating Queue</span>
          </div>

          <div className="space-y-3">
            {MATCHUP_PAIRS.slice(1, 5).map((pair, idx) => {
              const mA = MEME_ROSTER.find(m => m.id === pair[0]) || MEME_ROSTER[0];
              const mB = MEME_ROSTER.find(m => m.id === pair[1]) || MEME_ROSTER[1];

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600">#{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <MemeSvg id={mA.id} className="w-8 h-8" />
                      <span className="font-bold text-white text-xs">{mA.name}</span>
                      <span className="text-slate-500 text-xs font-black">vs</span>
                      <MemeSvg id={mB.id} className="w-8 h-8" />
                      <span className="font-bold text-white text-xs">{mB.name}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-md border border-cyan-500/20">
                    Queue #{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Faction Power Rankings */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900/80 border border-slate-800 p-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Faction Power Index
              </h3>
            </div>
            <span className="text-[10px] text-slate-500">Global Win Rates</span>
          </div>

          <div className="space-y-3">
            {[...MEME_ROSTER]
              .sort((a, b) => b.wins - a.wins)
              .slice(0, 5)
              .map((meme, idx) => {
                const winRate = Math.round((meme.wins / meme.battles) * 100);
                return (
                  <div
                    key={meme.id}
                    onClick={() => {
                      setSelectedFaction(meme.id);
                      setActiveTab('battle');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-black text-amber-400 w-4">#{idx + 1}</span>
                      <MemeSvg id={meme.id} className="w-7 h-7" />
                      <div>
                        <span className="font-bold text-xs text-white block">{meme.name}</span>
                        <span className="text-[10px] text-slate-400">{meme.wins} Battles Won</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-xs text-emerald-400">
                      {winRate}% WR
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
