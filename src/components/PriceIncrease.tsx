'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllProducts } from '@/lib/api';
interface Product {
    id: number;
    nameBn: string;
    categoryIcon: string;
    today: number;
    change: {
        dir: 'up' | 'down' | 'flat';
        pct: number;
    };
}

const toBengaliNumber = (num: number) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
};

export default function PriceIncrease() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProducts();

            const increased = data.filter((p: Product) => p.change.dir === 'up').slice(0, 6);
            setProducts(increased);
        };
        fetchProducts();
    }, []);

    if (products.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-red-500">▲</span> আজ দাম বেড়েছে
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <Link href={`/product/${product.id}`} key={product.id} className="block">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                            <div className="flex items-start gap-4 mb-4">
                                <span className="text-4xl bg-red-50 p-2 rounded-full">{product.categoryIcon}</span>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{product.nameBn}</h3>
                                    <p className="text-gray-400 text-sm">প্রতি কেজি</p>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">আজকের দাম</p>
                                    <p className="text-xl font-bold text-gray-800">
                                        {toBengaliNumber(product.today)} <span className="text-sm font-normal">টাকা</span>
                                    </p>
                                </div>
                                <div className="px-2 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-600 flex items-center gap-1">
                                    <span>▲</span>
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