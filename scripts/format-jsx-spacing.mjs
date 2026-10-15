import { globSync, readFileSync, writeFileSync } from 'node:fs'
import ts from 'typescript'

const FILES = globSync('{app,components,views,lib,providers}/**/*.tsx')

const isBlankText = (node) => node.kind === ts.SyntaxKind.JsxText && !node.text.trim()

function insertionPoints(source) {
    const points = []

    const visit = (node) => {
        if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
            const children = node.children.filter((child) => !isBlankText(child))

            for (let i = 1; i < children.length; i++) {
                const previous = children[i - 1]
                const current = children[i]

                if (previous.kind === ts.SyntaxKind.JsxText || current.kind === ts.SyntaxKind.JsxText) continue

                const gap = source.text.slice(previous.end, current.getStart(source))

                if (!gap.trim() && (gap.match(/\n/g) ?? []).length === 1) points.push(previous.end)
            }
        }

        ts.forEachChild(node, visit)
    }

    visit(source)

    return points
}

let changed = 0

for (const file of FILES) {
    const text = readFileSync(file, 'utf8')
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const points = insertionPoints(source).sort((a, b) => b - a)

    if (!points.length) continue

    let next = text

    for (const point of points) next = `${next.slice(0, point)}\n${next.slice(point)}`

    writeFileSync(file, next)
    changed++
}

console.log(`format-jsx-spacing: ${changed} file(s) updated`)
