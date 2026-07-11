import Link from "next/link";
import Image from "next/image";
import { FiStar, FiMapPin } from "react-icons/fi";
import { FoodItem } from "@/types";

export default function FoodCard({ item }: { item: FoodItem }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col h-full">
            <div className="relative w-full h-48">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-emerald-950 mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">{item.shortDescription}</p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                        <FiStar className="text-amber-500" /> {item.rating.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1">
                        <FiMapPin /> {item.location}
                    </span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-emerald-800">৳{item.price}</span>
                    <Link
                        href={`/foods/${item._id}`}
                        className="bg-emerald-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}