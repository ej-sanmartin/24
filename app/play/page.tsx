'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import GameUI from '@/components/GameUI';

export type Emotion =
  | 'neutral'
  | 'evasive'
  | 'defensive'
  | 'anxious'
  | 'resigned'
  | 'confessing';

export interface GameState {
  name: {first: string; last: string};
  crimeSpec: string;
  alibiSpec: string;
  promptsLeft: number;
  confessionProgress: number;
  currentEmotion: Emotion;
  motiveKnown: boolean;
  opportunityKnown: boolean;
  inconsistencyFound: boolean;
  accusationGate: boolean;
  lastReply: string;
  gameStatus: 'playing' | 'won' | 'lost';
  showSmileFlash: boolean;
}

export default function PlayPage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initGame = async () => {
      try {
        const res = await fetch('/api/setup');
        const data = await res.json();

        setGameState({
          name: data.name,
          crimeSpec: data.crimeSpec,
          alibiSpec: data.alibiSpec,
          promptsLeft: 24,
          confessionProgress: 0,
          currentEmotion: 'neutral',
          motiveKnown: false,
          opportunityKnown: false,
          inconsistencyFound: false,
          accusationGate: false,
          lastReply: `I don't know why I'm still here. ` +
            `I've told you everything.`,
          gameStatus: 'playing',
          showSmileFlash: false,
        });
      } catch (error) {
        console.error('Failed to initialize game:', error);
      } finally {
        setLoading(false);
      }
    };

    initGame();
  }, []);

  const handlePlayerInput = async (playerText: string) => {
    if (!gameState || gameState.gameStatus !== 'playing') return;

    const isAccusation =
      /\b(you did it|confess|admit|guilty|killed|murdered|liar)\b/i
        .test(playerText);

    try {
      const res = await fetch('/api/interrogate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: gameState.name,
          crimeSpec: gameState.crimeSpec,
          alibiSpec: gameState.alibiSpec,
          motiveKnown: gameState.motiveKnown,
          opportunityKnown: gameState.opportunityKnown,
          inconsistencyFound: gameState.inconsistencyFound,
          confessionProgress: gameState.confessionProgress,
          currentEmotion: gameState.currentEmotion,
          lastPlayerMove: playerText,
          accusationGate: isAccusation,
        }),
      });

      const data = await res.json();

      const newPromptsLeft = gameState.promptsLeft - 1;
      const newConfessionProgress = data.meta.confession_progress;
      const newEmotion = data.meta.next_emotion;

      const won = newConfessionProgress >= 96 &&
        isAccusation &&
        newEmotion === 'confessing';
      const lost = newPromptsLeft === 0 && !won;

      setGameState({
        ...gameState,
        promptsLeft: newPromptsLeft,
        confessionProgress: newConfessionProgress,
        currentEmotion: newEmotion,
        accusationGate: isAccusation,
        lastReply: data.response,
        gameStatus: won ? 'won' : lost ? 'lost' : 'playing',
        showSmileFlash: lost,
        motiveKnown: gameState.motiveKnown ||
          /motive|jealous|revenge|hate/i.test(playerText),
        opportunityKnown: gameState.opportunityKnown ||
          /opportunity|access|present|there/i.test(playerText),
        inconsistencyFound: gameState.inconsistencyFound ||
          /inconsist|lie|contradict|doesn't add up/i.test(playerText),
      });

      if (lost) {
        setTimeout(() => {
          setGameState((prev) =>
            prev ? {...prev, showSmileFlash: false} : null,
          );
        }, 800);
      }
    } catch (error) {
      console.error('Interrogation failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-white/60">Loading...</div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">Failed to load game</div>
      </div>
    );
  }

  return (
    <GameUI
      gameState={gameState}
      onPlayerInput={handlePlayerInput}
      onBackToTitle={() => router.push('/')}
    />
  );
}
