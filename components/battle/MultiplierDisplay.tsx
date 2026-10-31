'use client';

import React from 'react';
import { RoundData } from '@/types/game';
import { Zap, AlertTriangle, Clock, Trophy } from 'lucide-react';

interface Props {
  round: RoundData;
}

export function MultiplierDisplay({ round }: Props) {
  const { state, multiplier, countdownSeconds, crashPoint } = round;

  // Determine state display
  let badgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  let badgeText = 'WAITING FOR PLAYERS';
  let badgeIcon = Clock;

  if (state === 'COUNTDOWN') {
    badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    badgeText = `STARTING IN ${countdownSeconds || 3}s`;
    badgeIcon = Clock;
  } else if (state === 'ACTIVE') {
    badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 animate-pulse';
    badgeText = 'BATTLE IN PROGRESS';
    badgeIcon = Zap;
  } else if (state === 'CRASHED') {
    badgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    badgeText = `CRASHED AT ${multiplier.toFixed(2)}x`;
    badgeIcon = AlertTriangle;
  } else if (state === 'SETTLED') {
    badgeColor = 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    badgeText = 'ROUND SETTLED';
    badgeIcon = Trophy;
  }

  const BadgeIcon = badgeIcon;

  // Trajectory arc math
  // Multiplier from 1.00 to 10.00 mapped to SVG curve
  const progressNorm = Math.min(1, Math.max(0, (multiplier - 1.0) / 6.0));
  const arcLength = 280;
  const strokeDashoffset = arcLength * (1 - progressNorm);

  return (
    <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl overflow-hidden min-h-[260px] select-none">
      {/* Background Radial Glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none opacity-20 ${
          state === 'CRASHED'
            ? 'bg-gradient-to-t from-rose-600 via-rose-900/20 to-transparent'
            : state === 'ACTIVE'
            ? 'bg-gradient-to-t from-emerald-600/30 via-cyan-900/20 to-transparent'
            : 'bg-gradient-to-t from-amber-600/20 via-transparent to-transparent'
        }`}
      />

      {/* SVG Arc Trajectory Visualizer */}
      <div className="absolute top-4 w-72 h-36 overflow-hidden pointer-events-none opacity-40">
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
          <path
            d="M 20 90 Q 100 20 180 90"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 20 90 Q 100 20 180 90"
            stroke={state === 'CRASHED' ? '#F43F5E' : '#00F5D4'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-100 ease-linear"
          />
        </svg>
      </div>

      {/* State Badge */}
      <div className={`relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border mb-3 ${badgeColor}`}>
        <BadgeIcon className="w-3.5 h-3.5" />
        <span>{badgeText}</span>
      </div>

      {/* Center Main Value */}
      <div className="relative z-10 flex flex-col items-center">
        {state === 'COUNTDOWN' ? (
          <div className="flex flex-col items-center my-2">
            <span className="text-6xl sm:text-7xl font-black text-amber-400 tracking-tight animate-bounce">
              {countdownSeconds || 3}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
              LOCKING IN FACTIONS
            </span>
          </div>
        ) : state === 'CRASHED' ? (
          <div className="flex flex-col items-center my-2">
            <span className="text-5xl sm:text-7xl font-black text-rose-500 tracking-tight animate-pulse">
              {multiplier.toFixed(2)}x
            </span>
            <span className="text-xs font-black text-rose-400 tracking-widest uppercase mt-1">
              ROUND CRASHED
            </span>
          </div>
        ) : state === 'WAITING' ? (
          <div className="flex flex-col items-center my-2">
            <span className="text-4xl sm:text-5xl font-black text-slate-400 tracking-tight">
              1.00x
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
              PREPARING MATCHUP
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center my-2">
            <span className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-300 tracking-tight tabular-nums drop-shadow-[0_0_25px_rgba(0,245,212,0.35)]">
              {multiplier.toFixed(2)}x
            </span>
            <span className="text-xs font-black text-cyan-400 tracking-widest uppercase mt-1">
              RISING MULTIPLIER
            </span>
          </div>
        )}
      </div>

      {/* Round Metadata and Provably Fair Hash Preview */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-sm mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-medium">
        <span>Round #{round.roundNumber}</span>
        <span className="font-mono text-[10px] text-slate-500">
          Hash: {round.serverHash.slice(0, 8)}...{round.serverHash.slice(-6)}
        </span>
      </div>
    </div>
  );
}
