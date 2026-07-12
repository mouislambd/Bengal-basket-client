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
    user: string;
    items: OrderItem[];
    totalPrice: number;
    status: string;
    paymentStatus: string;
    deliveryAddress: string;
    createdAt: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);

    const fetchOrders = () => {
        api
            .get("/api/orders")
            .then((res) => setOrders(res.data))
            .catch(() => setOrders([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const markDelivered = async (orderId: string) => {
        setUpdating(orderId);
        try {
            await api.patch(`/api/orders/${orderId}/status`, {
                status: "delivered",
            });
            fetchOrders();
        } catch {
            alert("Update failed");
        } finally {
            setUpdating(null);
        }
    };

    if (loading) {
        return <div className="max-w-6xl mx-auto px-4 py-10">Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-2xl font-bold text-emerald-950 mb-6">
                Manage Orders (Admin)
            </h1>

            {orders.length === 0 ? (
                <p className="text-gray-500">Kono order nai।</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-sm text-gray-600">
                                <th className="p-3">User</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Payment</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Address</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-t border-gray-100 text-sm"
                                >
                                    <td className="p-3">{order.user}</td>
                                    <td className="p-3 font-medium">
                                        ৳{order.totalPrice}
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${order.paymentStatus === "paid"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${order.status === "delivered"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-amber-100 text-amber-700"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{order.deliveryAddress}</td>
                                    <td className="p-3">
                                        {order.status !== "delivered" && (
                                            <button
                                                onClick={() => markDelivered(order._id)}
                                                disabled={updating === order._id}
                                                className="bg-emerald-800 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
                                            >
                                                {updating === order._id
                                                    ? "..."
                                                    : "Mark Delivered"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}