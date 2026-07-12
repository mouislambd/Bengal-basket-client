"use client";

import { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-3xl font-bold text-emerald-950 mb-3 text-center">Contact Us</h1>
            <p className="text-gray-600 text-center mb-12">
                Have a question or feedback? We&apos;d love to hear from you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="flex items-start gap-3">
                        <FiMail className="text-emerald-800 mt-1" size={20} />
                        <div>
                            <h3 className="font-semibold text-emerald-950">Email</h3>
                            <p className="text-gray-600 text-sm">support@bengalbasket.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FiPhone className="text-emerald-800 mt-1" size={20} />
                        <div>
                            <h3 className="font-semibold text-emerald-950">Phone</h3>
                            <p className="text-gray-600 text-sm">+880 1873242151</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FiMapPin className="text-emerald-800 mt-1" size={20} />
                        <div>
                            <h3 className="font-semibold text-emerald-950">Address</h3>
                            <p className="text-gray-600 text-sm">Dinajpur, Rangpur Division, Bangladesh</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="md:col-span-2">
                    {sent && (
                        <div className="bg-emerald-50 text-emerald-800 text-sm p-3 rounded-md mb-4">
                            Thank you! Your message has been sent.
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                required
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-emerald-800 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}