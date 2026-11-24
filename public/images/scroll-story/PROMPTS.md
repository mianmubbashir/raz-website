# Raz Stitching — AI prompts (scroll craft film)

**Style lock (har prompt ke end pe yeh line chipkao):**

```text
cinematic studio product shot, dark charcoal-to-ink gradient background, soft brass-gold rim lighting, ultra realistic cotton fabric texture, 4K, centered composition, empty space around subject, no text, no logo, no watermark, no people, no hands, no face
```

**Aspect ratio:** `16:9` (desktop hero) ya `9:16` (mobile reels) — website ke liye pehle **16:9** banao.  
**Consistency tip:** pehli image ko reference / style reference bana kar baaki generate karo (Flux / Midjourney --cref / Kling image-to-video).

---

## Step A — 5 key frames (image tool: Midjourney / Flux / Ideogram)

### Frame 01 — The fold (START)

```text
Neatly folded premium men's shalwar kameez floating in mid-air, deep charcoal grey cotton, crisp geometric fold stack, subtle sheen on fabric edges, soft brass rim light from the right, dark ink gradient background, luxury tailor product photography, ultra realistic, 4K, centered, empty space around, no text, no logo, no people
```

### Frame 02 — The open cloth

```text
Same studio, same charcoal grey men's shalwar kameez fabric now partially unfolded in mid-air, kurta panel opening away from folded shalwar, natural soft drapes and folds, floating as if zero gravity, soft brass rim lighting, dark ink gradient background, ultra realistic product shot, 4K, centered, no text, no logo, no people
```

### Frame 03 — The measure

```text
Same dark studio, men's charcoal kurta cloth suspended open in mid-air with a tailor's measuring tape draped across chest line and length, faint white chalk marks on fabric, brass accents on tape tips catching light, soft brass rim light, ultra realistic, 4K, centered, no hands, no people, no text, no logo
```

### Frame 04 — The stitch

```text
Extreme close cinematic product detail of fine machine-and-hand quality stitching on a men's shalwar kameez collar and placket, charcoal cotton weave visible, needle and thread mid-stitch hovering near the seam, soft brass rim light, dark background bokeh, ultra detailed, 4K, no hands, no face, no text, no logo
```

### Frame 05 — The finish (END)

```text
Finished premium men's charcoal grey shalwar kameez displayed on a matte black invisible mannequin, perfect tailored fit, clean collar and cuffs, soft brass rim lighting, dark ink gradient background, luxury Karachi tailor lookbook style, ultra realistic, 4K, centered, empty space around, no text, no logo, no people
```

---

## Step B — Video transitions (Kling / Runway / Veo)

Har transition me **start image + end image** upload karo, phir yeh prompt:

### 01 → 02 (fold → open)

```text
Smooth cinematic product animation, neatly folded men's charcoal shalwar kameez slowly unfolds in mid-air, fabric physics, elegant slow motion, continuous locked camera, dark studio, soft brass rim light, no cuts, no text, 4 seconds
```

### 02 → 03 (open → measure)

```text
Smooth cinematic product animation, open charcoal kurta fabric in mid-air, a tailor measuring tape gently drapes across the garment, chalk marks fade in, locked camera, dark studio, brass rim light, no hands, no people, no text, 4 seconds
```

### 03 → 04 (measure → stitch)

```text
Camera slowly pushes into the collar and placket of a charcoal men's kameez, stitching forms along the seam, needle and thread motion, macro fabric detail, dark studio, brass rim light, continuous shot, no hands, no text, 4 seconds
```

### 04 → 05 (stitch → finished suit)

```text
Macro stitching pulls back to reveal a complete tailored men's charcoal shalwar kameez on a matte black mannequin, elegant settle into final pose, locked then slight orbit, dark studio, soft brass rim light, luxury lookbook, no text, no people, 5 seconds
```

### Full film (agar tool ek hi video me kare)

```text
Cinematic product transformation film: folded men's charcoal shalwar kameez floats in a dark studio, unfolds, measuring tape appears, stitching detail, then resolves into a finished suit on a matte black mannequin. Continuous camera, soft brass rim lighting, realistic fabric physics, luxury tailor brand film, no text, no logo, no people, 12 seconds
```

---

## Step C — Website ke liye export

1. Final video se **image sequence** nikaalo:
   - `frame-0001.webp`, `frame-0002.webp`, … (120–180 frames ideal)
2. Files yahan rakho: `public/images/scroll-story/`
3. `src/lib/scrollStory.ts` me:

```ts
enabled: true,
frameCount: 120, // apni total frames
extension: "webp",
```

---

## Negative prompt (agar tool support kare)

```text
text, watermark, logo, people, hands, fingers, face, cartoon, low quality, blurry, oversaturated, neon lights, busy background, plastic fabric, wrong anatomy mannequin
```
