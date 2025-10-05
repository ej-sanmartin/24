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
      border-t-8 border-yellow-200">
      <div className="font-handwriting text-gray-900 space-y-3
        text-sm leading-relaxed">
        <div className="font-bold text-base border-b
          border-gray-400 pb-2">
          SUSPECT
        </div>

        <div>
          <span className="font-semibold">Name:</span>
          <br />
          {name.first} {name.last}
        </div>

        <div>
          <span className="font-semibold">Crime:</span>
          <br />
          {crimeSpec}
        </div>

        <div>
          <span className="font-semibold">Alibi:</span>
          <br />
          {alibiSpec}
        </div>
      </div>
    </div>
  );
}
