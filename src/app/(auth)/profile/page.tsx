
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
    HiOutlineMail,
    HiOutlinePencilAlt,
    HiOutlineShieldCheck,
    HiOutlineArrowLeft,
} from "react-icons/hi";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) return null;

    return (
        <main className="min-h-screen bg-[#f1f6f1] px-4 py-8 sm:py-12">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Back Button */}
                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        <HiOutlineArrowLeft className="w-4 h-4" />
                        <span>হোম পেজে ফিরে যান</span>
                    </Link>
                </div>

                {/* Profile Heading */}
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26332b] tracking-tight">
                        আমার প্রোফাইল
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও পরিচালনা করুন।
                    </p>
                </div>

                {/* Profile Information Card */}
                <div className="bg-[#fbfdfb] rounded-2xl border border-[#dfe8df] p-5 sm:p-6">

                    <div className="flex flex-row items-center gap-4">

                        {/* Avatar */}
                        <div className="w-[70px] h-[70px] shrink-0 rounded-2xl bg-slate-100 text-[#26332b] font-black text-2xl flex items-center justify-center overflow-hidden">
                            {user.image ? (
                                <Image
                                    width={300}
                                    height={200}
                                    src={user.image}
                                    alt={user.name || "User"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span>
                                    {(user.name || "U")[0].toUpperCase()}
                                </span>
                            )}
                        </div>

                        {/* User Details */}
                        <div className="flex-1 min-w-0 space-y-1">
                            <h2 className="text-base sm:text-lg font-bold text-[#26332b] truncate">
                                {user.name || "ব্যবহারকারী"}
                            </h2>

                            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 truncate">
                                <HiOutlineMail className="w-4 h-4 shrink-0" />
                                <span className="truncate">{user.email}</span>
                            </p>

                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                                <HiOutlineShieldCheck className="w-3.5 h-3.5" />
                                <span>ভেরিফাইড অ্যাকাউন্ট</span>
                            </span>
                        </div>

                    </div>
                </div>

                {/* Account Information Card */}
                <div className="bg-[#fbfdfb] rounded-2xl border border-[#dfe8df] p-5 sm:p-7 space-y-6">

                    {/* Section Heading */}
                    <h3 className="text-sm font-bold text-[#26332b]">
                        ব্যক্তিগত তথ্য
                    </h3>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Name */}
                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-slate-600 block">
                                নাম
                            </span>

                            <div className="min-h-11 px-3 py-2.5 rounded-lg bg-[#f8faf8] border border-[#dfe8df] flex items-center">
                                <p className="text-sm font-medium text-[#26332b]">
                                    {user.name || "নাম নেই"}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-slate-600 block">
                                ইমেইল (Read-only)
                            </span>

                            <div className="min-h-11 px-3 py-2.5 rounded-lg bg-[#f8faf8] border border-[#dfe8df] flex items-center">
                                <p className="text-sm font-medium text-[#26332b] truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Update Profile Button */}
                    <div className="pt-1">
                        <Link
                            href="/profile/update-profile"
                            className="w-full min-h-11 py-3 px-4 bg-[#078b42] hover:bg-[#067638] text-white font-bold rounded-lg shadow-[0_3px_4px_rgba(0,0,0,0.16)] transition-all duration-200 text-sm flex items-center justify-center gap-2"
                        >
                            <HiOutlinePencilAlt className="w-5 h-5" />
                            <span>তথ্য আপডেট করুন</span>
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
