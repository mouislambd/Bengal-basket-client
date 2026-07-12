"use client";

import { useState } from "react";
import api from "@/lib/api";
import { FoodItem } from "@/types";

export default function BuyNowButton({ item }: { item: FoodItem }) {
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");

    const handleBuyNow = async () => {
        if (!address.trim()) {
            setError("Delivery address dite hobe");
            return;
        }
        setError("");
        setLoading(true);

        try {
            // Step 1: Create order
            const orderRes = await api.post("/api/orders", {
                items: [
                    {
                        foodItem: item._id,
                        quantity: 1,
                        price: item.price,
                    },
                ],
                totalPrice: item.price,
                deliveryAddress: address,
            });

            const orderId = orderRes.data._id || orderRes.data.order?._id;

            // Step 2: Init payment
            const paymentRes = await api.post("/api/payment/init", {
                orderId,
            });

            // Step 3: Redirect to SSLCommerz
            if (paymentRes.data.url) {
                window.location.href = paymentRes.data.url;
            } else {
                setError("Payment shuru kora jayni");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Order create korte problem hoyeche");
        } finally {
            setLoading(false);
        }
    };

    if (!showForm) {
        return (
            <button
                onClick={() => setShowForm(true)}
                className="w-full bg-amber-600 text-white py-2.5 rounded-lg font-medium hover:bg-amber-700 transition"
            >
                Buy Now
            </button>
        );
    }

    return (
        <div className="mt-4 space-y-3">
            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}
            <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Delivery address dao..."
                className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                rows={3}
            />
            <button
                onClick={handleBuyNow}
                disabled={loading}
                className="w-full bg-emerald-800 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition disabled:opacity-50"
            >
                {loading ? "Processing..." : "Confirm & Pay"}
            </button>
        </div>
    );
}