export default function Footer() {
    return (
        <footer className="bg-slate-800 text-slate-300 py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div>
                    <h2 className="text-white font-bold text-lg mb-1">বাজার দর</h2>
                    <p className="text-sm text-slate-400">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                </div>
                <div className="text-sm text-slate-400 italic">
                    “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
                </div>
            </div>
        </footer>
    );
}