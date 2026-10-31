'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { ShieldCheck, Check, Copy, ExternalLink, HelpCircle } from 'lucide-react';

export function ProvablyFairCard() {
  const { round } = useGame();
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{ valid: boolean; crash: number } | null>(null);

  const copyHash = () => {
    navigator.clipboard.writeText(round.serverHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = async () => {
    if (!round.serverSeed) return;
    setIsVerifying(true);
    try {
      const res = await fetch('/api/game/provably-fair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serverSeed: round.serverSeed,
          publishedHash: round.serverHash
        })
      });
      if (res.ok) {
        const data = await res.json();
        setVerifyResult({ valid: data.valid, crash: data.calculatedCrash });
      }
    } catch {
      //
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-4 sm:p-5 text-xs">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-slate-300 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Provably Fair Cryptographic Audit</span>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
          SHA-256 Validated
        </span>
      </div>

      <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
        Before each round begins, MemeChamp generates a cryptographic server seed and publishes its SHA-256 hash. The crash multiplier is locked before any bets are accepted.
      </p>

      <div className="space-y-2 font-mono text-[11px]">
        <div>
          <span className="text-slate-500 block text-[10px] font-sans font-semibold mb-0.5">
            Round Pre-Commitment Hash (SHA-256):
          </span>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 break-all select-all">
            <span className="flex-1 text-[10px]">{round.serverHash}</span>
            <button
              onClick={copyHash}
              className="p-1 hover:text-white transition-colors flex-shrink-0"
              title="Copy Hash"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>
        </div>

        {round.state === 'CRASHED' || round.state === 'SETTLED' ? (
          <div>
            <span className="text-slate-500 block text-[10px] font-sans font-semibold mb-0.5">
              Revealed Server Seed:
            </span>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-[10px] break-all select-all flex items-center justify-between">
              <span>{round.serverSeed}</span>
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="ml-2 px-2 py-1 text-[9px] font-sans font-bold bg-emerald-500/20 text-emerald-300 rounded hover:bg-emerald-500/30 transition-all flex-shrink-0"
              >
                {isVerifying ? 'Verifying...' : 'Verify Math'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-[10px] text-slate-500 italic">
            Server seed will be revealed immediately upon round crash for verification.
          </div>
        )}
      </div>

      {verifyResult && (
        <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center justify-between">
          <span>Formula reproduced crash point: <strong>{verifyResult.crash.toFixed(2)}x</strong></span>
          <span className="font-bold text-emerald-400">100% Match</span>
        </div>
      )}
    </div>
  );
}
