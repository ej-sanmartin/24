'use client';

import {useState} from 'react';
import type {GameState} from '@/app/play/page';
import Portrait from './Portrait';
import StickyNote from './StickyNote';
import Image from 'next/image';

interface GameUIProps {
  gameState: GameState;
  onPlayerInput: (text: string) => void;
  onBackToTitle: () => void;
}

export default function GameUI({
  gameState,
  onPlayerInput,
  onBackToTitle,
}: GameUIProps) {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSubmitting) return;

    setIsSubmitting(true);
    await onPlayerInput(inputValue);
    setInputValue('');
    setIsSubmitting(false);
  };

  if (gameState.showSmileFlash) {
    return (
      <div className="min-h-screen flex items-center
        justify-center bg-black">
        <Image
          src="/portraits/smiling.png"
          alt="Smiling"
          width={500}
          height={500}
          className="w-[500px] h-auto animate-flash"
        />
      </div>
    );
  }

  if (gameState.gameStatus === 'lost') {
    return (
      <div className="min-h-screen flex flex-col items-center
        justify-center space-y-8">
        <div className="text-6xl font-bold text-red-500
          animate-pulse-slow">
          he got away.
        </div>
        <button
          onClick={onBackToTitle}
          className="px-8 py-3 text-xl bg-white text-black
            hover:bg-gray-200 transition-colors"
        >
          Back to Title
        </button>
      </div>
    );
  }

  if (gameState.gameStatus === 'won') {
    return (
      <div className="min-h-screen flex flex-col items-center
        justify-center space-y-8">
        <div className="text-4xl font-light text-white animate-pulse-slow">
          a game by{' '}
          <a
            href="https://tini.la/edgar"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300 transition-colors"
          >
            edgar
          </a>
        </div>
        <button
          onClick={onBackToTitle}
          className="px-8 py-3 text-xl bg-white text-black
            hover:bg-gray-200 transition-colors"
        >
          Back to Title
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col py-8 px-4 relative">
      <StickyNote
        name={gameState.name}
        crimeSpec={gameState.crimeSpec}
        alibiSpec={gameState.alibiSpec}
      />

      <div className="flex-1 flex flex-col items-center
        justify-start space-y-8 max-w-4xl mx-auto w-full pt-8">
        <Portrait emotion={gameState.currentEmotion} />

        <div className="bg-gray-900/80 rounded-lg p-6
          min-h-[120px] max-w-2xl w-full
          border border-gray-500 shadow-xl">
          <p className="text-lg leading-relaxed text-gray-100">
            {gameState.lastReply}
          </p>
        </div>

        <div className="w-full max-w-2xl space-y-4">
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isSubmitting}
              placeholder="Type your next line..."
              className="w-full px-6 py-4 text-lg bg-gray-800
                text-white border-2 border-gray-500
                focus:border-gray-300 focus:outline-none
                transition-colors disabled:opacity-50"
            />
          </form>

          <div className="text-center text-sm text-gray-400">
            Prompts left: {gameState.promptsLeft}
          </div>
        </div>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 text-xs
          text-white/30 space-y-1">
          <div>Progress: {gameState.confessionProgress}</div>
          <div>Emotion: {gameState.currentEmotion}</div>
          <div>Motive: {gameState.motiveKnown ? '✓' : '✗'}</div>
          <div>Opportunity: {gameState.opportunityKnown ? '✓' : '✗'}</div>
          <div>
            Inconsistency: {gameState.inconsistencyFound ? '✓' : '✗'}
          </div>
        </div>
      )}
    </div>
  );
}
