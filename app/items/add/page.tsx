"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/api";
import Image from "next/image";
const CATEGORIES = ["Rice", "Pulses", "Spices", "Oil & Ghee", "Flour & Grains"];

export default function AddItemPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [location, setLocation] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImageToImgBB = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await res.json();
        if (!data.success) throw new Error("Image upload failed");
        return data.data.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!imageFile) {
            setError("Please select an image");
            return;
        }

        setSubmitting(true);
        try {
            setUploading(true);
            const imageUrl = await uploadImageToImgBB(imageFile);
            setUploading(false);

            await api.post("/api/food", {
                title,
                shortDescription,
                fullDescription,
                price: Number(price),
                category,
                location,
                image: imageUrl,
                rating: 0,
            });
            router.push("/items/manage");
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Failed to add item");
        } finally {
            setSubmitting(false);
        }
    };

    if (isPending || !session) {
        return <div className="text-center py-20 text-gray-500">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-emerald-950 mb-8">Add New Food Item</h1>

            {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:bg-emerald-800 file:text-white hover:file:bg-emerald-700"
                    />
                    {imagePreview && (
                        <div className="relative w-full h-48 mt-3 rounded-lg overflow-hidden">
                            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                        placeholder="e.g. Chicken Biryani"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                    <input
                        type="text"
                        required
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                        placeholder="Brief one-liner"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                    <textarea
                        required
                        rows={4}
                        value={fullDescription}
                        onChange={(e) => setFullDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                        placeholder="Detailed description"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (৳)</label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                            placeholder="250"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                        >
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                        placeholder="e.g. Dhanmondi, Dhaka"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-emerald-800 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition disabled:opacity-50"
                >
                    {submitting ? (uploading ? "Uploading image..." : "Adding...") : "Add Item"}
                </button>
            </form>
        </div>
    );
}