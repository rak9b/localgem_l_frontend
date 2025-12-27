'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Heart, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function About() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-16">

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-rose-50 dark:bg-rose-900/10 -z-10"></div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rose-100/50 to-transparent dark:from-rose-900/20"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-1"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                We believe travel should be <span className="text-rose-600">personal.</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                LocalGems was born from a simple idea: the best travel experiences aren&apos;t found in guidebooks, but in the stories and secrets shared by the people who live there.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/explore">
                                    <Button size="lg" className="bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-500/20">
                                        Start Exploring
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="lg" variant="outline">Join our Team</Button>
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex-1 relative"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                    alt="Travel 1"
                                    className="rounded-3xl shadow-lg mt-12"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                    alt="Travel 2"
                                    className="rounded-3xl shadow-lg"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Active Guides", value: "2,500+", icon: Users },
                            { label: "Cities Covered", value: "120+", icon: Globe },
                            { label: "Happy Travelers", value: "50k+", icon: Heart },
                            { label: "5-Star Reviews", value: "15k+", icon: Award },
                        ].map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="text-center p-6 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800"
                                >
                                    <div className="w-12 h-12 mx-auto bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                                    <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-fixed opacity-20"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Mission</h2>
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                        &quot;To democratize travel by connecting curious explorers with passionate locals, fostering cultural understanding and creating economic opportunities in communities worldwide.&quot;
                    </p>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet the Team</h2>
                        <p className="text-gray-600 dark:text-gray-400">The explorers building the future of travel.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Alex Chen", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=400&h=400&q=80" },
                            { name: "Sarah Miller", role: "Head of Community", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=400&h=400&q=80" },
                            { name: "David Kim", role: "Lead Engineer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=400&h=400&q=80" },
                        ].map((member, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="group relative overflow-hidden rounded-3xl"
                            >
                                <img src={member.img} alt={member.name} className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                                    <p className="text-rose-400">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
