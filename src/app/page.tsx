import { Suspense } from 'react';
import Hero from "@/components/Hero";
import PriceTicker from "@/components/PriceTicker";
import ProductSection from "@/components/ProductSections";
import PriceIncrease from "@/components/PriceIncrease";

export default function HomePage() {
  return (
    <div>

      <Suspense fallback={<div className="text-center p-2 text-sm text-gray-500">দাম লোড হচ্ছে...</div>}>
        <PriceTicker />
      </Suspense>

      <Hero />
      <PriceIncrease />


      <Suspense fallback={<div className="text-center py-10 text-gray-500">পণ্য লোড হচ্ছে...</div>}>
        <ProductSection />
      </Suspense>
    </div>
  );
}