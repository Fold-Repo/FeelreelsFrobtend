export function ErrorMessage({ error }: { error?: string }) {
    if (!error) return null

    return (
        <p role="alert" className="mt-1.5 text-xs text-danger">
            {error}
        </p>
    )
}
