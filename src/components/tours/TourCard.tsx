'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Star, Clock, Heart, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Tour } from '@/types';
import { useCurrency } from '@/hooks/useCurrency';
import { motion } from 'framer-motion';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/lib/utils';

interface TourCardProps {
    tour: Tour;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { formatPrice } = useCurrency();
    const isWishlisted = isInWishlist(tour.id);

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(tour.id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
                <img
                    src={tour.images[0]}
                    alt={tour.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Top Actions */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button
                        onClick={handleToggleWishlist}
                        className={cn(
                            "p-2 backdrop-blur-md rounded-full transition-all duration-300 transform active:scale-90 shadow-sm",
                            isWishlisted
                                ? "bg-rose-500 text-white hover:bg-rose-600"
                                : "bg-white/30 text-white hover:bg-white/50 border border-white/20"
                        )}
                    >
                        <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
                    </button>
                </div>

                <div className="absolute top-4 left-4 z-20">
                    <Badge className="shadow-lg backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-rose-600 dark:text-rose-400 font-semibold border-none">
                        {tour.category}
                    </Badge>
                </div>

                {/* View Details Button (On Hover) */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-[2px]">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Link href={`/tours/${tour.id}`}>
                            <span className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold shadow-xl hover:bg-rose-50 hover:text-rose-600 transition-colors">
                                View Details
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 z-20 translate-y-0 group-hover:translate-y-2 opacity-100 group-hover:opacity-0 transition-all duration-300">
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-gray-900 dark:text-white shadow-xl border border-white/20">
                        {formatPrice(tour.price)} <span className="text-xs font-normal text-gray-500">/ person</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col relative bg-white dark:bg-slate-900 z-20">
                <div className="flex items-center justify-between mb-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-rose-500" />
                        {tour.city}, {tour.country}
                    </div>
                    <div className="flex items-center text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-full">
                        <Star className="w-3.5 h-3.5 mr-1 fill-current" />
                        <span className="text-gray-700 dark:text-gray-300 font-bold">{tour.rating}</span>
                        <span className="text-gray-400 ml-1 font-normal">({tour.reviewCount})</span>
                    </div>
                </div>

                <Link href={`/tours/${tour.id}`} className="block mb-3 group/title">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover/title:text-rose-600 dark:group-hover/title:text-rose-400 transition-colors line-clamp-2 leading-tight">
                        {tour.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 border-b border-gray-50 dark:border-slate-800 pb-4">
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5 text-rose-400" />
                        {tour.duration}
                    </div>
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1.5 text-rose-400" />
                        Max {tour.maxGroupSize}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-3 group/guide cursor-pointer">
                        <img
                            src={tour.guideAvatar}
                            alt={tour.guideName}
                            className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800 shadow-sm group-hover/guide:border-rose-200 transition-colors object-cover"
                        />
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Guide</span>
                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-200 group-hover/guide:text-rose-500 transition-colors">{tour.guideName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
