'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    // null মানে ব্যবহারকারী এখনো কিছু লেখেনি, তখন session-এর নাম দেখাবে
    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

    // লগইন না থাকলে সাইন ইন পেজে পাঠায়
    useEffect(() => {
        if (!isPending && !session) router.push('/signin');
    }, [isPending, session, router]);

    if (isPending || !session) {
        return <p className="text-center text-sm text-slate-500 py-20">লোড হচ্ছে...</p>;
    }

    const { image, email } = session.user;
    const nameValue = name ?? session.user.name;

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        const { error } = await authClient.updateUser({ name: nameValue });
        setLoading(false);
        setMsg(
            error
                ? { type: 'err', text: error.message || 'আপডেট করা যায়নি' }
                : { type: 'ok', text: 'প্রোফাইল আপডেট হয়েছে' }
        );
    };

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/');
                    router.refresh();
                },
            },
        });
    };

    return (
        <section className="w-full py-10">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-2xl font-extrabold text-slate-900">আমার প্রোফাইল</h1>
                <p className="text-xs text-slate-500 mb-6">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>


                <div className="bg-white border border-emerald-100 rounded-3xl shadow-sm p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        {image ? (

                            <Image
                                src={image}
                                alt={session.user.name}
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-xl object-cover"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <span className="w-16 h-16 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-2xl font-bold">
                                {session.user.name?.charAt(0).toUpperCase()}
                            </span>
                        )}
                        <div className="min-w-0">
                            <h2 className="text-lg font-semibold text-slate-900 truncate">{session.user.name}</h2>
                            <p className="text-sm text-slate-600 truncate">{email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="shrink-0 border border-red-400 text-red-600 hover:bg-red-50 rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors"
                    >
                        ↩ সাইন আউট
                    </button>
                </div>


                <div className="bg-white border border-emerald-100 rounded-3xl shadow-sm p-6 mt-4">
                    <h3 className="font-bold text-slate-900 mb-5">তথ্য</h3>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">নাম</label>
                            <input
                                type="text"
                                required
                                value={nameValue}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                        </div>

                        {msg && (
                            <p className={`text-xs ${msg.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
                                {msg.text}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-700 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-lg py-2.5 text-sm shadow-md transition-colors"
                        >
                            {loading ? 'অপেক্ষা করুন...' : 'আপডেট'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}