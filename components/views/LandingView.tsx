'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { MemeChampLogo } from '@/components/brand/MemeChampLogo';
import { MemeSvg } from '@/components/memes/MemeSvg';
import { MEME_ROSTER } from '@/lib/memeRoster';
import { Swords, Zap, ShieldCheck, Trophy, Sparkles, ArrowRight, Play, Users, Coins } from 'lucide-react';

export function LandingView() {
  const { setActiveTab, round } = useGame();

  const steps = [
    {
      step: '01',
      title: 'Pick a Meme Faction',
      desc: 'Choose your side in legendary internet matchups like Doge vs Pepe, Chill Guy vs Wojak, or Gigachad vs NPC.',
      icon: Users
    },
    {
      step: '02',
      title: 'Commit Virtual Credits',
      desc: 'Lock in your free virtual credits (1,000 free VC on registration, no real money ever).',
      icon: Coins
    },
    {
      step: '03',
      title: 'Watch Multiplier Rocket',
      desc: 'The round multiplier rises exponentially from 1.00x upwards in real time as memes battle.',
      icon: Zap
    },
    {
      step: '04',
      title: 'Cash Out Before the Crash',
      desc: 'Hit Cash Out to secure your multiplier payout before the round suddenly crashes! Provably fair.',
      icon: Trophy
    }
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
        {/* Ambient background glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Live Battle Ticker Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">Live Battle Now:</span>
          <span className="text-amber-400 font-semibold">{round.memeA.name}</span>
          <span className="text-slate-500 font-black">VS</span>
          <span className="text-rose-400 font-semibold">{round.memeB.name}</span>
          <span className="text-emerald-400 font-mono font-bold">({round.multiplier.toFixed(2)}x)</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
          MULTIPLAYER MEME BATTLES. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400">
            RISING CRASH MULTIPLIERS.
          </span>
        </h1>

        <p className="mt-5 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Back your favorite meme faction in high-stakes multiplayer clashes. Watch the multiplier soar, test your nerve, and cash out before the crash.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('battle')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 hover:from-amber-300 hover:to-purple-400 text-slate-950 font-black text-base uppercase tracking-wider shadow-xl shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>PLAY NOW IN ARENA</span>
          </button>

          <button
            onClick={() => setActiveTab('memes')}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Meme Roster</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust & Compliance Sub-bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            1,000 Free Virtual Credits On Signup
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Provably Fair Cryptographic Seeds
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Virtual Credits Only (No Monetary Value)
          </span>
        </div>
      </div>

      {/* How it Works Section */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-black tracking-widest text-rose-400 uppercase">
            Game Mechanics
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            HOW MEMECHAMP WORKS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Easy to learn, thrilling to master. Strategy meets internet meme culture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(s => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden group hover:border-slate-700 transition-all"
              >
                <div className="text-3xl font-black text-slate-800 group-hover:text-slate-700 transition-colors mb-3">
                  {s.step}
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-amber-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Meme Fighters Showcase */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              LEGENDARY MEME FIGHTERS
            </h2>
            <p className="text-xs text-slate-400">
              Pick your loyalties. Each meme brings unique internet history and community backing.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('memes')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View All (8)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MEME_ROSTER.slice(0, 4).map(m => (
            <div
              key={m.id}
              onClick={() => setActiveTab('battle')}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 cursor-pointer transition-all flex flex-col items-center text-center group"
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center p-2 mb-3 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${m.color}15` }}
              >
                <MemeSvg id={m.id} className="w-12 h-12" />
              </div>
              <h4 className="font-bold text-white text-sm">{m.name}</h4>
              <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{m.tagline}</span>
              <div className="mt-3 text-[10px] text-amber-400 font-bold bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                {m.wins} Battles Won
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
