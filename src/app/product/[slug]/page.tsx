import Link from "next/link";
import {
    Home,
    ChevronRight,
    TrendingUp,
    TrendingDown,
    Minus,
    MapPin,
    Store,
} from "lucide-react";
import type { IProduct } from "@/types/type";

const ProductDetailsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    let product: IProduct | null = null;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
            { cache: "no-store" },
        );

        if (res.ok) {
            product = await res.json();
        }
    } catch (error) {
        console.error("Error fetching product details:", error);
    }

    if (!product) {
        return <NotFound />;
    }

    const markets = product.markets ?? [];

    const minPrice =
        markets.length > 0
            ? Math.min(...markets.map((market) => market.min))
            : null;

    const maxPrice =
        markets.length > 0
            ? Math.max(...markets.map((market) => market.max))
            : null;

    const avgPrice =
        markets.length > 0
            ? Math.round(
                markets.reduce(
                    (sum, market) => sum + (market.min + market.max) / 2,
                    0,
                ) / markets.length,
            )
            : null;

    const formatPrice = (price: number) => price.toLocaleString("bn-BD");

    const formatPercentage = (value: number) =>
        Math.abs(value).toLocaleString("bn-BD", {
            maximumFractionDigits: 1,
        });

    const unitName =
        product.unit === "kg"
            ? "কেজি"
            : product.unit === "liter"
                ? "লিটার"
                : product.unit === "piece"
                    ? "পিস"
                    : product.unit === "dozen"
                        ? "ডজন"
                        : product.unit;

    const changeStyle =
        product.change?.dir === "up"
            ? "bg-rose-50 text-rose-700 ring-rose-200"
            : product.change?.dir === "down"
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                : "bg-slate-100 text-slate-600 ring-slate-200";

    const ChangeIcon =
        product.change?.dir === "up"
            ? TrendingUp
            : product.change?.dir === "down"
                ? TrendingDown
                : Minus;

    return (
        <main className="min-h-screen bg-[#f5f7f2] px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-5xl">
                <nav
                    aria-label="Breadcrumb"
                    className="mb-5 flex min-w-0 items-center gap-2 overflow-hidden text-sm text-slate-500"
                >
                    <Link
                        href="/"
                        className="inline-flex shrink-0 items-center gap-1.5 transition hover:text-emerald-700"
                    >
                        <Home size={15} />
                        <span>হোম</span>
                    </Link>

                    <ChevronRight size={14} className="shrink-0 text-slate-400" />

                    <Link
                        href={`/category/${encodeURIComponent(product.category)}`}
                        className="shrink-0 truncate transition hover:text-emerald-700"
                    >
                        {product.categoryNameBn}
                    </Link>

                    <ChevronRight size={14} className="shrink-0 text-slate-400" />

                    <span className="truncate font-semibold text-slate-800">
                        {product.nameBn}
                    </span>
                </nav>

                <section className="overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-[0_12px_40px_-24px_rgba(15,23,42,0.25)]">
                    <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
                        <div className="flex min-w-0 items-center gap-4">
                            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-4xl ring-1 ring-emerald-100 sm:size-20 sm:text-5xl">
                                {product.image || product.categoryIcon || "🛒"}
                            </div>

                            <div className="min-w-0">
                                <p className="mb-1 text-sm font-medium text-emerald-700">
                                    {product.categoryNameBn} <span aria-hidden="true">·</span>{" "}
                                    বাজার দর
                                </p>

                                <h1 className="truncate text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                                    {product.nameBn}
                                </h1>

                                <p className="mt-2 text-sm text-slate-500">
                                    বাংলাদেশের বিভিন্ন বাজারের আজকের দাম
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-[#f5f8f3] p-5 md:min-w-52 md:text-center">
                            <p className="text-sm font-medium text-slate-500">আজকের দাম</p>

                            <p className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                                {formatPrice(product.today)}
                                <span className="ml-1 text-base font-semibold text-slate-500">
                                    টাকা
                                </span>
                            </p>

                            <p className="mt-1 text-sm text-slate-500">প্রতি {unitName}</p>

                            <span
                                className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${changeStyle}`}
                            >
                                <ChangeIcon size={14} />
                                {formatPercentage(product.change?.pct ?? 0)}%
                                {product.change?.dir === "up"
                                    ? " বৃদ্ধি"
                                    : product.change?.dir === "down"
                                        ? " হ্রাস"
                                        : " অপরিবর্তিত"}
                            </span>
                        </div>
                    </div>
                </section>

                <section className="mt-6">
                    <h2 className="mb-3 text-lg font-bold text-slate-900">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <SummaryCard
                            label="সর্বনিম্ন দাম"
                            value={minPrice === null ? "—" : formatPrice(minPrice)}
                            helper="বাজারগুলোর মধ্যে সর্বনিম্ন"
                            color="emerald"
                        />
                        <SummaryCard
                            label="সর্বোচ্চ দাম"
                            value={maxPrice === null ? "—" : formatPrice(maxPrice)}
                            helper="বাজারগুলোর মধ্যে সর্বোচ্চ"
                            color="rose"
                        />
                        <SummaryCard
                            label="গড় দাম"
                            value={avgPrice === null ? "—" : formatPrice(avgPrice)}
                            helper="সব বাজারের গড় মূল্য"
                            color="blue"
                        />
                    </div>
                </section>

                <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                বাজারভিত্তিক আজকের দাম
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                বিভিন্ন বাজারে {product.nameBn}-এর দামের তুলনা
                            </p>
                        </div>

                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                            <Store size={14} />
                            {markets.length.toLocaleString("bn-BD")}টি বাজার
                        </span>
                    </div>

                    {markets.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[620px] border-collapse text-left">
                                    <thead>
                                        <tr className="bg-slate-50 text-xs font-semibold text-slate-500">
                                            <th className="px-5 py-3">বাজার</th>
                                            <th className="px-5 py-3">বিভাগ</th>
                                            <th className="px-5 py-3 text-right">সর্বনিম্ন</th>
                                            <th className="px-5 py-3 text-right">সর্বোচ্চ</th>
                                            <th className="px-5 py-3 text-right">গড়</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {markets.map((market, index) => {
                                            const marketAvg = Math.round(
                                                (market.min + market.max) / 2,
                                            );
                                            const isLowest = market.min === minPrice;

                                            return (
                                                <tr
                                                    key={`${market.market}-${index}`}
                                                    className={`border-t border-slate-100 text-sm transition hover:bg-emerald-50/50 ${isLowest ? "bg-emerald-50/40" : ""
                                                        }`}
                                                >
                                                    <td className="px-5 py-4 font-semibold text-slate-800">
                                                        <span className="inline-flex items-center gap-2">
                                                            <MapPin
                                                                size={15}
                                                                className="shrink-0 text-emerald-700"
                                                            />
                                                            {market.market}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 text-slate-600">
                                                        {market.division}
                                                    </td>

                                                    <td className="px-5 py-4 text-right font-medium text-emerald-700">
                                                        {formatPrice(market.min)} টাকা
                                                    </td>

                                                    <td className="px-5 py-4 text-right font-medium text-rose-700">
                                                        {formatPrice(market.max)} টাকা
                                                    </td>

                                                    <td className="px-5 py-4 text-right font-bold text-slate-800">
                                                        {formatPrice(marketAvg)} টাকা
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex flex-col gap-1 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                                <span>* বাজারভেদে দাম পরিবর্তিত হতে পারে।</span>
                                <span>সব মূল্য টাকা / {unitName}</span>
                            </div>
                        </>
                    ) : (
                        <div className="px-5 py-14 text-center">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                <Store size={21} />
                            </div>

                            <p className="mt-3 font-semibold text-slate-700">
                                বাজারের তথ্য পাওয়া যায়নি
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                এই পণ্যের জন্য এখনো কোনো বাজারমূল্য যোগ করা হয়নি।
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

function SummaryCard({
    label,
    value,
    helper,
    color,
}: {
    label: string;
    value: string;
    helper: string;
    color: "emerald" | "rose" | "blue";
}) {
    const colors = {
        emerald: "bg-emerald-50 text-emerald-700",
        rose: "bg-rose-50 text-rose-700",
        blue: "bg-blue-50 text-blue-700",
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-sm font-medium text-slate-500">{label}</p>

            <p
                className={`mt-2 inline-flex rounded-lg px-2.5 py-1 text-xl font-extrabold ${colors[color]}`}
            >
                {value}
                {value !== "—" && (
                    <span className="ml-1 text-sm font-semibold">টাকা</span>
                )}
            </p>

            <p className="mt-2 text-xs text-slate-500">{helper}</p>
        </div>
    );
}

function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f5f7f2] px-4 py-10">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-4xl">
                    🗺️
                </div>

                <h1 className="mt-5 text-xl font-bold text-slate-900">
                    পণ্যের তথ্য খুঁজে পাওয়া যায়নি
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    আপনি যে পণ্যের তথ্য খুঁজছেন সেটি পাওয়া যায়নি বা আর উপলভ্য নেই।
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                >
                    <Home size={16} />
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
}

export default ProductDetailsPage;
