import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourcePath = path.join(root, 'public', 'images', 'profile.jpg');
const outDir = path.join(root, 'public', 'images');

const source = sharp(sourcePath).rotate();
const meta = await source.metadata();
console.log(`Source portrait: ${meta.width} × ${meta.height}px`);

const widths = [480, 768, 1080, 1536];
for (const width of widths) {
  const resized = sharp(sourcePath).rotate().resize({ width, withoutEnlargement: true });
  await resized.clone().webp({ quality: 82, effort: 5 }).toFile(path.join(outDir, `profile-${width}.webp`));
  await resized.clone().avif({ quality: 58, effort: 5 }).toFile(path.join(outDir, `profile-${width}.avif`));
  console.log(`Generated ${width}px WebP + AVIF`);
}

// A 1200 × 630 social card that uses the supplied portrait, not a generated face.
const portraitWidth = 530;
const portraitHeight = 630;
const portrait = await sharp(sourcePath)
  .rotate()
  .resize({ width: portraitWidth, height: portraitHeight, fit: 'cover', position: 'centre' })
  .jpeg({ quality: 86 })
  .toBuffer();

const portraitBase64 = portrait.toString('base64');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#08090B"/>
      <stop offset="0.72" stop-color="#08090B" stop-opacity="0.96"/>
      <stop offset="1" stop-color="#08090B" stop-opacity="0.08"/>
    </linearGradient>
    <linearGradient id="photoShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.56" stop-color="#08090B" stop-opacity="0"/>
      <stop offset="1" stop-color="#08090B" stop-opacity="0.5"/>
    </linearGradient>
    <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M 34 0 L 0 0 0 34" fill="none" stroke="#D5D9E0" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#08090B"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <image href="data:image/jpeg;base64,${portraitBase64}" x="670" y="0" width="${portraitWidth}" height="${portraitHeight}" preserveAspectRatio="xMidYMid slice"/>
  <rect x="670" y="0" width="${portraitWidth}" height="${portraitHeight}" fill="url(#photoShade)"/>
  <rect x="0" y="0" width="790" height="630" fill="url(#fade)"/>
  <g fill="none" stroke="#30343B" stroke-width="1">
    <path d="M40 40 H1160 M40 590 H1160"/>
    <path d="M40 40 V590 M1160 40 V590"/>
    <path d="M105 110 H603 M105 552 H603"/>
  </g>
  <g font-family="Arial, Helvetica, sans-serif" fill="#A5A8B0" font-size="13" letter-spacing="3">
    <text x="105" y="88">ABDULLAH AL MAHMUD</text>
    <text x="105" y="590">MANUAL QA ENGINEER / DHAKA, BANGLADESH</text>
  </g>
  <g font-family="Arial, Helvetica, sans-serif" fill="#F5F5F5" font-size="66" font-weight="700" letter-spacing="-2.5">
    <text x="105" y="246">Quality isn’t</text>
    <text x="105" y="316">an assumption.</text>
    <text x="105" y="386">It’s tested.</text>
  </g>
  <g font-family="Arial, Helvetica, sans-serif" fill="#93B4D6" font-size="13" letter-spacing="2">
    <text x="105" y="452">SaaS / FINTECH / API / RELEASE QUALITY</text>
  </g>
  <g stroke="#9399A4" stroke-width="1">
    <path d="M1074 72 v24 M1062 84 h24"/>
    <circle cx="1074" cy="84" r="1.5" fill="#93B4D6" stroke="none"/>
  </g>
  <rect x="105" y="514" width="210" height="1" fill="#30343B"/>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(outDir, 'og-image.png'));
console.log('Generated og-image.png');

// Keep a lightweight, retry-safe marker for the build.
await fs.writeFile(
  path.join(outDir, 'portrait-manifest.json'),
  JSON.stringify({ source: 'profile.jpg', widths, formats: ['avif', 'webp'], social: 'og-image.png' }, null, 2),
);

// Apple touch icon rendered from the source SVG so the browser shortcut stays sharp.
const iconDir = path.join(root, 'public', 'icons');
await fs.mkdir(iconDir, { recursive: true });
await sharp(path.join(root, 'public', 'favicon.svg'))
  .resize(180, 180)
  .flatten({ background: '#08090B' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(iconDir, 'apple-touch-icon.png'));
console.log('Generated apple-touch-icon.png');
