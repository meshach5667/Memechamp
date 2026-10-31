'use client';

import React from 'react';

export type MemeId = 'doge' | 'pepe' | 'chill_guy' | 'wojak' | 'gigachad' | 'npc' | 'pop_cat' | 'brainrot';

interface MemeSvgProps {
  id: MemeId | string;
  className?: string;
  glow?: boolean;
}

export function MemeSvg({ id, className = 'w-16 h-16', glow = false }: MemeSvgProps) {
  const normId = id.toLowerCase().replace(/[^a-z_]/g, '_');

  switch (normId) {
    case 'doge':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="48" fill="#FBBF24" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="2" />
          {/* Ears */}
          <polygon points="26,18 38,40 16,36" fill="#D97706" />
          <polygon points="74,18 84,36 62,40" fill="#D97706" />
          <polygon points="28,22 36,38 20,35" fill="#FDE68A" />
          <polygon points="72,22 80,35 64,38" fill="#FDE68A" />
          {/* Head & Cheeks */}
          <ellipse cx="50" cy="58" rx="36" ry="32" fill="#FBBF24" />
          <ellipse cx="36" cy="64" rx="14" ry="12" fill="#FEF3C7" />
          <ellipse cx="64" cy="64" rx="14" ry="12" fill="#FEF3C7" />
          <ellipse cx="50" cy="66" rx="16" ry="14" fill="#FEF3C7" />
          {/* Eyes (Classic Doge sidelong glance) */}
          <ellipse cx="38" cy="48" rx="6" ry="7" fill="#FFFFFF" />
          <circle cx="36" cy="48" r="3.5" fill="#1E293B" />
          <circle cx="35" cy="46" r="1.2" fill="#FFFFFF" />
          <ellipse cx="62" cy="48" rx="6" ry="7" fill="#FFFFFF" />
          <circle cx="60" cy="48" r="3.5" fill="#1E293B" />
          <circle cx="59" cy="46" r="1.2" fill="#FFFFFF" />
          {/* Eyebrows */}
          <path d="M 32 38 Q 38 35 44 40" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 56 40 Q 62 35 68 38" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Snout & Nose */}
          <ellipse cx="50" cy="60" rx="5" ry="3.5" fill="#1E293B" />
          <path d="M 50 63.5 L 50 68" stroke="#1E293B" strokeWidth="1.8" />
          <path d="M 44 67 Q 50 71 56 67" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* Diamond Paw Badge */}
          <path d="M 50 82 L 56 88 L 50 94 L 44 88 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
        </svg>
      );

    case 'pepe':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="48" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2" />
          {/* Frog Head */}
          <path d="M 18 52 C 18 32 32 24 50 24 C 68 24 82 32 82 52 C 82 72 70 82 50 82 C 30 82 18 72 18 52 Z" fill="#22C55E" />
          {/* Bulging Eyes */}
          <ellipse cx="36" cy="32" rx="14" ry="12" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
          <ellipse cx="64" cy="32" rx="14" ry="12" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
          <ellipse cx="36" cy="33" rx="10" ry="9" fill="#FEF08A" />
          <ellipse cx="64" cy="33" rx="10" ry="9" fill="#FEF08A" />
          <ellipse cx="36" cy="33" rx="4.5" ry="6.5" fill="#1E293B" />
          <ellipse cx="64" cy="33" rx="4.5" ry="6.5" fill="#1E293B" />
          <circle cx="34.5" cy="31" r="1.5" fill="#FFFFFF" />
          <circle cx="62.5" cy="31" r="1.5" fill="#FFFFFF" />
          {/* Heavy Eyelids */}
          <path d="M 24 28 Q 36 22 48 30" stroke="#15803D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 52 30 Q 64 22 76 28" stroke="#15803D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Iconic Pepe Lips / Smug Mouth */}
          <path d="M 28 62 C 38 68 62 68 72 62 C 75 60 78 64 74 68 C 64 78 36 78 26 68 C 22 64 25 60 28 62 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
          {/* Crown */}
          <polygon points="42,12 50,18 58,12 56,22 44,22" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
        </svg>
      );

    case 'chill_guy':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="48" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="2" />
          {/* Sweater Body */}
          <path d="M 24 86 C 24 68 35 60 50 60 C 65 60 76 68 76 86 Z" fill="#9333EA" />
          <path d="M 40 60 L 50 68 L 60 60" stroke="#C084FC" strokeWidth="2" fill="none" />
          {/* Dog Head */}
          <ellipse cx="50" cy="42" rx="22" ry="24" fill="#B45309" />
          {/* Floppy Droopy Ears */}
          <path d="M 30 32 C 22 34 16 46 22 56 C 26 50 28 42 30 32 Z" fill="#78350F" />
          <path d="M 70 32 C 78 34 84 46 78 56 C 74 50 72 42 70 32 Z" fill="#78350F" />
          {/* Chill Smug Half-Closed Eyes */}
          <path d="M 38 38 Q 44 42 42 45" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 58 38 Q 64 42 62 45" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="40" cy="41" rx="2" ry="1" fill="#1E293B" />
          <ellipse cx="60" cy="41" rx="2" ry="1" fill="#1E293B" />
          {/* Snout & Smile */}
          <ellipse cx="50" cy="48" rx="5" ry="3.5" fill="#1E293B" />
          <path d="M 44 54 Q 50 59 56 54" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Chill Vibe Badge */}
          <circle cx="50" cy="74" r="5" fill="#38BDF8" />
          <path d="M 48 74 L 52 74" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'wojak':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="48" fill="#64748B" fillOpacity="0.15" stroke="#64748B" strokeWidth="2" />
          {/* Head Shape */}
          <path d="M 28 48 C 24 24 40 18 52 18 C 72 18 78 32 76 52 C 74 72 64 82 50 82 C 34 82 28 72 28 48 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Headset Gaming Gear */}
          <path d="M 25 36 C 25 20 75 20 75 36" stroke="#0284C7" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="20" y="36" width="8" height="16" rx="4" fill="#0284C7" />
          <rect x="72" y="36" width="8" height="16" rx="4" fill="#0284C7" />
          <path d="M 24 48 Q 20 62 36 64" stroke="#38BDF8" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Big Teary / Sad Eyes */}
          <ellipse cx="40" cy="42" rx="7" ry="6" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
          <circle cx="39" cy="42" r="3" fill="#1E293B" />
          <circle cx="38" cy="40" r="1.2" fill="#FFFFFF" />
          <ellipse cx="62" cy="42" rx="7" ry="6" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
          <circle cx="61" cy="42" r="3" fill="#1E293B" />
          <circle cx="60" cy="40" r="1.2" fill="#FFFFFF" />
          {/* Furrowed Brow */}
          <path d="M 34 35 Q 40 38 46 34" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 56 34 Q 62 38 68 35" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Despair lines & mouth */}
          <path d="M 46 45 L 44 55 L 48 56" stroke="#475569" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 40 68 Q 50 63 60 68" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 42 72 Q 50 70 58 72" stroke="#94A3B8" strokeWidth="1.2" fill="none" />
        </svg>
      );

    case 'gigachad':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="48" fill="#F43F5E" fillOpacity="0.15" stroke="#F43F5E" strokeWidth="2" />
          {/* Chiseled Jawline Head */}
          <path d="M 28 32 C 30 20 70 20 72 32 C 74 44 76 56 68 74 C 62 84 50 88 50 88 C 50 88 38 84 32 74 C 24 56 26 44 28 32 Z" fill="#D4D4D8" stroke="#71717A" strokeWidth="1.5" />
          {/* Chad Hair Pompadour */}
          <path d="M 26 30 C 26 14 42 10 50 10 C 62 10 74 16 74 30 C 70 24 58 20 50 20 C 40 20 30 24 26 30 Z" fill="#27272A" />
          {/* Intense Eyes & Eyebrows */}
          <path d="M 32 36 L 44 40" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 68 36 L 56 40" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="36" y="42" width="8" height="4" rx="2" fill="#18181B" />
          <rect x="56" y="42" width="8" height="4" rx="2" fill="#18181B" />
          {/* Sculpted Nose */}
          <path d="M 50 38 L 47 56 L 53 56" stroke="#71717A" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Confident Smirk */}
          <path d="M 40 68 Q 50 71 60 67" stroke="#18181B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Chiseled Chin Cleft */}
          <line x1="50" y1="78" x2="50" y2="84" stroke="#71717A" strokeWidth="2" strokeLinecap="round" />
          {/* Cheekbone Shadows */}
          <path d="M 32 52 L 40 62" stroke="#A1A1AA" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 68 52 L 60 62" stroke="#A1A1AA" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'npc':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="48" fill="#94A3B8" fillOpacity="0.15" stroke="#94A3B8" strokeWidth="2" />
          {/* Gray NPC Head */}
          <circle cx="50" cy="50" r="32" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
          {/* Blank Nose */}
          <polygon points="50,42 46,54 54,54" fill="#64748B" />
          {/* Glitch Eyes */}
          <circle cx="38" cy="44" r="5" fill="#1E293B" />
          <circle cx="62" cy="44" r="5" fill="#1E293B" />
          {/* Straight Neutral Line Mouth */}
          <line x1="40" y1="64" x2="60" y2="64" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          {/* Circuit / Glitch Overlays */}
          <path d="M 30 24 L 38 24 L 38 32" stroke="#00F5D4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 70 76 L 62 76 L 62 68" stroke="#00F5D4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'pop_cat':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="48" fill="#EC4899" fillOpacity="0.15" stroke="#EC4899" strokeWidth="2" />
          {/* Cat Ears */}
          <polygon points="20,16 38,36 18,44" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          <polygon points="80,16 62,36 82,44" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          <polygon points="24,24 34,36 22,40" fill="#F472B6" />
          <polygon points="76,24 66,36 78,40" fill="#F472B6" />
          {/* Round Cat Face */}
          <circle cx="50" cy="56" r="32" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          {/* Big Wide Cat Eyes */}
          <ellipse cx="36" cy="44" rx="6" ry="7" fill="#1E293B" />
          <circle cx="34" cy="42" r="2" fill="#FFFFFF" />
          <ellipse cx="64" cy="44" rx="6" ry="7" fill="#1E293B" />
          <circle cx="62" cy="42" r="2" fill="#FFFFFF" />
          {/* The POP! Wide Open Mouth */}
          <ellipse cx="50" cy="66" rx="14" ry="16" fill="#1E1B4B" stroke="#BE185D" strokeWidth="2" />
          <ellipse cx="50" cy="74" rx="8" ry="4" fill="#F43F5E" />
          {/* Whiskers */}
          <line x1="20" y1="52" x2="30" y2="54" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="58" x2="28" y2="58" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="52" x2="70" y2="54" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="82" y1="58" x2="72" y2="58" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'brainrot':
    default:
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="48" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2" />
          {/* Cyber Screen / Vapor Base */}
          <path d="M 24 34 C 24 24 76 24 76 34 L 72 70 C 72 78 28 78 28 70 Z" fill="#1E293B" stroke="#8B5CF6" strokeWidth="2" />
          {/* Glowing Visor */}
          <rect x="30" y="38" width="40" height="16" rx="4" fill="#A855F7" />
          <line x1="34" y1="46" x2="66" y2="46" stroke="#F43F5E" strokeWidth="2" strokeDasharray="3 2" />
          {/* Antenna */}
          <line x1="50" y1="24" x2="50" y2="12" stroke="#8B5CF6" strokeWidth="2" />
          <circle cx="50" cy="10" r="3" fill="#EC4899" />
          {/* Audio speakers */}
          <circle cx="36" cy="62" r="3" fill="#38BDF8" />
          <circle cx="64" cy="62" r="3" fill="#38BDF8" />
          <path d="M 44 62 Q 50 66 56 62" stroke="#38BDF8" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
  }
}
