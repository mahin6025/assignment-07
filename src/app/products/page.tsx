'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    categoryIcon: string;
    today: number;
    change: {
        dir: 'up' | 'down' | 'flat';
        pct: number;
    };
}

const toBengaliNumber = (num: number | string) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
};

export default function AllProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl">লোড হচ্ছে...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans bg-gray-50 min-h-screen">

            <div className="bg-white rounded-xl p-6 shadow-sm mb-6 flex items-center gap-4">
                <span className="text-5xl bg-emerald-50 p-2 rounded-full">🛒</span>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">সব পণ্য</h1>
                    <p className="text-gray-500">সব ধরনের পণ্যের আজকের বাজার দর</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link href={`/product/${product.id}`} key={product.id} className="block h-full">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow cursor-pointer">

                            <div className="flex items-start gap-4 mb-6">
                                <span className="text-4xl bg-red-50 p-2 rounded-full">{product.categoryIcon}</span>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{product.nameBn}</h3>
                                    <p className="text-gray-400 text-sm">প্রতি কেজি</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-end border-t pt-4 border-gray-100">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">আজকের দাম</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {toBengaliNumber(product.today)} <span className="text-base font-normal">টাকা</span>
                                    </p>
                                </div>

                                <div className={`px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-1
                                    ${product.change.dir === 'up' ? 'bg-red-50 text-red-600' :
                                        product.change.dir === 'down' ? 'bg-green-50 text-green-600' :
                                            'bg-gray-100 text-gray-500'}`}
                                >
                                    {product.change.dir === 'up' && <span>▲</span>}
                                    {product.change.dir === 'down' && <span>▼</span>}
                                    {product.change.dir === 'flat' && <span>-</span>}
                                    <span>{toBengaliNumber(Math.abs(product.change.pct))}%</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}