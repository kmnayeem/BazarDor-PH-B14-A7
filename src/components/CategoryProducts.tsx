"use client";

import React, { useState } from "react";
import { IProduct } from "@/types/type";
import { ArrowUpDown } from "lucide-react";
import ProductCard from "./ProductCard";

interface CategoryProductsProps {
    products: IProduct[];
}

const CategoryProducts = ({
    products,
}: CategoryProductsProps) => {
    const [sortBy, setSortBy] = useState("default");

    const sortedProducts = [...products];

    if (sortBy === "price-asc") {
        sortedProducts.sort((a, b) => a.today - b.today);
    } else if (sortBy === "price-desc") {
        sortedProducts.sort((a, b) => b.today - a.today);
    }

    return (
        <div className="space-y-4">

            <div className="bg-[#fbfdfb] rounded-xl border border-[#e2eae3] px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    মোট{" "}
                    <span className="font-bold text-[#26332b]">
                        {products.length.toLocaleString("bn-BD")}টি
                    </span>{" "}
                    পণ্যের আজকের বাজার দর ও পরিবর্তন
                </p>

                <div className="flex items-center gap-2 self-end sm:self-auto">

                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#647067]">
                        <ArrowUpDown
                            size={14}
                            className="text-[#159447]"
                        />
                        <span>সাজান:</span>
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-xs sm:text-sm font-medium text-[#26332b] bg-white border border-[#dce4dd] rounded-lg px-3 py-2 focus:outline-none focus:border-[#159447] cursor-pointer"
                    >
                        <option value="default">
                            ডিফল্ট
                        </option>

                        <option value="price-asc">
                            দাম: কম থেকে বেশি
                        </option>

                        <option value="price-desc">
                            দাম: বেশি থেকে কম
                        </option>
                    </select>
                </div>
            </div>

            {sortedProducts.length === 0 ? (
                <div className="bg-[#fbfdfb] rounded-xl border border-[#e2eae3] p-10 sm:p-12 text-center">

                    <div className="text-3xl mb-3">
                        📦
                    </div>

                    <p className="text-sm text-[#647067] font-medium">
                        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                    {sortedProducts.map((item) => (
                        <ProductCard
                            key={item.id}
                            item={item}
                        />
                    ))}

                </div>
            )}

        </div>
    );
};

export default CategoryProducts;
