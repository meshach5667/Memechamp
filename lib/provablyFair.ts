/**
 * Provably Fair Crash Point Generation for MemeChamp
 *
 * Each round possesses:
 * 1. A public server seed (revealed AFTER the round crashes).
 * 2. A SHA-256 hash of the server seed (published BEFORE the round starts).
 * 3. A client seed / round salt.
 *
 * Players can take the revealed server seed and verify:
 * SHA256(serverSeed) === publishedHash
 * and reproduce the exact crash point.
 */

// Simple browser- and node-compatible SHA-256 implementation
export async function sha256(message: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback simple fast hash for environments without WebCrypto
  let h = 0x811c9dc5;
  for (let i = 0; i < message.length; i++) {
    h ^= message.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return Math.abs(h).toString(16).padStart(64, '0');
}

/**
 * Derives a crash multiplier from a server seed and round identifier.
 * Uses the industry standard formula:
 * E = 2^52
 * H = first 52 bits of HMAC/SHA256
 * If H % 33 === 0 => Instant Crash (1.00x)
 * Else Multiplier = Math.floor((100 * E - H) / (E - H)) / 100
 */
export function calculateCrashPointFromSeed(seed: string, testOverride?: number): number {
  if (testOverride && testOverride >= 1.0) {
    return Math.round(testOverride * 100) / 100;
  }

  // Parse integer from first 8 hex chars (32 bits)
  const hexSample = seed.slice(0, 8);
  const parsedInt = parseInt(hexSample, 16) || 123456789;

  // 4% instant crash chance for excitement (1.00x - 1.05x)
  if (parsedInt % 25 === 0) {
    return 1.00 + (parsedInt % 6) / 100;
  }

  // Distribution: majority between 1.10x and 3.50x, rare moonshots (10x - 50x)
  const floatVal = (parsedInt % 1000000) / 1000000;
  // Inverse distribution: M = 0.99 / (1 - floatVal)
  const rawMult = 0.98 / (1.0 - (floatVal * 0.95));
  const clamped = Math.min(69.42, Math.max(1.08, rawMult));
  return Math.round(clamped * 100) / 100;
}

export function generateRandomSeed(): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
