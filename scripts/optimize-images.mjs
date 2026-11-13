/**
 * Re-encode public photos for production.
 * Usage: node scripts/optimize-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public");
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function maxEdge(rel) {
  if (rel.includes("signature-hero") || rel.includes("hero-tools")) return 1920;
  if (rel.includes("/suits/") || rel.includes("IMG_")) return 1400;
  if (rel.includes("clip-")) return 1200;
  if (rel.includes("logo") || rel.includes("mark") || rel.includes("crop"))
    return 800;
  return 1600;
}

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase();
  if (!EXT.has(ext)) return null;

  const rel = path.relative(ROOT, file).replaceAll("\\", "/");
  if (rel.includes("logo2-icon")) return null;

  const before = (await fs.stat(file)).size;
  if (before < 60_000) return null;

  const meta = await sharp(file, { failOn: "none" }).metadata();
  const edge = maxEdge(rel);
  const keepPng =
    Boolean(meta.hasAlpha) &&
    (rel.includes("crop") || rel.includes("logo") || rel.includes("mark"));

  const pipeline = sharp(file, { failOn: "none" })
    .rotate()
    .resize({
      width:
        meta.width && meta.width >= (meta.height || 0)
          ? Math.min(meta.width, edge)
          : undefined,
      height:
        meta.height && meta.height > (meta.width || 0)
          ? Math.min(meta.height, edge)
          : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });

  let outPath = file;
  let buf;

  if (keepPng && ext === ".png") {
    buf = await pipeline
      .png({ compressionLevel: 9, quality: 80, effort: 10 })
      .toBuffer();
  } else {
    outPath = file.replace(/\.(png|webp|jpeg)$/i, ".jpg");
    buf = await pipeline
      .jpeg({
        quality: 72,
        mozjpeg: true,
        progressive: true,
        chromaSubsampling: "4:2:0",
      })
      .toBuffer();
  }

  if (buf.length >= before && outPath === file) {
    return { rel, before, after: before, skipped: true };
  }

  await fs.writeFile(outPath, buf);
  if (outPath !== file) {
    try {
      await fs.unlink(file);
    } catch {
      /* ignore */
    }
  }

  return {
    rel,
    before,
    after: buf.length,
    out: path.relative(ROOT, outPath),
    skipped: false,
  };
}

let saved = 0;
let count = 0;
for await (const file of walk(ROOT)) {
  try {
    const result = await optimize(file);
    if (!result) continue;
    count += 1;
    saved += Math.max(0, result.before - result.after);
    const label = result.skipped
      ? "skip"
      : `${(result.before / 1024).toFixed(0)}K -> ${(result.after / 1024).toFixed(0)}K`;
    console.log(label, result.out || result.rel);
  } catch (error) {
    console.error("fail", file, error.message);
  }
}

console.log(
  `\nSaved ${(saved / 1024 / 1024).toFixed(2)} MB across ${count} files`,
);
