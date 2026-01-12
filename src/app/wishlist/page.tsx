'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { TourCard } from '@/components/tours/TourCard';
import { MOCK_TOURS } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Heart, Share2, FolderPlus, Grid, List, MapPin, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WishlistPage() {
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCollection, setSelectedCollection] = useState<string>('all');

    // Mock collections
    const collections = [
        { id: 'all', name: 'All Saved', count: wishlist.length },
        { id: 'europe', name: 'Europe Trip 2024', count: 3 },
        { id: 'foodie', name: 'Foodie Adventures', count: 2 },
        { id: 'bucket', name: 'Bucket List', count: 4 }
    ];

    // Get actual tour data from wishlist IDs
    const wishlistTours = MOCK_TOURS.filter(tour => wishlist.includes(tour.id));

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-12 h-12 text-rose-600 dark:text-rose-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Wishlist is Empty</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Start saving tours you&apos;d like to experience. You can organize them into collections and share with friends!
                        </p>
                        <Link href="/explore">
                            <Button className="bg-rose-600 hover:bg-rose-700">
                                Explore Tours
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Wishlist</h1>
                        <p className="text-gray-600 dark:text-gray-400">Your favorite experiences, all in one place. Don&apos;t let them slip away!</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2">
                            <Share2 className="w-4 h-4" /> Share List
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <FolderPlus className="w-4 h-4" /> New Collection
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar - Collections */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 sticky top-24">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Collections</h3>
                            <div className="space-y-2">
                                {collections.map((collection) => (
                                    <button
                                        key={collection.id}
                                        onClick={() => setSelectedCollection(collection.id)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${selectedCollection === collection.id
                                            ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
                                            : 'hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400'
                                            }`}
                                    >
                                        <span className="font-medium">{collection.name}</span>
                                        <Badge variant={selectedCollection === collection.id ? 'default' : 'outline'} className="text-xs">
                                            {collection.count}
                                        </Badge>
                                    </button>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Price Range</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Lowest</span>
                                        <span className="font-bold text-green-600">$45</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Highest</span>
                                        <span className="font-bold text-gray-900 dark:text-white">$120</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Average</span>
                                        <span className="font-bold text-blue-600">$75</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price Alert */}
                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                <div className="flex items-start gap-3">
                                    <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h5 className="font-bold text-sm text-gray-900 dark:text-white mb-1">Price Alerts</h5>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Get notified when prices drop</p>
                                        <Button size="sm" variant="secondary" className="w-full">Enable Alerts</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">

                        {/* View Controls */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span>Tours across <strong className="text-gray-900 dark:text-white">4 cities</strong></span>
                            </div>
                            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-xl p-1 border border-gray-100 dark:border-slate-800">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                                        ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600'
                                        : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                                        ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600'
                                        : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Tours Grid/List */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {wishlistTours.map((tour, idx) => (
                                    <motion.div
                                        key={tour.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <TourCard tour={tour} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {wishlistTours.map((tour, idx) => (
                                    <motion.div
                                        key={tour.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-4 flex gap-4 hover:shadow-md transition-shadow"
                                    >
                                        <img
                                            src={tour.images[0]}
                                            alt={tour.title}
                                            className="w-32 h-32 rounded-xl object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{tour.title}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-2">{tour.description}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span>{tour.city}</span>
                                                <span>•</span>
                                                <span>{tour.duration}</span>
                                                <span>•</span>
                                                <span className="font-bold text-gray-900 dark:text-white">${tour.price}</span>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="self-start">View</Button>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Bottom CTA */}
                        <div className="mt-12 bg-gradient-to-r from-rose-500 to-orange-500 rounded-3xl p-8 text-white text-center">
                            <h3 className="text-2xl font-bold mb-2">Ready to Book?</h3>
                            <p className="mb-6 text-white/90">Most tours offer flexible cancellation and instant confirmation</p>
                            <Button variant="secondary" className="bg-white text-rose-600 hover:bg-gray-50">
                                Start Booking
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
