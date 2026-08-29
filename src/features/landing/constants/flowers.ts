export type FlowerData = {
  x: number;
  y: number;
  size: number;
  hue: number;
  delay: number;
  duration: number;
};

const HUES = [8, 20, 335, 28];

export const FLOWERS: FlowerData[] = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37) % 100,
  y: 68 + ((i * 13) % 32),
  size: 32 + ((i * 7) % 34),
  hue: HUES[i % HUES.length],
  delay: (i % 7) * 0.3,
  duration: 4 + (i % 5),
}));