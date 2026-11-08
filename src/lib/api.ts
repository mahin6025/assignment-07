

const BASE_URL = 'https://openapi.programming-hero.com/api/bazardor';


export async function getCategories() {

    const res = await fetch(`${BASE_URL}/categories`, { cache: 'no-store' });

    if (!res.ok) {
        console.error('Failed to fetch categories');
        return [];
    }

    return res.json();
}


export async function getProducts(category: string) {
    const url = `${BASE_URL}/products?category=${category}`;


    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) return [];

    return res.json();
}


export async function getAllProducts() {

    const res = await fetch(`${BASE_URL}/products`, { cache: 'no-store' });

    if (!res.ok) return [];

    return res.json();
}


export async function getProductById(id: string) {

    const res = await fetch(`${BASE_URL}/products/${id}`, { cache: 'no-store' });

    if (!res.ok) return null;

    return res.json();
}