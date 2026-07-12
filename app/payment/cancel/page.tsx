"use client";

import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";

export default function PaymentCancelPage() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <FiAlertCircle className="text-amber-500 text-6xl mb-4" />
            <h1 className="text-2xl font-bold text-emerald-950 mb-2">Payment Cancelled</h1>
            <p className="text-gray-600 mb-6">Tumi payment cancel korecho।</p>
            <Link
                href="/"
                className="bg-emerald-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
            >
                Home-e Fire Jao
            </Link>
        </div>
    );
}