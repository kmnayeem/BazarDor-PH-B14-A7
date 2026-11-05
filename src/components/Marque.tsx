"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import type { IProduct } from "@/types/type";

const getUnitInBangla = (unit: string) => {
    const units: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        liter: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
    };

    return units[unit] ?? unit;
};

export default function Marque() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/products`,
                    {
                        signal: controller.signal,
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data: IProduct[] = await res.json();

                if (Array.isArray(data)) {
                    setProducts(data);
                }
            } catch (error) {
                if (
                    error instanceof Error &&
                    error.name !== "AbortError"
                ) {
                    console.error("Marquee API Error:", error);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        return () => {
            controller.abort();
        };
    }, []);

    if (loading || products.length === 0) {
        return null;
    }

    return (
        <div className="flex h-9 sm:h-10 w-full items-center overflow-hidden border-b border-gray-200 bg-white text-slate-800">

            <Marquee
                pauseOnHover={true}
                speed={60}
                gradient={false}
                autoFill={true}
                className="h-full"
            >
                {products.map((item) => {
                    const changeDir = item.change?.dir ?? "same";
                    const changePct = item.change?.pct ?? 0;

                    const changeColor =
                        changeDir === "up"
                            ? "text-red-600"
                            : changeDir === "down"
                                ? "text-emerald-600"
                                : "text-gray-500";

                    const changeIcon =
                        changeDir === "up"
                            ? "▲"
                            : changeDir === "down"
                                ? "▼"
                                : "—";

                    return (
                        <Link
                            key={item.id}
                            href={`/product/${item.id}`}
                            className="mx-3 sm:mx-4 flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm cursor-pointer hover:bg-slate-50 transition-colors duration-200 rounded-md px-1 py-1"
                        >
                            {/* Product Image */}
                            <span className="text-sm sm:text-base">
                                {item.image || item.categoryIcon || "🛒"}
                            </span>

                            {/* Product Name */}
                            <span className="font-semibold text-gray-800 hover:text-blue-600">
                                {item.nameBn}
                            </span>

                            {/* Product Price */}
                            <span className="font-medium text-gray-700">
                                {item.today.toLocaleString("bn-BD")} টাকা
                                /{getUnitInBangla(item.unit)}
                            </span>

                            {/* Price Change */}
                            <span
                                className={`text-xs font-bold ${changeColor}`}
                            >
                                {changeIcon}{" "}
                                {Math.abs(changePct).toLocaleString(
                                    "bn-BD",
                                    {
                                        maximumFractionDigits: 2,
                                    }
                                )}
                                %
                            </span>

                            {/* Separator */}
                            <span className="ml-2 text-gray-300">
                                |
                            </span>
                        </Link>
                    );
                })}
            </Marquee>
        </div>
    );
}
