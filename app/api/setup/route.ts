import {NextResponse} from 'next/server';

const firstNames = [
  'Jordan', 'Alex', 'Taylor', 'Morgan', 'Chris', 'Jamie', 'Riley',
];
const lastNames = [
  'Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Lopez', 'Anderson',
];

const victims = [
  'business partner',
  'tech CEO',
  'wealthy investor',
  'ex-spouse',
  'rival artist',
  'journalist',
  'landlord',
];

const places = [
  'the rooftop bar on 5th',
  'their luxury penthouse',
  'the underground parking garage',
  'the art gallery opening',
  'the private yacht',
  'the empty warehouse',
  'the downtown office',
];

const weapons = [
  'a switchblade',
  'a heavy statue',
  'poison',
  'a gunshot',
  'strangulation',
  'a blunt object',
  'a pushed fall',
];

const alibis = [
  'a charity gala',
  'a business conference',
  'dinner with friends',
  'their home office',
  'the gym',
  'a movie theater',
  'visiting family',
];

const corroborators = [
  'timestamped photos',
  'security footage',
  'credit card receipts',
  'witness statements',
  'phone records',
  'social media posts',
  'parking tickets',
];

/**
 * Generates random game setup with suspect name, crime, and alibi.
 * @returns JSON response with game initialization data
 */
export async function GET() {
  const firstName = 
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = 
    lastNames[Math.floor(Math.random() * lastNames.length)];
  const victim = victims[Math.floor(Math.random() * victims.length)];
  const place = places[Math.floor(Math.random() * places.length)];
  const weapon = weapons[Math.floor(Math.random() * weapons.length)];
  const alibi = alibis[Math.floor(Math.random() * alibis.length)];
  const corroborator = 
    corroborators[Math.floor(Math.random() * corroborators.length)];

  return NextResponse.json({
    name: {
      first: firstName,
      last: lastName,
    },
    crimeSpec: `The victim was a ${victim} killed at ${place} ` +
      `with ${weapon}.`,
    alibiSpec: `At that time, ${firstName} ${lastName} claims ` +
      `they were at ${alibi}, corroborated by ${corroborator}.`,
  });
}