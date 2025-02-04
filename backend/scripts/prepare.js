const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure we're in the project root
process.chdir(path.join(__dirname, '..'));

// Clean previous builds
console.log('Cleaning previous builds...');
if (fs.existsSync('.serverless')) {
  fs.rmSync('.serverless', { recursive: true });
}

// Clean and regenerate Prisma client
console.log('Regenerating Prisma Client...');
if (fs.existsSync('node_modules/.prisma')) {
  fs.rmSync('node_modules/.prisma', { recursive: true });
}
if (fs.existsSync('node_modules/@prisma/client')) {
  fs.rmSync('node_modules/@prisma/client', { recursive: true });
}

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Generate Prisma Client
console.log('Generating Prisma Client...');
execSync('npx prisma generate', { stdio: 'inherit' });

// Deploy with serverless
console.log('Deploying with Serverless...');
execSync('serverless deploy --verbose', { stdio: 'inherit' });
