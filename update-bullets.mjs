import fs from 'fs/promises';
import path from 'path';

const files = [
  './app/(routes)/en/about/page.tsx',
  './app/(routes)/no/about/page.tsx'
];

async function updateFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const updated = content.replace(
      /<span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">□<\/span>/g,
      '<span className="text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200">-</span>'
    );
    await fs.writeFile(filePath, updated, 'utf8');
    console.log(`Updated ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function updateAllFiles() {
  for (const file of files) {
    await updateFile(file);
  }
}

updateAllFiles().catch(console.error);

