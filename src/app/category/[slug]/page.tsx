"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

interface Product {
    _id: string;
    slug?: string;
    name: string;
    emoji?: string;
    unit: string;
    current_price: number;
    change_percentage: number;
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [sortOrder, setSortOrder] = useState<string>("default");

    useEffect(() => {
        fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status && data.data) {
                    setProducts(data.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching category products:", err);
                setLoading(false);
            });
    }, [slug]);

    // Handle sorting
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "low-to-high") return a.current_price - b.current_price;
        if (sortOrder === "high-to-low") return b.current_price - a.current_price;
        return 0;
    });

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-64 bg-slate-200 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    // Empty state fallback
    if (products.length === 0) {
        return (
            <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
                <div className="text-6xl">🔍</div>
                <h2 className="text-2xl font-bold text-slate-800">কোনো পণ্য পাওয়া যায়নি</h2>
                <p className="text-slate-500 text-sm">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য উপলব্ধ নেই।</p>
                <Link
                    href="/"
                    className="inline-block bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-800 transition"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <h1 className="text-2xl font-bold text-slate-800 capitalize">ক্যাটাগরি: {slug}</h1>

                {/* Sort Control Dropdown */}
                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm font-medium text-slate-600">সাজান:</label>
                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low-to-high">দাম: কম থেকে বেশি</option>
                        <option value="high-to-low">দাম: বেশি থেকে কম</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((prod) => (
                    <ProductCard key={prod._id || prod.slug} product={prod} />
                ))}
            </div>
        </div>
    );
}