'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Coins, CheckCircle, ArrowRight, Zap, AlertCircle } from 'lucide-react';

export function StakeController() {
  const {
    round,
    user,
    userBet,
    selectedFaction,
    setSelectedFaction,
    stakeAmount,
    setStakeAmount,
    placeBet,
    cashOut,
  } = useGame();

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isEntryOpen = round.state === 'WAITING' || round.state === 'COUNTDOWN';
  const isRoundActive = round.state === 'ACTIVE';

  const quickStakes = [25, 50, 100, 250, 500];

  const handlePlaceBet = () => {
    const res = placeBet();
    setFeedback({ type: res.success ? 'success' : 'error', text: res.message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleCashOut = () => {
    const res = cashOut();
    setFeedback({ type: res.success ? 'success' : 'error', text: res.message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Potential payout calculation
  const potentialPayout = userBet
    ? Math.floor(userBet.amount * round.multiplier)
    : Math.floor(stakeAmount * round.multiplier);

  const selectedMeme = round.memeA.id === selectedFaction ? round.memeA : round.memeB;

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl">
      {/* Title & Balance Overview */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-wider">
            Stake Controls
          </h4>
          <span className="text-[10px] text-slate-400">
            Virtual Credits Only • No Monetary Value
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 font-medium">Available: </span>
          <span className="text-xs font-black text-amber-300">
            {user.credits.toLocaleString()} VC
          </span>
        </div>
      </div>

      {/* Faction Tabs */}
      <div className="mb-4">
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Chosen Faction
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={userBet !== null}
            onClick={() => setSelectedFaction(round.memeA.id)}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border ${
              selectedFaction === round.memeA.id
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/80 shadow-md shadow-amber-500/10'
                : 'bg-slate-800/40 text-slate-400 border-slate-800 hover:bg-slate-800/70'
            } ${userBet ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <span>{round.memeA.name}</span>
            {selectedFaction === round.memeA.id && <CheckCircle className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            disabled={userBet !== null}
            onClick={() => setSelectedFaction(round.memeB.id)}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border ${
              selectedFaction === round.memeB.id
                ? 'bg-rose-500/20 text-rose-300 border-rose-400/80 shadow-md shadow-rose-500/10'
                : 'bg-slate-800/40 text-slate-400 border-slate-800 hover:bg-slate-800/70'
            } ${userBet ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <span>{round.memeB.name}</span>
            {selectedFaction === round.memeB.id && <CheckCircle className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Stake Amount Input & Quick Chips */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Stake Amount (VC)
          </label>
          <span className="text-[10px] text-slate-500 font-medium">Min: 5 VC</span>
        </div>

        <div className="relative mb-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <input
            type="number"
            min={5}
            max={user.credits}
            disabled={userBet !== null}
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full pl-9 pr-14 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-white font-bold text-sm focus:outline-none transition-colors"
          />
          <button
            type="button"
            disabled={userBet !== null}
            onClick={() => setStakeAmount(Math.min(user.credits, 1000))}
            className="absolute right-2 top-2 px-2 py-1 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-md transition-colors"
          >
            MAX
          </button>
        </div>

        {/* Quick Amount Chips */}
        <div className="flex flex-wrap gap-1.5">
          {quickStakes.map(amt => (
            <button
              key={amt}
              type="button"
              disabled={userBet !== null || user.credits < amt}
              onClick={() => setStakeAmount(amt)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                stakeAmount === amt
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/60'
                  : 'bg-slate-800/40 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              +{amt}
            </button>
          ))}
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="mt-5 space-y-2">
        {userBet && userBet.status === 'active' && isRoundActive ? (
          // ACTIVE CASHOUT BUTTON
          <button
            type="button"
            onClick={handleCashOut}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base uppercase tracking-wider shadow-lg shadow-emerald-500/25 animate-pulse transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 fill-slate-950" />
            <span>CASH OUT @ {round.multiplier.toFixed(2)}x (+{potentialPayout} VC)</span>
          </button>
        ) : userBet && userBet.status === 'cashed_out' ? (
          // ALREADY CASHED OUT
          <div className="w-full py-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-center text-sm flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Cashed out at {userBet.cashedOutAt?.toFixed(2)}x! (+{userBet.payout} VC)</span>
          </div>
        ) : userBet && userBet.status === 'crashed' ? (
          // CRASHED
          <div className="w-full py-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-center text-sm flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Round crashed before cashout. Stake lost.</span>
          </div>
        ) : userBet && isEntryOpen ? (
          // BET PLACED WAITING FOR START
          <div className="w-full py-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-center text-sm">
            <span>Staked {userBet.amount} VC on {selectedMeme.name}! Round starting soon...</span>
          </div>
        ) : isEntryOpen ? (
          // PLACE STAKE BUTTON
          <button
            type="button"
            onClick={handlePlaceBet}
            disabled={user.credits < stakeAmount || stakeAmount <= 0}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Back {selectedMeme.name} ({stakeAmount} VC)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          // ROUND LOCKED / ACTIVE BUT NOT ENTERED
          <div className="w-full py-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-slate-400 font-semibold text-center text-xs">
            <span>Entries locked for Round #{round.roundNumber}. Next round shortly!</span>
          </div>
        )}

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-2.5 rounded-xl text-xs font-semibold text-center ${
              feedback.type === 'success'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
            }`}
          >
            {feedback.text}
          </div>
        )}
      </div>
    </div>
  );
}
