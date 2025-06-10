const fs = require('fs');
const { execSync } = require('child_process');

function parseVersion(version) {
  return {
    major: version.major,
    minor: version.minor,
    patch: version.patch
  };
}

function compareVersions(oldVersion, newVersion) {
  if (newVersion.major > oldVersion.major) return true;
  if (newVersion.major < oldVersion.major) return false;
  
  if (newVersion.minor > oldVersion.minor) return true;
  if (newVersion.minor < oldVersion.minor) return false;
  
  return newVersion.patch > oldVersion.patch;
}

function isFileModified(filePath) {
  try {
    // Get the list of modified files in the PR
    const modifiedFiles = execSync('git diff --name-only main').toString().split('\n');
    return modifiedFiles.includes(filePath);
  } catch (error) {
    console.error('Error checking modified files:', error.message);
    return false;
  }
}

function validateVersionIncrement(filePath) {
  try {
    // Skip validation if file wasn't modified
    if (!isFileModified(filePath)) {
      console.log(`Skipping version validation for ${filePath} (not modified in PR)`);
      return true;
    }

    // Read the current version from main branch
    const mainData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const mainVersion = parseVersion(mainData.version);

    // Read the PR version
    const prData = JSON.parse(fs.readFileSync(process.env.GITHUB_WORKSPACE + '/' + filePath, 'utf8'));
    const prVersion = parseVersion(prData.version);

    if (!compareVersions(mainVersion, prVersion)) {
      console.error(`\nVersion validation failed for ${filePath}:`);
      console.error(`Current version: ${mainVersion.major}.${mainVersion.minor}.${mainVersion.patch}`);
      console.error(`PR version: ${prVersion.major}.${prVersion.minor}.${prVersion.patch}`);
      console.error('Version must be incremented in PR');
      return false;
    }

    console.log(`✓ Version increment validated for ${filePath}`);
    return true;
  } catch (error) {
    console.error(`\nError validating version in ${filePath}:`);
    console.error(error.message);
    return false;
  }
}

// Validate both tokenlist files
const mainnetValid = validateVersionIncrement('tokenlist.json');
const testnetValid = validateVersionIncrement('tokenlist-testnet.json');

// Exit with appropriate status code
process.exit(mainnetValid && testnetValid ? 0 : 1); 