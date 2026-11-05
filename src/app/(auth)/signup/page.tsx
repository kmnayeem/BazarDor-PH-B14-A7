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
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f1f6f1] px-4 py-8">

            {/* Header Section */}
            <div className="text-center mb-5">
                <h1 className="text-2xl sm:text-[26px] font-bold text-[#1f2922]">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>

                <p className="text-xs sm:text-sm text-[#7b857d] mt-1">
                    বিনা খরচে সাইন আপ করে সব সুবিধাগুলো দারুণভাবে দেখুন।
                </p>
            </div>

            {/* Signup Card */}
            <Card className="w-full max-w-[360px] p-5 sm:p-[21px] rounded-[15px] border border-[#e0e9e0] bg-[#fbfdfb] shadow-none">

                <Card.Content className="p-0 flex flex-col gap-3.5">

                    {/* Signup Form */}
                    <Form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3.5 w-full"
                    >

                        {/* Full Name Field */}
                        <TextField
                            name="name"
                            type="text"
                            isRequired
                            className="flex flex-col gap-1.5 w-full"
                        >
                            <Label className="text-xs sm:text-sm font-medium text-[#29332c]">
                                নাম
                            </Label>

                            <Input
                                placeholder="যেমন: রহিম উদ্দিন"
                                className="w-full h-[35px] px-3 rounded-lg bg-[#fbfdfb] border border-[#dfe8df] text-xs sm:text-sm text-[#263129] placeholder:text-[#a1aaa2] focus:border-[#078b42] focus:outline-none transition-colors"
                            />

                            <FieldError className="text-xs text-red-500" />
                        </TextField>

                        {/* Email Field */}
                        <TextField
                            name="email"
                            type="email"
                            isRequired
                            className="flex flex-col gap-1.5 w-full"
                        >
                            <Label className="text-xs sm:text-sm font-medium text-[#29332c]">
                                ইমেইল
                            </Label>

                            <Input
                                placeholder="you@example.com"
                                className="w-full h-[35px] px-3 rounded-lg bg-[#fbfdfb] border border-[#dfe8df] text-xs sm:text-sm text-[#263129] placeholder:text-[#a1aaa2] focus:border-[#078b42] focus:outline-none transition-colors"
                            />

                            <FieldError className="text-xs text-red-500" />
                        </TextField>

                        {/* Password Field */}
                        <TextField
                            name="password"
                            type={isVisible ? "text" : "password"}
                            minLength={8}
                            isRequired
                            className="flex flex-col gap-1.5 w-full"
                        >
                            <Label className="text-xs sm:text-sm font-medium text-[#29332c]">
                                পাসওয়ার্ড
                            </Label>

                            <div className="relative w-full">
                                <Input
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                    className="w-full h-[35px] px-3 pr-10 rounded-lg bg-[#fbfdfb] border border-[#dfe8df] text-xs sm:text-sm text-[#263129] placeholder:text-[#a1aaa2] focus:border-[#078b42] focus:outline-none transition-colors"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsVisible((prev) => !prev)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a958c] hover:text-[#29332c]"
                                    aria-label="Toggle password visibility"
                                >
                                    {isVisible ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
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
                            className="flex flex-col gap-1.5 w-full"
                        >
                            <Label className="text-xs sm:text-sm font-medium text-[#29332c]">
                                পাসওয়ার্ড নিশ্চিত করুন
                            </Label>

                            <Input
                                placeholder="আবার লিখুন"
                                className="w-full h-[35px] px-3 rounded-lg bg-[#fbfdfb] border border-[#dfe8df] text-xs sm:text-sm text-[#263129] placeholder:text-[#a1aaa2] focus:border-[#078b42] focus:outline-none transition-colors"
                            />

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
                            className="w-full h-[37px] mt-1 rounded-lg bg-[#078b42] hover:bg-[#067837] text-white font-semibold text-xs sm:text-sm shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition-colors"
                        >
                            {isLoading
                                ? "অপেক্ষা করুন..."
                                : "অ্যাকাউন্ট তৈরি করুন"}
                        </Button>
                    </Form>

                    {/* OR Separator */}
                    <div className="w-full flex items-center gap-3">
                        <Separator className="flex-1 bg-[#e1e9e1]" />

                        <span className="text-xs text-[#7d887e] font-medium">
                            অথবা
                        </span>

                        <Separator className="flex-1 bg-[#e1e9e1]" />
                    </div>

                    {/* Google Signup Button */}
                    <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        variant="outline"
                        className="w-full h-[36px] px-2 flex items-center justify-center gap-2 rounded-lg border border-[#e0e8e0] bg-transparent hover:bg-[#f1f6f1] text-[#29332c] text-xs font-semibold shadow-none"
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
                    <p className="text-center text-xs sm:text-sm text-[#626d64] mt-0.5">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/signin"
                            className="text-[#078b42] font-semibold hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>

                </Card.Content>
            </Card>

            {/* Back to Home */}
            <Link
                href="/"
                className="mt-5 flex items-center gap-1.5 text-xs text-[#879187] hover:text-[#29332c] transition-colors"
            >
                ← হোম পেজে ফিরে যান
            </Link>

        </div>
    );
}
