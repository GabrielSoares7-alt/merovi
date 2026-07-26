// Generates app/icon.png, app/apple-icon.png and app/favicon.ico from
// public/logo/merovi-mark.png. Re-run if the source logo asset changes.
import sharp from "sharp";
import fs from "node:fs";

const SRC = "public/logo/merovi-mark.png";
const BG = "#0a0a0a"; // matches --color-background in app/globals.css

async function markOnDarkSquare(canvasSize, markScale) {
  const markWidth = Math.round(canvasSize * markScale);
  const markHeight = Math.round(markWidth * (462 / 493));
  const mark = await sharp(SRC)
    .resize(markWidth, markHeight)
    .toBuffer();

  return sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: BG,
    },
  })
    .composite([
      {
        input: mark,
        left: Math.round((canvasSize - markWidth) / 2),
        top: Math.round((canvasSize - markHeight) / 2),
      },
    ])
    .png()
    .toBuffer();
}

function pngToIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // image data size
  entry.writeUInt32LE(header.length + entry.length, 12); // offset

  return Buffer.concat([header, entry, pngBuffer]);
}

const icon512 = await markOnDarkSquare(512, 0.62);
fs.writeFileSync("app/icon.png", icon512);
console.log("wrote app/icon.png (512x512)");

const appleIcon = await markOnDarkSquare(180, 0.62);
fs.writeFileSync("app/apple-icon.png", appleIcon);
console.log("wrote app/apple-icon.png (180x180)");

const favicon32 = await markOnDarkSquare(32, 0.66);
fs.writeFileSync("app/favicon.ico", pngToIco(favicon32, 32));
console.log("wrote app/favicon.ico (32x32)");
