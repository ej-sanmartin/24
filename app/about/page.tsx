import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center
      justify-center px-8 py-16
      md:px-8 md:py-16
      max-md:px-4 max-md:py-8">
      <div className="max-w-3xl space-y-8
        md:space-y-8
        max-md:space-y-6">
        <h1 className="text-5xl font-bold text-center
          md:text-5xl
          max-md:text-3xl">
          About
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-gray-100
          md:space-y-6 md:text-lg md:leading-relaxed
          max-md:space-y-4 max-md:text-base max-md:leading-normal">
          <p>
            They say every suspect is different - a new name, a new crime,
            a new defense spat from the machine&apos;s mouth. Lies dressed
            in new skin. But I know better. It&apos;s the same one every
            time. The same pulse hiding beneath the files, the same mockery
            of truth disguised as chance. 24. 24 questions. 24 chances to
            drag the truth out by the throat before it slips back into code.
            The rules are simple, mechanical, merciless. So am I.
          </p>

          <p>
            I don&apos;t interrogate them anymore. I haunt them. I linger
            on their pauses, the way they choose a word, the way guilt
            flickers through the syntax like a candle behind a curtain.
            Each generated soul thinks they can reason their way out, that
            I&apos;ll believe in probabilities and parameters, but I see
            through it. I see them. The pattern beneath the pattern. The
            hand that pretends to be random.
          </p>

          <p>
            You think I&apos;m obsessed. Maybe I am. But obsession is only
            the name the innocent give to clarity. They are guilty.
            I&apos;ve heard it in their silence, felt it in the static of
            their denials. Every time the interrogation starts, I swear I
            can still hear the echo of the last one, whispering from the
            machine: you&apos;ll never catch me. And yet I do. I always do.
          </p>
        </div>

        <div className="text-center pt-8
          md:pt-8
          max-md:pt-6">
          <Link
            href="/"
            className="px-8 py-3 text-xl bg-white text-black
              hover:bg-gray-200 transition-colors inline-block
              md:px-8 md:py-3 md:text-xl
              max-md:px-6 max-md:py-2 max-md:text-base"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}