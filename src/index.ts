import fs from 'node:fs/promises'
import path from 'node:path'
import {parseExcel} from './adapters/excel.js'
import {parseHtml} from './adapters/html.js'
import {parseOpenOffice} from './adapters/open-office.js'
import {parsePdf} from './adapters/pdf.js'
import {parsePowerPoint} from './adapters/power-point.js'
import {parseText} from './adapters/text.js'
import {parseWord} from './adapters/word.js'
import {DocTextifyOptions} from './interfaces/doc-textify.interfaces'
import {cleanContent} from './utils/clean.js'

/** Main: determine parser by extension and dispatch */
export async function docTextify(
    filePath: string,
    options: DocTextifyOptions,
): Promise<string> {
    options = {
        newlineDelimiter: '\n',
        minCharsToExtract: 0,
        outputErrorToConsole: true,
        ...options
    }
    try {
        await fs.access(filePath)
    } catch (e) {
        throw new Error(`file does not exist or not accessible : ${filePath} (${e})`)
    }

    const ext = path.extname(filePath).slice(1).toLowerCase()

    try {
        switch (ext) {
            case 'docx':
                return cleanContent(await parseWord(filePath, options), options)
            case 'pptx':
                return cleanContent(await parsePowerPoint(filePath, options), options)
            case 'xlsx':
                return cleanContent(await parseExcel(filePath, options), options)
            case 'odt':
            case 'odp':
            case 'ods':
                return cleanContent(await parseOpenOffice(filePath, options), options)
            case 'pdf':
                return cleanContent(await parsePdf(filePath, options), options)
            case 'txt':
                return cleanContent(await parseText(filePath), options)
            case 'html':
            case 'htm':
                return cleanContent(await parseHtml(filePath), options)
            default:
                throw new Error('currently only supports docx, pptx, xlsx, odt, odp, ods, pdf files')
        }
    } catch (e) {
        if (options.outputErrorToConsole) {
            console.error(e.message)
        }
        throw e
    }
}
