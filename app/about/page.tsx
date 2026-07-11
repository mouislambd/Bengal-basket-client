import { FiTruck, FiHeart, FiUsers, FiAward } from "react-icons/fi";

export default function AboutPage() {
    return (
        <div>
            {/* Hero */}
            <section className="bg-emerald-900 text-white py-20 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Bengal Basket</h1>
                <p className="text-emerald-50/90 max-w-2xl mx-auto">
                    Bringing the authentic taste and quality of Dinajpur&apos;s farms directly to your kitchen.
                </p>
            </section>

            {/* Story */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold text-emerald-950 mb-6">Our Story</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                    Bengal Basket started with a simple idea: connect the rich agricultural
                    heritage of Dinajpur with families across Bangladesh who deserve fresh,
                    authentic, and chemical-free groceries. From fragrant Kataribhog rice to
                    hand-ground turmeric, every product on our platform is sourced with care.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    We work directly with local farmers and small producers, cutting out
                    middlemen so that quality stays high and prices stay fair — for both our
                    customers and the growers who make it all possible.
                </p>
            </section>

            {/* Values */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-emerald-950 mb-12">What We Stand For</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { icon: <FiHeart />, title: "Authenticity", desc: "Genuine products sourced directly from Dinajpur" },
                            { icon: <FiTruck />, title: "Freshness", desc: "Fast delivery to keep quality intact" },
                            { icon: <FiUsers />, title: "Community", desc: "Supporting local farmers and producers" },
                            { icon: <FiAward />, title: "Quality", desc: "Every product handpicked and verified" },
                        ].map((v, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center h-[170px] flex flex-col items-center justify-center">
                                <div className="text-3xl text-amber-600 mb-3">{v.icon}</div>
                                <h3 className="font-semibold text-emerald-950 mb-2">{v.title}</h3>
                                <p className="text-sm text-gray-500">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}