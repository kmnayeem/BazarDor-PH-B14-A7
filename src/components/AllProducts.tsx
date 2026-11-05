
"use client";

import { IProduct } from "@/types/type";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const AllProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
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
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section
            id="all-products"
            className="w-full scroll-mt-4 bg-[#f0f5f1] px-4 py-6 sm:px-6 sm:py-8"
        >
            <div className="mx-auto max-w-[1070px]">

                {/* Section Heading */}
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-extrabold text-[#26332b] sm:text-lg">
                            সকল পণ্য
                        </h2>

                        <p className="mt-1 text-xs text-[#929b93]">
                            নিত্যপ্রয়োজনীয় সকল পণ্যের আজকের বাজারদর
                        </p>
                    </div>

                    {!loading && (
                        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#159447] border border-[#e2eae3]">
                            {products.length.toLocaleString("bn-BD")} টি পণ্য
                        </span>
                    )}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 9 }).map((_, index) => (
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
                ) : products.length > 0 ? (

                    /* All Product Cards */
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                        {products.map((item) => (
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
                            বর্তমানে কোনো পণ্য পাওয়া যায়নি।
                        </p>
                    </div>

                )}

            </div>
        </section>
    );
};

export default AllProducts;
