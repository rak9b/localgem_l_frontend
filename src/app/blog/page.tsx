'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { MOCK_POSTS } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function Blog() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Travel Journal</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Stories, tips, and guides from our community of local experts.
                    </p>
                </div>

                {/* Featured Post */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl overflow-hidden shadow-xl mb-16 group cursor-pointer h-[500px]"
                >
                    <img
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                        alt="Featured"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                        <Badge className="w-fit mb-4 bg-rose-600 text-white border-none">Editor's Pick</Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Ultimate Guide to Sustainable Travel in 2025</h2>
                        <p className="text-gray-200 text-lg mb-6 max-w-2xl line-clamp-2">
                            How to explore the world responsibly, support local communities, and leave a positive impact on the places you visit.
                        </p>
                        <div className="flex items-center text-gray-300 text-sm gap-6">
                            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> Oct 20, 2023</span>
                            <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> 8 min read</span>
                        </div>
                    </div>
                </motion.div>

                {/* Post Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_POSTS.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 group hover:shadow-xl transition-all duration-300"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-white/90 dark:bg-slate-900/90 backdrop-blur text-rose-600 dark:text-rose-400 shadow-sm">
                                        {post.category}
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">By {post.author}</span>
                                    <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20 p-0">
                                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
