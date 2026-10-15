const TESTS: Record<string, (value: string) => boolean> = {
    length: (value) => value.length >= 8,
    upper: (value) => /[A-Z]/.test(value),
    number: (value) => /\d/.test(value),
    symbol: (value) => /[^A-Za-z0-9]/.test(value),
}

export function checkPassword<T extends { id: string }>(value: string, rules: T[]) {
    return rules.map((rule) => ({ ...rule, ok: TESTS[rule.id]?.(value) ?? false }))
}

export const isEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value)
