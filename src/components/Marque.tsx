"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import type { IProduct } from "@/types/type";

const getUnitInBangla = (unit: string) => {
    const units: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "টি",
    };

    return units[unit] || "";
};

export default function Marque() {
    const { data: session } = useSession();
    const router = useRouter();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!session?.user) {
            e.preventDefault();
            toast.error("পণ্যের বিস্তারিত তথ্য দেখতে অনুগ্রহ করে সাইন ইন করুন");
            router.push("/signin");
        }
    };

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
                console.error("Marquee API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading || products.length === 0) {
        return null;
    }

    return (
        <div className="flex h-9 w-full items-center overflow-hidden border-b border-gray-200 bg-white text-slate-800 sm:h-10">

            <Marquee
                pauseOnHover={true}
                speed={40}
                gradient={false}
                autoFill={true}
                className="h-full"
            >
                {products.map((item) => (
                    <Link
                        key={item.id}
                        href={`/product/${item.id}`}
                        onClick={handleProductClick}
                        className="mx-3 flex items-center gap-1.5 whitespace-nowrap text-xs transition-colors duration-200 hover:text-blue-600 sm:mx-4 sm:text-sm"
                    >
                        {/* Product Image */}
                        <span className="text-sm sm:text-base">
                            {item.image}
                        </span>

                        {/* Product Name */}
                        <span className="font-semibold text-gray-800">
                            {item.nameBn}
                        </span>

                        {/* Product Price */}
                        <span className="font-medium text-gray-700">
                            {item.today.toLocaleString("bn-BD")} টাকা
                            {getUnitInBangla(item.unit) && (
                                <>/{getUnitInBangla(item.unit)}</>
                            )}
                        </span>

                        {/* Price Change */}
                        <span
                            className={`text-xs font-bold ${
                                item.change.dir === "up"
                                    ? "text-red-600"
                                    : item.change.dir === "down"
                                    ? "text-emerald-600"
                                    : "text-gray-500"
                            }`}
                        >
                            {item.change.dir === "up"
                                ? "▲"
                                : item.change.dir === "down"
                                ? "▼"
                                : "—"}

                            {" "}

                            {Math.abs(item.change.pct).toLocaleString(
                                "bn-BD",
                                {
                                    maximumFractionDigits: 2,
                                }
                            )}%
                        </span>

                        {/* Separator */}
                        <span className="ml-2 text-gray-300">
                            |
                        </span>
                    </Link>
                ))}
            </Marquee>
        </div>
    );
}
