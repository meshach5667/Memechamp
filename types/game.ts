export type RoundState = 'WAITING' | 'COUNTDOWN' | 'ACTIVE' | 'CRASHED' | 'SETTLED';

export interface MemeFighterStats {
  id: string;
  name: string;
  tagline: string;
  category: string;
  color: string;
  supporters: number;
  totalStaked: number;
}

export interface RoundData {
  id: string;
  roundNumber: number;
  state: RoundState;
  memeA: MemeFighterStats;
  memeB: MemeFighterStats;
  multiplier: number;
  crashPoint: number;
  serverHash: string;
  serverSeed?: string; // revealed after crash
  startedAt: number;
  crashedAt?: number;
  countdownSeconds?: number;
  winningFaction?: string;
  aiCommentary?: string;
  history?: number[];
}

export interface BetData {
  id: string;
  roundId: string;
  uid: string;
  username: string;
  avatar: string;
  faction: string;
  amount: number;
  status: 'active' | 'cashed_out' | 'crashed';
  cashedOutAt?: number;
  payout?: number;
  timestamp: number;
}

export interface ActivityItem {
  id: string;
  type: 'join' | 'cashout' | 'crash' | 'round_start' | 'reward';
  message: string;
  username: string;
  avatar?: string;
  faction?: string;
  multiplier?: number;
  amount?: number;
  timestamp: number;
}

export interface UserProfile {
  uid: string;
  username: string;
  displayName: string;
  avatar: string;
  credits: number;
  wins: number;
  losses: number;
  gamesPlayed: number;
  highestMultiplier: number;
  favoriteFaction: string;
  role: 'player' | 'admin';
  createdAt: number;
  updatedAt: number;
}

export interface LedgerEntry {
  id: string;
  uid: string;
  type: 'signup_bonus' | 'stake' | 'payout' | 'daily_reward' | 'admin_grant';
  amount: number;
  balanceAfter: number;
  roundId?: string;
  description: string;
  createdAt: number;
}

export interface NotificationItem {
  id: string;
  uid: string;
  title: string;
  message: string;
  type: 'win' | 'loss' | 'reward' | 'system';
  read: boolean;
  createdAt: number;
}

export interface LeaderboardEntry {
  rank: number;
  uid: string;
  username: string;
  displayName: string;
  avatar: string;
  creditsWon: number;
  totalCredits: number;
  highestMultiplier: number;
  winRate: number;
  wins: number;
  gamesPlayed: number;
  favoriteFaction: string;
}
