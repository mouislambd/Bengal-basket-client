"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const tranId = searchParams.get("tran_id");

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <FiCheckCircle className="text-emerald-600 text-6xl mb-4" />
            <h1 className="text-2xl font-bold text-emerald-950 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-1">Tomar order confirm hoyeche.</p>
            {tranId && (
                <p className="text-sm text-gray-400 mb-6">Transaction ID: {tranId}</p>
            )}
            <Link
                href="/"
                className="bg-emerald-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
            >
                Home-e Fire Jao
            </Link>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-[70vh]" />}>
            <SuccessContent />
        </Suspense>
    );
}