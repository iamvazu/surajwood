const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const TARGET_DIR = path.join(__dirname, "public", "images");
const SIZE_THRESHOLD_BYTES = 150 * 1024; // 150 KB
const MAX_WIDTH = 1920;

async function walkDir(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      files = files.concat(await walkDir(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        files.push({ filePath, stat, ext });
      }
    }
  }
  return files;
}

async function optimizeImage({ filePath, stat, ext }) {
  if (stat.size <= SIZE_THRESHOLD_BYTES) {
    return; // Already below size threshold
  }

  const relativePath = path.relative(TARGET_DIR, filePath);
  console.log(`Processing: ${relativePath} (${(stat.size / 1024).toFixed(1)} KB)`);

  try {
    const pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();

    let processed = pipeline;

    // Resize if wider than max width
    if (metadata.width && metadata.width > MAX_WIDTH) {
      console.log(`  Resizing width from ${metadata.width}px to ${MAX_WIDTH}px`);
      processed = processed.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    // Apply compression options based on format
    if (ext === ".jpg" || ext === ".jpeg") {
      processed = processed.jpeg({ quality: 80, progressive: true, mozjpeg: true });
    } else if (ext === ".png") {
      processed = processed.png({ quality: 80, compressionLevel: 9 });
    } else if (ext === ".webp") {
      processed = processed.webp({ quality: 80 });
    }

    const tempFilePath = filePath + ".tmp";
    await processed.toFile(tempFilePath);

    const tempStat = fs.statSync(tempFilePath);
    if (tempStat.size < stat.size) {
      fs.unlinkSync(filePath);
      fs.renameSync(tempFilePath, filePath);
      console.log(`  Success! Reduced to ${(tempStat.size / 1024).toFixed(1)} KB (${((1 - tempStat.size / stat.size) * 100).toFixed(1)}% savings)`);
    } else {
      fs.unlinkSync(tempFilePath);
      console.log(`  Skipped (temp file ${(tempStat.size / 1024).toFixed(1)} KB was not smaller than original)`);
    }
  } catch (error) {
    console.error(`  Error processing ${relativePath}:`, error.message);
  }
}

async function main() {
  console.log(`Scanning directory: ${TARGET_DIR}`);
  if (!fs.existsSync(TARGET_DIR)) {
    console.error("Target directory does not exist!");
    process.exit(1);
  }

  const allImages = await walkDir(TARGET_DIR);
  console.log(`Found ${allImages.length} images. Checking sizes...`);

  let processedCount = 0;
  for (const img of allImages) {
    if (img.stat.size > SIZE_THRESHOLD_BYTES) {
      await optimizeImage(img);
      processedCount++;
    }
  }

  console.log(`Done! Inspected ${allImages.length} images, optimized ${processedCount}.`);
}

main().catch(err => {
  console.error("Fatal error:", err);
});
