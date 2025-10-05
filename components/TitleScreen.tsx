'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function TitleScreen() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center
      justify-center relative overflow-hidden">
      <div className="text-center space-y-12
        md:space-y-12
        max-md:space-y-8">
        <h1 className="text-[12rem] font-bold tracking-wider
          text-shadow-glow animate-pulse-slow
          md:text-[12rem]
          max-md:text-[8rem]">
          24
        </h1>

        <button
          onClick={() => router.push('/play')}
          className="px-12 py-4 text-2xl font-semibold
            bg-white text-black hover:bg-gray-200
            transition-colors duration-200
            border-4 border-white hover:border-gray-200
            md:px-12 md:py-4 md:text-2xl md:border-4
            max-md:px-8 max-md:py-3 max-md:text-xl max-md:border-3"
        >
          PLAY
        </button>
      </div>

      <div className="fixed bottom-8 right-8 text-right
        text-sm text-white/40 space-y-1
        md:bottom-8 md:right-8 md:text-sm
        max-md:bottom-4 max-md:right-4 max-md:text-xs">
        <div>
          <Link
            href="https://unveilengine.com"
            target="_blank"
            className="hover:text-white/60 transition-colors"
          >
            Unveil
          </Link>
        </div>
        <div>
          <Link
            href="https://x.com/ej_sanmartin"
            target="_blank"
            className="hover:text-white/60 transition-colors"
          >
            Twitter
          </Link>
        </div>
      </div>
    </div>
  );
}
