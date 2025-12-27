'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, MapPin, Receipt, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

export default function BookingSuccess() {
    useEffect(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-32 pb-20">
            <div className="max-w-2xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                    <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                >
                    Booking Confirmed!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 dark:text-gray-400 mb-12"
                >
                    Your adventure is officially scheduled. Check your email for the full itinerary and receipt.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800 text-left mb-12"
                >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">Booking Details</h3>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
                                <MapPin className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Experience</p>
                                <p className="font-medium text-gray-900 dark:text-white">Hidden Gems of Old Dhaka</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
                                <Calendar className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Date & Time</p>
                                <p className="font-medium text-gray-900 dark:text-white">December 15, 2025 at 09:00 AM</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
                                <Receipt className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Confirmation ID</p>
                                <p className="font-mono font-medium text-rose-600 dark:text-rose-400">#GEM-9238-XK12</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/dashboard" className="w-full sm:w-auto">
                        <Button className="w-full sm:px-8 gap-2 bg-rose-600 hover:bg-rose-700">
                            Go to Dashboard <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Link href="/" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:px-8 gap-2">
                            <Home className="w-4 h-4" /> Back Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
