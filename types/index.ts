export interface FoodItem {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    location: string;
    addedBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    _id: string;
    foodItem: string;
    user: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}