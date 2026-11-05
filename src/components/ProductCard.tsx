"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import type { IProduct } from "@/types/type";

interface ProductCardProps {
  item: IProduct;
}

const ProductCard = ({ item }: ProductCardProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!session?.user) {
      e.preventDefault();
      toast.error("পণ্যের বিস্তারিত তথ্য দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.push("/signin");
    }
  };

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

  const isUp = item.change.dir === "up";
  const isDown = item.change.dir === "down";

  return (
    <Link
      href={`/product/${item.id}`}
      onClick={handleProductClick}
      className="group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
      prefetch
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-emerald-200 group-hover:shadow-[0_16px_35px_-18px_rgba(16,85,45,0.35)] sm:p-4">
        {/* Subtle hover background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-white to-lime-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-600 via-emerald-400 to-lime-300 transition-transform duration-300 ease-out group-hover:scale-x-100" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl ring-1 ring-emerald-100/80 transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-100 group-hover:shadow-sm sm:size-12">
              {item.image || item.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-bold text-slate-800 transition-colors duration-200 group-hover:text-emerald-800 sm:text-[15px]">
                {item.nameBn}
              </h3>

              <p className="mt-1 text-[10px] font-medium text-slate-400 sm:text-[11px]">
                প্রতি {getUnitInBangla(item.unit)}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="shrink-0 translate-x-1 text-slate-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-emerald-600 group-hover:opacity-100"
            >
              →
            </span>
          </div>

          <div className="my-3.5 border-t border-dashed border-slate-200 transition-colors duration-300 group-hover:border-emerald-200 sm:my-4" />

          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-slate-400 sm:text-[11px]">
                আজকের দাম
              </p>

              <p className="mt-1 text-base font-extrabold tracking-tight text-slate-800 sm:text-lg">
                {item.today.toLocaleString("bn-BD")}
                <span className="ml-1 text-[10px] font-semibold text-slate-500 sm:text-xs">
                  টাকা
                </span>
              </p>
            </div>

            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-bold transition-transform duration-300 group-hover:scale-105 sm:px-2.5 sm:py-1.5 sm:text-[11px] ${
                isUp
                  ? "border-rose-100 bg-rose-50 text-rose-600"
                  : isDown
                    ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-500"
              }`}
            >
              <span className="text-[8px] sm:text-[9px]">
                {isUp ? "▲" : isDown ? "▼" : "—"}
              </span>

              {Math.abs(item.change.pct).toLocaleString("bn-BD", {
                maximumFractionDigits: 2,
              })}
              %
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
