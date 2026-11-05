
"use client";

import { IProduct } from "@/types/type";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const PriceIncreaseSection = () => {
    const [topIncreasedRoutes, setTopIncreasedRoutes] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/products`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data: IProduct[] = await res.json();

                const filteredData = data
                    .filter((item) => item.change.dir === "up")
                    .sort((a, b) => b.change.pct - a.change.pct)
                    .slice(0, 6);

                setTopIncreasedRoutes(filteredData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="w-full bg-[#f0f5f1] px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-[1070px]">

                {/* Section Heading */}
                <div className="mb-5 flex items-center gap-2">
                    <span className="text-sm font-bold text-red-500">
                        ▲
                    </span>

                    <h2 className="text-base font-extrabold text-[#26332b] sm:text-lg">
                        আজ দাম বেড়েছে
                    </h2>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-[130px] animate-pulse rounded-2xl border border-[#e1e9e2] bg-white p-4"
                            >
                                <div className="flex gap-3">
                                    <div className="h-12 w-12 rounded-xl bg-gray-100" />

                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 w-24 rounded bg-gray-100" />
                                        <div className="h-2 w-16 rounded bg-gray-100" />
                                    </div>
                                </div>

                                <div className="mt-5 h-3 w-28 rounded bg-gray-100" />
                            </div>
                        ))}
                    </div>
                ) : topIncreasedRoutes.length > 0 ? (

                    /* Product Cards */
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                        {topIncreasedRoutes.map((item) => (
                            <ProductCard
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>

                ) : (

                    /* Empty State */
                    <div className="rounded-2xl border border-[#e2eae3] bg-white px-4 py-12 text-center">
                        <p className="text-sm font-medium text-gray-500">
                            বর্তমানে দাম বৃদ্ধি পাওয়া কোনো পণ্য পাওয়া যায়নি।
                        </p>
                    </div>

                )}

            </div>
        </section>
    );
};

export default PriceIncreaseSection;
