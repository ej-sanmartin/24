import {NextResponse} from 'next/server';

// Force dynamic rendering - disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const firstNames = [
  'Michael', 'James', 'Robert', 'David', 'William',
  'Richard', 'Thomas', 'Charles', 'Daniel', 'Matthew',
  'Anthony', 'Mark', 'Steven', 'Paul', 'Andrew',
  'Joshua', 'Kenneth', 'Kevin', 'Brian', 'George',
  'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey',
];
const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
  'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
];

const victimNames = [
  'Olivia Johnson',
  'Noah Smith',
  'Emma Williams',
  'Liam Brown',
  'Ava Jones',
  'Ethan Garcia',
  'Sophia Miller',
  'Mason Davis',
  'Isabella Rodriguez',
  'Logan Martinez',
  'Mia Hernandez',
  'Lucas Lopez',
  'Charlotte Gonzalez',
  'Elijah Wilson',
  'Amelia Anderson',
  'Benjamin Thomas',
  'Harper Taylor',
  'Oliver Moore',
  'Evelyn Jackson',
  'James Martin',
  'Abigail Thompson',
  'Alexander White',
  'Emily Lee',
  'Michael Harris',
  'Elizabeth Clark',
  'Daniel Lewis',
  'Sofia Robinson',
  'Henry Walker',
  'Avery Perez',
  'Jackson Hall',
  'Ella Young',
  'Sebastian Allen',
  'Scarlett Sanchez',
  'Jack Wright',
  'Grace King',
  'Owen Scott',
  'Chloe Green',
  'Wyatt Baker',
  'Lily Adams',
  'Gabriel Nelson',
  'Hannah Carter',
  'David Mitchell',
  'Aria Flores',
  'Matthew Turner',
  'Nora Phillips',
  'Caleb Campbell',
  'Victoria Parker',
  'Julian Evans',
  'Zoe Rivera',
  'Levi Cooper',
];

const victimDescriptors = [
  'business partner',
  'tech CEO',
  'wealthy investor',
  'ex-spouse',
  'rival artist',
  'journalist',
  'landlord',
  'corrupt politician',
  'celebrity chef',
  'fashion designer',
  'hedge fund manager',
  'nightclub owner',
  'private investigator',
  'art dealer',
  'real estate mogul',
  'film producer',
  'defense attorney',
  'pharmaceutical executive',
  'diamond merchant',
  'casino owner',
  'shipping magnate',
  'museum curator',
  'talent agent',
  'venture capitalist',
  'auction house director',
  'software developer',
  'record label executive',
  'philanthropist',
  'antiques dealer',
  'advertising executive',
];

const places = [
  'the rooftop bar on 5th',
  'their luxury penthouse',
  'the underground parking garage',
  'the art gallery opening',
  'the private yacht',
  'the empty warehouse',
  'the downtown office',
  'the upscale hotel suite',
  'the country club',
  'the abandoned factory',
  'the private estate',
  'the theater backstage',
  'the exclusive restaurant',
  'the corporate boardroom',
  'the jazz club',
  'the marina dock',
  'the mansion library',
  'the wine cellar',
  'the penthouse terrace',
  'the art studio loft',
  'the private plane',
  'the storage facility',
  'the botanical garden',
  'the casino VIP room',
  'the underground tunnel',
  'the historic mansion',
  'the high-rise construction site',
  'the limousine',
  'the opera house balcony',
  'the secluded cabin',
];

const weapons = [
  'a switchblade',
  'a heavy statue',
  'poison',
  'a gunshot',
  'strangulation',
  'a blunt object',
  'a pushed fall',
  'a letter opener',
  'a crystal decanter',
  'a silk scarf',
  'a fire poker',
  'a champagne bottle',
  'a marble bookend',
  'an antique sword',
  'a golf club',
  'arsenic',
  'a wire garrote',
  'a heavy ashtray',
  'a candlestick',
  'a thrown object',
  'a syringe',
  'a tire iron',
  'a bronze sculpture',
  'cyanide',
  'a glass shard',
  'a brass lamp',
  'a trophy',
  'an ice pick',
  'suffocation',
  'a wrench',
];

const alibis = [
  'a charity gala',
  'a business conference',
  'dinner with friends',
  'their home office',
  'the gym',
  'a movie theater',
  'visiting family',
  'a golf tournament',
  'a spa appointment',
  'a wine tasting',
  'a poker game',
  'the airport lounge',
  'a cooking class',
  'a book club meeting',
  'the hospital',
  'a yoga retreat',
  'a concert',
  'a Broadway show',
  'the library',
  'a client meeting',
  'a tennis match',
  'the country estate',
  'a fundraising dinner',
  'the hotel bar',
  'a gallery exhibition',
  'a private party',
  'the racquet club',
  'a flight to another city',
  'a wedding reception',
  'the symphony hall',
];

const corroborators = [
  'timestamped photos',
  'security footage',
  'credit card receipts',
  'witness statements',
  'phone records',
  'social media posts',
  'parking tickets',
  'GPS tracking data',
  'ATM withdrawal records',
  'hotel key card logs',
  'email timestamps',
  'text message records',
  'restaurant reservations',
  'airline boarding passes',
  'valet parking stubs',
  'gym check-in logs',
  'video call recordings',
  'toll booth records',
  'rideshare receipts',
  'signed guest books',
  'prescription pickup logs',
  'online purchase confirmations',
  'bank surveillance tapes',
  'doorbell camera footage',
  'fitness tracker data',
  'streaming service activity',
  'conference badge swipes',
  'event ticket stubs',
  'hospital visitor logs',
  'smart home device logs',
];

/**
 * Generates random game setup with suspect name, crime, and alibi.
 * @returns JSON response with game initialization data
 */
export async function GET() {
  // Disable caching to ensure fresh scenarios every time
  const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'Pragma': 'no-cache',
  };
  const firstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  const victimName =
    victimNames[Math.floor(Math.random() * victimNames.length)];
  const victimDescriptor =
    victimDescriptors[Math.floor(Math.random() * victimDescriptors.length)];
  const place = places[Math.floor(Math.random() * places.length)];
  const weapon = weapons[Math.floor(Math.random() * weapons.length)];
  const alibi = alibis[Math.floor(Math.random() * alibis.length)];
  const corroborator =
    corroborators[Math.floor(Math.random() * corroborators.length)];

  return NextResponse.json(
    {
      name: {
        first: firstName,
        last: lastName,
      },
      victim: {
        name: victimName,
        descriptor: victimDescriptor,
      },
      crimeSpec: `The victim, ${victimName}, was a ${victimDescriptor} killed at ${place} ` +
        `with ${weapon}.`,
      alibiSpec: `At that time, ${firstName} ${lastName} claims ` +
        `they were at ${alibi}, corroborated by ${corroborator}.`,
    },
    {headers},
  );
}
