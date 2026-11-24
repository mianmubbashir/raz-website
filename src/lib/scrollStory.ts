/**
 * Scroll-driven “suit story” beats.
 * Drop AI frames later into /public/images/scroll-story/frame-0001.webp …
 * and bump `frameCount` / use frameMode in ScrollStory.
 */

export const scrollStoryMeta = {
  label: "The craft film",
  title: "From cloth to cut.",
  subtitle:
    "Scroll to watch a shalwar kameez come alive — fold, measure, stitch, finish.",
} as const;

export type ScrollStoryBeat = {
  id: string;
  step: string;
  title: string;
  body: string;
  /** Current keyframe image (replace with AI sequence later) */
  image: string;
};

export const scrollStoryBeats: readonly ScrollStoryBeat[] = [
  {
    id: "fold",
    step: "01",
    title: "The fold",
    body: "A premium shalwar kameez, still quiet — fabric waiting for the first chalk mark.",
    image: "/images/suits/suit-design.jpg",
  },
  {
    id: "open",
    step: "02",
    title: "The open cloth",
    body: "Kurta and shalwar find their grain. Every line begins with respect for the fabric.",
    image: "/images/suits/suit-design-user.jpg",
  },
  {
    id: "measure",
    step: "03",
    title: "The measure",
    body: "Chest, length, fall — taken on the body, not guessed from a chart.",
    image: "/images/IMG_2698.jpg",
  },
  {
    id: "stitch",
    step: "04",
    title: "The stitch",
    body: "Collar, cuff, and seam — steady hands holding the house standard.",
    image: "/images/suits/suit-ghum-silai.jpg",
  },
  {
    id: "finish",
    step: "05",
    title: "The finish",
    body: "Pressed, fitted, ready — a shalwar kameez that carries the Raz name.",
    image: "/images/suits/suit-shalwar-cream.jpg",
  },
] as const;

/** Optional dense sequence folder (AI video → frames). Empty = beat mode. */
export const scrollStorySequence = {
  /** Set true when you have frame-0001.webp … frame-N.webp */
  enabled: false,
  dir: "/images/scroll-story",
  /** Zero-padded frame files: frame-0001.webp */
  prefix: "frame-",
  pad: 4,
  extension: "webp",
  frameCount: 0,
  fpsHint: 30,
} as const;
