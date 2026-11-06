import Link from 'next/link';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface ProductDetails {
    id: number;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    today: number;
    change: { dir: 'up' | 'down' | 'flat'; pct: number };
    markets: Market[];
}

const toBengaliNumber = (num: number | string) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
};

async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productId}`);

    if (!res.ok) {
        return <div className="text-center mt-10 text-xl text-red-600 font-bold">প্রোডাক্ট পাওয়া যায়নি!</div>;
    }

    const product: ProductDetails = await res.json();

    const minPrice = Math.min(...product.markets.map(m => m.min));
    const maxPrice = Math.max(...product.markets.map(m => m.max));
    const totalAvg = product.markets.reduce((acc, curr) => acc + ((curr.min + curr.max) / 2), 0);
    const avgPrice = Math.round(totalAvg / product.markets.length);

    return (
        <>
            {/* ব্রেডক্রাম্ব */}
            <div className="text-sm text-gray-500 mb-4 flex flex-wrap gap-2 items-center">
                <Link href="/" className="hover:text-emerald-700">হোম</Link>
                <span>/</span>
                <Link href={`/category/${product.category}`} className="hover:text-emerald-700 capitalize">
                    {product.categoryNameBn}
                </Link>
                <span>/</span>
                <span className="text-gray-800 font-medium">{product.nameBn}</span>
            </div>

            {/* হেডার */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-5xl">
                        {product.categoryIcon}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">{product.nameBn}</h1>
                        <p className="text-gray-500 text-sm mb-2">{product.categoryNameBn} • প্রতি কেজি</p>
                        <p className="text-gray-600">সর্বশেষ আপডেট: আজ</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center w-full md:w-auto min-w-37.5">
                    <p className="text-gray-500 text-sm mb-1">আজকের দাম</p>
                    <p className="text-3xl font-bold text-gray-800">{toBengaliNumber(product.today)}</p>
                    <p className="text-gray-500 text-sm mb-2">টাকা / কেজি</p>
                    <div className={`text-sm font-semibold flex items-center justify-center gap-1
                        ${product.change.dir === 'up' ? 'text-red-600' : product.change.dir === 'down' ? 'text-green-600' : 'text-gray-500'}`}>
                        {product.change.dir === 'up' && '▲'}
                        {product.change.dir === 'down' && '▼'}
                        {toBengaliNumber(Math.abs(product.change.pct))}%
                    </div>
                </div>
            </div>


            <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">দামের সারসংক্ষেপ</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm mb-1">সর্বনিম্ন দাম</p>
                        <p className="text-2xl font-bold text-emerald-600">{toBengaliNumber(minPrice)} টাকা</p>
                        <p className="text-xs text-gray-400 mt-1">সবচেয়ে কম বাজার দর</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm mb-1">সর্বোচ্চ দাম</p>
                        <p className="text-2xl font-bold text-red-600">{toBengaliNumber(maxPrice)} টাকা</p>
                        <p className="text-xs text-gray-400 mt-1">সবচেয়ে বেশি বাজার দর</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm mb-1">গড় দাম</p>
                        <p className="text-2xl font-bold text-emerald-700">{toBengaliNumber(avgPrice)} টাকা</p>
                        <p className="text-xs text-gray-400 mt-1">দেশজুড়ে গড় বাজার দর</p>
                    </div>
                </div>
            </div>


            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">বাজারভিত্তিক আজকের দাম</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm">
                                <th className="p-4 font-medium">বাজার</th>
                                <th className="p-4 font-medium">বিভাগ</th>
                                <th className="p-4 font-medium">সর্বনিম্ন</th>
                                <th className="p-4 font-medium">সর্বোচ্চ</th>
                                <th className="p-4 font-medium">গড়</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.markets.map((market, index) => (
                                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors text-sm text-gray-700">
                                    <td className="p-4 font-medium text-gray-800">{market.market}</td>
                                    <td className="p-4">{market.division}</td>
                                    <td className="p-4">{toBengaliNumber(market.min)} টাকা</td>
                                    <td className="p-4">{toBengaliNumber(market.max)} টাকা</td>
                                    <td className="p-4 font-semibold">{toBengaliNumber(Math.round((market.min + market.max) / 2))} টাকা</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}


export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // কুকি থেকে সেশন টোকেন চেক করা হচ্ছে
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('better-auth.session_token');

    if (!sessionToken) {
        redirect('/signin');
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center h-screen gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
                    <p className="text-lg text-gray-600">পণ্যের বিস্তারিত লোড হচ্ছে...</p>
                </div>
            }>
                <ProductContent params={params} />
            </Suspense>
        </div>
    );
}