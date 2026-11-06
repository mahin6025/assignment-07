'use client';

import { authClient } from '@/lib/auth-client';

const SocialButtons = () => {

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",

        });
    };

    const handleGitHubSignUp = async () => {
        await authClient.signIn.social({
            provider: "github",
        });
    };

    const btn =
        'flex-1 flex items-center justify-center gap-2 border border-emerald-100 bg-white hover:bg-emerald-50 rounded-lg py-2 text-xs font-semibold text-slate-800 transition-colors';

    return (
        <>
            <div className="flex items-center gap-3 my-4">
                <span className="flex-1 h-px bg-emerald-100" />
                <span className="text-xs text-slate-500">অথবা</span>
                <span className="flex-1 h-px bg-emerald-100" />
            </div>

            <div className="flex gap-3">

                <button type="button" onClick={handleGoogleSignIn} className={btn}>
                    <svg width="16" height="16" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
                        <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
                        <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
                    </svg>
                    Google দিয়ে চালিয়ে যান
                </button>

                <button type="button" onClick={handleGitHubSignUp} className={btn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                    </svg>
                    GitHub দিয়ে চালিয়ে যান
                </button>
            </div>
        </>
    );
};

export default SocialButtons;