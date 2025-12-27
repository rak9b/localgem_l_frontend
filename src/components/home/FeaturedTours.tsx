'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { TourCard } from '@/components/tours/TourCard';
import { useGetToursQuery } from '@/redux/api/tourApi';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const FeaturedTours = () => {
    const { data: toursData, isLoading } = useGetToursQuery({ sortBy: 'reviewCount', sortOrder: 'desc', limit: 4 });
    const featuredTours = toursData?.data || [];

    return (
        <section className="py-24 bg-gray-50 dark:bg-slate-900/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Curated Experiences</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl">Highly rated tours hand-picked for their authenticity and local charm.</p>
                    </div>
                    <Link href="/explore" className="group flex items-center text-rose-600 dark:text-rose-400 font-semibold hover:text-rose-700 dark:hover:text-rose-300 transition-colors">
                        View all tours
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {isLoading ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="h-[400px] bg-white dark:bg-slate-900 rounded-3xl animate-pulse border border-gray-100 dark:border-slate-800 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
                            </div>
                        ))
                    ) : (
                        featuredTours.map((tour) => (
                            <motion.div key={tour.id} variants={itemVariants}>
                                <TourCard tour={tour} />
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
        </section>
    );
};
