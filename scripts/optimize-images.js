const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '../src/assets/images');

async function optimizeImages() {
  console.log('🚀 Starting image optimization to WebP format...');
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Images directory not found: ${IMAGES_DIR}`);
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
  });

  if (imageFiles.length === 0) {
    console.log('✨ No source images found to optimize.');
    return;
  }

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const fileBase = path.basename(file, path.extname(file));
    const outputPath = path.join(IMAGES_DIR, `${fileBase}.webp`);

    const stats = fs.statSync(inputPath);
    totalOriginalSize += stats.size;

    console.log(`\n📷 Optimizing: ${file} (${(stats.size / 1024).toFixed(1)} KB)`);

    try {
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);

      const outStats = fs.statSync(outputPath);
      totalOptimizedSize += outStats.size;

      const savings = ((1 - outStats.size / stats.size) * 100).toFixed(1);
      console.log(`✅ Generated: ${fileBase}.webp (${(outStats.size / 1024).toFixed(1)} KB) | Savings: ${savings}%`);
    } catch (error) {
      console.error(`❌ Failed to optimize ${file}:`, error.message);
    }
  }

  console.log('\n=========================================');
  console.log('🎉 Image Optimization completed successfully!');
  console.log(`Original files size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized files size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
  console.log(`Total space saved: ${totalSavings}%`);
  console.log('=========================================');
}

optimizeImages();
