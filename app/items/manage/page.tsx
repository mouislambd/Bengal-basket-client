"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/api";
import { FoodItem } from "@/types";
import { FiTrash2, FiEye } from "react-icons/fi";

export default function ManageItemsPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [items, setItems] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    const fetchMyItems = async () => {
        try {
            const res = await api.get("/api/food/user/my-items");
            setItems(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) {
            fetchMyItems();
        }
    }, [session]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        setDeletingId(id);
        try {
            await api.delete(`/api/food/${id}`);
            setItems((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.error(error);
        } finally {
            setDeletingId(null);
        }
    };

    if (isPending || !session) {
        return <div className="text-center py-20 text-gray-500">Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-emerald-950">Manage My Items</h1>
                <Link
                    href="/items/add"
                    className="bg-emerald-800 text-white px-5 py-2 rounded-lg font-medium hover:bg-emerald-700"
                >
                    + Add New Item
                </Link>
            </div>

            {loading ? (
                <p className="text-gray-500">Loading your items...</p>
            ) : items.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    You haven&apos;t added any items yet.
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="p-4">Image</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item._id} className="border-t border-gray-100">
                                    <td className="p-4">
                                        <div className="relative w-14 h-14 rounded-lg overflow-hidden">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-emerald-950">{item.title}</td>
                                    <td className="p-4 text-gray-600">{item.category}</td>
                                    <td className="p-4 text-gray-600">৳{item.price}</td>
                                    <td className="p-4">
                                        <div className="flex gap-3">
                                            <Link
                                                href={`/foods/${item._id}`}
                                                className="text-emerald-700 hover:text-emerald-900"
                                            >
                                                <FiEye size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                disabled={deletingId === item._id}
                                                className="text-red-500 hover:text-red-700 disabled:opacity-50"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
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