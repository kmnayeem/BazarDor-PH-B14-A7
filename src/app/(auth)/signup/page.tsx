
"use client";

import React, { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";

export default function SignUpPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    // Signup Handler
    const handleSubmit = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setPasswordError("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            setPasswordError("পাসওয়ার্ড দুটি মিলছে না!");
            return;
        }

        if ((data.password as string).length < 8) {
            setPasswordError(
                "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!"
            );
            return;
        }

        try {
            setIsLoading(true);

            const { data: resData, error } = await signUp.email({
                email: data.email as string,
                password: data.password as string,
                name: data.name as string,
            });

            if (error) {
                toast.error(
                    error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!"
                );
                return;
            }

            if (resData?.user) {
                toast.success(
                    "Account Created Successfully, Login to continue"
                );
                router.push("/signin");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error("কিছু একটা সমস্যা হয়েছে!");
        } finally {
            setIsLoading(false);
        }
    };

    // Google Signup Handler
    const handleGoogleSignIn = async () => {
        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            console.error("Google Login Error:", error);
            toast.error("Google দিয়ে সাইন আপ করা যায়নি!");
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f0f5f0] px-4 py-8">

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1e2922] mb-2">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>

                <p className="text-xs sm:text-sm text-[#7b857d]">
                    বিনা খরচে সাইন আপ করে সব সুবিধাগুলো দারুণভাবে দেখুন।
                </p>
            </div>

            {/* Signup Card */}
            <Card className="w-full max-w-[390px] p-6 sm:p-8 rounded-[24px] border border-[#dce8dd] bg-[#fbfdfb] shadow-[0_12px_40px_rgba(30,70,40,0.07)]">

                <Card.Content className="p-0 flex flex-col gap-5">

                    {/* Signup Form */}
                    <Form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-full"
                    >

                        {/* Full Name Field */}
                        <TextField
                            name="name"
                            type="text"
                            isRequired
                            className="flex flex-col gap-2 w-full"
                        >
                            <Label className="text-[13px] font-semibold text-[#344139]">
                                নাম
                            </Label>

                            <Input
                                placeholder="যেমন: রহিম উদ্দিন"
                                className="w-full h-11 px-4 rounded-xl bg-white border border-[#dfe7df] text-sm text-[#27352b] placeholder:text-[#a0aaa2] hover:border-[#86b99a] hover:bg-[#f7fbf7] focus:border-[#078b40] focus:ring-2 focus:ring-[#078b40]/10 focus:outline-none transition-all"
                            />

                            <FieldError className="text-xs text-red-500" />
                        </TextField>

                        {/* Email Field */}
                        <TextField
                            name="email"
                            type="email"
                            isRequired
                            className="flex flex-col gap-2 w-full"
                        >
                            <Label className="text-[13px] font-semibold text-[#344139]">
                                ইমেইল
                            </Label>

                            <Input
                                placeholder="you@example.com"
                                className="w-full h-11 px-4 rounded-xl bg-white border border-[#dfe7df] text-sm text-[#27352b] placeholder:text-[#a0aaa2] hover:border-[#86b99a] hover:bg-[#f7fbf7] focus:border-[#078b40] focus:ring-2 focus:ring-[#078b40]/10 focus:outline-none transition-all"
                            />

                            <FieldError className="text-xs text-red-500" />
                        </TextField>

                        {/* Password Field */}
                        <TextField
                            name="password"
                            type={isVisible ? "text" : "password"}
                            minLength={8}
                            isRequired
                            className="flex flex-col gap-2 w-full"
                        >
                            <Label className="text-[13px] font-semibold text-[#344139]">
                                পাসওয়ার্ড
                            </Label>

                            <div className="relative w-full">
                                <Input
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                    className="w-full h-11 px-4 pr-11 rounded-xl bg-white border border-[#dfe7df] text-sm text-[#27352b] placeholder:text-[#a0aaa2] hover:border-[#86b99a] hover:bg-[#f7fbf7] focus:border-[#078b40] focus:ring-2 focus:ring-[#078b40]/10 focus:outline-none transition-all"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsVisible((prev) => !prev)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a958c] hover:text-[#078b40] transition-colors"
                                    aria-label="Toggle password visibility"
                                >
                                    {isVisible ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>
                            </div>

                            <FieldError className="text-xs text-red-500" />
                        </TextField>

                        {/* Confirm Password Field */}
                        <TextField
                            name="confirmPassword"
                            type={isVisible ? "text" : "password"}
                            isRequired
                            isInvalid={!!passwordError}
                            className="flex flex-col gap-2 w-full"
                        >
                            <Label className="text-[13px] font-semibold text-[#344139]">
                                পাসওয়ার্ড নিশ্চিত করুন
                            </Label>

                            <div className="relative w-full">
                                <Input
                                    placeholder="আবার লিখুন"
                                    className="w-full h-11 px-4 pr-11 rounded-xl bg-white border border-[#dfe7df] text-sm text-[#27352b] placeholder:text-[#a0aaa2] hover:border-[#86b99a] hover:bg-[#f7fbf7] focus:border-[#078b40] focus:ring-2 focus:ring-[#078b40]/10 focus:outline-none transition-all"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsVisible((prev) => !prev)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a958c] hover:text-[#078b40] transition-colors"
                                    aria-label="Toggle password visibility"
                                >
                                    {isVisible ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>
                            </div>

                            {passwordError ? (
                                <span className="text-xs text-red-500">
                                    {passwordError}
                                </span>
                            ) : (
                                <FieldError className="text-xs text-red-500" />
                            )}
                        </TextField>

                        {/* Register Button */}
                        <Button
                            type="submit"
                            isDisabled={isLoading}
                            className="w-full h-11 mt-1 rounded-xl bg-gradient-to-r from-[#078b40] to-[#0a9b4b] hover:from-[#056d32] hover:to-[#078b40] text-white font-bold text-sm shadow-[0_4px_12px_rgba(7,139,64,0.20)] hover:shadow-[0_6px_16px_rgba(7,139,64,0.25)] transition-all duration-200"
                        >
                            {isLoading
                                ? "অপেক্ষা করুন..."
                                : "অ্যাকাউন্ট তৈরি করুন"}
                        </Button>

                    </Form>

                    {/* OR Separator */}
                    <div className="w-full flex items-center gap-3">
                        <Separator className="flex-1 bg-[#e0e7e0]" />

                        <span className="text-xs font-medium text-[#89928a]">
                            অথবা
                        </span>

                        <Separator className="flex-1 bg-[#e0e7e0]" />
                    </div>

                    {/* Google Signup Button */}
                    <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        variant="outline"
                        className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-[#dfe7df] bg-white hover:bg-[#edf7ef] hover:border-[#9bc9a5] text-[#354139] font-semibold text-sm shadow-none transition-all duration-200"
                    >
                        <svg
                            className="w-4 h-4 shrink-0"
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

                        Google দিয়ে চালিয়ে যান
                    </Button>

                    {/* Sign In Link */}
                    <p className="text-center text-xs sm:text-sm text-[#58645a] pt-1">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/signin"
                            className="text-[#078b40] font-bold hover:text-[#056d32] hover:underline underline-offset-4 transition-colors"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>

                </Card.Content>
            </Card>

            {/* Back to Home */}
            <Link
                href="/"
                className="mt-6 flex items-center gap-1.5 text-xs font-medium text-[#89948b] hover:text-[#078b40] transition-colors"
            >
                ← হোম পেজে ফিরে যান
            </Link>

        </div>
    );
}
