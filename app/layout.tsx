import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'MemeChamp — Multiplayer Meme Battle Multiplier Game',
  description: 'Multiplayer Meme Battle Multiplier Game with real-time faction competition, rising crash multipliers, and virtual credits.',
  openGraph: {
    title: 'MemeChamp — Multiplayer Meme Battle Multiplier Game',
    description: 'Multiplayer Meme Battle Multiplier Game with real-time faction competition, rising crash multipliers, and virtual credits.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MemeChamp — Multiplayer Meme Battle Multiplier Game',
    description: 'Multiplayer Meme Battle Multiplier Game with real-time faction competition, rising crash multipliers, and virtual credits.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
