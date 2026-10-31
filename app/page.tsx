'use client';

import React from 'react';
import { GameProvider, useGame } from '@/context/GameContext';
import { Header } from '@/components/layout/Header';
import { ComplianceBadge } from '@/components/common/ComplianceBadge';
import { LandingView } from '@/components/views/LandingView';
import { BattleView } from '@/components/views/BattleView';
import { LobbyView } from '@/components/views/LobbyView';
import { LeaderboardView } from '@/components/views/LeaderboardView';
import { MemeCollectionView } from '@/components/views/MemeCollectionView';
import { ProfileView } from '@/components/views/ProfileView';
import { HistoryView } from '@/components/views/HistoryView';
import { SettingsView } from '@/components/views/SettingsView';
import { AdminView } from '@/components/views/AdminView';
import { PublicProfileModal } from '@/components/modals/PublicProfileModal';

function MainApp() {
  const { activeTab } = useGame();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-white">
      {/* Top Compliance Notice Bar */}
      <ComplianceBadge variant="banner" />

      {/* Primary Header */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {activeTab === 'landing' && <LandingView />}
        {activeTab === 'battle' && <BattleView />}
        {activeTab === 'lobby' && <LobbyView />}
        {activeTab === 'leaderboard' && <LeaderboardView />}
        {activeTab === 'memes' && <MemeCollectionView />}
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'history' && <HistoryView />}
        {activeTab === 'settings' && <SettingsView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Public Profile Modal */}
      <PublicProfileModal />

      {/* Footer */}
      <ComplianceBadge variant="footer" />
    </div>
  );
}

export default function Page() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}
