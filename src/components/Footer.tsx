const Footer = () => {
    return (
        <footer
            data-theme="light"
            className="w-full bg-white border-t border-emerald-100"
        >
            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-xs md:text-sm text-slate-700">
                <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </div>
        </footer>
    );
};

export default Footer;