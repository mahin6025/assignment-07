import Link from 'next/link';
export type Product = {
    id: number;
    slug: string;
    nameBn: string;
    image: string;
    unit: string;
    today: number;
    change: { dir: 'up' | 'down' | 'flat'; pct: number };
};

const unitBn: Record<string, string> = {
    kg: 'কেজি',
    litre: 'লিটার',
    dozen: 'ডজন',
    piece: 'পিস',
};

const toBn = (n: number) => n.toLocaleString('bn-BD');

const ProductCard = ({ product }: { product: Product }) => {
    const { dir, pct } = product.change;
    const pctText = Math.abs(pct).toLocaleString('bn-BD', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

    const badge =
        dir === 'up'
            ? { cls: 'bg-red-50 text-red-600', text: `▲ ${pctText}%` }
            : dir === 'down'
                ? { cls: 'bg-green-50 text-green-600', text: `▼ ${pctText}%` }
                : { cls: 'bg-slate-100 text-slate-600', text: `— ${pctText}%` };

    return (

        <Link href={`/product/${product.id}`} className="block h-full">
            <div className="bg-white border border-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer">
                <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-2xl shrink-0">
                        {product.image}
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 leading-tight truncate">
                            {product.nameBn}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            প্রতি {unitBn[product.unit] ?? product.unit}
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-xs text-slate-500">আজকের দাম</p>
                    <div className="flex items-center justify-between mt-0.5">
                        <p className="text-slate-900">
                            <span className="text-lg font-extrabold">{toBn(product.today)}</span>{' '}
                            <span className="text-sm">টাকা</span>
                        </p>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.cls}`}>
                            {badge.text}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;