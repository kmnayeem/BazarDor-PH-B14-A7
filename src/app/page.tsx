
"use client";

import { useEffect, useState } from "react";
import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Hero";
import PriceDecreaseSection from "@/components/PriceDecreaseSection";
import PriceIncreaseSection from "@/components/PriceIncreaseSection";

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[70vh] w-full items-center justify-center bg-[#f0fdf4]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />

                    <p className="text-sm font-semibold text-emerald-700">
                        লোড হচ্ছে...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-start bg-zinc-50 dark:bg-black">
            <Hero />
            <PriceIncreaseSection />
            <PriceDecreaseSection />
            <AllProducts />
        </div>
    );
}
