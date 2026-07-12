"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface OrderItem {
    foodItem: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    items: OrderItem[];
    totalPrice: number;
    status: string;
    paymentStatus: string;
    deliveryAddress: string;
    createdAt: string;
}

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get("/api/orders/my-orders")
            .then((res) => setOrders(res.data))
            .catch(() => setOrders([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="max-w-4xl mx-auto px-4 py-10">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-2xl font-bold text-emerald-950 mb-6">My Orders</h1>

            {orders.length === 0 ? (
                <p className="text-gray-500">Kono order nai ekhono।</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white border border-gray-200 rounded-xl p-5"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-lg font-bold text-emerald-800">
                                        ৳{order.totalPrice}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-medium ${order.status === "delivered"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : order.status === "confirmed"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : order.status === "cancelled"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-amber-100 text-amber-700"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-medium ${order.paymentStatus === "paid"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {order.paymentStatus}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">
                                Delivery: {order.deliveryAddress}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {order.items.length} item(s)
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}