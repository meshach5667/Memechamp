export interface MemeFighter {
  id: string;
  name: string;
  tagline: string;
  category: 'OG Classics' | 'Modern Brainrot' | 'Animal Legends' | 'Chad Tier';
  color: string;
  accentBg: string;
  borderColor: string;
  wins: number;
  battles: number;
  popularity: number;
  description: string;
}

export const MEME_ROSTER: MemeFighter[] = [
  {
    id: 'doge',
    name: 'Doge',
    tagline: 'Much Wow, Very Multiplier',
    category: 'OG Classics',
    color: '#F59E0B',
    accentBg: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.4)',
    wins: 1420,
    battles: 2150,
    popularity: 98,
    description: 'The golden matriarch of meme coins and eternal internet positivity. Renowned for moonshots and diamond paws.'
  },
  {
    id: 'pepe',
    name: 'Pepe',
    tagline: 'Feels Good Man, King of the Pond',
    category: 'OG Classics',
    color: '#10B981',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
    wins: 1390,
    battles: 2120,
    popularity: 97,
    description: 'The amphibious titan of web culture. Tactical, rare, and crowned champion across countless forum wars.'
  },
  {
    id: 'chill_guy',
    name: 'Chill Guy',
    tagline: 'Low Stress, Steady Gains',
    category: 'Modern Brainrot',
    color: '#F97316',
    accentBg: 'rgba(249, 115, 22, 0.12)',
    borderColor: 'rgba(249, 115, 22, 0.4)',
    wins: 820,
    battles: 1190,
    popularity: 94,
    description: 'Unhinged market volatility? Completely unbothered. He keeps his paws in his sweater pockets while multipliers soar.'
  },
  {
    id: 'wojak',
    name: 'Wojak',
    tagline: 'I Know That Feel, Bro',
    category: 'OG Classics',
    color: '#38BDF8',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.4)',
    wins: 760,
    battles: 1430,
    popularity: 89,
    description: 'The sleepless warrior at 3 AM checking charts. Fueled by espresso, regret, and sudden legendary redemption arcs.'
  },
  {
    id: 'gigachad',
    name: 'Gigachad',
    tagline: 'Average Multiplier Enjoyer',
    category: 'Chad Tier',
    color: '#F43F5E',
    accentBg: 'rgba(244, 63, 94, 0.12)',
    borderColor: 'rgba(244, 63, 94, 0.4)',
    wins: 1180,
    battles: 1540,
    popularity: 96,
    description: 'Unapologetic confidence and razor-sharp jawline. Does not cash out early; waits for glory or meets fate with a smile.'
  },
  {
    id: 'npc',
    name: 'NPC',
    tagline: 'Current Thing Follower',
    category: 'Modern Brainrot',
    color: '#94A3B8',
    accentBg: 'rgba(148, 163, 184, 0.12)',
    borderColor: 'rgba(148, 163, 184, 0.4)',
    wins: 620,
    battles: 1310,
    popularity: 84,
    description: 'Programmed by the matrix to do exactly what everyone else is doing. Occasionally glitches into unprecedented winning streaks.'
  },
  {
    id: 'pop_cat',
    name: 'Pop Cat',
    tagline: 'Infinite Clicks, Resonant Resonance',
    category: 'Animal Legends',
    color: '#EC4899',
    accentBg: 'rgba(236, 72, 153, 0.12)',
    borderColor: 'rgba(236, 72, 153, 0.4)',
    wins: 910,
    battles: 1380,
    popularity: 91,
    description: 'Click... POP! A worldwide phenomenon whose open mouth creates seismic audio reverberations in the multiplier realm.'
  },
  {
    id: 'brainrot',
    name: 'Brainrot Bot',
    tagline: 'Skibidi Frequency Overload',
    category: 'Modern Brainrot',
    color: '#A855F7',
    accentBg: 'rgba(168, 85, 247, 0.12)',
    borderColor: 'rgba(168, 85, 247, 0.4)',
    wins: 730,
    battles: 1220,
    popularity: 88,
    description: 'Powered by 10,000 algorithmic short-form clips playing simultaneously at 2x speed. Unpredictable and volatile.'
  }
];

export const MATCHUP_PAIRS: [string, string][] = [
  ['doge', 'pepe'],
  ['chill_guy', 'wojak'],
  ['gigachad', 'npc'],
  ['pop_cat', 'brainrot'],
  ['doge', 'chill_guy'],
  ['pepe', 'gigachad'],
];
