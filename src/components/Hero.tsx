'use client';
import React, { useEffect, useState } from 'react'; // useEffect যুক্ত করুন
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ১. তারিখের জন্য স্টেট (প্রথমে খালি থাকবে)
    const [today, setToday] = useState("");

    useEffect(() => {
        // ২. লগইন চেক
        const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
        setIsLoggedIn(Boolean(token));

        // ৩. ব্রাউজারে লোড হওয়ার পর তারিখ সেট করুন
        const formattedDate = new Date().toLocaleDateString('bn-BD', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setToday(formattedDate);
    }, []);

    return (
        <div>
            <section data-theme="light" className="w-full bg-white border-y border-emerald-100 py-2.5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="card lg:card-side bg-white w-full shadow-sm rounded-3xl border border-emerald-100">

                        {/* বাম দিকের কন্টেন্ট */}
                        <div className="card-body justify-center p-8 lg:p-10 flex-1">
                            {/* ৪. today স্টেটটি এখানে ব্যবহার করুন */}
                            <span className="badge badge-lg bg-emerald-100 text-emerald-800 border-none font-semibold w-fit">
                                {today || "লোড হচ্ছে..."}
                            </span>

                            <h2 className="card-title text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                                আজকের বাজারের দাম এক নজরে
                            </h2>

                            <p className="text-sm text-slate-700 max-w-xl leading-relaxed">
                                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
                                গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                            </p>

                            <div className="card-actions mt-4 gap-3">
                                <Link
                                    href="/products"
                                    className="btn bg-emerald-700 hover:bg-emerald-600 text-white border-none rounded-lg px-6 shadow-md"
                                >
                                    সব পণ্য দেখুন
                                </Link>
                            </div>
                        </div>

                        {/* ডান দিকের অংশ */}
                        <div className="p-6 lg:p-8 flex flex-col justify-center w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-100">

                            {isLoggedIn ? (
                                // লগইন থাকলে: স্ট্যাটস কার্ড দেখাবে
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">পণ্য</p>
                                            <p className="text-2xl font-bold text-emerald-700">৩৭</p>
                                        </div>
                                        <p className="text-xs text-gray-500 max-w-17.5 text-right">টি নির্দিষ্ট পণ্য</p>
                                    </div>
                                    <div className="flex justify-between items-center bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">বাজার</p>
                                            <p className="text-2xl font-bold text-emerald-700">১২</p>
                                        </div>
                                        <p className="text-xs text-gray-500 max-w-17.5 text-right">টি বাজার</p>
                                    </div>
                                    <div className="flex justify-between items-center bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">বিভাগ</p>
                                            <p className="text-2xl font-bold text-emerald-700">৮</p>
                                        </div>
                                        <p className="text-xs text-gray-500 max-w-17.5 text-right">টি বিভাগ</p>
                                    </div>
                                </div>
                            ) : (
                                // লগইন না থাকলে: ঝুড়ির ছবি দেখাবে
                                <div className="flex items-center justify-center h-full w-full">
                                    <Image
                                        src="/assets/bazar-hero.png"
                                        alt="বাজারের ঝুড়ি"
                                        width={320}
                                        height={240}
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;