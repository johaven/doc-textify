#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const rootPkgPath = path.join(rootDir, 'package.json');
const distDir = path.join(rootDir, 'dist');
const distPkgPath = path.join(distDir, 'package.json');

const rootPkg = JSON.parse(await fs.promises.readFile(rootPkgPath, 'utf8'));

const minimalPkg = {
    name: rootPkg.name,
    version: rootPkg.version,
    description: rootPkg.description,
    author: rootPkg.author,
    license: rootPkg.license,
    keywords: rootPkg.keywords,
    repository: rootPkg.repository,
    bugs: rootPkg.bugs,
    homepage: rootPkg.homepage,
    type: rootPkg.type,
    main: 'index.js',
    types: rootPkg.types.replace(/^dist\//, ''),
    bin: {
        [Object.keys(rootPkg.bin)[0]]: 'cli.js'
    },
    dependencies: rootPkg.dependencies || {}
};

if (!fs.existsSync(distDir)) {
    console.error("Le dossier dist/ n'existe pas. Avez-vous exécuté la build ?");
    process.exit(1);
}

await fs.promises.writeFile(distPkgPath, JSON.stringify(minimalPkg, null, 2));
console.log(`✔️  ${path.relative(rootDir, distPkgPath)} généré avec succès !`);
