'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { MEME_ROSTER, MemeFighter } from '@/lib/memeRoster';
import { MemeSvg } from '@/components/memes/MemeSvg';
import { Trophy, Flame, Swords, Star, CheckCircle, ArrowRight } from 'lucide-react';

export function MemeCollectionView() {
  const { setSelectedFaction, setActiveTab } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMemeModal, setSelectedMemeModal] = useState<MemeFighter | null>(null);

  const categories = ['All', 'OG Classics', 'Modern Brainrot', 'Animal Legends', 'Chad Tier'];

  const filteredMemes = selectedCategory === 'All'
    ? MEME_ROSTER
    : MEME_ROSTER.filter(m => m.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl bg-slate-900/80 border border-slate-800 p-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Meme Hall of Fame & Roster
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Browse the 8 official fighters of the MemeChamp multiverse. Check combat records and lore.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredMemes.map(meme => {
          const winRate = Math.round((meme.wins / meme.battles) * 100);

          return (
            <div
              key={meme.id}
              onClick={() => setSelectedMemeModal(meme)}
              className="rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 p-5 cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                {/* Header Category and Popularity */}
                <div className="flex items-center justify-between text-[10px] mb-3">
                  <span
                    className="px-2 py-0.5 rounded-md font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${meme.color}20`, color: meme.color }}
                  >
                    {meme.category}
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {meme.popularity}% Pop
                  </span>
                </div>

                {/* Avatar SVG */}
                <div className="flex flex-col items-center text-center py-2">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center p-2 mb-3 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${meme.color}15` }}
                  >
                    <MemeSvg id={meme.id} className="w-16 h-16" />
                  </div>
                  <h3 className="text-lg font-black text-white">{meme.name}</h3>
                  <p className="text-xs text-slate-400 italic line-clamp-1 mt-0.5">
                    &quot;{meme.tagline}&quot;
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-2">
                  {meme.description}
                </p>
              </div>

              {/* Stats Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400">Combat Record</span>
                  <span className="font-bold text-white">{meme.wins}W / {meme.battles - meme.wins}L</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Win Rate</span>
                  <span className="font-mono font-bold text-emerald-400">{winRate}%</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFaction(meme.id);
                    setActiveTab('battle');
                  }}
                  className="w-full mt-3 py-2 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 font-bold text-xs uppercase tracking-wider text-slate-300 transition-all flex items-center justify-center gap-1.5"
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>Back in Arena</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lore Details Modal */}
      {selectedMemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedMemeModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col items-center text-center">
              <div
                className="w-24 h-24 rounded-3xl p-3 mb-4"
                style={{ backgroundColor: `${selectedMemeModal.color}20` }}
              >
                <MemeSvg id={selectedMemeModal.id} className="w-full h-full" />
              </div>

              <span
                className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-1"
                style={{ backgroundColor: `${selectedMemeModal.color}20`, color: selectedMemeModal.color }}
              >
                {selectedMemeModal.category}
              </span>

              <h3 className="text-2xl font-black text-white">{selectedMemeModal.name}</h3>
              <p className="text-xs text-slate-400 italic mt-0.5">&quot;{selectedMemeModal.tagline}&quot;</p>

              <p className="text-xs text-slate-300 leading-relaxed text-left mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                {selectedMemeModal.description}
              </p>

              <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Wins</span>
                  <span className="font-mono text-sm font-bold text-amber-400">{selectedMemeModal.wins}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Battles</span>
                  <span className="font-mono text-sm font-bold text-white">{selectedMemeModal.battles}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Popularity</span>
                  <span className="font-mono text-sm font-bold text-purple-400">{selectedMemeModal.popularity}%</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedFaction(selectedMemeModal.id);
                  setSelectedMemeModal(null);
                  setActiveTab('battle');
                }}
                className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Swords className="w-4 h-4" />
                <span>Join Faction {selectedMemeModal.name}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
