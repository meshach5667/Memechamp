'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { RoundData } from '@/types/game';
import { MemeSvg } from '@/components/memes/MemeSvg';
import { History, ShieldCheck, Check, Copy, ChevronRight, Zap } from 'lucide-react';

export function HistoryView() {
  const { recentRounds } = useGame();
  const [selectedRound, setSelectedRound] = useState<Partial<RoundData> | null>(recentRounds[0] || null);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Arena Clash History
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Archived rounds with crash multipliers, winners, and cryptographic seeds.
          </p>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          {recentRounds.length} Recorded Rounds
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rounds List */}
        <div className="lg:col-span-7 space-y-3">
          {recentRounds.map(r => {
            const isSelected = selectedRound?.id === r.id;
            const mult = r.crashPoint || 1.0;
            const isHigh = mult >= 2.0;

            return (
              <div
                key={r.id}
                onClick={() => setSelectedRound(r)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400/80 ring-1 ring-amber-400/30 shadow-lg'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black text-slate-500 w-16">
                    #{r.roundNumber}
                  </span>
                  <div className="flex items-center gap-2">
                    {r.memeA && <MemeSvg id={r.memeA.id} className="w-6 h-6" />}
                    <span className="font-bold text-xs text-white">{r.memeA?.name}</span>
                    <span className="text-[10px] text-slate-500 font-black">VS</span>
                    {r.memeB && <MemeSvg id={r.memeB.id} className="w-6 h-6" />}
                    <span className="font-bold text-xs text-white">{r.memeB?.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`font-mono font-black text-sm block ${isHigh ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {mult.toFixed(2)}x
                    </span>
                    <span className="text-[10px] text-slate-500 capitalize">
                      Won by {r.winningFaction || r.memeA?.name}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Round Detail Drawer */}
        <div className="lg:col-span-5">
          {selectedRound ? (
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sticky top-20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">
                    Round Audit
                  </span>
                  <h3 className="text-lg font-black text-white">
                    Round #{selectedRound.roundNumber} Detail
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-rose-400 font-mono">
                    {selectedRound.crashPoint?.toFixed(2)}x
                  </span>
                  <span className="block text-[10px] text-slate-500">Crashed Multiplier</span>
                </div>
              </div>

              {/* Matchup Banner */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-around text-center">
                <div>
                  {selectedRound.memeA && <MemeSvg id={selectedRound.memeA.id} className="w-12 h-12 mx-auto mb-1" />}
                  <span className="font-bold text-white text-xs block">{selectedRound.memeA?.name}</span>
                  <span className="text-[10px] text-slate-500">{selectedRound.memeA?.supporters} Supporters</span>
                </div>
                <div className="text-xs font-black text-slate-600">VS</div>
                <div>
                  {selectedRound.memeB && <MemeSvg id={selectedRound.memeB.id} className="w-12 h-12 mx-auto mb-1" />}
                  <span className="font-bold text-white text-xs block">{selectedRound.memeB?.name}</span>
                  <span className="text-[10px] text-slate-500">{selectedRound.memeB?.supporters} Supporters</span>
                </div>
              </div>

              {/* AI Recap */}
              {selectedRound.aiCommentary && (
                <div className="p-3 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 italic leading-relaxed">
                  &quot;{selectedRound.aiCommentary}&quot;
                </div>
              )}

              {/* Provably Fair Cryptographic Details */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div>
                  <span className="font-sans text-[10px] text-slate-500 font-bold block mb-0.5">
                    Pre-Commitment SHA-256 Hash:
                  </span>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-300 break-all select-all flex items-center justify-between">
                    <span>{selectedRound.serverHash}</span>
                    <button
                      onClick={() => handleCopy(selectedRound.serverHash || '')}
                      className="ml-1 p-1 hover:text-white"
                      title="Copy"
                    >
                      {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="font-sans text-[10px] text-slate-500 font-bold block mb-0.5">
                    Revealed Server Seed:
                  </span>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-emerald-400 break-all select-all">
                    {selectedRound.serverSeed || 'Revealed post-round'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-slate-900/40 border border-slate-800 p-8 text-center text-slate-500 text-xs">
              Select a round from the left to inspect its complete audit and replay data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
