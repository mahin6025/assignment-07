import ProductCard, { Product } from './ProductCard';
import { getAllProducts } from '@/lib/api';

const Grid = ({ items }: { items: Product[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
            <ProductCard key={p.id} product={p} />
        ))}
    </div>
);

const ProductSections = async () => {
    const products: Product[] = await getAllProducts();

    const increased = products
        .filter((p) => p.change.dir === 'up')
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const decreased = products
        .filter((p) => p.change.dir === 'down')
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);

    return (
        <section data-theme="light" className="w-full bg-slate-100 py-8">
            <div className="max-w-7xl mx-auto px-4 space-y-10">

                <div>
                    <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                        <span className="text-red-600 text-sm">▲</span>
                        আজ দাম বেড়েছে
                    </h2>
                    <Grid items={increased} />
                </div>

                <div>
                    <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                        <span className="text-green-600 text-sm">▼</span>
                        আজ দাম কমেছে
                    </h2>
                    <Grid items={decreased} />
                </div>


                <div>
                    <h2 className="text-lg font-bold text-slate-900">সব পণ্য</h2>
                    <p className="text-xs text-slate-500 mb-4">
                        মোট {products.length.toLocaleString('bn-BD')}টি পণ্য দেখানো হচ্ছে
                    </p>
                    <Grid items={products} />
                </div>
            </div>
        </section>
    );
};

export default ProductSections;