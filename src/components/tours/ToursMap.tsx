'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ArrowRight } from 'lucide-react';
import { Tour } from '@/types';
import { useCurrency } from '@/hooks/useCurrency';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface ToursMapProps {
    tours: Tour[];
}

export const ToursMap: React.FC<ToursMapProps> = ({ tours }) => {
    const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
    const { formatPrice } = useCurrency();

    return (
        <div className="relative w-full h-[600px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            {/* Abstract Map Background */}
            <div className="absolute inset-0 opacity-40">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
                    alt="World Map"
                    className="w-full h-full object-cover filter invert dark:invert-0"
                    style={{ objectPosition: 'center 20%' }}
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-transparent to-slate-900/80 pointer-events-none"></div>

            {/* Pins */}
            {tours.map((tour) => {
                if (!tour.coordinates) return null;
                const isSelected = selectedTour?.id === tour.id;

                return (
                    <div
                        key={tour.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ left: `${tour.coordinates.x}%`, top: `${tour.coordinates.y}%` }}
                        onClick={() => setSelectedTour(tour)}
                    >
                        <div className="relative">
                            <div className={`w-4 h-4 rounded-full ${isSelected ? 'bg-rose-500' : 'bg-white'} shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-colors duration-300`}></div>
                            <div className={`absolute -inset-2 rounded-full border ${isSelected ? 'border-rose-500' : 'border-white/50'} animate-ping opacity-75`}></div>

                            {/* Tooltip on Hover */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                                {tour.city}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Selected Tour Card Overlay */}
            <AnimatePresence>
                {selectedTour && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-80 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-2xl border border-gray-100 dark:border-slate-800 z-20"
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedTour(null); }}
                            className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-500" />
                        </button>

                        <div className="flex gap-4">
                            <img
                                src={selectedTour.images[0]}
                                alt={selectedTour.title}
                                className="w-20 h-20 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{selectedTour.title}</h3>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                                    <MapPin className="w-3 h-3 mr-1" /> {selectedTour.city}
                                </div>
                                <p className="text-rose-600 dark:text-rose-400 font-bold text-sm">
                                    {formatPrice(selectedTour.price)}
                                </p>
                            </div>
                        </div>

                        <Link href={`/tours/${selectedTour.id}`} className="block mt-4">
                            <Button size="sm" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                                View Details <ArrowRight className="w-3 h-3 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-2 text-white text-xs font-mono border border-white/20">
                Interactive Map
            </div>
        </div>
    );
};
