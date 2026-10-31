'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { Volume2, VolumeX, ShieldCheck, Sparkles, Sliders, Bell } from 'lucide-react';

export function SettingsView() {
  const { isMuted, toggleSound, isTestMode, setIsTestMode } = useGame();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8">
        <h2 className="text-xl font-black text-white uppercase tracking-tight mb-1">
          Settings & Preferences
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Customize your MemeChamp experience, audio feedback, and compliance details.
        </p>

        <div className="space-y-4">
          {/* Sound Mute */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-800 text-cyan-400">
                {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
              </div>
              <div>
                <span className="font-bold text-white text-sm block">Synthesized Audio Effects</span>
                <span className="text-xs text-slate-400">
                  Countdown beeps, multiplier rising ticks, cashout chimes, and crash rumbles.
                </span>
              </div>
            </div>

            <button
              onClick={toggleSound}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isMuted
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {isMuted ? 'Muted' : 'Enabled'}
            </button>
          </div>

          {/* Test Mode */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-800 text-amber-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block">Deterministic Test Mode</span>
                <span className="text-xs text-slate-400">
                  Allows manual control of crash points for debugging and game simulation.
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsTestMode(!isTestMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isTestMode
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isTestMode ? 'Active' : 'Off'}
            </button>
          </div>

          {/* Compliance & Virtual Credits Policy */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-bold text-xs uppercase tracking-wider">
                Virtual Economy Compliance Rules
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              MemeChamp operates strictly on virtual credits (VC). There is no mechanism to purchase, deposit, withdraw, convert, or exchange credits for real currency or physical goods. Virtual credits are for community entertainment and bragging rights only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
