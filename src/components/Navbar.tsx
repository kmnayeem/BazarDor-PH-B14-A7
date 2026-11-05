
"use client";

import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Dropdown,
    Separator,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { ICategory } from "@/types/type";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import logo from "@/assets/logo-icon.png";

export default function Navbar() {
    const router = useRouter();
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
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("সাইন আউট সফল হয়েছে");
                    router.push("/");
                    router.refresh();
                },
            },
        });
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#dceadd] bg-[#fbfdfb]/95 shadow-[0_4px_20px_rgba(30,70,40,0.05)] backdrop-blur-xl">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Top Navbar */}
                <div className="flex min-h-[72px] items-center justify-between gap-4">

                    {/* Logo & Date */}
                    <Link
                        href="/"
                        className="group flex min-w-0 items-center gap-3"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#dcebdd] bg-[#edf7ee] shadow-sm">
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
                            <span className="text-lg font-extrabold leading-tight tracking-tight text-[#1e2922] sm:text-xl">
                                বাজার দর
                            </span>

                            <span className="mt-0.5 truncate text-[10px] font-medium text-[#849187] sm:text-xs">
                                {formattedDate}
                            </span>
                        </div>
                    </Link>

                    {/* Right Side: Authentication */}
                    <div className="flex shrink-0 items-center gap-2">

                        {isPending ? (
                            <div
                                className="h-5 w-5 animate-spin rounded-full border-2 border-[#dcebdd] border-t-[#078b40]"
                                role="status"
                                aria-label="Loading"
                            />
                        ) : data?.user?.name ? (
                            <Dropdown>
                                <Button
                                    variant="ghost"
                                    className="flex h-10 items-center gap-2 rounded-xl border border-[#e4ece4] bg-white/70 px-2.5 shadow-sm transition-all duration-200 hover:border-[#b8d8bd] hover:bg-[#edf7ef] hover:shadow-md"
                                >
                                    <Avatar className="h-8 w-8 ring-2 ring-[#dceedd]">
                                        {data.user.image && (
                                            <Avatar.Image
                                                alt={data.user.name}
                                                src={data.user.image}
                                            />
                                        )}

                                        <Avatar.Fallback className="bg-[#e3f2e5] font-semibold text-[#087b39]">
                                            {data.user.name.charAt(0).toUpperCase()}
                                        </Avatar.Fallback>
                                    </Avatar>

                                    <span className="hidden max-w-32 truncate text-xs font-semibold text-[#344139] sm:block">
                                        {data.user.name}
                                    </span>

                                    <span className="text-[10px] text-[#849187]">
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
                                                className="h-9 w-full rounded-xl bg-[#078b40] px-4 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#056d32] hover:shadow-md"
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
                                    className="h-9 rounded-xl border border-transparent px-3 text-xs font-semibold text-[#344139] transition-all duration-200 hover:border-[#dcebdd] hover:bg-[#edf7ef] hover:text-[#078b40]"
                                >
                                    <Link href="/signin">
                                        সাইন ইন
                                    </Link>
                                </Button>

                                <Button
                                    variant="primary"
                                    className="h-9 rounded-xl bg-gradient-to-r from-[#078b40] to-[#0a9b4b] px-3 text-xs font-semibold text-white shadow-[0_3px_8px_rgba(7,139,64,0.18)] transition-all duration-200 hover:from-[#056d32] hover:to-[#078b40] hover:shadow-[0_5px_12px_rgba(7,139,64,0.25)] sm:px-4"
                                >
                                    <Link href="/signup">
                                        সাইন আপ
                                    </Link>
                                </Button>

                            </div>
                        )}
                    </div>
                </div>

                <Separator className="bg-[#e8eee8]" />

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
                                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs whitespace-nowrap transition-all duration-200 sm:text-sm ${
                                    isActive
                                        ? "border-[#078b40] bg-gradient-to-r from-[#078b40] to-[#0a9b4b] font-semibold text-white shadow-[0_3px_8px_rgba(7,139,64,0.18)]"
                                        : "border-transparent bg-transparent font-medium text-[#59675c] hover:border-[#dcebdd] hover:bg-[#edf7ef] hover:text-[#078b40]"
                                }`}
                            >
                                <span className="text-base leading-none">
                                    {cat.icon}
                                </span>

                                <span>
                                    {cat.nameBn}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
