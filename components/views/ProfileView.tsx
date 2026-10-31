'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { MemeSvg } from '@/components/memes/MemeSvg';
import { MEME_ROSTER } from '@/lib/memeRoster';
import {
  Trophy,
  Coins,
  Zap,
  Swords,
  Edit3,
  Check,
  Shield,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

export function ProfileView() {
  const { user, updateUserProfile, ledger, claimDailyReward, canClaimDaily } = useGame();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const [newAvatar, setNewAvatar] = useState(user.avatar);
  const [newFavorite, setNewFavorite] = useState(user.favoriteFaction);
  const [tab, setTab] = useState<'overview' | 'ledger'>('overview');

  const winRate = user.gamesPlayed > 0
    ? Math.round((user.wins / user.gamesPlayed) * 100)
    : 0;

  const handleSave = () => {
    updateUserProfile({
      username: newUsername.trim() || user.username,
      displayName: newDisplayName.trim() || user.displayName,
      avatar: newAvatar,
      favoriteFaction: newFavorite
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Banner */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-24 h-24 rounded-3xl bg-slate-800 p-2 border-2 border-amber-400 shadow-lg shadow-amber-500/10 flex items-center justify-center">
              <MemeSvg id={user.avatar} className="w-20 h-20" />
            </div>

            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h2 className="text-2xl font-black text-white">{user.displayName}</h2>
                {user.role === 'admin' && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold">
                    ADMIN
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">@{user.username}</p>

              <div className="flex flex-wrap items-center gap-2 mt-3 justify-center sm:justify-start">
                <span className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>{user.credits.toLocaleString()} VC</span>
                </span>

                <span className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  Loyal to: {user.favoriteFaction}
                </span>

                {canClaimDaily && (
                  <button
                    onClick={claimDailyReward}
                    className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Claim +250 VC</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">
                Username
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">
                Choose Avatar
              </label>
              <div className="flex flex-wrap gap-2">
                {MEME_ROSTER.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setNewAvatar(m.id)}
                    className={`w-10 h-10 rounded-xl p-1 bg-slate-950 border transition-all ${
                      newAvatar === m.id ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-800'
                    }`}
                  >
                    <MemeSvg id={m.id} className="w-full h-full" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">
                Favorite Faction
              </label>
              <select
                value={newFavorite}
                onChange={(e) => setNewFavorite(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-white font-bold"
              >
                {MEME_ROSTER.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs: Overview vs Transaction Ledger */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tab === 'overview'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Stats & Achievements</span>
        </button>

        <button
          onClick={() => setTab('ledger')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tab === 'ledger'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Virtual Credits Ledger ({ledger.length})</span>
        </button>
      </div>

      {/* Tab 1: Stats Overview */}
      {tab === 'overview' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 text-center">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
              Clashes Played
            </span>
            <span className="text-3xl font-black text-white">{user.gamesPlayed}</span>
            <span className="block text-[11px] text-slate-400 mt-1">{user.wins} Won • {user.losses} Lost</span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 text-center">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
              Win Rate
            </span>
            <span className="text-3xl font-black text-emerald-400">{winRate}%</span>
            <span className="block text-[11px] text-slate-400 mt-1">Multiplier Cashout Rate</span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 text-center">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
              Highest Multiplier
            </span>
            <span className="text-3xl font-black text-purple-400 font-mono">
              {user.highestMultiplier.toFixed(2)}x
            </span>
            <span className="block text-[11px] text-slate-400 mt-1">Personal Peak Record</span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 text-center">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
              Balance
            </span>
            <span className="text-3xl font-black text-amber-400 font-mono">
              {user.credits.toLocaleString()}
            </span>
            <span className="block text-[11px] text-slate-400 mt-1">Virtual Credits (No cash value)</span>
          </div>
        </div>
      )}

      {/* Tab 2: Immutable Virtual Credits Ledger */}
      {tab === 'ledger' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Immutable Credit Ledger
              </h3>
              <p className="text-[11px] text-slate-400">
                Audited transactional history for all virtual credit changes.
              </p>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Tamper-Proof Audit</span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-xs">
            {ledger.map(entry => {
              const isPositive = entry.amount > 0;
              return (
                <div
                  key={entry.id}
                  className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-slate-200">{entry.description}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-slate-900 text-slate-400 border border-slate-800">
                        {entry.type}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {new Date(entry.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className={`font-mono font-bold text-xs ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPositive ? `+${entry.amount}` : entry.amount} VC
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Bal: {entry.balanceAfter.toLocaleString()} VC
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
