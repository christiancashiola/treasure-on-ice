const MOTIVATIONS = [
  'COOL!',
  'AWESOME!',
  'AMAZING!',
  'GREAT JOB!',
  'FANTASTIC!',
  'WONDERFUL!',
  'LET\'S GO!',
  'KEEP IT UP!',
  'NICELY DONE!',
  'EXCELLENT WORK!',
  'YOU\'RE A NATURAL!',
];

export function getMotivation() {
  const index = Math.floor(Math.random() * ((MOTIVATIONS.length - 1) + 1))

  return MOTIVATIONS[index];
}
