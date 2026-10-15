export function GridSkeleton({ count, className }: { count: number; className: string }) {
    return (
        <div className={className}>
            {Array.from({ length: count }, (_, index) => (
                <div key={index} className="animate-pulse p-1.5">
                    <div className="aspect-video rounded-2xl bg-background" />

                    <div className="mt-3 h-3 w-1/3 rounded-full bg-background" />

                    <div className="mt-2 h-4 w-3/4 rounded-full bg-background" />
                </div>
            ))}
        </div>
    )
}
