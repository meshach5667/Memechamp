'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { UserProfile, RoundData, BetData, ActivityItem, LedgerEntry, NotificationItem, RoundState } from '@/types/game';
import { DEMO_USER, DEMO_BOTS, DEMO_HISTORY, DEMO_LEDGER, DEMO_NOTIFICATIONS, INITIAL_ACTIVITY } from '@/lib/demoData';
import { MEME_ROSTER, MATCHUP_PAIRS, MemeFighter } from '@/lib/memeRoster';
import { calculateCrashPointFromSeed, generateRandomSeed, sha256 } from '@/lib/provablyFair';
import { soundManager } from '@/lib/sound';
import { db, auth } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import confetti from 'canvas-confetti';

interface GameContextType {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // User State
  user: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  claimDailyReward: () => boolean;
  canClaimDaily: boolean;

  // Active Round State
  round: RoundData;
  userBet: BetData | null;
  selectedFaction: string;
  setSelectedFaction: (faction: string) => void;
  stakeAmount: number;
  setStakeAmount: (amount: number) => void;
  placeBet: () => { success: boolean; message: string };
  cashOut: () => { success: boolean; message: string; payout?: number };

  // Real-time Lists
  recentRounds: Partial<RoundData>[];
  activityFeed: ActivityItem[];
  ledger: LedgerEntry[];
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  activeRoundBets: BetData[];

  // Test Mode & Admin
  isTestMode: boolean;
  setIsTestMode: (val: boolean) => void;
  nextCrashOverride: number | null;
  setNextCrashOverride: (val: number | null) => void;
  forceNextRound: () => void;

  // Public Profile Modal
  viewingProfile: UserProfile | null;
  setViewingProfile: (profile: UserProfile | null) => void;

  // Sound
  isMuted: boolean;
  toggleSound: () => void;

  // AI Commentary
  latestAiCommentary: string;
  isAiLoading: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [user, setUser] = useState<UserProfile>(DEMO_USER);
  const [selectedFaction, setSelectedFaction] = useState<string>('doge');
  const [stakeAmount, setStakeAmount] = useState<number>(50);
  const [userBet, setUserBet] = useState<BetData | null>(null);
  const [activeRoundBets, setActiveRoundBets] = useState<BetData[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>(INITIAL_ACTIVITY);
  const [ledger, setLedger] = useState<LedgerEntry[]>(DEMO_LEDGER);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEMO_NOTIFICATIONS);
  const [recentRounds, setRecentRounds] = useState<Partial<RoundData>[]>(DEMO_HISTORY);
  const [viewingProfile, setViewingProfile] = useState<UserProfile | null>(null);

  // Sound State
  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.isMuted());

  // Test Mode
  const [isTestMode, setIsTestMode] = useState<boolean>(false);
  const [nextCrashOverride, setNextCrashOverride] = useState<number | null>(null);

  // AI Commentary
  const [latestAiCommentary, setLatestAiCommentary] = useState<string>(
    'The crowd is electric! Doge and Pepe prepare for an earth-shattering clash!'
  );
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Daily check-in tracking
  const [canClaimDaily, setCanClaimDaily] = useState<boolean>(true);

  // Current Matchup Index
  const matchupIndexRef = useRef<number>(0);

  // Round State
  const [round, setRound] = useState<RoundData>(() => {
    const pair = MATCHUP_PAIRS[0];
    const memeA = MEME_ROSTER.find(m => m.id === pair[0]) || MEME_ROSTER[0];
    const memeB = MEME_ROSTER.find(m => m.id === pair[1]) || MEME_ROSTER[1];
    const seed = generateRandomSeed();
    const crash = calculateCrashPointFromSeed(seed);

    return {
      id: 'round_1049',
      roundNumber: 1049,
      state: 'COUNTDOWN',
      countdownSeconds: 4,
      memeA: {
        id: memeA.id,
        name: memeA.name,
        tagline: memeA.tagline,
        category: memeA.category,
        color: memeA.color,
        supporters: 14,
        totalStaked: 1450
      },
      memeB: {
        id: memeB.id,
        name: memeB.name,
        tagline: memeB.tagline,
        category: memeB.category,
        color: memeB.color,
        supporters: 12,
        totalStaked: 1200
      },
      multiplier: 1.00,
      crashPoint: crash,
      serverHash: 'a9f8e4b7c6d5e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8',
      serverSeed: seed,
      startedAt: Date.now(),
      history: [1.00]
    };
  });

  const roundRef = useRef(round);
  const userBetRef = useRef(userBet);
  const userRef = useRef(user);

  useEffect(() => {
    roundRef.current = round;
  }, [round]);

  useEffect(() => {
    userBetRef.current = userBet;
  }, [userBet]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Toggle sound
  const toggleSound = () => {
    const newVal = soundManager.toggleMute();
    setIsMuted(newVal);
  };

  // Update profile
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...prev, ...updates, updatedAt: Date.now() };
      // Save locally
      if (typeof window !== 'undefined') {
        localStorage.setItem('memechamp_user_profile', JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Add ledger entry
  const recordLedger = useCallback((type: LedgerEntry['type'], amount: number, desc: string, roundId?: string) => {
    setUser(prev => {
      const newBal = Math.max(0, prev.credits + amount);
      const entry: LedgerEntry = {
        id: `ledg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        uid: prev.uid,
        type,
        amount,
        balanceAfter: newBal,
        roundId,
        description: desc,
        createdAt: Date.now()
      };
      setLedger(l => [entry, ...l]);
      return { ...prev, credits: newBal };
    });
  }, []);

  // Claim Daily Virtual Credits
  const claimDailyReward = (): boolean => {
    if (!canClaimDaily) return false;
    recordLedger('daily_reward', 250, 'Claimed 250 Daily Virtual Check-in Credits (No monetary value)');
    setCanClaimDaily(false);
    soundManager.playCashout();

    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      uid: user.uid,
      title: 'Daily Reward Claimed!',
      message: 'You received +250 free virtual credits! Check back tomorrow for more.',
      type: 'reward',
      read: false,
      createdAt: Date.now()
    };
    setNotifications(n => [notif, ...n]);
    return true;
  };

  // Place bet on faction
  const placeBet = (): { success: boolean; message: string } => {
    if (round.state !== 'WAITING' && round.state !== 'COUNTDOWN') {
      return { success: false, message: 'Entries are locked for this round!' };
    }
    if (userBet) {
      return { success: false, message: 'You already entered this round!' };
    }
    if (stakeAmount <= 0) {
      return { success: false, message: 'Please specify a positive credit amount.' };
    }
    if (user.credits < stakeAmount) {
      return { success: false, message: 'Insufficient virtual credits!' };
    }

    soundManager.playClick();

    // Deduct stake from user credits
    recordLedger('stake', -stakeAmount, `Backed ${selectedFaction.toUpperCase()} with ${stakeAmount} VC`, round.id);

    const bet: BetData = {
      id: `bet_${Date.now()}`,
      roundId: round.id,
      uid: user.uid,
      username: user.username,
      avatar: user.avatar,
      faction: selectedFaction,
      amount: stakeAmount,
      status: 'active',
      timestamp: Date.now()
    };

    setUserBet(bet);
    setActiveRoundBets(prev => [bet, ...prev]);

    // Update round faction stats
    setRound(prev => {
      const isMemeA = prev.memeA.id === selectedFaction;
      return {
        ...prev,
        memeA: isMemeA
          ? { ...prev.memeA, supporters: prev.memeA.supporters + 1, totalStaked: prev.memeA.totalStaked + stakeAmount }
          : prev.memeA,
        memeB: !isMemeA
          ? { ...prev.memeB, supporters: prev.memeB.supporters + 1, totalStaked: prev.memeB.totalStaked + stakeAmount }
          : prev.memeB
      };
    });

    // Add activity
    const activity: ActivityItem = {
      id: `act_${Date.now()}`,
      type: 'join',
      message: `${user.username} backed ${selectedFaction.toUpperCase()} with ${stakeAmount} VC`,
      username: user.username,
      faction: selectedFaction,
      amount: stakeAmount,
      timestamp: Date.now()
    };
    setActivityFeed(prev => [activity, ...prev.slice(0, 30)]);

    return { success: true, message: `Successfully backed ${selectedFaction.toUpperCase()} with ${stakeAmount} VC!` };
  };

  // Cash out
  const cashOut = (): { success: boolean; message: string; payout?: number } => {
    if (round.state !== 'ACTIVE') {
      return { success: false, message: 'Round is not currently active!' };
    }
    if (!userBet || userBet.status !== 'active') {
      return { success: false, message: 'No active bet to cash out!' };
    }

    const currentMult = round.multiplier;
    const payout = Math.floor(userBet.amount * currentMult);

    soundManager.playCashout();

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}

    // Credit payout to user
    recordLedger('payout', payout, `Cashed out at ${currentMult.toFixed(2)}x on ${userBet.faction.toUpperCase()}`, round.id);

    // Update user stats
    setUser(prev => ({
      ...prev,
      wins: prev.wins + 1,
      gamesPlayed: prev.gamesPlayed + 1,
      highestMultiplier: Math.max(prev.highestMultiplier, currentMult),
    }));

    // Update bet status
    const updatedBet: BetData = {
      ...userBet,
      status: 'cashed_out',
      cashedOutAt: currentMult,
      payout
    };
    setUserBet(updatedBet);
    setActiveRoundBets(prev => prev.map(b => b.id === userBet.id ? updatedBet : b));

    // Add notification
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      uid: user.uid,
      title: 'Successful Cash Out!',
      message: `You cashed out at ${currentMult.toFixed(2)}x and won +${payout} virtual credits!`,
      type: 'win',
      read: false,
      createdAt: Date.now()
    };
    setNotifications(prev => [notif, ...prev]);

    // Add activity
    const activity: ActivityItem = {
      id: `act_${Date.now()}`,
      type: 'cashout',
      message: `${user.username} cashed out at ${currentMult.toFixed(2)}x for +${payout} VC!`,
      username: user.username,
      faction: userBet.faction,
      multiplier: currentMult,
      amount: payout,
      timestamp: Date.now()
    };
    setActivityFeed(prev => [activity, ...prev.slice(0, 30)]);

    return { success: true, message: `Cashed out at ${currentMult.toFixed(2)}x! Won +${payout} VC`, payout };
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Start next round with next pair
  const startNextRound = useCallback(async () => {
    matchupIndexRef.current = (matchupIndexRef.current + 1) % MATCHUP_PAIRS.length;
    const pair = MATCHUP_PAIRS[matchupIndexRef.current];
    const memeA = MEME_ROSTER.find(m => m.id === pair[0]) || MEME_ROSTER[0];
    const memeB = MEME_ROSTER.find(m => m.id === pair[1]) || MEME_ROSTER[1];

    const seed = generateRandomSeed();
    const hash = await sha256(seed);
    const crash = nextCrashOverride || calculateCrashPointFromSeed(seed);
    if (nextCrashOverride) {
      setNextCrashOverride(null); // consume one-shot override
    }

    const nextRoundNumber = roundRef.current.roundNumber + 1;
    const nextRoundId = `round_${nextRoundNumber}`;

    setUserBet(null);
    setSelectedFaction(memeA.id);

    // Initial bot bets
    const botBets: BetData[] = [];
    const shuffledBots = [...DEMO_BOTS].sort(() => 0.5 - Math.random()).slice(0, 6);
    let supportersA = 0;
    let stakedA = 0;
    let supportersB = 0;
    let stakedB = 0;

    shuffledBots.forEach(bot => {
      const chooseA = Math.random() > 0.48;
      const fId = chooseA ? memeA.id : memeB.id;
      const amt = [25, 50, 100, 250, 500][Math.floor(Math.random() * 5)];
      if (chooseA) {
        supportersA++;
        stakedA += amt;
      } else {
        supportersB++;
        stakedB += amt;
      }
      botBets.push({
        id: `bot_bet_${Date.now()}_${bot.username}`,
        roundId: nextRoundId,
        uid: `bot_${bot.username}`,
        username: bot.username,
        avatar: bot.avatar,
        faction: fId,
        amount: amt,
        status: 'active',
        timestamp: Date.now()
      });
    });

    setActiveRoundBets(botBets);

    const newRound: RoundData = {
      id: nextRoundId,
      roundNumber: nextRoundNumber,
      state: 'WAITING',
      countdownSeconds: 6,
      memeA: {
        id: memeA.id,
        name: memeA.name,
        tagline: memeA.tagline,
        category: memeA.category,
        color: memeA.color,
        supporters: supportersA,
        totalStaked: stakedA
      },
      memeB: {
        id: memeB.id,
        name: memeB.name,
        tagline: memeB.tagline,
        category: memeB.category,
        color: memeB.color,
        supporters: supportersB,
        totalStaked: stakedB
      },
      multiplier: 1.00,
      crashPoint: crash,
      serverHash: hash,
      serverSeed: seed,
      startedAt: Date.now(),
      history: [1.00]
    };

    setRound(newRound);

    // Announce new round
    const startAct: ActivityItem = {
      id: `act_${Date.now()}`,
      type: 'round_start',
      message: `Round ${nextRoundNumber}: ${memeA.name} vs ${memeB.name} is preparing! Back your faction now!`,
      username: 'SYSTEM',
      timestamp: Date.now()
    };
    setActivityFeed(prev => [startAct, ...prev.slice(0, 30)]);
  }, [nextCrashOverride]);

  const forceNextRound = () => {
    startNextRound();
  };

  // Fetch AI commentary
  const fetchCommentary = async (
    memeA: { name: string; tagline?: string },
    memeB: { name: string; tagline?: string },
    mult: number,
    crash: number,
    phase: 'clash' | 'crash'
  ) => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/gemini/commentary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memeA,
          memeB,
          multiplier: mult,
          crashPoint: crash,
          winningFaction: memeA?.name || 'Meme Champion',
          phase
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.commentary) {
          setLatestAiCommentary(data.commentary);
        }
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsAiLoading(false);
    }
  };

  // Main Game Loop Engine (WAITING -> COUNTDOWN -> ACTIVE -> CRASHED -> SETTLED)
  useEffect(() => {
    let animFrame: number;
    let timer: NodeJS.Timeout;

    if (round.state === 'WAITING') {
      timer = setTimeout(() => {
        setRound(prev => ({ ...prev, state: 'COUNTDOWN', countdownSeconds: 4 }));
      }, 5000);
    } else if (round.state === 'COUNTDOWN') {
      const countdownInterval = setInterval(() => {
        setRound(prev => {
          const nextSec = (prev.countdownSeconds || 4) - 1;
          soundManager.playCountdown(nextSec <= 0);
          if (nextSec <= 0) {
            clearInterval(countdownInterval);
            // Fetch live Gemini commentary as fight starts
            fetchCommentary(prev.memeA, prev.memeB, 1.00, prev.crashPoint, 'clash');
            return {
              ...prev,
              state: 'ACTIVE',
              multiplier: 1.00,
              startedAt: Date.now(),
              countdownSeconds: 0
            };
          }
          return { ...prev, countdownSeconds: nextSec };
        });
      }, 1000);
      return () => clearInterval(countdownInterval);
    } else if (round.state === 'ACTIVE') {
      const startTime = Date.now();
      const crashTarget = round.crashPoint;

      const updateLoop = () => {
        const elapsedSec = (Date.now() - startTime) / 1000;
        // Non-linear exponential curve: starts smooth, accelerates
        const currentMultiplier = Math.round((1.00 + 0.08 * elapsedSec + 0.03 * Math.pow(elapsedSec, 2.1)) * 100) / 100;

        soundManager.playMultiplierTick(currentMultiplier);

        // Check crash condition
        if (currentMultiplier >= crashTarget) {
          soundManager.playCrash();

          // Round has crashed!
          const crashedMeme = roundRef.current.memeA.supporters > roundRef.current.memeB.supporters
            ? roundRef.current.memeA.name
            : roundRef.current.memeB.name;

          setRound(prev => ({
            ...prev,
            state: 'CRASHED',
            multiplier: crashTarget,
            crashedAt: Date.now(),
            winningFaction: crashedMeme
          }));

          // Process player loss if didn't cash out
          if (userBetRef.current && userBetRef.current.status === 'active') {
            setUser(prev => ({
              ...prev,
              losses: prev.losses + 1,
              gamesPlayed: prev.gamesPlayed + 1
            }));
            const crashedBet: BetData = {
              ...userBetRef.current,
              status: 'crashed'
            };
            setUserBet(crashedBet);
            setActiveRoundBets(prev => prev.map(b => b.id === crashedBet.id ? crashedBet : b));

            setNotifications(prev => [
              {
                id: `notif_${Date.now()}`,
                uid: userRef.current.uid,
                title: 'Round Crashed!',
                message: `Round ${roundRef.current.roundNumber} crashed at ${crashTarget.toFixed(2)}x before you cashed out.`,
                type: 'loss',
                read: false,
                createdAt: Date.now()
              },
              ...prev
            ]);
          }

          // Add crash activity
          setActivityFeed(prev => [
            {
              id: `act_${Date.now()}`,
              type: 'crash',
              message: `Round ${roundRef.current.roundNumber} CRASHED at ${crashTarget.toFixed(2)}x!`,
              username: 'SYSTEM',
              multiplier: crashTarget,
              timestamp: Date.now()
            },
            ...prev.slice(0, 30)
          ]);

          // Fetch post-crash recap from Gemini
          fetchCommentary(roundRef.current.memeA, roundRef.current.memeB, crashTarget, crashTarget, 'crash');

          // Transition to SETTLED and schedule next round
          setTimeout(() => {
            setRound(prev => {
              const settledRound: RoundData = { ...prev, state: 'SETTLED' };
              // Add to history
              setRecentRounds(h => [settledRound, ...h.slice(0, 20)]);
              return settledRound;
            });

            setTimeout(() => {
              startNextRound();
            }, 3000);
          }, 3500);

          return;
        }

        // Random bot cashouts during active multiplier
        if (Math.random() < 0.05) {
          setActiveRoundBets(prev => {
            const activeBots = prev.filter(b => b.status === 'active' && b.uid.startsWith('bot_'));
            if (activeBots.length > 0) {
              const luckyBot = activeBots[Math.floor(Math.random() * activeBots.length)];
              const botPayout = Math.floor(luckyBot.amount * currentMultiplier);

              setActivityFeed(act => [
                {
                  id: `act_${Date.now()}_${luckyBot.username}`,
                  type: 'cashout',
                  message: `${luckyBot.username} cashed out at ${currentMultiplier.toFixed(2)}x (+${botPayout} VC)`,
                  username: luckyBot.username,
                  faction: luckyBot.faction,
                  multiplier: currentMultiplier,
                  amount: botPayout,
                  timestamp: Date.now()
                },
                ...act.slice(0, 30)
              ]);

              return prev.map(b => b.id === luckyBot.id
                ? { ...b, status: 'cashed_out', cashedOutAt: currentMultiplier, payout: botPayout }
                : b
              );
            }
            return prev;
          });
        }

        setRound(prev => ({ ...prev, multiplier: currentMultiplier }));
        animFrame = requestAnimationFrame(updateLoop);
      };

      animFrame = requestAnimationFrame(updateLoop);
      return () => cancelAnimationFrame(animFrame);
    }

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animFrame);
    };
  }, [round.state, round.crashPoint, startNextRound]);



  return (
    <GameContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user,
        updateUserProfile,
        claimDailyReward,
        canClaimDaily,
        round,
        userBet,
        selectedFaction,
        setSelectedFaction,
        stakeAmount,
        setStakeAmount,
        placeBet,
        cashOut,
        recentRounds,
        activityFeed,
        ledger,
        notifications,
        markNotificationRead,
        activeRoundBets,
        isTestMode,
        setIsTestMode,
        nextCrashOverride,
        setNextCrashOverride,
        forceNextRound,
        viewingProfile,
        setViewingProfile,
        isMuted,
        toggleSound,
        latestAiCommentary,
        isAiLoading
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
