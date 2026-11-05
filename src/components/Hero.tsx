
"use client";

import React from "react";
import Image from "next/image";
import HeroLogo from "@/assets/bazar-hero.png";

const Hero = () => {

    // Dynamic Bengali date
    const formattedDate = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Scroll to All Products Section
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
        <section className="w-full bg-[#f0f5f1] px-4 py-3 sm:px-6">
            <div className="mx-auto flex min-h-[270px] max-w-[1070px] items-center justify-between overflow-hidden rounded-[22px] border border-[#dfe8e1] bg-[#fbfdfb] px-5 py-7 sm:px-8 lg:px-10">

                {/* Left Content */}
                <div className="flex w-full flex-col items-start lg:w-[65%]">

                    {/* Dynamic Date Badge */}
                    <span className="mb-2 inline-flex items-center rounded-full bg-[#e1f3e8] px-3 py-1 text-xs font-semibold text-[#008b43]">
                        {formattedDate}
                    </span>

                    {/* Heading */}
                    <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-[#202b24] sm:text-[34px]">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Description */}
                    <p className="mt-5 max-w-[570px] text-sm leading-relaxed text-[#737b75] sm:text-[15px]">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
                        দামের পরিবর্তন এক জায়গায়!
                    </p>

                    {/* All Products Button */}
                    <button
                        type="button"
                        onClick={handleClick}
                        className="mt-7 inline-flex h-10 items-center justify-center rounded-lg bg-[#078b42] px-5 text-sm font-bold text-white shadow-[0_3px_4px_rgba(0,100,45,0.3)] transition-all duration-200 hover:bg-[#067638] hover:shadow-md"
                    >
                        সব পণ্য দেখুন
                    </button>

                </div>

                {/* Right Side Image */}
                <div className="hidden w-[30%] shrink-0 items-center justify-end sm:flex">
                    <Image
                        src={HeroLogo}
                        alt="বাজারের পণ্যের ঝুড়ি"
                        priority
                        className="h-[205px] w-[230px] object-contain"
                        sizes="230px"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;
