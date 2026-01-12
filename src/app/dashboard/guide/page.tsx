'use client';

import React from 'react';
import { MOCK_GUIDE_STATS } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, DollarSign, Star, Users, Briefcase, TrendingUp, Clock } from 'lucide-react';

export default function GuideDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Guide Portal</h1>
                            <Badge className="bg-rose-100 text-rose-700 border-none">Pro Guide</Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">Manage your tours and earnings</p>
                    </div>
                    <Button className="bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800">
                        Create New Tour
                    </Button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600">
                                <DollarSign className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-green-600 flex items-center">+12% <TrendingUp className="w-3 h-3 ml-1" /></span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">${MOCK_GUIDE_STATS.totalEarnings.toLocaleString()}</h3>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                                <Briefcase className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tours Completed</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{MOCK_GUIDE_STATS.totalTours}</h3>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-yellow-600">
                                <Star className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{MOCK_GUIDE_STATS.rating}</h3>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Guests</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">842</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upcoming Schedule */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Schedule</h2>
                        <div className="space-y-6">
                            {MOCK_GUIDE_STATS.upcomingTours.map((tour) => (
                                <div key={tour.id} className="flex items-center justify-between pb-6 border-b border-gray-50 dark:border-slate-800 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gray-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center text-center">
                                            <span className="text-xs font-bold text-gray-500 uppercase">{tour.date.split(' ')[0]}</span>
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">{tour.date.split(' ')[1].replace(',', '')}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{tour.title}</h4>
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <Clock className="w-3 h-3 mr-1" /> {tour.time}
                                                <span className="mx-2">•</span>
                                                <Users className="w-3 h-3 mr-1" /> {tour.guests} Guests
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-bold text-green-600">+${tour.earnings}</span>
                                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-900">Manage</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Reviews</h2>
                            <Button variant="ghost" size="sm" className="text-rose-600">View All</Button>
                        </div>
                        <div className="space-y-6">
                            {MOCK_GUIDE_STATS.recentReviews.map((review) => (
                                <div key={review.id} className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-xs">
                                                {review.user.charAt(0)}
                                            </div>
                                            <span className="font-bold text-gray-900 dark:text-white text-sm">{review.user}</span>
                                        </div>
                                        <span className="text-xs text-gray-400">{review.date}</span>
                                    </div>
                                    <div className="flex text-yellow-500 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">&quot;{review.comment}&quot;</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
