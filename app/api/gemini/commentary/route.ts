import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { memeA, memeB, multiplier, crashPoint, winningFaction, phase } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        commentary: `${memeA?.name || 'Fighter 1'} and ${memeB?.name || 'Fighter 2'} collided in a high-stakes clash! Multiplier peaked at ${multiplier || crashPoint}x.`
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let prompt = '';
    if (phase === 'clash') {
      prompt = `You are the witty, internet-culture-fluent live ringside commentator for MemeChamp, a multiplayer meme battle multiplier game.
The current matchup is ${memeA?.name} ("${memeA?.tagline}") VS ${memeB?.name} ("${memeB?.tagline}").
The multiplier just reached ${multiplier}x and is rocketing up!
Give a 1-2 sentence punchy, exciting, funny esports-style fight commentary highlighting the meme lore and battle tension.
Do NOT use emojis. Write in plain text with high energy.`;
    } else {
      prompt = `You are the witty ringside announcer for MemeChamp.
Matchup: ${memeA?.name} vs ${memeB?.name}.
The battle round just CRASHED at ${crashPoint}x!
Winner/Favored: ${winningFaction}.
Give a 1-2 sentence humorous post-battle recap of the crash, roasting the greedy players who held too long and praising those who cashed out in time.
Do NOT use emojis. Write in plain text.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const commentary = response.text?.trim() || `${winningFaction || memeA?.name} secured dominance at ${crashPoint}x!`;

    // Strip any unexpected emojis just in case
    const cleanCommentary = commentary.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    return NextResponse.json({ commentary: cleanCommentary });
  } catch (error) {
    console.error('Gemini commentary error:', error);
    return NextResponse.json({
      commentary: 'The crowd roars as the memes engage in an epic multiplier clash!'
    });
  }
}
