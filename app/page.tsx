import Link from "next/link";
import { FiTruck, FiClock, FiShield, FiStar } from "react-icons/fi";
import FoodCard from "@/components/FoodCard";
import { FoodItem } from "@/types";
import NewsletterForm from "@/components/NewsletterForm";

async function getPopularProducts(): Promise<FoodItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.slice(0, 8);
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const products = await getPopularProducts();
  

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative h-[65vh] bg-emerald-900 flex items-center justify-center text-white overflow-hidden">
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Fresh Groceries from Dinajpur, Delivered to You
          </h1>
          <p className="text-lg md:text-xl mb-8 text-emerald-50/90">
            Premium quality rice, pulses, spices and daily essentials  sourced directly from Dinajpur&apos;s finest farms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/foods"
              className="bg-amber-500 text-emerald-950 px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              href="/register"
              className="border-2 border-white/80 px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-900 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Popular Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-950">Popular Products</h2>
            <Link href="/foods" className="text-emerald-800 font-medium hover:text-emerald-600">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <FoodCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </section>
      {/* 2. Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-emerald-950">Why Choose Bengal Basket?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <FiTruck />, title: "Fast Delivery", desc: "Get your groceries delivered within 24 hours" },
            { icon: <FiClock />, title: "Always Fresh", desc: "Sourced directly from Dinajpur farms" },
            { icon: <FiShield />, title: "Secure Payment", desc: "Safe and secure online payment options" },
            { icon: <FiStar />, title: "Top Quality", desc: "Handpicked, premium quality products" },
          ].map((f, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition h-[180px] flex flex-col items-center justify-center">
              <div className="text-3xl text-amber-600 mb-3">{f.icon}</div>
              <h3 className="font-semibold mb-2 text-emerald-950">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-emerald-950">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { name: "Rice", emoji: "🌾" },
            { name: "Pulses", emoji: "🫘" },
            { name: "Spices", emoji: "🌶️" },
            { name: "Oil & Ghee", emoji: "🫙" },
            { name: "Flour & Grains", emoji: "🌽" },
          ].map((c) => (
            <Link
              key={c.name}
              href={`/foods?category=${encodeURIComponent(c.name)}`}
              className="bg-emerald-50 hover:bg-emerald-100 rounded-xl p-6 text-center transition h-[130px] flex flex-col items-center justify-center"
            >
              <span className="text-4xl mb-2">{c.emoji}</span>
              <span className="font-semibold text-emerald-950 text-sm">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      

      {/* 5. Stats Section */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "5000+", label: "Happy Customers" },
            { number: "200+", label: "Products" },
            { number: "50+", label: "Cities Served" },
            { number: "4.8", label: "Average Rating" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-4xl font-bold text-amber-400 mb-2">{s.number}</div>
              <div className="text-emerald-100 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-emerald-950">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Rafiq Ahmed", text: "The rice quality is amazing, exactly like what we get in Dinajpur. Highly recommend!" },
            { name: "Nusrat Jahan", text: "Fresh spices and fast delivery. My monthly grocery shopping is now so easy." },
            { name: "Kamal Hossain", text: "Great prices and authentic products. My go-to shop for daily essentials." },
          ].map((t, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 h-[180px] flex flex-col justify-between">
              <p className="text-gray-600 text-sm italic">&quot;{t.text}&quot;</p>
              <p className="font-semibold text-emerald-950 mt-4">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      
      {/* 7. Newsletter / CTA Section */}
      <section className="bg-amber-500 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-emerald-950 mb-3">Get Exclusive Offers</h2>
          <p className="text-emerald-900 mb-8">
            Subscribe to our newsletter and get 10% off your first order.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}