import { globSync, readFileSync, writeFileSync } from 'node:fs'

const FILES = globSync('{app,components,views,lib,providers}/**/*.tsx')

const STATIC_ARG = /^'[^']*'$/

function splitArgs(inner) {
    const args = []
    let depth = 0
    let quote = null
    let current = ''

    for (const char of inner) {
        if (quote) {
            current += char
            if (char === quote) quote = null
            continue
        }

        if (char === "'" || char === '"' || char === '`') quote = char
        else if ('([{'.includes(char)) depth++
        else if (')]}'.includes(char)) depth--
        else if (char === ',' && depth === 0) {
            args.push(current.trim())
            current = ''
            continue
        }

        current += char
    }

    if (current.trim()) args.push(current.trim())

    return args
}

function rewriteCalls(source) {
    let result = ''
    let index = 0

    while (index < source.length) {
        const start = source.indexOf('cn(', index)

        if (start === -1 || /[\w.]/.test(source[start - 1] ?? '')) {
            if (start === -1) {
                result += source.slice(index)
                break
            }

            result += source.slice(index, start + 3)
            index = start + 3
            continue
        }

        let depth = 0
        let end = start + 2
        let quote = null

        for (; end < source.length; end++) {
            const char = source[end]

            if (quote) {
                if (char === quote) quote = null
                continue
            }

            if (char === "'" || char === '"' || char === '`') quote = char
            else if (char === '(') depth++
            else if (char === ')' && --depth === 0) break
        }

        const args = splitArgs(source.slice(start + 3, end))
        const merged = []

        for (const arg of args) {
            const last = merged.at(-1)

            if (STATIC_ARG.test(arg) && last && STATIC_ARG.test(last)) {
                merged[merged.length - 1] = `'${last.slice(1, -1)} ${arg.slice(1, -1)}'`
            } else merged.push(arg)
        }

        const call = merged.length === args.length ? source.slice(start, end + 1) : `cn(${merged.join(', ')})`

        result += source.slice(index, start) + call
        index = end + 1
    }

    return result
}

function formatFile(source) {
    let result = rewriteCalls(source)

    result = result.replace(/(\w*[cC]lassName)=\{cn\('([^']*)'\)\}/g, '$1="$2"')

    const body = result.replace(/^import .*$/gm, '')

    if (!/\bcn\(/.test(body)) {
        result = result
            .replace(/^import \{ cn \} from '@\/lib'\n/m, '')
            .replace(/(import \{[^}]*?)\s*,?\s*\bcn\b\s*,?([^}]*\} from '@\/lib')/, (match, start, end) =>
                `${start}${end.startsWith(' }') || end.startsWith('}') ? end : `, ${end.trimStart()}`}`.replace(/,\s*\}/, ' }'),
            )
    }

    return result
}

let changed = 0

for (const file of FILES) {
    const source = readFileSync(file, 'utf8')
    const next = formatFile(source)

    if (next !== source) {
        writeFileSync(file, next)
        changed++
    }
}

console.log(`format-classes: ${changed} file(s) updated`)
