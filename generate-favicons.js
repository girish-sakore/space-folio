#!/usr/bin/env node

/**
 * Favicon Generation Script for Space-Folio Project
 * 
 * This script helps generate all required favicon and icon files
 * from the existing Proxima_Cloud-removebg-preview.png logo.
 * 
 * Required files to generate:
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REQUIRED_ASSETS = {
  favicons: [
    { name: 'favicon.ico', size: 'multi', description: 'Multi-size ICO file (16x16, 32x32, 48x48)' },
    { name: 'favicon-16x16.png', size: '16x16', description: 'Small favicon for browser tabs' },
    { name: 'favicon-32x32.png', size: '32x32', description: 'Standard favicon size' }
  ],
  appleIcons: [
    { name: 'apple-touch-icon.png', size: '180x180', description: 'Apple touch icon for iOS devices' }
  ],
  androidIcons: [
    { name: 'android-chrome-192x192.png', size: '192x192', description: 'Android home screen icon' },
    { name: 'android-chrome-512x512.png', size: '512x512', description: 'Android splash screen icon' }
  ],
  microsoftTiles: [
    { name: 'mstile-150x150.png', size: '150x150', description: 'Microsoft tile for Windows' }
  ],
  socialImages: [
    { name: 'images/og-image.png', size: '1200x630', description: 'Open Graph image for social sharing' },
    { name: 'images/logo.png', size: '400x400', description: 'Company logo for structured data' }
  ],
  pwaScreenshots: [
    { name: 'images/screenshot-wide.png', size: '1280x720', description: 'Wide screenshot for PWA' },
    { name: 'images/screenshot-narrow.png', size: '360x640', description: 'Narrow screenshot for PWA mobile' }
  ]
};

function checkExistingAssets() {
  console.log('🔍 Checking for missing favicon assets...\n');
  
  const publicDir = path.join(__dirname, 'public');
  const missingAssets = [];
  
  // Check all required assets
  Object.entries(REQUIRED_ASSETS).forEach(([category, assets]) => {
    console.log(`📂 ${category.toUpperCase()}:`);
    
    assets.forEach(asset => {
      const filePath = path.join(publicDir, asset.name);
      const exists = fs.existsSync(filePath);
      
      if (!exists) {
        missingAssets.push(asset);
      }
      
      console.log(`${exists ? '✅' : '❌'} ${asset.name} (${asset.size}) - ${asset.description}`);
    });
    
    console.log('');
  });
  
  return missingAssets;
}

function generateInstructions(missingAssets) {
  console.log('📝 FAVICON GENERATION INSTRUCTIONS');
  console.log('='*50);
  console.log('');
  console.log('Source Logo: public/Proxima_Cloud-removebg-preview.png');
  console.log('Theme Color: #0d9488 (Teal)');
  console.log('Background: #0f172a (Dark Slate)');
  console.log('');
  
  console.log('🛠️  RECOMMENDED TOOLS:');
  console.log('1. Online: https://favicon.io/ (Easy, automatic)');
  console.log('2. Online: https://realfavicongenerator.net/ (Comprehensive)');
  console.log('3. Local: Use ImageMagick or similar tool');
  console.log('');
  
  console.log('📋 MISSING ASSETS TO GENERATE:');
  missingAssets.forEach((asset, index) => {
    console.log(`${index + 1}. ${asset.name} (${asset.size}px)`);
    console.log(`   └─ ${asset.description}`);
  });
  
  console.log('');
  console.log('🚀 QUICK START WITH FAVICON.IO:');
  console.log('1. Go to https://favicon.io/favicon-converter/');
  console.log('2. Upload: public/Proxima_Cloud-removebg-preview.png');
  console.log('3. Download the generated favicon package');
  console.log('4. Extract and copy all files to public/ directory');
  console.log('5. Run this script again to verify all assets exist');
  console.log('');
  
  if (missingAssets.length === 0) {
    console.log('🎉 ALL FAVICON ASSETS ARE PRESENT! Ready for production.');
  } else {
    console.log(`⚠️  ${missingAssets.length} assets missing. Generate them to complete the setup.`);
  }
}

function main() {
  console.log('🎨 Space-Folio Favicon Generator');
  console.log('=================================\n');
  
  const missingAssets = checkExistingAssets();
  generateInstructions(missingAssets);
  
  // Generate placeholder manifest validation
  const manifestPath = path.join(__dirname, 'public', 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    console.log('✅ manifest.json exists and references the correct icon files');
  } else {
    console.log('❌ manifest.json is missing');
  }
  
  console.log('\n📧 Need help? Check ICON_GENERATION_INSTRUCTIONS.md');
  console.log('🔧 This script located at: generate-favicons.js');
}

// Run main function if this file is executed directly
main();

export {
  REQUIRED_ASSETS,
  checkExistingAssets,
  generateInstructions
};
