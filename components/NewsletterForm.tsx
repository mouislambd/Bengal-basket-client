"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await api.post("/api/newsletter", { email });
            setMessage(res.data.message || "Subscribed successfully!");
            setStatus("success");
            setEmail("");
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Subscription failed");
            setStatus("error");
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 justify-center"
            >
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-5 py-3 rounded-lg flex-1 max-w-sm focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-emerald-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition disabled:opacity-50"
                >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
            </form>
            {message && (
                <p
                    className={`mt-3 text-sm font-medium ${status === "success" ? "text-emerald-950" : "text-red-700"
                        }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
}