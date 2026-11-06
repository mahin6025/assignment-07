import Link from "next/link";

export default function NotFound() {
    return (
        <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
            <div className="text-6xl font-bold text-emerald-800">404</div>
            <h2 className="text-2xl font-bold text-slate-800">পাতাটি পাওয়া যায়নি</h2>
            <p className="text-slate-500 text-sm">আপনি যে পেজটি খুঁজছেন তা বিদ্যমান নয় বা সরানো হয়েছে।</p>
            <Link
                href="/"
                className="inline-block bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-800 transition"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}