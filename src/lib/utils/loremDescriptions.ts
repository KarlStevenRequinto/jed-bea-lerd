const SHORT_LOREM_SAMPLES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
];

const LONG_LOREM_SAMPLES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris, fusce nec tellus sed augue semper porta. Mauris massa, vestibulum lacinia arcu eget nulla.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor maecenas mattis. Sed convallis tristique sem, proin ut ligula vel nunc egestas porttitor.",
];

const hashSeed = (seed: string): number => {
  return seed.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
};

export const getLoremDescription = (seed: string): string => {
  const hash = hashSeed(seed);
  const isLong = hash % 2 === 0;
  const shortIndex = hash % SHORT_LOREM_SAMPLES.length;
  const longIndex = hash % LONG_LOREM_SAMPLES.length;

  return isLong ? LONG_LOREM_SAMPLES[longIndex] : SHORT_LOREM_SAMPLES[shortIndex];
};

