import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rulesDir = path.join(__dirname, '..', 'src', 'rules');
const distDir = path.join(__dirname, '..', 'dist', 'rules');

// Ensure the dist/rules directory exists
fs.mkdirSync(distDir, { recursive: true });

// Get all .mjs files from the rules directory
const ruleFiles = fs
  .readdirSync(rulesDir)
  .filter((file) => file.endsWith('.mjs'));

console.log(`Processing ${ruleFiles.length} rule files...`);

let errorCount = 0;

for (const ruleFile of ruleFiles) {
  try {
    const rulePath = path.join(rulesDir, ruleFile);
    const fileName = path.basename(ruleFile, '.mjs');
    const outputPath = path.join(distDir, `${fileName}.json`);

    // Import the rule module
    const ruleModule = await import(rulePath);
    const ruleData = ruleModule.default;

    if (!ruleData) {
      throw new Error('No default export found, or it is null/undefined');
    }

    if (typeof ruleData !== 'object') {
      throw new Error(
        `Expected an object as default export, but got ${typeof ruleData}`,
      );
    }

    // Convert to JSON and write to file
    const jsonOutput = JSON.stringify(ruleData, null, 4) + '\n';
    fs.writeFileSync(outputPath, jsonOutput);

    console.log(`✓ Generated ${fileName}.json`);
  } catch (error) {
    console.error(`✗ Error processing ${ruleFile}:`, error.message);
    errorCount++;
  }
}

if (errorCount > 0) {
  console.log(`Completed with ${errorCount} error(s).`);
  process.exit(1);
} else {
  console.log('All files processed successfully.');
}
