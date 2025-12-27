'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, CalendarCheck, MessageCircle, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: "1. Discover",
            desc: "Browse through hundreds of unique local tours. Filter by city, category, or price to find your perfect adventure.",
            color: "rose"
        },
        {
            icon: UserPlus,
            title: "2. Book",
            desc: "Secure your spot instantly. Our platform handles payments and reservations seamlessly with verified guides.",
            color: "violet"
        },
        {
            icon: MessageCircle,
            title: "3. Connect",
            desc: "Chat with your local guide to customize your itinerary or ask questions before you arrive.",
            color: "teal"
        },
        {
            icon: CalendarCheck,
            title: "4. Experience",
            desc: "Meet up and explore! Discover hidden gems and stories you'd never find in a guidebook.",
            color: "orange"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-20">

            {/* Hero */}
            <div className="max-w-4xl mx-auto px-4 text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                >
                    Travel Like a <span className="text-rose-600">Local.</span>
                </motion.h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    LocalGems connects you with passionate experts who turn a simple trip into an unforgettable journey.
                </p>
            </div>

            {/* Steps Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 dark:bg-slate-800 -z-10"></div>

                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg text-center relative group hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className={`w-16 h-16 mx-auto ${step.color === 'rose' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' :
                                        step.color === 'violet' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400' :
                                            step.color === 'teal' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' :
                                                'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                                    } rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Trust Section */}
            <div className="bg-gray-50 dark:bg-slate-900 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Safety is Our Priority</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <ShieldCheck className="w-8 h-8 text-green-500 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">Verified Guides</h4>
                                        <p className="text-gray-600 dark:text-gray-400">Every guide undergoes a strict identity and background check.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Star className="w-8 h-8 text-yellow-500 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">Authentic Reviews</h4>
                                        <p className="text-gray-600 dark:text-gray-400">Read honest feedback from verified travelers only.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <img
                                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Friends"
                                className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Ready to start your journey?</h2>
                <Link href="/explore">
                    <Button size="lg" className="px-10 h-14 text-lg rounded-full shadow-xl shadow-rose-600/20 bg-rose-600 hover:bg-rose-700">
                        Explore Tours
                    </Button>
                </Link>
            </div>
        </div>
    );
}
