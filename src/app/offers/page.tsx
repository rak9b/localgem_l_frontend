'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Copy, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_OFFERS } from '@/data/mockData';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Offers() {
    const copyCode = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            toast.success(`Code ${code} copied to clipboard!`);
        } catch (err) {
            console.error('Clipboard action failed:', err);
            toast.error(`Could not copy automatically. Code: ${code}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-rose-100 dark:bg-rose-900/30 rounded-2xl mb-6">
                        <Tag className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Exclusive Deals</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Save on your next adventure with these limited-time offers.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {MOCK_OFFERS.map((offer, idx) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800 flex flex-col md:flex-row group"
                        >
                            <div className="md:w-2/5 relative overflow-hidden">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
                                <div className="absolute bottom-4 left-4 text-white font-bold text-lg md:hidden">
                                    {offer.discountType === 'PERCENTAGE' ? `${offer.discountAmount}% OFF` : `$${offer.discountAmount} OFF`}
                                </div>
                            </div>

                            <div className="p-8 md:w-3/5 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${offer.color === 'rose' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
                                            offer.color === 'indigo' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
                                                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        }`}>
                                        {offer.discountType === 'PERCENTAGE' ? 'Discount' : 'Voucher'}
                                    </span>
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                        <Clock className="w-3 h-3 mr-1" /> Exp: {offer.expiryDate}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{offer.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                                    {offer.description}
                                    {offer.minSpend && <span className="block mt-1 text-xs opacity-70">*Min spend ${offer.minSpend}</span>}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 p-2 pl-4 rounded-xl border border-dashed border-gray-300 dark:border-slate-600">
                                        <span className="font-mono font-bold text-lg text-gray-800 dark:text-gray-200 tracking-widest flex-1">
                                            {offer.code}
                                        </span>
                                        <Button
                                            size="sm"
                                            onClick={() => copyCode(offer.code)}
                                            className="bg-white dark:bg-slate-700 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-600 hover:bg-gray-50"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <Link href="/explore" className="block mt-4">
                                        <Button variant="ghost" className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20">
                                            Use Now <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Section */}
                <div className="mt-20 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Never Miss a Deal</h2>
                        <p className="text-indigo-100 mb-8">
                            Subscribe to our newsletter and get exclusive offers delivered straight to your inbox.
                        </p>
                        <div className="flex gap-2 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold px-6">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
