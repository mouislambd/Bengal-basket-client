"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import { FoodItem } from "@/types";
import api from "@/lib/api";

export default function RelatedItems({
    category,
    currentId,
}: {
    category: string;
    currentId: string;
}) {
    const [items, setItems] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get("/api/food", { params: { category } })
            .then((res) => {
                const filtered = (res.data as FoodItem[])
                    .filter((item) => item._id !== currentId)
                    .slice(0, 4);
                setItems(filtered);
            })
            .catch(() => setItems([]))
            .finally(() => setLoading(false));
    }, [category, currentId]);

    if (loading || items.length === 0) return null;

    return (
        <div className="mt-12 border-t pt-8">
            <h2 className="text-xl font-bold text-emerald-950 mb-6">
                Related Items
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {items.map((item) => (
                    <Link
                        key={item._id}
                        href={`/foods/${item._id}`}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
                    >
                        <div className="relative w-full h-32">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-medium text-sm text-emerald-950 line-clamp-1">
                                {item.title}
                            </h3>
                            <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    <FiStar className="text-amber-500" />
                                    {item.rating.toFixed(1)}
                                </span>
                                <span className="font-semibold text-emerald-800">
                                    ৳{item.price}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}