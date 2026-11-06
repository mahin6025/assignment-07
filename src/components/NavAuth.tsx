'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

const NavAuth = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();


    if (isPending) return <div className="h-10 w-28" />;

    // লগইন নেই
    if (!session) {
        return (
            <div className="flex items-center space-x-5">
                <Link href="/signin" className="text-sm font-medium text-slate-800 hover:text-emerald-700">
                    সাইন ইন
                </Link>
                <Link
                    href="/signup"
                    className="bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    const { name, image } = session.user;

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
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-emerald-700"
            >
                {image ? (
                    <Image
                        src={image}
                        alt={name || 'Profile picture'}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <span className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-sm font-bold">
                        {name?.charAt(0).toUpperCase()}
                    </span>
                )}
                <span className="text-sm font-medium">{name?.split(' ')[0]}</span>
                <span className="text-[10px]">▾</span>
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu bg-white text-slate-800 rounded-xl border border-emerald-100 shadow-md w-44 p-2 mt-2 z-50"
            >
                <li>
                    <Link href="/profile">আমার প্রোফাইল</Link>
                </li>
                <li>
                    <button onClick={handleSignOut} className="text-red-600">
                        সাইন আউট
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default NavAuth;