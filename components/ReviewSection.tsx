"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Review } from "@/types";
import { useSession } from "@/lib/auth-client";
import { FiStar } from "react-icons/fi";

export default function ReviewSection({ foodItemId }: { foodItemId: string }) {
    const { data: session } = useSession();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchReviews = async () => {
        try {
            const res = await api.get(`/api/reviews/${foodItemId}`);
            setReviews(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [foodItemId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setSubmitting(true);
        try {
            await api.post("/api/reviews", {
                foodItem: foodItemId,
                rating,
                comment,
            });
            setComment("");
            setRating(5);
            fetchReviews();
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold text-emerald-950 mb-6">Reviews & Ratings</h2>

            {session ? (
                <form onSubmit={handleSubmit} className="bg-gray-50 p-5 rounded-xl mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <button
                                type="button"
                                key={n}
                                onClick={() => setRating(n)}
                                className={n <= rating ? "text-amber-500" : "text-gray-300"}
                            >
                                <FiStar size={20} fill={n <= rating ? "currentColor" : "none"} />
                            </button>
                        ))}
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience..."
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-emerald-800 text-white px-5 py-2 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50"
                    >
                        {submitting ? "Posting..." : "Post Review"}
                    </button>
                </form>
            ) : (
                <p className="text-gray-500 mb-8">Please login to leave a review.</p>
            )}

            {loading ? (
                <p className="text-gray-500">Loading reviews...</p>
            ) : reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            ) : (
                <div className="space-y-4">
                    {reviews.map((r) => (
                        <div key={r._id} className="border-b pb-4">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-emerald-950">{r.userName}</span>
                                <span className="flex items-center gap-1 text-amber-500 text-sm">
                                    <FiStar fill="currentColor" /> {r.rating}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm">{r.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}