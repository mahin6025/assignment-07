import Marquee from './Marquee';

export type Product = {
    id: number;
    slug: string;
    nameBn: string;
    categoryIcon: string;
    unit: string;
    today: number;
    change: { dir: 'up' | 'down' | 'flat'; pct: number };
};

const PriceTicker = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', {
        cache: 'no-store',
    });
    const products: Product[] = await res.json();

    return <Marquee products={products} />;
};

export default PriceTicker;