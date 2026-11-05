"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

interface Product {
  _id: string;
  slug?: string;
  name: string;
  emoji?: string;
  unit: string;
  current_price: number;
  change_percentage: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  // Top 6 Risers & Fallers
  const sortedByChange = [...products].sort((a, b) => b.change_percentage - a.change_percentage);
  const topRisers = sortedByChange.slice(0, 6);
  const topFallers = [...products].sort((a, b) => a.change_percentage - b.change_percentage).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="bg-emerald-900 text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="bg-emerald-800 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full">
            রিয়েল-টাইম বাজার মনিটর
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">দৈনিক বাজারের সঠিক দাম জানুন এক নজরে</h1>
          <p className="text-emerald-100 text-sm md:text-base">
            চাল, ডাল, সবজি ও মাছের বাজারদর যাচাই করুন খুব সহজেই। সঠিক সিদ্ধান্ত নিন প্রতিদিন।
          </p>
          <div>
            <a
              href="#সব-পণ্য"
              className="inline-block bg-white text-emerald-900 font-semibold px-6 py-3 rounded-xl shadow hover:bg-emerald-50 transition"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>
        <div className="text-7xl md:text-9xl">🛒</div>
      </section>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Section A: Top Risers */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>📈</span> আজ দাম বেড়েছে ▲
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {topRisers.map((prod) => (
                <ProductCard key={prod._id || prod.slug} product={prod} />
              ))}
            </div>
          </section>

          {/* Section B: Top Fallers */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>📉</span> আজ দাম কমেছে ▼
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {topFallers.map((prod) => (
                <ProductCard key={prod._id || prod.slug} product={prod} />
              ))}
            </div>
          </section>

          {/* Section C: All Products */}
          <section id="সব-পণ্য" className="space-y-6 pt-6">
            <h2 className="text-2xl font-bold text-slate-800">সব পণ্য</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((prod) => (
                <ProductCard key={prod._id || prod.slug} product={prod} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}