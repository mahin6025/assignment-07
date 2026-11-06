import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavAuth from './NavAuth';
import { getCategories } from '@/lib/api';
import TodayDate from './TodayDate';

type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

const Navbar = async () => {
    const categories: Category[] = await getCategories();

    return (
        <header className="w-full bg-white shadow-sm">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center p-1 shadow-md">
                        <Image
                            src="/assets/logo-icon.png"
                            alt="logo"
                            width={26}
                            height={26}
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="font-bold text-base leading-tight text-slate-900">বাজার দর</span>
                        <span className="text-xs text-slate-600">
                            <TodayDate />
                        </span>
                    </div>
                </div>

                <NavAuth />
            </div>

            <div className="w-full bg-emerald-50/50 border-t border-emerald-100">
                <ul className="flex items-center gap-8 max-w-7xl mx-auto px-4 py-3 text-sm text-slate-800 list-none overflow-x-auto whitespace-nowrap">
                    {categories.map((cat) => (
                        <li key={cat.id}>
                            <Link
                                href={`/category/${cat.slug}`}
                                className="flex items-center space-x-2 cursor-pointer hover:text-emerald-700 transition-colors"
                            >

                                <span className="text-base leading-none">
                                    {cat.icon ? cat.icon : (cat.slug === 'dal' ? '🫘' : '🛒')}
                                </span>
                                <span className="font-medium">{cat.nameBn}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;