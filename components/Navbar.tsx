"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";


export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const isAdmin = session?.user?.email === "admin@gmail.com";

    const handleLogout = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <nav className="sticky top-0 z-50 bg-emerald-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-2xl font-bold">
                        🍛 Bengal Basket
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/" className="hover:text-amber-300">Home</Link>
                        <Link href="/foods" className="hover:text-amber-300">Explore Foods</Link>
                        <Link href="/about" className="hover:text-amber-300">About</Link>
                        <Link href="/contact" className="hover:text-amber-300">Contact</Link>

                        {session ? (
                            <>
                                <Link href="/my-orders" className="hover:text-amber-300">My Orders</Link>
                                {isAdmin && (
                                    <>
                                        <Link href="/items/add" className="hover:text-amber-300">Add Item</Link>
                                        <Link href="/items/manage" className="hover:text-amber-300">Manage Items</Link>
                                        <Link href="/admin/orders" className="hover:text-amber-300">Manage Orders</Link>
                                    </>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="bg-amber-500 text-emerald-950 px-4 py-1.5 rounded-md font-medium hover:bg-amber-400"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="hover:text-amber-300">Login</Link>
                                <Link
                                    href="/register"
                                    className="bg-amber-500 text-emerald-950 px-4 py-1.5 rounded-md font-medium hover:bg-amber-400"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden flex flex-col gap-3 pb-4">
                        <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link href="/foods" onClick={() => setIsOpen(false)}>Explore Foods</Link>
                        <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
                        <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

                        {session ? (
                            <>
                                <Link href="/my-orders" onClick={() => setIsOpen(false)}>My Orders</Link>
                                {isAdmin && (
                                    <>
                                        <Link href="/items/add" onClick={() => setIsOpen(false)}>Add Item</Link>
                                        <Link href="/items/manage" onClick={() => setIsOpen(false)}>Manage Items</Link>
                                        <Link href="/admin/orders" onClick={() => setIsOpen(false)}>Manage Orders</Link>
                                    </>
                                )}
                                <button onClick={handleLogout} className="text-left">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link href="/register" onClick={() => setIsOpen(false)}>Register</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}