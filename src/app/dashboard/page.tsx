'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Users, ShieldCheck, Map, Crown } from 'lucide-react';

export default function DashboardLanding() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 pt-20">
            <div className="max-w-6xl w-full text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Select Your Experience</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed">
                    Welcome to LocalGems! For this demo, we've enabled all role-based dashboards.
                    Choose a persona to explore the distinct features we've built for each user type.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

                    {/* Tourist Persona */}
                    <Link href="/dashboard/tourist" className="group">
                        <div className="h-full bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-blue-500/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Map className="w-32 h-32 text-blue-500" />
                            </div>
                            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white relative z-10">
                                <Map className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Tourist</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
                                Explore the world. Manage your bookings, save your favorite spots, and track your travel history.
                            </p>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 h-12 rounded-xl text-base">
                                View Tourist Dashboard
                            </Button>
                        </div>
                    </Link>

                    {/* Guide Persona */}
                    <Link href="/dashboard/guide" className="group">
                        <div className="h-full bg-slate-900 dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl border border-slate-800 dark:border-slate-700 hover:border-rose-500/50 dark:hover:border-rose-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-rose-500/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Crown className="w-32 h-32 text-rose-500" />
                            </div>
                            <div className="w-20 h-20 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-rose-500 transition-colors group-hover:bg-rose-500 group-hover:text-white relative z-10">
                                <Crown className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Local Guide</h3>
                            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                Share your passion. Manage upcoming tours, track your earnings, and connect with travelers.
                            </p>
                            <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20 h-12 rounded-xl text-base">
                                View Guide Dashboard
                            </Button>
                        </div>
                    </Link>

                    {/* Admin Persona */}
                    <Link href="/dashboard/admin" className="group">
                        <div className="h-full bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-slate-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-purple-500/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <ShieldCheck className="w-32 h-32 text-purple-500" />
                            </div>
                            <div className="w-20 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white relative z-10">
                                <ShieldCheck className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Admin</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
                                Control center. Monitor system health, manage users, and oversee platform performance.
                            </p>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 h-12 rounded-xl text-base">
                                View Admin Dashboard
                            </Button>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}
