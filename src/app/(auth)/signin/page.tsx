
"use client";

import React from "react";
import {
    Button,
    Card,
    FieldError,
    Form,
    Input,
    Label,
    Separator,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {

    const handleSubmit = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const { error } = await signIn.email({
            email: data.email as string,
            password: data.password as string,
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message as string);
        }
    };

    const handleGoogleSignIn = async () => {
        const { error } = await signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message as string);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f0f5f0] px-4 py-8">

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-5">
                <h1 className="text-2xl font-bold text-[#1e2922] mb-1">
                    সাইন ইন
                </h1>

                <p className="text-xs sm:text-sm text-[#7b857d]">
                    বিস্তারিত দাম, বাজার মূল্য ও ফিচার দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            {/* Login Card */}
            <Card className="w-full max-w-[360px] p-5 sm:p-6 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] shadow-none">

                <Card.Content className="flex flex-col gap-4 p-0">

                    {/* Login Form */}
                    <Form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3.5 w-full"
                    >

                        {/* Email */}
                        <TextField
                            name="email"
                            type="email"
                            isRequired
                            className="flex flex-col gap-1.5 w-full"
                        >
                            <Label className="text-xs font-medium text-[#344139]">
                                ইমেইল
                            </Label>

                            <Input
                                placeholder="you@example.com"
                                className="w-full h-9 px-3 rounded-lg bg-transparent border border-[#dfe7df] text-xs text-[#27352b] placeholder:text-[#a0aaa2] hover:border-[#b8c9ba] focus:border-[#078b40] focus:outline-none transition-colors"
                            />

                            <FieldError className="text-xs text-red-500" />
                        </TextField>

                        {/* Password */}
                        <TextField
                            name="password"
                            type="password"
                            isRequired
                            className="flex flex-col gap-1.5 w-full"
                        >
                            <Label className="text-xs font-medium text-[#344139]">
                                পাসওয়ার্ড
                            </Label>

                            <Input
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className="w-full h-9 px-3 rounded-lg bg-transparent border border-[#dfe7df] text-xs text-[#27352b] placeholder:text-[#a0aaa2] hover:border-[#b8c9ba] focus:border-[#078b40] focus:outline-none transition-colors"
                            />

                            <FieldError className="text-xs text-red-500" />
                        </TextField>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full h-9 mt-0.5 rounded-lg bg-[#078b40] hover:bg-[#067735] text-white font-semibold text-xs shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-colors"
                        >
                            সাইন ইন
                        </Button>

                    </Form>

                    {/* Separator */}
                    <div className="w-full flex items-center gap-3">
                        <Separator className="flex-1 bg-[#e0e7e0]" />

                        <span className="text-xs text-[#89928a]">
                            অথবা
                        </span>

                        <Separator className="flex-1 bg-[#e0e7e0]" />
                    </div>

                    {/* Google Login */}
                    <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        variant="outline"
                        className="w-full h-9 flex items-center justify-center gap-2 rounded-lg border border-[#dfe7df] bg-transparent hover:bg-[#f2f7f2] text-[#354139] font-semibold text-xs shadow-none transition-colors"
                    >
                        {/* Google Icon */}
                        <svg
                            className="w-3.5 h-3.5 shrink-0"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>

                        <span>Google দিয়ে চালিয়ে যান</span>
                    </Button>

                    {/* Signup */}
                    <div className="text-center pt-0.5">
                        <p className="text-xs text-[#58645a]">
                            অ্যাকাউন্ট নেই?{" "}
                            <Link
                                href="/signup"
                                className="text-[#078b40] font-semibold hover:underline"
                            >
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </div>

                </Card.Content>
            </Card>

            {/* Back to Home */}
            <Link
                href="/"
                className="flex items-center gap-1.5 mt-5 text-xs text-[#89948b] hover:text-[#344139] transition-colors"
            >
                <ArrowLeft size={13} />
                <span>হোম পেজে ফিরে যান</span>
            </Link>

        </div>
    );
}
