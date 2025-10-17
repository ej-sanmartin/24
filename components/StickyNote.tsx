'use client';

import {useState} from 'react';

interface StickyNoteProps {
  name: {first: string; last: string};
  victim: {name: string; descriptor: string};
  crimeSpec: string;
  alibiSpec: string;
}

export default function StickyNote({
  name,
  victim,
  crimeSpec,
  alibiSpec,
}: StickyNoteProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="fixed top-8 right-8 w-72 bg-yellow-100
        p-6 shadow-xl transform rotate-2
        border-t-8 border-yellow-200 z-50
        md:top-8 md:right-8 md:w-72 md:rotate-2 md:border-t-8 md:p-6
        max-md:top-2 max-md:right-2 max-md:w-auto max-md:max-w-[85%]
        max-md:rotate-0 max-md:border-t-4 max-md:p-2.5
        cursor-pointer transition-all duration-200
        hover:shadow-2xl active:scale-95"
    >
      <div className="font-handwriting text-gray-900
        space-y-3 text-sm leading-relaxed
        md:space-y-3 md:text-sm
        max-md:space-y-1 max-md:text-[10px] max-md:leading-tight">
        <div className="font-bold text-base border-b
          border-gray-400 pb-2
          md:text-base md:pb-2
          max-md:text-xs max-md:pb-1 max-md:mb-0">
          SUSPECT
          <span className="md:hidden ml-1 text-[8px] opacity-60">
            {isExpanded ? '▼' : '▶'}
          </span>
        </div>

        {isExpanded && (
          <>
            <div>
              <span className="font-semibold">Name:</span>
              <br className="md:block max-md:hidden" />
              <span className="max-md:ml-1">
                {name.first} {name.last}
              </span>
            </div>

            <div>
              <span className="font-semibold">Crime:</span>
              <br className="md:block max-md:hidden" />
              <span className="max-md:ml-1 max-md:block">
                {crimeSpec}
              </span>
            </div>

            <div>
              <span className="font-semibold">Alibi:</span>
              <br className="md:block max-md:hidden" />
              <span className="max-md:ml-1 max-md:block">
                {alibiSpec}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
