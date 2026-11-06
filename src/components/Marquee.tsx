'use client';

import MarqueeText from 'react-marquee-text';

import type { Product } from './PriceTicker';


const unitBn: Record<string, string> = {
    kg: 'কেজি',
    litre: 'লিটার',
    dozen: 'ডজন',
    piece: 'পিস',
};

const toBn = (n: number) => n.toLocaleString('bn-BD');

const PriceMarquee = ({ products }: { products: Product[] }) => {
    return (
        <div className="w-full bg-white border-y border-emerald-100 py-2.5 overflow-hidden">
            <MarqueeText>
                {products.map((p) => {
                    const { dir, pct } = p.change;

                    return (
                        <span
                            key={p.id}
                            className="inline-flex items-center gap-2 mx-6 text-sm text-slate-800 whitespace-nowrap"
                        >
                            <span className="text-base leading-none">{p.categoryIcon}</span>
                            <span className="font-semibold">{p.nameBn}</span>
                            <span className="text-slate-700">
                                {toBn(p.today)} টাকা/{unitBn[p.unit] ?? p.unit}
                            </span>

                            {dir === 'up' && (
                                <span className="font-semibold text-red-600">
                                    ▲ {toBn(Math.abs(pct))}%
                                </span>
                            )}
                            {dir === 'down' && (
                                <span className="font-semibold text-green-600">
                                    ▼ {toBn(Math.abs(pct))}%
                                </span>
                            )}
                            {dir === 'flat' && (
                                <span className="font-semibold text-slate-400">— ০%</span>
                            )}
                        </span>
                    );
                })}
            </MarqueeText>
        </div>
    );
};

export default PriceMarquee;