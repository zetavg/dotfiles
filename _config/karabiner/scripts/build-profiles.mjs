import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profilesDir = path.join(__dirname, '..', 'src', 'profiles');
const distDir = path.join(__dirname, '..', 'dist', 'profiles');

// Ensure the dist/profiles directory exists
fs.mkdirSync(distDir, { recursive: true });

// Get all .mjs files from the profiles directory
const profileFiles = fs
  .readdirSync(profilesDir)
  .filter((file) => file.endsWith('.mjs'));

console.log(`Processing ${profileFiles.length} profile files...`);

let errorCount = 0;

for (const profileFile of profileFiles) {
  try {
    const profilePath = path.join(profilesDir, profileFile);
    const fileName = path.basename(profileFile, '.mjs');
    const outputPath = path.join(distDir, `${fileName}.json`);

    // Import the profile module
    const profileModule = await import(profilePath);
    const profileData = profileModule.default;

    if (!profileData) {
      throw new Error('No default export found, or it is null/undefined');
    }

    if (typeof profileData !== 'object') {
      throw new Error(
        `Expected an object as default export, but got ${typeof profileData}`,
      );
    }

    // Convert to JSON and write to file
    const jsonOutput = JSON.stringify(profileData, null, 4) + '\n';
    fs.writeFileSync(outputPath, jsonOutput);

    console.log(`✓ Generated ${fileName}.json`);
  } catch (error) {
    console.error(`✗ Error processing ${profileFile}:`, error.message);
    errorCount++;
  }
}

if (errorCount > 0) {
  console.log(`Completed with ${errorCount} error(s).`);
  process.exit(1);
} else {
  console.log('All files processed successfully.');
}
