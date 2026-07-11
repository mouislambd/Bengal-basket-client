import Link from "next/link";
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-3">🍛 Bengal Basket</h3>
                    <p className="text-sm">
                        Authentic Bengali food delivered fresh to your doorstep.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
                        <li><Link href="/foods" className="hover:text-orange-400">Explore Foods</Link></li>
                        <li><Link href="/about" className="hover:text-orange-400">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-orange-400">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-3">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/help" className="hover:text-orange-400">Help Center</Link></li>
                        <li><Link href="/privacy" className="hover:text-orange-400">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-orange-400">Terms & Conditions</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-3">Contact Us</h4>
                    <p className="flex items-center gap-2 text-sm mb-2">
                        <FiMail /> support@bengalbasket.com
                    </p>
                    <p className="flex items-center gap-2 text-sm mb-4">
                        <FiPhone /> +880 1332-502004
                    </p>
                    <div className="flex gap-4 text-xl">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">
                            <FiFacebook />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">
                            <FiInstagram />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">
                            <FiTwitter />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 py-4 text-center text-sm">
                © {new Date().getFullYear()} Bengal Basket. All rights reserved.
            </div>
        </footer>
    );
}