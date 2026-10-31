'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { MEME_ROSTER } from '@/lib/memeRoster';
import { MemeSvg } from '@/components/memes/MemeSvg';
import { Shield, Play, Sliders, CheckCircle, AlertTriangle, RefreshCw, Terminal } from 'lucide-react';

export function AdminView() {
  const {
    isTestMode,
    setIsTestMode,
    nextCrashOverride,
    setNextCrashOverride,
    forceNextRound,
    round,
    activeRoundBets
  } = useGame();

  const [customCrashInput, setCustomCrashInput] = useState<string>('2.50');
  const [feedback, setFeedback] = useState<string | null>(null);

  const testPresets = [1.05, 1.50, 2.00, 3.50, 10.00, 25.00];

  const handleSetOverride = (val: number) => {
    setNextCrashOverride(val);
    setFeedback(`Next round crash point locked to ${val.toFixed(2)}x (Deterministic Mode Active)`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleCustomOverride = () => {
    const parsed = parseFloat(customCrashInput);
    if (!isNaN(parsed) && parsed >= 1.0) {
      handleSetOverride(parsed);
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="rounded-3xl bg-slate-900/90 border border-purple-500/30 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span>Admin & Deterministic Test Console</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                PROVABLY SECURE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Configure deterministic crash points, advance round state, and inspect real-time server parameters.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              forceNextRound();
              setFeedback('Triggered immediate next round transition.');
              setTimeout(() => setFeedback(null), 3000);
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Force Next Round</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs text-center">
          {feedback}
        </div>
      )}

      {/* Deterministic Test Mode Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Deterministic Crash Point Override
              </h3>
            </div>
            {nextCrashOverride && (
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                LOCKED: {nextCrashOverride.toFixed(2)}x
              </span>
            )}
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Select a target crash multiplier to seed the very next round. Ideal for testing instant crashes (1.05x), moderate runs (2.00x), or moonshots (10x+).
          </p>

          <div className="grid grid-cols-3 gap-2">
            {testPresets.map(val => (
              <button
                key={val}
                onClick={() => handleSetOverride(val)}
                className={`py-2 px-3 rounded-xl font-mono font-black text-xs transition-all border ${
                  nextCrashOverride === val
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                {val.toFixed(2)}x
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Custom Multiplier Target
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                min="1.01"
                value={customCrashInput}
                onChange={(e) => setCustomCrashInput(e.target.value)}
                className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-xs"
              />
              <button
                onClick={handleCustomOverride}
                className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Set Crash
              </button>
              {nextCrashOverride && (
                <button
                  onClick={() => setNextCrashOverride(null)}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Current Round Diagnostic & Server State */}
        <div className="lg:col-span-6 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Live Server Diagnostic
              </h3>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 font-sans">Round ID:</span>
              <span className="text-slate-200">{round.id} (#{round.roundNumber})</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 font-sans">State Engine:</span>
              <span className="text-amber-400 font-bold">{round.state}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 font-sans">Current Multiplier:</span>
              <span className="text-emerald-400 font-bold">{round.multiplier.toFixed(2)}x</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 font-sans">Active Stakes Count:</span>
              <span className="text-purple-400 font-bold">{activeRoundBets.length}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 break-all">
              <span className="text-slate-500 font-sans block mb-0.5">Pre-Commitment Hash:</span>
              <span className="text-[10px] text-cyan-400">{round.serverHash}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
