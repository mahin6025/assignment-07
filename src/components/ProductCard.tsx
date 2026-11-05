import Link from "next/link";

interface ProductCardProps {
    product: {
        _id: string;
        slug?: string;
        name: string;
        emoji?: string;
        unit: string;
        current_price: number;
        change_percentage: number;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const isUp = product.change_percentage > 0;
    const isDown = product.change_percentage < 0;

    return (
        <Link
            href={`/product/${product.slug || product._id}`}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
        >
            <div>
                <div className="text-4xl mb-3 text-center">{product.emoji || "🥬"}</div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 text-center">{product.name}</h3>
                <p className="text-xs text-slate-500 text-center mb-4">প্রতি {product.unit}</p>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <div>
                    <span className="text-xs text-slate-400 block">আজকের দাম</span>
                    <span className="font-bold text-emerald-800 text-base">{product.current_price} টাকা</span>
                </div>
                <span
                    className={`text-xs font-semibold px-2 py-1 rounded-md ${isUp
                            ? "bg-green-100 text-green-700"
                            : isDown
                                ? "bg-red-100 text-red-700"
                                : "bg-slate-100 text-slate-600"
                        }`}
                >
                    {isUp ? "▲" : isDown ? "▼" : "—"} {Math.abs(product.change_percentage)}%
                </span>
            </div>
        </Link>
    );
}