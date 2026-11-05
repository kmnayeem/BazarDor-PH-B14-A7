"use client";

import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Dropdown,
    ProgressCircle,
    Separator,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { ICategory } from "@/types/type";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo-icon.png";

export default function Navbar() {
    const pathname = usePathname();
    const [categories, setCategories] = useState<ICategory[]>([]);

    const formattedDate = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/categories`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Category fetch error:", error);
            }
        };

        fetchCategories();
    }, []);

    const { data, isPending } = useSession();

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <header className="w-full bg-[#f8faf9] sticky top-0 z-50 border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Top Navbar */}
                <div className="flex items-center justify-between min-h-[60px]">

                    {/* Logo & Date */}
                    <Link href="/" className="flex items-center gap-2">

                        {/* Custom Logo Image */}
                        <div className="w-[40px] h-[40px] rounded-xl bg-[#DCEFE2] border border-[#C8E3D1] flex items-center justify-center overflow-hidden shadow-sm">
                            <Image
                                src={logo}
                                alt="Bazar Dor Logo"
                                width={40}
                                height={40}
                                priority
                                className="w-full h-full object-contain p-1"
                            />
                        </div>

                        {/* Brand */}
                        <div className="flex flex-col">
                            <span className="text-[17px] sm:text-[19px] font-extrabold text-[#17251d] leading-tight tracking-tight">
                                বাজার দর
                            </span>

                            <span className="text-[10px] sm:text-[11px] text-slate-600 font-medium">
                                {formattedDate}
                            </span>
                        </div>
                    </Link>

                    {/* Right Side: Authentication */}
                    <div className="flex items-center gap-2">

                        {isPending ? (
                            <ProgressCircle
                                aria-label="Loading"
                                value={60}
                            >
                                <ProgressCircle.Track>
                                    <ProgressCircle.TrackCircle />
                                    <ProgressCircle.FillCircle />
                                </ProgressCircle.Track>
                            </ProgressCircle>
                        ) : data?.user.name ? (
                            <Dropdown>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-2 px-1.5 h-10 rounded-lg hover:bg-slate-100"
                                >
                                    {/* User Profile Avatar */}
                                    <Avatar className="w-8 h-8">
                                        {data.user.image && (
                                            <Avatar.Image
                                                alt={data.user.name}
                                                src={data.user.image}
                                            />
                                        )}

                                        <Avatar.Fallback>
                                            {data.user.name.charAt(0).toUpperCase()}
                                        </Avatar.Fallback>
                                    </Avatar>

                                    <span className="hidden sm:block text-xs font-semibold text-[#17251d]">
                                        {data.user.name}
                                    </span>

                                    <span className="text-[10px] text-slate-500">
                                        ▼
                                    </span>
                                </Button>

                                <Dropdown.Popover>
                                    <Dropdown.Menu
                                        onAction={(key) =>
                                            console.log(`Selected: ${key}`)
                                        }
                                    >
                                        <Dropdown.Item id="profile">
                                            <Link href="/profile">
                                                প্রোফাইল
                                            </Link>
                                        </Dropdown.Item>

                                        <Dropdown.Item id="update-profile">
                                            <Link href="/profile/update-profile">
                                                আপডেট প্রোফাইল
                                            </Link>
                                        </Dropdown.Item>

                                        <Dropdown.Item id="sign-out">
                                            <Button
                                                onClick={handleSignOut}
                                                className="w-full h-9 px-4 bg-[#078b40] hover:bg-[#067735] text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                            >
                                                সাইন আউট
                                            </Button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    className="h-9 px-3 text-xs font-semibold text-slate-700"
                                >
                                    <Link href="/signin">
                                        সাইন ইন
                                    </Link>
                                </Button>

                                <Button
                                    variant="primary"
                                    className="h-9 px-4 rounded-lg bg-[#008b45] text-white text-xs font-semibold"
                                >
                                    <Link href="/signup">
                                        সাইন আপ
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <Separator className="bg-slate-100" />

                {/* Category Navigation */}
                <nav
                    aria-label="Category Navigation"
                    className="flex items-center gap-5 sm:gap-8 py-2.5 overflow-x-auto no-scrollbar"
                >
                    {categories.map((cat) => {
                        const isActive =
                            pathname === `/${cat.slug}` ||
                            pathname === `/category/${cat.slug}`;

                        return (
                            <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className={`flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap py-1 transition-colors ${
                                    isActive
                                        ? "text-[#008b45] font-bold"
                                        : "text-slate-700 hover:text-[#008b45] font-medium"
                                }`}
                            >
                                <span className="text-base leading-none">
                                    {cat.icon}
                                </span>

                                <span>{cat.nameBn}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
