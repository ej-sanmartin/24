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
      <div className="h-screen flex items-center
        justify-center bg-black overflow-hidden">
        <Image
          src="/portraits/smiling.png"
          alt="Smiling"
          width={400}
          height={400}
          className="w-[400px] h-auto animate-flash"
        />
      </div>
    );
  }

  if (gameState.gameStatus === 'lost') {
    return (
      <div className="h-screen flex flex-col items-center
        justify-center space-y-8 overflow-hidden
        md:space-y-8
        max-md:space-y-6 max-md:px-4">
        <div className="text-6xl font-bold text-red-500
          animate-pulse-slow
          md:text-6xl
          max-md:text-4xl max-md:text-center">
          he got away.
        </div>
        <button
          onClick={onBackToTitle}
          className="px-8 py-3 text-xl bg-white text-black
            hover:bg-gray-200 transition-colors
            md:px-8 md:py-3 md:text-xl
            max-md:px-6 max-md:py-2 max-md:text-base"
        >
          Back to Title
        </button>
      </div>
    );
  }

  if (gameState.gameStatus === 'won') {
    return (
      <div className="h-screen flex flex-col items-center
        justify-center space-y-8 overflow-hidden
        md:space-y-8
        max-md:space-y-6 max-md:px-4">
        <div className="text-4xl font-light text-white animate-pulse-slow
          md:text-4xl
          max-md:text-2xl max-md:text-center">
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
            hover:bg-gray-200 transition-colors
            md:px-8 md:py-3 md:text-xl
            max-md:px-6 max-md:py-2 max-md:text-base"
        >
          Back to Title
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col py-4 px-4 relative
      overflow-hidden
      md:py-4 md:px-4
      max-md:py-0 max-md:px-2 max-md:pt-28">
      <StickyNote
        name={gameState.name}
        crimeSpec={gameState.crimeSpec}
        alibiSpec={gameState.alibiSpec}
      />

      <div className="flex-1 flex flex-col items-center
        justify-center space-y-12 max-w-4xl mx-auto w-full
        md:space-y-12
        max-md:space-y-4 max-md:justify-start max-md:pt-2">
        <Portrait emotion={gameState.currentEmotion} />

        <div className="bg-gray-950/95 rounded-lg p-4
          min-h-[100px] max-w-2xl w-full
          border border-gray-500 shadow-xl
          md:p-4 md:min-h-[100px]
          max-md:p-3 max-md:min-h-[80px]">
          <p className="text-base leading-relaxed text-gray-100
            md:text-base md:leading-relaxed
            max-md:text-sm max-md:leading-snug">
            {gameState.lastReply}
          </p>
        </div>

        <div className="w-full max-w-2xl space-y-2
          md:space-y-2
          max-md:space-y-1.5">
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isSubmitting}
              placeholder="Type your next line..."
              className="w-full px-4 py-3 text-base bg-gray-950
                text-white border-2 border-gray-500
                focus:border-gray-300 focus:outline-none
                transition-colors disabled:opacity-50
                md:px-4 md:py-3 md:text-base
                max-md:px-3 max-md:py-2.5 max-md:text-sm"
            />
          </form>

          <div className="text-center text-sm text-gray-400
            md:text-sm
            max-md:text-xs max-md:pb-2">
            Tries left: {gameState.promptsLeft}
          </div>
        </div>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 text-xs
          text-white/30 space-y-1
          max-md:hidden">
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
