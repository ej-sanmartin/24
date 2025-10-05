import type {Emotion} from '@/app/play/page';
import Image from 'next/image';

interface PortraitProps {
  emotion: Emotion;
}

export default function Portrait({emotion}: PortraitProps) {
  return (
    <div className="w-[300px] h-[300px] relative
      border-4 border-gray-500 shadow-2xl
      md:w-[300px] md:h-[300px] md:border-4
      max-md:w-[200px] max-md:h-[200px] max-md:border-3">
      <Image
        src={`/portraits/${emotion}.png`}
        alt={`Suspect - ${emotion}`}
        className="w-full h-full object-cover"
        width={300}
        height={300}
      />
    </div>
  );
}
