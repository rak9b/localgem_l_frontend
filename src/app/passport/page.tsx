'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Globe, Award, Map, Plane } from 'lucide-react';
import { MOCK_PASSPORT_STAMPS } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Passport() {
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950 p-4">
                <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-6">
                    <Globe className="w-10 h-10 text-rose-600 dark:text-rose-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Digital Passport</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
                    Log in to view your travel achievements, collected stamps, and global rank.
                </p>
                <Link href="/login">
                    <Button size="lg" className="bg-rose-600 hover:bg-rose-700">Log In to Access</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 pt-24 pb-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Travel Passport 🛂</h1>
                    <p className="text-gray-600 dark:text-gray-400">Collect stamps, earn badges, and track your journey around the world.</p>
                </div>

                {/* Passport Booklet Effect */}
                <div className="relative perspective-1000">
                    <motion.div
                        initial={{ rotateX: 10 }}
                        animate={{ rotateX: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row bg-[#1a237e] dark:bg-[#0f172a] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#c5a059] min-h-[600px]"
                    >

                        {/* Left Page: Identity */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 relative border-b md:border-b-0 md:border-r border-white/10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                            <div className="flex justify-between items-start mb-12">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-8 h-8 text-[#c5a059]" />
                                    <span className="text-xl font-bold text-white tracking-widest">LOCALGEMS</span>
                                </div>
                                <div className="text-[#c5a059] font-mono text-sm border border-[#c5a059] px-2 py-1 rounded">
                                    NO. {user.id?.toUpperCase().padStart(8, '0')}
                                </div>
                            </div>

                            <div className="flex flex-col items-center mb-12">
                                <div className="w-40 h-40 rounded-2xl bg-white p-2 mb-6 shadow-lg rotate-1">
                                    <img src={user.avatar} alt="User" className="w-full h-full object-cover rounded-xl filter sepia-[.2]" />
                                </div>
                                <h2 className="text-3xl font-bold text-white font-serif tracking-wide">{user.name?.toUpperCase()}</h2>
                                <p className="text-[#c5a059] tracking-widest text-sm mt-2">WORLD TRAVELER</p>
                            </div>

                            <div className="grid grid-cols-2 gap-y-6 text-sm">
                                <div>
                                    <p className="text-white/50 text-xs mb-1">NATIONALITY</p>
                                    <p className="text-white font-mono">GLOBAL CITIZEN</p>
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs mb-1">DATE OF ISSUE</p>
                                    <p className="text-white font-mono">{user.joinedDate?.toUpperCase() || 'JAN 2025'}</p>
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs mb-1">TRAVEL LEVEL</p>
                                    <div className="flex items-center gap-2">
                                        <Award className="w-4 h-4 text-[#c5a059]" />
                                        <p className="text-white font-mono">EXPLORER (Lvl 3)</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs mb-1">MILES TRAVELED</p>
                                    <p className="text-white font-mono">12,450 KM</p>
                                </div>
                            </div>

                            {/* Holographic Seal */}
                            <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center opacity-50">
                                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                                    <Globe className="w-12 h-12 text-white/20" />
                                </div>
                            </div>
                        </div>

                        {/* Right Page: Stamps */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 bg-[#fdfbf7] dark:bg-[#1e293b] relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-50"></div>

                            <h3 className="text-[#1a237e] dark:text-[#94a3b8] font-bold text-center mb-8 tracking-widest border-b-2 border-[#1a237e]/10 pb-4 relative z-10">
                                VISA / ENDORSEMENTS
                            </h3>

                            <div className="grid grid-cols-2 gap-8 relative z-10">
                                {MOCK_PASSPORT_STAMPS.map((stamp) => (
                                    <motion.div
                                        key={stamp.id}
                                        initial={{ scale: 0, opacity: 0, rotate: stamp.rotation + 20 }}
                                        animate={{ scale: 1, opacity: 1, rotate: stamp.rotation }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="aspect-square border-4 border-double rounded-full flex flex-col items-center justify-center p-4 text-center mix-blend-multiply dark:mix-blend-normal"
                                        style={{
                                            borderColor: stamp.color,
                                            color: stamp.color,
                                        }}
                                    >
                                        <div className="text-[10px] font-bold tracking-widest mb-1">{stamp.country}</div>
                                        <Plane className="w-6 h-6 mb-1 opacity-80" />
                                        <div className="text-xs font-black uppercase">{stamp.city}</div>
                                        <div className="text-[9px] font-mono mt-1">{stamp.date}</div>
                                    </motion.div>
                                ))}

                                {/* Empty Slots */}
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="aspect-square border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-full flex items-center justify-center opacity-50">
                                        <span className="text-xs text-gray-300 dark:text-slate-600 font-mono">EMPTY</span>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-gray-400 font-mono">
                                PAGE 1 OF 24
                            </div>
                        </div>

                    </motion.div>
                </div>

                {/* Stats / Progress Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Map className="w-5 h-5 mr-2 text-rose-500" /> Next Milestone
                        </h3>
                        <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2.5 mb-2">
                            <div className="bg-rose-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 flex justify-between">
                            <span>Current: 3 Countries</span>
                            <span>Goal: 5 Countries</span>
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Badges Earned</h3>
                        <div className="flex gap-2">
                            <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl" title="Early Adopter">🚀</div>
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl" title="Verified Traveler">✓</div>
                            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl" title="Foodie">🍜</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-6 rounded-2xl shadow-lg text-white">
                        <h3 className="font-bold mb-2">Book your next trip!</h3>
                        <p className="text-sm opacity-90 mb-4">You're only 1 stamp away from leveling up to "Globetrotter".</p>
                        <Link href="/explore">
                            <Button size="sm" variant="secondary" className="bg-white text-rose-600 border-none hover:bg-gray-100">
                                Explore Now
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
