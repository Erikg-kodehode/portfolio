import en from '../app/i18n/locales/en';
import no from '../app/i18n/locales/no';

// Function to collect all keys from a nested object recursively
function collectKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
  
  for (const key in obj) {
    const currentKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // If value is an object, recursively collect its keys
      keys = [...keys, ...collectKeys(obj[key], currentKey)];
    } else {
      // If value is a primitive or array, add the key
      keys.push(currentKey);
    }
  }
  
  return keys;
}

// Collect all keys from both translation files
const enKeys = collectKeys(en);
const noKeys = collectKeys(no);

// Find keys in English that are missing in Norwegian
const missingInNorwegian = enKeys.filter(key => !noKeys.includes(key));

// Find keys in Norwegian that are missing in English
const missingInEnglish = noKeys.filter(key => !enKeys.includes(key));

// Report the results
console.log('Translation Keys Comparison Report:');
console.log('================================\n');

if (missingInNorwegian.length === 0 && missingInEnglish.length === 0) {
  console.log('✅ All translation keys match between English and Norwegian!');
} else {
  if (missingInNorwegian.length > 0) {
    console.log('❌ Keys present in English but missing in Norwegian:');
    missingInNorwegian.forEach(key => console.log(`   - ${key}`));
    console.log('');
  }
  
  if (missingInEnglish.length > 0) {
    console.log('❌ Keys present in Norwegian but missing in English:');
    missingInEnglish.forEach(key => console.log(`   - ${key}`));
    console.log('');
  }
}

// Check for empty strings or placeholder values in Norwegian
console.log('\nChecking for incomplete translations in Norwegian:');
console.log('===========================================\n');

let incompleteTranslations = 0;

function checkForEmptyTranslations(enObj: any, noObj: any, prefix = '') {
  for (const key in enObj) {
    const currentKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof enObj[key] === 'object' && enObj[key] !== null && !Array.isArray(enObj[key])) {
      // If value is an object, recursively check its properties
      if (noObj[key]) {
        checkForEmptyTranslations(enObj[key], noObj[key], currentKey);
      }
    } else if (key in noObj) {
      // Check if Norwegian translation is empty or same as English
      if (
        typeof noObj[key] === 'string' && 
        (noObj[key] === '' || noObj[key] === enObj[key])
      ) {
        console.log(`   - ${currentKey}: "${enObj[key]}" -> "${noObj[key]}"`);
        incompleteTranslations++;
      }
    }
  }
}

checkForEmptyTranslations(en, no);

if (incompleteTranslations === 0) {
  console.log('✅ No empty or identical translations found!');
} else {
  console.log(`\n❌ Found ${incompleteTranslations} potentially incomplete translations.`);
}

console.log('\nTranslation validation complete!');

