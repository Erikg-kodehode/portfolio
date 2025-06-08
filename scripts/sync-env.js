const { execSync } = require('child_process');
const fs = require('fs');
const dotenv = require('dotenv');

async function syncEnv() {
  try {
    // Check if Vercel CLI is installed
    try {
      execSync('vercel --version', { stdio: 'ignore' });
    } catch (error) {
      console.log('Installing Vercel CLI...');
      execSync('npm install -g vercel', { stdio: 'inherit' });
    }

    // Read .env file
    const envFile = fs.readFileSync('.env', 'utf8');
    const envVars = dotenv.parse(envFile);

    // Push each environment variable
    for (const [key, value] of Object.entries(envVars)) {
      try {
        console.log(`Syncing ${key}...`);
        execSync(`vercel env add ${key}`, { stdio: 'inherit' });
      } catch (error) {
        console.error(`Failed to sync ${key}:`, error.message);
      }
    }

    console.log('Environment variables synced successfully!');
  } catch (error) {
    console.error('Failed to sync environment variables:', error);
    process.exit(1);
  }
}

syncEnv();

