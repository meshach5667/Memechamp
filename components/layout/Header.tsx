'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { MemeChampLogo } from '@/components/brand/MemeChampLogo';
import { MemeSvg } from '@/components/memes/MemeSvg';
import {
  Volume2,
  VolumeX,
  Bell,
  Coins,
  Sparkles,
  Swords,
  Trophy,
  LayoutGrid,
  History,
  Shield,
  Settings as SettingsIcon,
  User,
  Check,
  Compass
} from 'lucide-react';

export function Header() {
  const {
    activeTab,
    setActiveTab,
    user,
    claimDailyReward,
    canClaimDaily,
    isMuted,
    toggleSound,
    notifications,
    markNotificationRead
  } = useGame();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { id: 'battle', label: 'Battle Arena', icon: Swords },
    { id: 'lobby', label: 'Lobby', icon: Compass },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'memes', label: 'Meme Roster', icon: LayoutGrid },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Logo */}
        <button
          onClick={() => setActiveTab('landing')}
          className="hover:opacity-90 transition-opacity focus:outline-none"
        >
          <MemeChampLogo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/60 rounded-xl p-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Reward Claim Button */}
          {canClaimDaily && (
            <button
              onClick={claimDailyReward}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 text-xs font-bold rounded-xl animate-pulse transition-all shadow-sm"
              title="Claim 250 Free Daily Check-in Virtual Credits"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">+250 VC</span>
              <span className="sm:hidden">Claim</span>
            </button>
          )}

          {/* Virtual Credits Balance Display */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 shadow-inner">
            <Coins className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-black tracking-wide leading-none">
                {user.credits.toLocaleString()} <span className="text-[10px] text-amber-500 font-semibold">VC</span>
              </span>
              <span className="text-[8px] text-slate-500 font-medium leading-none mt-0.5">
                No cash value
              </span>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Notifications Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Notifications
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {unreadCount} unread
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-2.5 rounded-xl cursor-pointer text-left transition-all ${
                        notif.read ? 'bg-slate-950/40 text-slate-400' : 'bg-slate-800/60 text-slate-200 border border-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-rose-300">{notif.title}</span>
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-rose-400" />}
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-300">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center">
                <MemeSvg id={user.avatar} className="w-6 h-6" />
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-200 max-w-[80px] truncate">
                {user.username}
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="text-xs font-bold text-slate-200 truncate">{user.displayName}</p>
                  <p className="text-[10px] text-slate-400 truncate">@{user.username}</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <SettingsIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Settings</span>
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-purple-300 hover:bg-purple-950/40 rounded-xl transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    <span>Admin Controls</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 bg-slate-950/95 py-2 px-1">
        {navLinks.map(link => {
          const Icon = link.icon;
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                isActive ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
