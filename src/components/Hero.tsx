"use client";

import React from "react";
import Image from "next/image";
import HeroLogo from "@/assets/bazar-hero.png";

const Hero = () => {
    const formattedDate = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const handleClick = () => {
        const allProducts = document.getElementById("all-products");

        if (allProducts) {
            allProducts.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <section className="w-full bg-gradient-to-b from-emerald-50/70 to-white px-4 py-5 sm:px-6 sm:py-8">
            <div className="relative mx-auto flex min-h-[300px] max-w-[1120px] flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50/70 px-6 py-7 shadow-sm shadow-emerald-950/[0.04] sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-10 lg:px-12">
                {/* Decorative background accents */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-lime-100/40 blur-3xl"
                />

                {/* Image: above content on mobile, right side on larger screens */}
                <div className="relative order-1 mb-3 flex h-[145px] w-full shrink-0 items-center justify-center sm:order-2 sm:mb-0 sm:h-auto sm:w-[30%] sm:justify-end">
                    <div className="absolute h-36 w-36 rounded-full bg-emerald-100/60 blur-2xl sm:h-52 sm:w-52" />
                    <Image
                        src={HeroLogo}
                        alt="বাজারের পণ্যের ঝুড়ি"
                        priority
                        className="relative h-[140px] w-[180px] object-contain drop-shadow-md transition-transform duration-300 hover:scale-105 sm:h-[220px] sm:w-[250px] lg:h-[245px] lg:w-[280px]"
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 250px, 180px"
                    />
                </div>

                {/* Left Content */}
                <div className="relative z-10 order-2 flex w-full flex-col items-start sm:order-1 sm:w-[68%] lg:w-[65%]">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800">
                        <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                        />
                        {formattedDate}
                    </span>

                    <h1 className="max-w-[650px] text-[27px] font-extrabold leading-[1.35] tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
                        আজকের বাজারের দাম{" "}
                        <span className="text-emerald-700">এক নজরে</span>
                    </h1>

                    <p className="mt-4 max-w-[570px] text-sm leading-7 text-slate-600 sm:text-[15px]">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
                        দামের পরিবর্তন এক জায়গায়!
                    </p>

                    <button
                        type="button"
                        onClick={handleClick}
                        className="mt-6 inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white shadow-md shadow-emerald-900/15 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600/25"
                    >
                        সব পণ্য দেখুন
                        <span aria-hidden="true" className="text-base">
                            →
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
