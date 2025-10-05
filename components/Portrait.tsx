import type {Emotion} from '@/app/play/page';
import Image from 'next/image';

interface PortraitProps {
  emotion: Emotion;
}

export default function Portrait({emotion}: PortraitProps) {
  return (
    <div className="w-[400px] h-[400px] relative
      border-4 border-gray-700 shadow-2xl">
      <Image
        src={`/portraits/${emotion}.png`}
        alt={`Suspect - ${emotion}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
