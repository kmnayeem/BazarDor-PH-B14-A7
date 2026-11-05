export default function Loading() {
    return (
        <main
            className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-emerald-50/70 to-white px-4 py-10 sm:px-6"
            role="status"
            aria-label="লোড হচ্ছে"
        >
            <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm shadow-emerald-950/[0.04]">
                <div
                    className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700"
                    aria-hidden="true"
                />

                <p className="mt-5 text-sm font-semibold text-emerald-800">
                    লোড হচ্ছে...
                </p>
                <p className="mt-1 text-xs text-slate-500">
                    আপনার জন্য তথ্য প্রস্তুত করা হচ্ছে
                </p>
            </div>
        </main>
    );
}
