'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

const destinations = [
    { city: "Tokyo", country: "Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", guides: 120 },
    { city: "Rome", country: "Italy", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", guides: 85 },
    { city: "New York", country: "USA", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", guides: 200 }
];

export const DestinationsGrid = () => {
    const router = useRouter();

    const handleCityClick = (city: string) => {
        router.push(`/explore?city=${encodeURIComponent(city)}`);
    };

    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Popular Destinations</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Trending cities where our guides are waiting for you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {destinations.map((dest, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            onClick={() => handleCityClick(dest.city)}
                            className="relative h-96 rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
                        >
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10"></div>
                            <img src={dest.img} alt={dest.city} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute bottom-8 left-8 z-20 text-white">
                                <h3 className="text-4xl font-bold mb-2">{dest.city}</h3>
                                <p className="text-lg opacity-90 mb-3">{dest.country}</p>
                                <p className="flex items-center text-sm font-medium bg-white/20 backdrop-blur-md inline-flex px-3 py-1 rounded-full border border-white/20">
                                    <Users className="w-4 h-4 mr-2" /> {dest.guides} Local Guides
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
