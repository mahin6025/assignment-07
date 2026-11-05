"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface Category {
    _id: string;
    name: string;
    slug: string;
    icon?: string;
}

export default function Navbar() {
    const { data: session } = useSession();
    const [categories, setCategories] = useState<Category[]>([]);
    const pathname = usePathname();

    // Get current Bangla date string representation
    const banglaDate = new Date().toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    useEffect(() => {
        fetch("https://openapi.programming-hero.com/api/bazardor/categories")
            .then((res) => res.json())
            .then((data) => {
                if (data.status && data.data) {
                    setCategories(data.data);
                }
            })
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Successfully signed out!");
                },
            },
        });
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            {/* Row 1: Logo & Auth */}
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl">🛒</span>
                    <div>
                        <h1 className="text-xl font-bold text-emerald-800">বাজার দর</h1>
                        <p className="text-xs text-slate-500">{banglaDate}</p>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    {session ? (
                        <div className="flex items-center gap-3">
                            <Link href="/profile" className="text-sm font-medium text-slate-700 hover:text-emerald-700">
                                প্রোফাইল ({session.user.name})
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                            >
                                সাইন আউট
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/signin"
                                className="text-emerald-700 border border-emerald-600 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-50 transition"
                            >
                                সাইন ইন
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-emerald-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition"
                            >
                                সাইন আপ
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Row 2: Category Navigation Links */}
            <nav className="bg-slate-100 border-t border-slate-200 overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 flex gap-2 py-2">
                    <Link
                        href="/"
                        className={`px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap transition ${pathname === "/" ? "bg-emerald-700 text-white" : "text-slate-700 hover:bg-slate-200"
                            }`}
                    >
                        সব পণ্য
                    </Link>
                    {categories.map((cat) => {
                        const isActive = pathname === `/category/${cat.slug}`;
                        return (
                            <Link
                                key={cat._id || cat.slug}
                                href={`/category/${cat.slug}`}
                                className={`px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap transition flex items-center gap-1 ${isActive ? "bg-emerald-700 text-white" : "text-slate-700 hover:bg-slate-200"
                                    }`}
                            >
                                <span>{cat.icon || "📦"}</span>
                                <span>{cat.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
}