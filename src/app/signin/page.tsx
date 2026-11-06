'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import SocialButtons from '@/components/SocialButtons';

const input =
    'w-full rounded-lg border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600';

export default function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const form = new FormData(e.currentTarget);
        const email = String(form.get('email'));
        const password = String(form.get('password'));

        setLoading(true);
        const { error } = await authClient.signIn.email({ email, password, callbackURL: '/' });
        setLoading(false);

        if (error) return setError(error.message || 'ইমেইল বা পাসওয়ার্ড ঠিক নয়');
        router.push('/');
    };

    return (
        <section className="w-full py-10">
            <div className="max-w-md mx-auto px-4">
                <h1 className="text-2xl font-extrabold text-slate-900 text-center">সাইন ইন</h1>
                <p className="text-xs text-slate-500 text-center mt-1 mb-6">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>

                <div className="bg-white border border-emerald-100 rounded-3xl shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">ইমেইল</label>
                            <input name="email" type="email" required placeholder="you@example.com" className={input} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">পাসওয়ার্ড</label>
                            <input name="password" type="password" required placeholder="কমপক্ষে ৮ অক্ষর" className={input} />
                        </div>

                        {error && <p className="text-xs text-red-600">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-700 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-lg py-2.5 text-sm shadow-md transition-colors"
                        >
                            {loading ? 'অপেক্ষা করুন...' : 'সাইন ইন'}
                        </button>
                    </form>

                    <SocialButtons />

                    <p className="text-xs text-slate-600 text-center mt-5">
                        অ্যাকাউন্ট নেই?{' '}
                        <Link href="/signup" className="text-emerald-700 font-semibold hover:underline">
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                <p className="text-center mt-5">
                    <Link href="/" className="text-xs text-slate-500 hover:text-emerald-700">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </p>
            </div>
        </section>
    );
}