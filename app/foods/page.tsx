"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { FoodItem } from "@/types";
import FoodCard from "@/components/FoodCard";
import SkeletonCard from "@/components/SkeletonCard";
import { FiSearch } from "react-icons/fi";

const CATEGORIES = ["All", "Rice", "Pulses", "Spices", "Oil & Ghee", "Flour & Grains"];
const ITEMS_PER_PAGE = 8;

export default function FoodsPage() {
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);

    const fetchFoods = useCallback(async () => {
        setLoading(true);
        try {
            const params: Record<string, string> = {};
            if (search) params.search = search;
            if (category !== "All") params.category = category;
            if (sort) params.sort = sort;

            const res = await api.get("/api/food", { params });
            setFoods(res.data);
            setPage(1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [search, category, sort]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchFoods();
        }, 400);
        return () => clearTimeout(timer);
    }, [fetchFoods]);

    const totalPages = Math.ceil(foods.length / ITEMS_PER_PAGE);
    const paginatedFoods = foods.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-emerald-950 mb-8">Explore Foods</h1>

            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search foods..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                >
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                >
                    <option value="">Sort by</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                </select>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : paginatedFoods.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    No food items found. Try a different search or filter.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paginatedFoods.map((item) => (
                        <FoodCard key={item._id} item={item} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-9 h-9 rounded-lg font-medium ${page === i + 1
                                    ? "bg-emerald-800 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}