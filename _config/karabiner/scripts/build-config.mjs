import { readdir, writeFile } from 'fs/promises';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildConfig() {
  try {
    const srcDir = resolve(__dirname, '../src');
    const profilesDir = join(srcDir, 'profiles');
    const outputPath = resolve(__dirname, '../karabiner.json');

    // Read all files in the profiles directory
    const profileFiles = await readdir(profilesDir);

    // Filter for .mjs files only
    const mjsFiles = profileFiles.filter(file => file.endsWith('.mjs'));

    if (mjsFiles.length === 0) {
      console.log('No profile files found in src/profiles/');
      return;
    }

    console.log(`Found ${mjsFiles.length} profile(s): ${mjsFiles.join(', ')}`);

    // Import all profile modules
    const profiles = [];
    for (const file of mjsFiles) {
      const profilePath = `../src/profiles/${file}`;
      console.log(`Importing ${profilePath}...`);

      try {
        const module = await import(profilePath);
        let profile = module.default;

        // Mark default profile as selected
        if (file === 'default.mjs') {
          profile = { ...profile, selected: true };
        }

        // Sort top-level keys alphabetically
        const sortedProfile = {};
        Object.keys(profile).sort().forEach(key => {
          sortedProfile[key] = profile[key];
        });

        profiles.push(sortedProfile);
      } catch (error) {
        console.error(`Error importing ${file}:`, error.message);
        process.exit(1);
      }
    }

    // Create the karabiner configuration object
    const config = {
      profiles: profiles
    };

    // Write the configuration to karabiner.json
    const jsonContent = JSON.stringify(config, null, 4);
    await writeFile(outputPath, jsonContent, 'utf8');

    console.log(`Successfully built karabiner.json with ${profiles.length} profile(s)`);
    console.log(`Output written to: ${outputPath}`);

  } catch (error) {
    console.error('Error building config:', error.message);
    process.exit(1);
  }
}

// Run the build
buildConfig();
