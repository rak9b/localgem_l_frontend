'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Globe, Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Hero = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.append('searchTerm', searchTerm);
        if (category) params.append('category', category);

        router.push(`/explore?${params.toString()}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <img
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                        alt="Travel Background"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white dark:to-slate-950"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-sm"
                >
                    <span className="flex h-2 w-2 rounded-full bg-rose-500 mr-2 animate-pulse"></span>
                    <span className="text-sm font-medium text-white">Discover the unseen</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1] drop-shadow-lg"
                >
                    Explore Like a <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                        Local Expert
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-200 max-w-2xl mb-12 leading-relaxed drop-shadow-md"
                >
                    Connect with passionate locals who know their city best.
                    From hidden jazz bars to secret street food alleys.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                    className="w-full max-w-4xl bg-white/70 dark:bg-slate-900/70 rounded-3xl p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/40 dark:border-slate-800/40 backdrop-blur-2xl flex flex-col md:flex-row gap-3 relative group"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-orange-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                    <div className="relative flex-1 flex items-center bg-gray-50/50 dark:bg-slate-800/50 rounded-2xl px-5 py-4 transition-all duration-300 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-rose-500/20">
                        <Search className="text-gray-400 w-5 h-5 mr-3" />
                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent w-full focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 text-lg"
                        />
                    </div>

                    <div className="relative flex-1 md:max-w-[200px] flex items-center bg-gray-50/50 dark:bg-slate-800/50 rounded-2xl px-5 py-4 transition-all duration-300 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-rose-500/20">
                        <Globe className="text-gray-400 w-5 h-5 mr-3" />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-transparent w-full focus:outline-none text-gray-900 dark:text-white text-lg appearance-none cursor-pointer"
                        >
                            <option value="">Any Category</option>
                            {['Food', 'History', 'Nature', 'Art', 'Nightlife', 'Sports'].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <Button
                        size="lg"
                        onClick={handleSearch}
                        className="relative w-full md:w-auto py-4 px-8 rounded-2xl text-lg shadow-lg shadow-rose-600/20 bg-rose-600 hover:bg-rose-700 text-white border-none min-w-[140px] transition-transform active:scale-95"
                    >
                        Search
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-12 flex flex-wrap justify-center gap-8 text-white/80 text-sm font-medium"
                >
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                        100+ Active Tours Today
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
                        Verified Local Guides
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
