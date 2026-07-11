export default function HelpPage() {
    const faqs = [
        { q: "How long does delivery take?", a: "Most orders are delivered within 24-48 hours depending on your location." },
        { q: "What payment methods do you accept?", a: "We accept bKash, Nagad, credit/debit cards, and cash on delivery." },
        { q: "Can I return a product?", a: "Yes, unopened products can be returned within 3 days of delivery." },
        { q: "How do I track my order?", a: "You'll receive updates via email, or you can check your order status from your account." },
        { q: "Do you deliver outside Dhaka?", a: "Yes, we deliver to over 50 cities across Bangladesh." },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-3xl font-bold text-emerald-950 mb-3 text-center">Help Center</h1>
            <p className="text-gray-600 text-center mb-12">Frequently asked questions</p>

            <div className="space-y-4">
                {faqs.map((f, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                        <h3 className="font-semibold text-emerald-950 mb-2">{f.q}</h3>
                        <p className="text-gray-600 text-sm">{f.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}