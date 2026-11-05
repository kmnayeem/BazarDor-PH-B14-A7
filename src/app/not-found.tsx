
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f0fdf4] px-4 text-center">

            <h1 className="text-8xl font-extrabold text-emerald-700">
                404
            </h1>

            <h2 className="mt-4 text-2xl font-bold text-[#26332b]">
                পেজটি খুঁজে পাওয়া যায়নি!
            </h2>

            <p className="mt-2 text-sm text-gray-500">
                দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
            </p>

            <Link
                href="/"
                className="mt-6 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
                হোম পেজে ফিরে যান →
            </Link>

        </div>
    );
}
