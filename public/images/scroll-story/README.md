# Scroll story frames (optional)

When your AI video is ready:

1. Export as an image sequence: `frame-0001.webp`, `frame-0002.webp`, …
2. Put files in this folder
3. In `src/lib/scrollStory.ts` set:

```ts
export const scrollStorySequence = {
  enabled: true,
  dir: "/images/scroll-story",
  prefix: "frame-",
  pad: 4,
  extension: "webp",
  frameCount: 120, // your total frames
  fpsHint: 30,
};
```

Until then the site uses the 5 story beats with existing photos.
