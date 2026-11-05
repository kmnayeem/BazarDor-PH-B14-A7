
import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full mt-auto bg-[#f8faf8] border-t border-[#e9eee9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="min-h-[68px] flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 py-4 sm:py-5">

                    <p className="text-xs sm:text-sm text-[#59645b] font-medium text-center sm:text-left leading-relaxed">
                        <span className="text-[#263b2d] font-semibold">
                            বাজার দর
                        </span>
                        <span className="mx-1.5 text-[#a0aaa1]">—</span>
                        প্রয়োজনীয় পণ্যের দাম এক নজরে
                    </p>

                    <p className="text-[11px] sm:text-xs text-[#849087] text-center sm:text-right leading-relaxed">
                        সকল দাম সময়ে সময়ে বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
