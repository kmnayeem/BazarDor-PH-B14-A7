
"use client";

import React from "react";
import Link from "next/link";
import { IProduct } from "@/types/type";

interface ProductCardProps {
    item: IProduct;
}

const ProductCard = ({ item }: ProductCardProps) => {
    const getUnitInBangla = (unit: string) => {
        const units: Record<string, string> = {
            kg: "কেজি",
            litre: "লিটার",
            dozen: "ডজন",
            piece: "পিস",
        };

        return units[unit] || "";
    };

    const isUp = item.change.dir === "up";
    const isDown = item.change.dir === "down";

    return (
        <Link
            href={`/product/${item.slug}`}
            className="block h-full group"
        >
            <div className="relative h-full overflow-hidden rounded-2xl border border-[#e2eae3] bg-white p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#c5ddca] hover:shadow-[0_10px_30px_rgba(28,75,40,0.08)]">

                {/* Top Accent */}
                <div className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#159447] to-[#9acba7] transition-transform duration-300 group-hover:scale-x-100" />

                {/* Product Info */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f7f2] text-2xl transition-colors duration-300 group-hover:bg-[#e8f4eb]">
                        {item.image}
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-xs sm:text-sm font-bold text-[#26332b]">
                            {item.nameBn}
                        </h3>

                        <p className="mt-1 text-[10px] sm:text-[11px] text-[#929b93]">
                            প্রতি {getUnitInBangla(item.unit)}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-3 sm:my-4 border-t border-dashed border-[#e8eee9]" />

                {/* Price & Percentage */}
                <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                        <p className="text-[10px] sm:text-[11px] font-medium text-[#929b93]">
                            আজকের দাম
                        </p>

                        <p className="mt-1 text-sm sm:text-lg font-extrabold tracking-tight text-[#26332b]">
                            {item.today.toLocaleString("bn-BD")}

                            <span className="ml-1 text-[10px] sm:text-xs font-semibold text-[#7d897f]">
                                টাকা
                            </span>
                        </p>
                    </div>

                    <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 sm:px-2.5 sm:py-1.5 text-[9px] sm:text-[11px] font-bold ${
                            isUp
                                ? "border-red-100 bg-[#fff4f3] text-red-500"
                                : isDown
                                    ? "border-emerald-100 bg-[#effaf2] text-emerald-600"
                                    : "border-gray-200 bg-gray-50 text-gray-500"
                        }`}
                    >
                        <span className="text-[8px] sm:text-[9px]">
                            {isUp ? "▲" : isDown ? "▼" : "—"}
                        </span>

                        {Math.abs(item.change.pct).toLocaleString("bn-BD", {
                            maximumFractionDigits: 2,
                        })}%
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
