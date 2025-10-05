'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function TitleScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center 
      justify-center relative">
      <div className="text-center space-y-12">
        <h1 className="text-[12rem] font-bold tracking-wider 
          text-shadow-glow">
          24
        </h1>
        
        <button
          onClick={() => router.push('/play')}
          className="px-12 py-4 text-2xl font-semibold 
            bg-white text-black hover:bg-gray-200 
            transition-colors duration-200 
            border-4 border-white hover:border-gray-200"
        >
          PLAY
        </button>
      </div>

      <div className="fixed bottom-8 right-8 text-right 
        text-sm text-white/40 space-y-1">
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
            href="https://jupiterwave.games" 
            target="_blank"
            className="hover:text-white/60 transition-colors"
          >
            Jupiter Wave
          </Link>
        </div>
      </div>
    </div>
  );
}