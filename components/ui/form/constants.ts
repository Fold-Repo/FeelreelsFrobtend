export const FIELD_SIZES = {
    sm: 'h-9 text-xs',
    md: 'h-11',
    lg: 'h-12',
} as const

export const FIELD_RADIUS = {
    none: 'rounded-none',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
} as const

export type FieldSize = keyof typeof FIELD_SIZES

export type FieldRadius = keyof typeof FIELD_RADIUS
