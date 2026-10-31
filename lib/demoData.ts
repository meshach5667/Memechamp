import { LeaderboardEntry, UserProfile, LedgerEntry, NotificationItem, ActivityItem, RoundData } from '@/types/game';

export const DEMO_USER: UserProfile = {
  uid: 'demo_user_1',
  username: 'MemeLord_99',
  displayName: 'MemeLord 99',
  avatar: 'doge',
  credits: 1000,
  wins: 14,
  losses: 7,
  gamesPlayed: 21,
  highestMultiplier: 4.82,
  favoriteFaction: 'doge',
  role: 'admin',
  createdAt: Date.now() - 86400000 * 5,
  updatedAt: Date.now(),
};

export const DEMO_BOTS = [
  { username: 'DogeWhale', avatar: 'doge', favorite: 'doge', style: 'conservative' },
  { username: 'PepeGeneral', avatar: 'pepe', favorite: 'pepe', style: 'aggressive' },
  { username: 'ChillTrader', avatar: 'chill_guy', favorite: 'chill_guy', style: 'balanced' },
  { username: 'WojakSurvivor', avatar: 'wojak', favorite: 'wojak', style: 'degenerate' },
  { username: 'ChadAlpha', avatar: 'gigachad', favorite: 'gigachad', style: 'moonshot' },
  { username: 'MatrixNPC_01', avatar: 'npc', favorite: 'npc', style: 'conservative' },
  { username: 'PopCatChampion', avatar: 'pop_cat', favorite: 'pop_cat', style: 'balanced' },
  { username: 'SkibidiQuant', avatar: 'brainrot', favorite: 'brainrot', style: 'aggressive' },
  { username: 'DiamondHODL', avatar: 'doge', favorite: 'doge', style: 'moonshot' },
  { username: 'RarePepe420', avatar: 'pepe', favorite: 'pepe', style: 'balanced' },
  { username: 'ZeroStress', avatar: 'chill_guy', favorite: 'chill_guy', style: 'conservative' },
  { username: 'GigaBrain', avatar: 'gigachad', favorite: 'gigachad', style: 'aggressive' },
];

export const DEMO_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    uid: 'bot_chad',
    username: 'ChadAlpha',
    displayName: 'Chad Alpha',
    avatar: 'gigachad',
    creditsWon: 48950,
    totalCredits: 52400,
    highestMultiplier: 24.60,
    winRate: 72,
    wins: 142,
    gamesPlayed: 197,
    favoriteFaction: 'gigachad'
  },
  {
    rank: 2,
    uid: 'bot_dogewhale',
    username: 'DogeWhale',
    displayName: 'Doge Whale',
    avatar: 'doge',
    creditsWon: 39420,
    totalCredits: 41850,
    highestMultiplier: 18.25,
    winRate: 68,
    wins: 124,
    gamesPlayed: 182,
    favoriteFaction: 'doge'
  },
  {
    rank: 3,
    uid: 'bot_pepeking',
    username: 'PepeGeneral',
    displayName: 'Pepe General',
    avatar: 'pepe',
    creditsWon: 34100,
    totalCredits: 36700,
    highestMultiplier: 15.40,
    winRate: 64,
    wins: 115,
    gamesPlayed: 179,
    favoriteFaction: 'pepe'
  },
  {
    rank: 4,
    uid: 'demo_user_1',
    username: 'MemeLord_99',
    displayName: 'MemeLord 99 (You)',
    avatar: 'doge',
    creditsWon: 12450,
    totalCredits: 1000,
    highestMultiplier: 4.82,
    winRate: 66,
    wins: 14,
    gamesPlayed: 21,
    favoriteFaction: 'doge'
  },
  {
    rank: 5,
    uid: 'bot_chill',
    username: 'ChillTrader',
    displayName: 'Chill Trader',
    avatar: 'chill_guy',
    creditsWon: 28900,
    totalCredits: 31200,
    highestMultiplier: 8.95,
    winRate: 74,
    wins: 98,
    gamesPlayed: 132,
    favoriteFaction: 'chill_guy'
  },
  {
    rank: 6,
    uid: 'bot_popcat',
    username: 'PopCatChampion',
    displayName: 'Pop Cat Champion',
    avatar: 'pop_cat',
    creditsWon: 22150,
    totalCredits: 24800,
    highestMultiplier: 12.10,
    winRate: 59,
    wins: 89,
    gamesPlayed: 151,
    favoriteFaction: 'pop_cat'
  },
  {
    rank: 7,
    uid: 'bot_brainrot',
    username: 'SkibidiQuant',
    displayName: 'Skibidi Quant',
    avatar: 'brainrot',
    creditsWon: 19780,
    totalCredits: 20450,
    highestMultiplier: 31.42,
    winRate: 48,
    wins: 76,
    gamesPlayed: 158,
    favoriteFaction: 'brainrot'
  },
  {
    rank: 8,
    uid: 'bot_wojak',
    username: 'WojakSurvivor',
    displayName: 'Wojak Survivor',
    avatar: 'wojak',
    creditsWon: 16200,
    totalCredits: 17900,
    highestMultiplier: 6.40,
    winRate: 52,
    wins: 68,
    gamesPlayed: 130,
    favoriteFaction: 'wojak'
  },
  {
    rank: 9,
    uid: 'bot_npc',
    username: 'MatrixNPC_01',
    displayName: 'Matrix NPC #01',
    avatar: 'npc',
    creditsWon: 14500,
    totalCredits: 15200,
    highestMultiplier: 5.12,
    winRate: 61,
    wins: 62,
    gamesPlayed: 101,
    favoriteFaction: 'npc'
  }
];

export const DEMO_HISTORY: Partial<RoundData>[] = [
  {
    id: 'round_1048',
    roundNumber: 1048,
    state: 'SETTLED',
    multiplier: 3.42,
    crashPoint: 3.42,
    serverHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    serverSeed: 'a8f7c93e41b2d019f6a5b8c2e4d1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3',
    startedAt: Date.now() - 180000,
    crashedAt: Date.now() - 150000,
    winningFaction: 'doge',
    aiCommentary: 'Doge unleashed diamond paws in an unprecedented rally, liquidating the bears before a 3.42x climax!',
    memeA: { id: 'doge', name: 'Doge', tagline: 'Much Wow', category: 'OG Classics', color: '#F59E0B', supporters: 142, totalStaked: 14200 },
    memeB: { id: 'pepe', name: 'Pepe', tagline: 'Feels Good Man', category: 'OG Classics', color: '#10B981', supporters: 98, totalStaked: 10800 }
  },
  {
    id: 'round_1047',
    roundNumber: 1047,
    state: 'SETTLED',
    multiplier: 1.84,
    crashPoint: 1.84,
    serverHash: 'b4a8e2d19f6a5c8c2e4d1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3a8f7c93',
    serverSeed: 'c1d0e9f8a7b6c5d4e3a8f7c93e41b2d019f6a5b8c2e4d1f0a9b8c7d6e5f4a3b2',
    startedAt: Date.now() - 360000,
    crashedAt: Date.now() - 335000,
    winningFaction: 'chill_guy',
    aiCommentary: 'Chill Guy stayed unbothered while Wojak panicked early. Quick crash at 1.84x rewarded timely hands!',
    memeA: { id: 'chill_guy', name: 'Chill Guy', tagline: 'Low Stress', category: 'Modern Brainrot', color: '#F97316', supporters: 180, totalStaked: 22400 },
    memeB: { id: 'wojak', name: 'Wojak', tagline: 'I Know That Feel', category: 'OG Classics', color: '#38BDF8', supporters: 64, totalStaked: 7200 }
  },
  {
    id: 'round_1046',
    roundNumber: 1046,
    state: 'SETTLED',
    multiplier: 7.15,
    crashPoint: 7.15,
    serverHash: '7a9c8b6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    serverSeed: 'f4a3b2c1d0e9f8a7b6c5d4e3a8f7c93e41b2d019f6a5b8c2e4d1f0a9b8c7d6e5',
    startedAt: Date.now() - 540000,
    crashedAt: Date.now() - 495000,
    winningFaction: 'gigachad',
    aiCommentary: 'Gigachad maintained jawline dominance through 7.15x! Legendary payouts rained down on faithful Chads.',
    memeA: { id: 'gigachad', name: 'Gigachad', tagline: 'Average Multiplier Enjoyer', category: 'Chad Tier', color: '#F43F5E', supporters: 210, totalStaked: 31500 },
    memeB: { id: 'npc', name: 'NPC', tagline: 'Current Thing', category: 'Modern Brainrot', color: '#94A3B8', supporters: 45, totalStaked: 4100 }
  },
  {
    id: 'round_1045',
    roundNumber: 1045,
    state: 'SETTLED',
    multiplier: 1.12,
    crashPoint: 1.12,
    serverHash: '9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7a9c8b6d5e4f3a2b1c0d',
    serverSeed: 'b8c2e4d1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3a8f7c93e41b2d019f6a5',
    startedAt: Date.now() - 720000,
    crashedAt: Date.now() - 710000,
    winningFaction: 'pop_cat',
    aiCommentary: 'Sudden flash crash at 1.12x caught the degenerate players off guard! Quick reflexes spared the few.',
    memeA: { id: 'pop_cat', name: 'Pop Cat', tagline: 'Infinite Clicks', category: 'Animal Legends', color: '#EC4899', supporters: 130, totalStaked: 14500 },
    memeB: { id: 'brainrot', name: 'Brainrot Bot', tagline: 'Skibidi Frequency', category: 'Modern Brainrot', color: '#A855F7', supporters: 115, totalStaked: 12000 }
  }
];

export const DEMO_LEDGER: LedgerEntry[] = [
  {
    id: 'ledg_1',
    uid: 'demo_user_1',
    type: 'signup_bonus',
    amount: 1000,
    balanceAfter: 1000,
    description: 'Welcome Sign-up Virtual Credits Bonus (No monetary value)',
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'ledg_2',
    uid: 'demo_user_1',
    type: 'daily_reward',
    amount: 250,
    balanceAfter: 1250,
    description: 'Daily Check-in Virtual Reward',
    createdAt: Date.now() - 86400000
  },
  {
    id: 'ledg_3',
    uid: 'demo_user_1',
    type: 'stake',
    amount: -100,
    balanceAfter: 1150,
    roundId: 'round_1048',
    description: 'Committed 100 credits on Faction Doge',
    createdAt: Date.now() - 175000
  },
  {
    id: 'ledg_4',
    uid: 'demo_user_1',
    type: 'payout',
    amount: 245,
    balanceAfter: 1395,
    roundId: 'round_1048',
    description: 'Cashed out at 2.45x multiplier on Faction Doge',
    createdAt: Date.now() - 160000
  }
];

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    uid: 'demo_user_1',
    title: 'Round 1048 Won!',
    message: 'You cashed out at 2.45x and won +245 Virtual Credits backing Doge!',
    type: 'win',
    read: false,
    createdAt: Date.now() - 150000
  },
  {
    id: 'notif_2',
    uid: 'demo_user_1',
    title: 'Daily Reward Claimable',
    message: 'Your 250 free daily virtual credits check-in reward is ready to claim.',
    type: 'reward',
    read: false,
    createdAt: Date.now() - 3600000 * 4
  },
  {
    id: 'notif_3',
    uid: 'demo_user_1',
    title: 'Championship Tier Updated',
    message: 'You advanced to Rank #4 on the Global MemeChamp Multiplier Leaderboard!',
    type: 'system',
    read: true,
    createdAt: Date.now() - 86400000
  }
];

export const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: 'act_1',
    type: 'join',
    message: 'DogeWhale backed Doge with 500 VC',
    username: 'DogeWhale',
    faction: 'doge',
    amount: 500,
    timestamp: Date.now() - 12000
  },
  {
    id: 'act_2',
    type: 'join',
    message: 'PepeGeneral backed Pepe with 450 VC',
    username: 'PepeGeneral',
    faction: 'pepe',
    amount: 450,
    timestamp: Date.now() - 9000
  },
  {
    id: 'act_3',
    type: 'join',
    message: 'ChadAlpha backed Doge with 750 VC',
    username: 'ChadAlpha',
    faction: 'doge',
    amount: 750,
    timestamp: Date.now() - 6000
  },
  {
    id: 'act_4',
    type: 'round_start',
    message: 'Round 1049 battle initiated! Multiplier rising...',
    username: 'SYSTEM',
    timestamp: Date.now() - 3000
  }
];
