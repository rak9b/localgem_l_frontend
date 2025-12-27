'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MapPin, Camera, Send, Image, Smile, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';

export default function SocialFeedPage() {
    const [showCreatePost, setShowCreatePost] = useState(false);

    const posts = [
        {
            id: 1,
            user: {
                name: 'Emma Rodriguez',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                badge: 'Explorer',
                location: 'Barcelona, Spain'
            },
            tour: 'Tapas & Wine Experience',
            location: 'Barcelona, Spain',
            date: '2 hours ago',
            images: [
                'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
                'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800'
            ],
            caption: 'Just finished the most incredible tapas tour! 🍷 Our guide Maria showed us hidden bars locals actually go to. The patatas bravas at El Rincón were life-changing! Already planning my next trip back. #FoodieHeaven',
            likes: 124,
            comments: 18,
            trending: true
        },
        {
            id: 2,
            user: {
                name: 'James Carter',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
                badge: 'Adventurer',
                location: 'Tokyo, Japan'
            },
            tour: 'Hidden Temples Walk',
            location: 'Kyoto, Japan',
            date: '5 hours ago',
            images: [
                'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800'
            ],
            caption: '🏯 Found this secret temple garden our guide Yuki knew about. Zero tourists, just pure zen. These are the moments LocalGems was made for.',
            likes: 89,
            comments: 12
        },
        {
            id: 3,
            user: {
                name: 'Sofia Martinez',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
                badge: 'Culture Lover',
                location: 'Paris, France'
            },
            tour: 'Midnight in Montmartre',
            location: 'Paris, France',
            date: '1 day ago',
            images: [
                'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
                'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
                'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800'
            ],
            caption: 'Walking the cobblestone streets of Montmartre at sunset with our guide Pierre was pure magic ✨ He shared stories about the artists who lived here that you won\'t find in any guidebook. Truly unforgettable!',
            likes: 203,
            comments: 31,
            trending: true
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Travel Stories</h1>
                        <p className="text-gray-600 dark:text-gray-400">Share your adventures with the community</p>
                    </div>
                    <Button
                        onClick={() => setShowCreatePost(!showCreatePost)}
                        className="bg-rose-600 hover:bg-rose-700 gap-2"
                    >
                        <Camera className="w-4 h-4" /> Share Story
                    </Button>
                </div>

                {/* Create Post */}
                {showCreatePost && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-slate-800 mb-6"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                                alt="You"
                                className="w-12 h-12 rounded-full"
                            />
                            <Textarea
                                placeholder="Share your travel story... Where did you go? What made it special?"
                                className="flex-1 min-h-[100px]"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <Image className="w-4 h-4" /> Photos
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <MapPin className="w-4 h-4" /> Location
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <Smile className="w-4 h-4" /> Feeling
                                </Button>
                            </div>
                            <Button className="bg-rose-600 hover:bg-rose-700 gap-2">
                                <Send className="w-4 h-4" /> Post
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Trending Tag */}
                <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
                    <div className="flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/20 rounded-full text-rose-600 dark:text-rose-400 font-medium text-sm whitespace-nowrap">
                        <TrendingUp className="w-4 h-4" /> Trending
                    </div>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition whitespace-nowrap">
                        #FoodTours
                    </button>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition whitespace-nowrap">
                        #HiddenGems
                    </button>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition whitespace-nowrap">
                        #CultureTrips
                    </button>
                </div>

                {/* Posts Feed */}
                <div className="space-y-6">
                    {posts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden"
                        >
                            {/* Post Header */}
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={post.user.avatar}
                                        alt={post.user.name}
                                        className="w-12 h-12 rounded-full ring-2 ring-rose-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900"
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-900 dark:text-white">{post.user.name}</span>
                                            <Badge variant="default" className="text-xs">{post.user.badge}</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <MapPin className="w-3 h-3" />
                                            <span>{post.location}</span>
                                            <span>•</span>
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </div>
                                {post.trending && (
                                    <Badge className="bg-rose-100 text-rose-600 border-none gap-1">
                                        <TrendingUp className="w-3 h-3" /> Trending
                                    </Badge>
                                )}
                            </div>

                            {/* Post Images */}
                            <div className={`grid ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2'} gap-1`}>
                                {post.images.slice(0, 3).map((img, i) => (
                                    <div
                                        key={i}
                                        className={`${post.images.length === 3 && i === 0 ? 'col-span-2' : ''} aspect-square overflow-hidden relative group cursor-pointer`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Post ${i + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {post.images.length > 3 && i === 2 && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-2xl font-bold">
                                                +{post.images.length - 3}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Post Caption */}
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-rose-600 transition">
                                            <Heart className="w-5 h-5" />
                                            <span className="font-medium">{post.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition">
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="font-medium">{post.comments}</span>
                                        </button>
                                    </div>
                                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 transition">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <span className="font-bold text-gray-900 dark:text-white mr-2">{post.user.name}</span>
                                    {post.caption}
                                </p>
                                {post.tour && (
                                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        <span>Reviewed: <span className="text-rose-600 dark:text-rose-400 font-medium">{post.tour}</span></span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More */}
                <div className="mt-8 text-center">
                    <Button variant="outline" className="w-full md:w-auto">
                        Load More Stories
                    </Button>
                </div>
            </div>
        </div>
    );
}
