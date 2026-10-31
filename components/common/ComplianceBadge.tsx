'use client';

import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface Props {
  variant?: 'banner' | 'pill' | 'footer';
}

export function ComplianceBadge({ variant = 'pill' }: Props) {
  if (variant === 'banner') {
    return (
      <div className="w-full bg-slate-900/90 border-b border-slate-800 px-4 py-1.5 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
        <span>
          <strong className="text-slate-200">Compliance Notice:</strong> Virtual credits only. No real money, deposits, or withdrawals. Credits carry zero monetary value and are for entertainment purposes only.
        </span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="border-t border-slate-800/80 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500">
        <p className="max-w-3xl mx-auto">
          MemeChamp is a peer community game for entertainment. All game tokens (VC / Virtual Credits) are free digital tokens with strictly no cash-out, conversion, monetary value, or real-world transferability.
        </p>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-[10px] text-slate-300">
      <Info className="w-3 h-3 text-cyan-400" />
      <span>Virtual Credits Only (No Monetary Value)</span>
    </div>
  );
}
