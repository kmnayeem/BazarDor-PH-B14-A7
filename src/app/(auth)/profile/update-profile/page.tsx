"use client";

import React, { useEffect } from "react";
import { updateUser, useSession } from "@/lib/auth-client";
import {
    Button,
    Card,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { ArrowLeft, Mail, User, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UpdateProfilePage = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push("/signin");
        }
    }, [isPending, session, router]);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const { data: resData, error } = await updateUser({
            name: data.name as string,
        });

        if (error) {
            toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
            return;
        }

        if (resData?.status === true || !error) {
            toast.success("প্রোফাইল আপডেট হয়েছে");
            router.push("/profile");
            router.refresh();
        }
    };

    return (
        <main className="min-h-screen bg-[#f1f6f1] px-4 py-8 sm:py-12">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Back Button */}
                <div>
                    <Link
                        href="/profile"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span>প্রোফাইলে ফিরে যান</span>
                    </Link>
                </div>

                {/* Page Heading */}
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#26332b] tracking-tight">
                        তথ্য পরিবর্তন
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500">
                        আপনার প্রোফাইলের নাম পরিবর্তন করুন।
                    </p>
                </div>

                {/* Update Profile Card */}
                <Card className="w-full rounded-2xl bg-[#fbfdfb] border border-[#dfe8df] shadow-none p-5 sm:p-7">
                    <Card.Content className="p-0">

                        <Form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                        >
                            {/* Section Heading */}
                            <h3 className="text-sm font-bold text-[#26332b]">
                                ব্যক্তিগত তথ্য
                            </h3>

                            {/* Email Field */}
                            <TextField
                                name="email"
                                type="email"
                                isReadOnly
                                isDisabled
                                value={session?.user?.email || ""}
                                className="flex flex-col gap-2 w-full"
                            >
                                <Label className="text-xs font-semibold text-slate-600">
                                    ইমেইল (পরিবর্তনযোগ্য নয়)
                                </Label>

                                <div className="relative flex items-center">
                                    <Mail
                                        size={17}
                                        className="pointer-events-none absolute left-3.5 text-slate-400"
                                    />

                                    <Input
                                        placeholder={
                                            isPending
                                                ? "লোড হচ্ছে..."
                                                : "example@mail.com"
                                        }
                                        className="w-full h-11 pl-10 pr-3.5 rounded-lg bg-[#f1f4f1] border border-[#dfe8df] text-sm text-slate-500 cursor-not-allowed focus:outline-none"
                                    />
                                </div>
                            </TextField>

                            {/* Full Name Field */}
                            <TextField
                                key={session?.user?.name || "user-name"}
                                name="name"
                                type="text"
                                isRequired
                                defaultValue={session?.user?.name || ""}
                                className="flex flex-col gap-2 w-full"
                            >
                                <Label className="text-xs font-semibold text-slate-600">
                                    পূর্ণ নাম
                                </Label>

                                <div className="relative flex items-center">
                                    <User
                                        size={17}
                                        className="pointer-events-none absolute left-3.5 text-slate-400"
                                    />

                                    <Input
                                        placeholder="আপনার পূর্ণ নাম লিখুন"
                                        className="w-full h-11 pl-10 pr-3.5 rounded-lg bg-[#f8faf8] border border-[#dfe8df] text-sm text-[#26332b] placeholder:text-slate-400 hover:border-slate-300 focus:border-[#078b42] focus:bg-white focus:outline-none transition-colors"
                                    />
                                </div>

                                <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
                                    এই নামটি আপনার প্রোফাইল এবং নেভিগেশন বারে প্রদর্শিত হবে।
                                </span>

                                <FieldError className="text-xs text-red-500" />
                            </TextField>

                            {/* Update Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                isDisabled={isPending}
                                className="w-full min-h-11 mt-1 rounded-lg bg-[#078b42] hover:bg-[#067638] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_3px_4px_rgba(0,0,0,0.16)] transition-all cursor-pointer"
                            >
                                <>
                                    <Check size={17} strokeWidth={2.5} />
                                    <span>তথ্য আপডেট করুন</span>
                                </>
                            </Button>

                        </Form>
                    </Card.Content>
                </Card>
            </div>
        </main>
    );
};

export default UpdateProfilePage;
