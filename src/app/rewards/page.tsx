'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Share2, Award, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import toast from 'react-hot-toast';

export default function Rewards() {
    const { user } = useSelector((state: RootState) => state.auth);
    const referralCode = user ? `GEM-${user.name?.substring(0, 3).toUpperCase()}-2025` : 'LOGIN-TO-VIEW';

    const copyCode = async () => {
        try {
            if (referralCode === 'LOGIN-TO-VIEW') {
                toast.error('Please log in to see your referral code.');
                return;
            }
            await navigator.clipboard.writeText(referralCode);
            toast.success('Referral code copied to clipboard!');
        } catch (err) {
            console.error('Clipboard action failed:', err);
            toast.error('Could not copy automatically. Please copy manually.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-gradient-to-br from-rose-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/30"
                    >
                        <Gift className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Invite Friends, Earn Travel Credit</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Give your friends $25 off their first trip, and you'll get $25 when they book.
                    </p>
                </div>

                {/* Code Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800 text-center mb-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500"></div>

                    <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-4">Your Unique Referral Code</h3>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                        <div className="bg-gray-100 dark:bg-slate-800 px-8 py-4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700">
                            <span className="text-3xl font-mono font-bold text-gray-900 dark:text-white tracking-wider">{referralCode}</span>
                        </div>
                        <Button onClick={copyCode} className="h-16 w-16 rounded-2xl bg-rose-600 hover:bg-rose-700 shrink-0">
                            <Copy className="w-6 h-6" />
                        </Button>
                    </div>

                    <div className="flex justify-center flex-wrap gap-4">
                        <Button variant="outline" className="gap-2">
                            <Share2 className="w-4 h-4" /> Share on Twitter
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Share2 className="w-4 h-4" /> Share on Facebook
                        </Button>
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        { label: "Friends Invited", value: "12", icon: Users, color: "blue" },
                        { label: "Successful Bookings", value: "4", icon: Award, color: "green" },
                        { label: "Credit Earned", value: "$100", icon: DollarSign, color: "rose" },
                    ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                                <div className={`w-12 h-12 ${stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                                        stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                                            'bg-rose-100 dark:bg-rose-900/30 text-rose-600'
                                    } rounded-xl flex items-center justify-center`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* How it works */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">How it works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "1. Send Invitation", desc: "Share your referral link with friends via email or social media." },
                            { title: "2. Friend Books", desc: "They sign up and book their first tour using your code." },
                            { title: "3. You Earn", desc: "Once they complete their trip, $25 credit is added to your account." },
                        ].map((step, idx) => (
                            <div key={idx} className="text-center">
                                <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-gray-900 dark:text-white">
                                    {idx + 1}
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
