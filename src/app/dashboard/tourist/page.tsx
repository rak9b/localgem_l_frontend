'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_USER_BOOKINGS, MOCK_TOURS, MOCK_PASSPORT_STAMPS } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, MapPin, Clock, Heart, Award, Plane } from 'lucide-react';
import Link from 'next/link';

export default function TouristDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Sarah! 👋</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Ready for your next adventure?</p>
                    </div>
                    <Link href="/explore">
                        <Button className="bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-500/20">
                            Find New Tours
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400">
                            <Plane className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Trips Taken</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                        <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl text-rose-600 dark:text-rose-400">
                            <Heart className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Wishlist Items</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8</h3>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-amber-600 dark:text-amber-400">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Points Earned</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2,450</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content: Bookings */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Trips</h2>
                            <div className="space-y-4">
                                {MOCK_USER_BOOKINGS.filter(b => b.status === 'UPCOMING').map((booking) => (
                                    <motion.div
                                        key={booking.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
                                    >
                                        <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                                            <img src={booking.tour.images[0]} alt={booking.tour.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-none">
                                                    Upcoming
                                                </Badge>
                                                <span className="text-sm font-bold text-gray-900 dark:text-white">${booking.totalPrice}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{booking.tour.title}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {booking.date}
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    {booking.tour.city}
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-2" />
                                                    {booking.tour.duration}
                                                </div>
                                            </div>
                                            <div className="mt-4 flex gap-3">
                                                <Button size="sm" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800">View Details</Button>
                                                <Button size="sm" variant="outline">Contact Guide</Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Past Adventures</h2>
                            <div className="space-y-4">
                                {MOCK_USER_BOOKINGS.filter(b => b.status === 'COMPLETED').map((booking) => (
                                    <div key={booking.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 flex items-center justify-between opacity-75 hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden">
                                                <img src={booking.tour.images[0]} alt={booking.tour.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{booking.tour.title}</h4>
                                                <p className="text-sm text-gray-500">{booking.date}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-rose-600">Write a Review</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Passport & Wishlist */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <Award className="w-5 h-5 mr-2 text-yellow-500" /> Travel Passport
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {MOCK_PASSPORT_STAMPS.map((stamp) => (
                                    <div
                                        key={stamp.id}
                                        className="aspect-square rounded-full border-2 border-dashed border-gray-300 dark:border-slate-700 flex flex-col items-center justify-center p-2 text-center transform hover:scale-105 transition-transform cursor-pointer"
                                        style={{ color: stamp.color, borderColor: stamp.color }}
                                    >
                                        <span className="text-xs font-bold uppercase">{stamp.city}</span>
                                        <span className="text-[10px] opacity-70">{stamp.date}</span>
                                    </div>
                                ))}
                                <div className="aspect-square rounded-full border-2 border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center text-gray-300">
                                    <span className="text-2xl font-light">+</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-rose-500 to-orange-500 p-6 rounded-3xl text-white shadow-lg">
                            <h3 className="font-bold text-lg mb-2">Upgrade to Pro</h3>
                            <p className="text-white/80 text-sm mb-4">Get exclusive deals and free cancellation on all bookings.</p>
                            <Button variant="secondary" size="sm" className="w-full bg-white text-rose-600 hover:bg-gray-50">View Plans</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
