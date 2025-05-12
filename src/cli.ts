#!/usr/bin/env node

import { docTextify } from './index.js'
import type { DocTextifyOptions } from './interfaces/doc-textify.interfaces'

function printUsage(): void {
    console.log(`Usage: ${process.argv[1]} <filePath> [options]

Options:
  -n, --newlineDelimiter <delimiter>     Delimiter to insert for new lines (default "\\n")
  -m, --minCharsToExtract <number>       Minimum number of characters to extract (default 10)
  -h, --help                            Display this help message
`)
}

const args: string[] = process.argv.slice(2)

const options: DocTextifyOptions = {
    newlineDelimiter: '\n',
    minCharsToExtract: 0,
    outputErrorToConsole: true
}

let filePath: string | undefined

for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    switch (arg) {
        case '-n':
        case '--newlineDelimiter':
            if (i + 1 < args.length) {
                options.newlineDelimiter = args[++i]
            }
            break
        case '-m':
        case '--minCharsToExtract':
            if (i + 1 < args.length) {
                const val = parseInt(args[++i], 10)
                if (!isNaN(val)) options.minCharsToExtract = val
            }
            break
        case '-h':
        case '--help':
            printUsage()
            process.exit(0)
        default:
            if (!arg.startsWith('-') && !filePath) {
                filePath = arg
            } else {
                console.error(`Unknown option: ${arg}`)
                printUsage()
                process.exit(1)
            }
    }
}

if (!filePath) {
    console.error('Error: <filePath> is required.')
    printUsage()
    process.exit(1)
}

;(async () => {
    try {
        const text = await docTextify(filePath, options)
        process.stdout.write(text)
    } catch (err: any) {
        console.error(err.message)
        process.exit(1)
    }
})()
