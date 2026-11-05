export default function Loading() {
    return (
        <main
            className="min-h-screen w-full bg-[#f0f5f1] py-5 sm:py-8"
            aria-busy="true"
            aria-label="ক্যাটাগরি ও পণ্য লোড হচ্ছে"
        >
            <div className="mx-auto max-w-5xl space-y-4 px-4 sm:px-6">
                {/* Category header skeleton */}
                <div className="flex items-center gap-3 rounded-xl border border-[#e2eae3] bg-[#fbfdfb] px-4 py-3">
                    <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-[#e7eee8]" />

                    <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-5 w-32 animate-pulse rounded bg-[#e7eee8]" />
                        <div className="h-3 w-56 max-w-full animate-pulse rounded bg-[#e7eee8]" />
                    </div>
                </div>

                {/* Product skeletons */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-[#e2eae3] bg-[#fbfdfb] p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-14 shrink-0 animate-pulse rounded-lg bg-[#e7eee8]" />

                                <div className="min-w-0 flex-1 space-y-2">
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-[#e7eee8]" />
                                    <div className="h-3 w-1/2 animate-pulse rounded bg-[#e7eee8]" />
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-[#edf1ed] pt-3">
                                <div className="h-4 w-20 animate-pulse rounded bg-[#e7eee8]" />
                                <div className="h-4 w-16 animate-pulse rounded bg-[#e7eee8]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
