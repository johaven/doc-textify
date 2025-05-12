#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { docTextify } = require('../../dist/index.js');


async function run() {
    const fixturesDir = path.resolve(__dirname, 'samples');
    const testFiles = [
        'sample.docx',
        'sample.pptx',
        'sample.xlsx',
        'sample.odt',
        'sample.odp',
        'sample.ods',
        'sample.pdf',
        'sample.txt',
        'sample.html',
    ];

    for (const fileName of testFiles) {
        const filePath = path.join(fixturesDir, fileName);

        try {
            await fs.access(filePath);
        } catch {
            console.error(`❌ [MISSING] ${fileName} not found in fixtures`);
            continue;
        }

        try {
            const text = await docTextify(filePath, { outputErrorToConsole: true });
            if (typeof text !== 'string' || text.length === 0) {
                console.warn(`❌️[EMPTY] ${fileName} → no text extracted`);
                continue
            }
            if (text.includes('Lorem ipsum')) {
                console.log(`✅[OK] ${fileName} → extracted ${text.length} chars & pattern found`);
            } else {
                console.warn(`⚠️[NOT FOUND] ${fileName} → pattern 'Lorem ipsum' not found`);
            }
        } catch (err) {
            console.error(`❌[ERROR] ${fileName} → ${err.message}`);
        }
    }
}

run().catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
});
