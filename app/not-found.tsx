import Link from "next/link";
import { FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-6xl font-bold text-emerald-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-emerald-950 mb-3">
                Page Not Found
            </h2>
            <p className="text-gray-500 mb-8 max-w-md">
               not available or has been moved. kindly check the url or return to the homepage
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 bg-emerald-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
                >
                    <FiHome /> Go Home
                </Link>
                <Link
                    href="/foods"
                    className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                    <FiSearch /> Explore Foods
                </Link>
            </div>
        </div>
    );
}