interface StickyNoteProps {
  name: {first: string; last: string};
  crimeSpec: string;
  alibiSpec: string;
}

export default function StickyNote({
  name,
  crimeSpec,
  alibiSpec,
}: StickyNoteProps) {
  return (
    <div className="fixed top-8 right-8 w-72 bg-yellow-100
      p-6 shadow-xl transform rotate-2
      border-t-8 border-yellow-200 z-50
      md:top-8 md:right-8 md:w-72 md:rotate-2 md:border-t-8
      max-md:top-2 max-md:left-2 max-md:right-2 max-md:w-auto
      max-md:rotate-0 max-md:border-t-4 max-md:p-3">
      <div className="font-handwriting text-gray-900
        space-y-3 text-sm leading-relaxed
        md:space-y-3 md:text-sm
        max-md:space-y-1.5 max-md:text-xs max-md:leading-tight">
        <div className="font-bold text-base border-b
          border-gray-400 pb-2
          md:text-base md:pb-2
          max-md:text-sm max-md:pb-1">
          SUSPECT
        </div>

        <div>
          <span className="font-semibold">Name:</span>{' '}
          <span className="md:block max-md:inline">
            {name.first} {name.last}
          </span>
        </div>

        <div>
          <span className="font-semibold">Crime:</span>{' '}
          <span className="md:block max-md:inline">
            {crimeSpec}
          </span>
        </div>

        <div>
          <span className="font-semibold">Alibi:</span>{' '}
          <span className="md:block max-md:inline">
            {alibiSpec}
          </span>
        </div>
      </div>
    </div>
  );
}
