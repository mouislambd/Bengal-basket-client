export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-3xl font-bold text-emerald-950 mb-8">Privacy Policy</h1>

            <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
                <section>
                    <h2 className="font-semibold text-emerald-950 text-lg mb-2">Information We Collect</h2>
                    <p>
                        We collect information you provide directly, such as your name, email address,
                        delivery address, and payment details when you create an account or place an order.
                    </p>
                </section>
                <section>
                    <h2 className="font-semibold text-emerald-950 text-lg mb-2">How We Use Your Information</h2>
                    <p>
                        Your information is used to process orders, improve our services, communicate
                        updates, and personalize your experience on Bengal Basket.
                    </p>
                </section>
                <section>
                    <h2 className="font-semibold text-emerald-950 text-lg mb-2">Data Security</h2>
                    <p>
                        We implement industry-standard security measures to protect your personal data
                        from unauthorized access, alteration, or disclosure.
                    </p>
                </section>
                <section>
                    <h2 className="font-semibold text-emerald-950 text-lg mb-2">Third-Party Sharing</h2>
                    <p>
                        We do not sell your personal information. Data may be shared with delivery
                        partners and payment processors solely to fulfill your orders.
                    </p>
                </section>
                <section>
                    <h2 className="font-semibold text-emerald-950 text-lg mb-2">Contact Us</h2>
                    <p>
                        For any privacy-related questions, please reach out to support@bengalbasket.com.
                    </p>
                </section>
            </div>
        </div>
    );
}