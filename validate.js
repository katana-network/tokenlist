const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');
const addFormats = require('ajv-formats');

// Define the schema for tokenlist validation
const schema = {
  type: 'object',
  required: ['name', 'logoURI', 'timestamp', 'keywords', 'version', 'tokens'],
  properties: {
    name: { type: 'string', minLength: 1 },
    logoURI: { type: 'string', minLength: 1 },
    timestamp: { type: 'string', format: 'date-time' },
    keywords: { type: 'array', items: { type: 'string', minLength: 1 } },
    version: {
      type: 'object',
      required: ['major', 'minor', 'patch'],
      properties: {
        major: { type: 'integer', minimum: 0 },
        minor: { type: 'integer', minimum: 0 },
        patch: { type: 'integer', minimum: 0 }
      }
    },
    tokens: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'symbol', 'decimals', 'chainId', 'address'],
        properties: {
          name: { type: 'string', minLength: 1 },
          symbol: { type: 'string', minLength: 1 },
          decimals: { type: 'integer', minimum: 0 },
          chainId: { type: 'integer' },
          address: { type: 'string', pattern: '^0x[a-fA-F0-9]{40}$' },
          originTokenAddress: { type: 'string', pattern: '^0x[a-fA-F0-9]{40}$' },
          originChainId: { type: 'integer' },
          logoURI: { type: 'string', minLength: 1 }
        }
      }
    }
  }
};

// Initialize Ajv
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

// Function to validate a tokenlist file
function validateTokenList(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const valid = validate(data);
    
    if (!valid) {
      console.error(`\nValidation errors in ${filePath}:`);
      validate.errors.forEach(error => {
        console.error(`- ${error.instancePath}: ${error.message}`);
      });
      return false;
    }
    
    console.log(`✓ ${filePath} is valid`);
    return true;
  } catch (error) {
    console.error(`\nError validating ${filePath}:`);
    console.error(error.message);
    return false;
  }
}

// Validate both tokenlist files
const mainnetValid = validateTokenList('tokenlist.json');
const testnetValid = validateTokenList('tokenlist-testnet.json');

// Exit with appropriate status code
process.exit(mainnetValid && testnetValid ? 0 : 1); 