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
        <header className="sticky top-0 z-50 w-full border-b border-emerald-100/80 bg-white/95 shadow-sm shadow-slate-900/[0.03] backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Top Navbar */}
                <div className="flex min-h-[72px] items-center justify-between gap-4">
                    {/* Logo & Date */}
                    <Link
                        href="/"
                        className="group flex min-w-0 items-center gap-3"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50 shadow-sm transition-transform duration-200 group-hover:scale-105">
                            <Image
                                src={logo}
                                alt="Bazar Dor Logo"
                                width={40}
                                height={40}
                                priority
                                className="h-full w-full object-contain p-1"
                            />
                        </div>

                        <div className="flex min-w-0 flex-col">
                            <span className="text-lg font-extrabold leading-tight tracking-tight text-slate-900 sm:text-xl">
                                বাজার দর
                            </span>
                            <span className="mt-0.5 truncate text-[10px] font-medium text-slate-500 sm:text-xs">
                                {formattedDate}
                            </span>
                        </div>
                    </Link>

                    {/* Right Side: Authentication */}
                    <div className="flex shrink-0 items-center gap-2">
                        {isPending ? (
                            <ProgressCircle
                                aria-label="Loading"
                                value={60}
                                className="text-emerald-600"
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
                                    className="flex h-10 items-center gap-2 rounded-xl border border-transparent px-2 transition-colors hover:border-slate-200 hover:bg-slate-50"
                                >
                                    <Avatar className="h-8 w-8 ring-2 ring-emerald-100">
                                        {data.user.image && (
                                            <Avatar.Image
                                                alt={data.user.name}
                                                src={data.user.image}
                                            />
                                        )}

                                        <Avatar.Fallback className="bg-emerald-100 font-semibold text-emerald-800">
                                            {data.user.name.charAt(0).toUpperCase()}
                                        </Avatar.Fallback>
                                    </Avatar>

                                    <span className="hidden max-w-32 truncate text-xs font-semibold text-slate-700 sm:block">
                                        {data.user.name}
                                    </span>

                                    <span className="text-[10px] text-slate-400">
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
                                            <Link
                                                href="/profile"
                                                className="block w-full"
                                            >
                                                প্রোফাইল
                                            </Link>
                                        </Dropdown.Item>

                                        <Dropdown.Item id="update-profile">
                                            <Link
                                                href="/profile/update-profile"
                                                className="block w-full"
                                            >
                                                আপডেট প্রোফাইল
                                            </Link>
                                        </Dropdown.Item>

                                        <Dropdown.Item id="sign-out">
                                            <Button
                                                onClick={handleSignOut}
                                                className="h-9 w-full rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
                                            >
                                                সাইন আউট
                                            </Button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        ) : (
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Button
                                    variant="ghost"
                                    className="h-9 rounded-xl px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                                >
                                    <Link href="/signin">সাইন ইন</Link>
                                </Button>

                                <Button
                                    variant="primary"
                                    className="h-9 rounded-xl bg-emerald-600 px-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 sm:px-4"
                                >
                                    <Link href="/signup">সাইন আপ</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <Separator className="bg-slate-100" />

                {/* Category Navigation */}
                <nav
                    aria-label="Category Navigation"
                    className="no-scrollbar flex items-center gap-2 overflow-x-auto py-2.5 sm:gap-3"
                >
                    {categories.map((cat) => {
                        const isActive =
                            pathname === `/${cat.slug}` ||
                            pathname === `/category/${cat.slug}`;

                        return (
                            <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs whitespace-nowrap transition-all duration-200 sm:text-sm ${
                                    isActive
                                        ? "bg-emerald-600 font-semibold text-white shadow-sm shadow-emerald-600/20"
                                        : "font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
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
