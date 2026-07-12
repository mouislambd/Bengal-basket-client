import { FoodItem } from "@/types";
import Image from "next/image";
import { FiStar, FiMapPin, FiClock } from "react-icons/fi";
import { notFound } from "next/navigation";
import ReviewSection from "@/components/ReviewSection";
import BuyNowButton from "@/components/BuyNowButton";
import RelatedItems from "@/components/RelatedItems";

async function getFoodItem(id: string): Promise<FoodItem | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

export default async function FoodDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const item = await getFoodItem(id);

    if (!item) notFound();

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Image */}
                <div className="relative w-full h-96 rounded-xl overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>

                {/* Info */}
                <div>
                    <h1 className="text-3xl font-bold text-emerald-950 mb-2">{item.title}</h1>
                    <p className="text-gray-600 mb-4">{item.shortDescription}</p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                            <FiStar className="text-amber-500" /> {item.rating.toFixed(1)}
                        </span>
                        <span className="flex items-center gap-1">
                            <FiMapPin /> {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <FiClock /> 30-45 min
                        </span>
                    </div>

                    <div className="text-3xl font-bold text-emerald-800 mb-6">৳{item.price}</div>

                    <BuyNowButton item={item} />

                    <div className="mt-8 border-t pt-6">
                        <h2 className="font-semibold text-lg mb-2 text-emerald-950">Description</h2>
                        <p className="text-gray-600">{item.fullDescription}</p>
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <h2 className="font-semibold text-lg mb-2 text-emerald-950">Key Information</h2>
                        <ul className="text-gray-600 space-y-1 text-sm">
                            <li>Category: {item.category}</li>
                            <li>Location: {item.location}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <RelatedItems category={item.category} currentId={item._id} />
            <ReviewSection foodItemId={item._id} />
        </div>
    );
}