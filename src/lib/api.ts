import { cacheLife } from 'next/cache';


export async function getCategories() {
    'use cache';
    cacheLife('hours');

    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories');


    if (!res.ok) {
        console.error('Failed to fetch categories');
        return [];
    }

    return res.json();
}


export async function getProducts(category: string) {
    'use cache';
    cacheLife('minutes');

    const url = `https://openapi.programming-hero.com/api/bazardor/products?category=${category}`;

    const res = await fetch(url);


    if (!res.ok) return [];

    return res.json();
}