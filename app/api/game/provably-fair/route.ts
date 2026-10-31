import { NextRequest, NextResponse } from 'next/server';
import { sha256, calculateCrashPointFromSeed } from '@/lib/provablyFair';

export async function POST(req: NextRequest) {
  try {
    const { serverSeed, publishedHash } = await req.json();

    if (!serverSeed) {
      return NextResponse.json({ error: 'Server seed is required' }, { status: 400 });
    }

    const calculatedHash = await sha256(serverSeed);
    const calculatedCrash = calculateCrashPointFromSeed(serverSeed);
    const isValid = publishedHash ? calculatedHash.toLowerCase() === publishedHash.toLowerCase() : true;

    return NextResponse.json({
      valid: isValid,
      calculatedHash,
      calculatedCrash,
      publishedHash: publishedHash || null
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
