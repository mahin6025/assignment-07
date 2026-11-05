"use client";
import React, { useEffect, useState } from "react";

interface Product {
    _id: string;
    name: string;
    emoji?: string;
    current_price: number;
    unit: string;
    change_percentage: number;
}

export default function Marquee() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("https://openapi.programming-hero.com/api/bazardor/products")
            .then((res) => res.json())
            .then((data) => {
                if (data.status && data.data) {
                    setProducts(data.data);
                }
            })
            .catch((err) => console.error("Error fetching ticker data:", err));
    }, []);

    if (products.length === 0) return null;

    return (
        <div className="bg-emerald-800 text-white py-2 overflow-hidden whitespace-nowrap text-sm border-y border-emerald-700">
            <div className="inline-block animate-marquee">
                {products.map((item, idx) => {
                    const isUp = item.change_percentage >= 0;
                    return (
                        <span key={idx} className="mx-6 inline-flex items-center gap-2">
                            <span>{item.emoji || "🛒"}</span>
                            <span className="font-medium">{item.name}</span>
                            <span>{item.current_price} টাকা/{item.unit}</span>
                            <span className={`text-xs font-bold px-1 rounded ${isUp ? "text-green-300" : "text-red-300"}`}>
                                {isUp ? "▲" : "▼"} {Math.abs(item.change_percentage)}%
                            </span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}