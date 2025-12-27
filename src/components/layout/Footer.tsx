'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Heart, Compass, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            toast.success('Thanks for subscribing!');
            setEmail('');
        }
    };

    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-rose-500/30 transition-all duration-300">
                                <Compass className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                Local<span className="text-rose-500">Gems</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            Discover the world through the eyes of locals. Authentic experiences, unforgettable memories.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/explore" className="hover:text-rose-400 transition-colors">Explore Tours</Link></li>
                            <li><Link href="/about" className="hover:text-rose-400 transition-colors">About Us</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-rose-400 transition-colors">How it Works</Link></li>
                            <li><Link href="/register" className="hover:text-rose-400 transition-colors">Become a Guide</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-rose-400 transition-colors">Contact Us</Link></li>
                            <li><Link href="/docs" className="hover:text-rose-400 transition-colors">Developer Docs</Link></li>
                            <li><a href="#" className="hover:text-rose-400 transition-colors">Safety Guidelines</a></li>
                            <li><a href="#" className="hover:text-rose-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Newsletter</h3>
                        <p className="text-sm text-gray-400 mb-4">Subscribe for travel tips and exclusive offers.</p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                />
                            </div>
                            <Button type="submit" size="sm" className="w-full bg-rose-600 hover:bg-rose-700">
                                Subscribe <ArrowRight className="w-3 h-3 ml-2" />
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">© 2025 LocalGems Inc. All rights reserved.</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mt-4 md:mt-0">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-rose-500 fill-current animate-pulse" />
                        <span>for travelers everywhere</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
