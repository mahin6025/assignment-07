import { Suspense } from 'react';
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

// ১. ডেটা ফেচ করার আলাদা কম্পোনেন্ট
async function ProductGrid({ categorySlug }: { categorySlug: string }) {
    const validCategories = ['chal', 'dal', 'tel', 'sobji', 'mach'];
    if (!validCategories.includes(categorySlug)) {
        return <div className="text-center mt-10 text-xl text-gray-500">এই ক্যাটাগরির কোনো তথ্য পাওয়া যায়নি।</div>;
    }

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categorySlug}`);

    // চেক করা হচ্ছে API রেসপন্স ঠিক আছে কিনা
    if (!res.ok) {
        return <div className="text-center mt-10 text-xl text-red-500">ডেটা লোড করতে সমস্যা হচ্ছে।</div>;
    }

    const products: Product[] = await res.json();

    // যদি ডেটা খালি আসে
    if (!products || products.length === 0) {
        return <div className="text-center mt-10 text-xl text-gray-500">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</div>;
    }

    return (
        <>
            {/* হেডার */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6 flex items-center gap-4">
                <span className="text-5xl bg-red-50 p-2 rounded-full">
                    {products[0].categoryIcon}
                </span>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 capitalize">{categorySlug}</h1>
                    <p className="text-gray-500">হাটি বাজারের খুচরা বাজার দর পরিবর্তন</p>
                </div>
            </div>

            {/* প্রোডাক্ট গ্রিড */}
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
        </>
    );
}

// ২. Wrapper Component
async function CategoryPageWrapper({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    return <ProductGrid categorySlug={resolvedParams.slug} />;
}

// ৩. মূল পেজ
export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center h-screen gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
                    <p className="text-lg text-gray-600">পণ্য লোড হচ্ছে...</p>
                </div>
            }>
                <CategoryPageWrapper params={params} />
            </Suspense>
        </div>
    );
}