'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Heart } from 'lucide-react';
import { MOCK_STORIES } from '@/data/mockData';
import { Story } from '@/types';

export const StoryRail: React.FC = () => {
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);

    return (
        <>
            {/* Horizontal Rail */}
            <div className="w-full overflow-x-auto no-scrollbar py-6">
                <div className="flex space-x-6 px-4 md:px-0">
                    {/* Add Story Button (Mock) */}
                    <div className="flex flex-col items-center space-y-2 cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 border-2 border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-center group-hover:border-rose-500 transition-colors">
                            <span className="text-2xl text-gray-400 group-hover:text-rose-500">+</span>
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Add Story</span>
                    </div>

                    {MOCK_STORIES.map((story) => (
                        <div
                            key={story.id}
                            className="flex flex-col items-center space-y-2 cursor-pointer group"
                            onClick={() => setSelectedStory(story)}
                        >
                            <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 group-hover:scale-105 transition-transform duration-300">
                                <div className="bg-white dark:bg-slate-950 p-[2px] rounded-full">
                                    <img
                                        src={story.guideAvatar}
                                        alt={story.guideName}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                </div>
                            </div>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{story.guideName}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Full Screen Story Modal */}
            <AnimatePresence>
                {selectedStory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center"
                        onClick={() => setSelectedStory(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-md h-[80vh] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Story Image */}
                            <img
                                src={selectedStory.image}
                                alt="Story"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>

                            {/* Progress Bar (Static for now) */}
                            <div className="absolute top-4 left-4 right-4 flex gap-1">
                                <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 5, ease: "linear" }}
                                        className="h-full bg-white"
                                        onAnimationComplete={() => setSelectedStory(null)} // Auto close
                                    />
                                </div>
                            </div>

                            {/* Header */}
                            <div className="absolute top-8 left-4 right-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={selectedStory.guideAvatar} className="w-10 h-10 rounded-full border-2 border-white" alt="" />
                                    <div>
                                        <p className="text-white font-bold text-sm">{selectedStory.guideName}</p>
                                        <p className="text-white/70 text-xs flex items-center">
                                            <Clock className="w-3 h-3 mr-1" /> {selectedStory.timestamp}
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedStory(null)} className="text-white/80 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Footer Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge text={selectedStory.location} />
                                </div>
                                <p className="text-white text-lg font-medium mb-4">{selectedStory.caption}</p>

                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Send a message..."
                                        className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 backdrop-blur-md"
                                    />
                                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                                        <Heart className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Badge = ({ text }: { text: string }) => (
    <div className="flex items-center bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
        <MapPin className="w-3 h-3 mr-1 text-rose-500" />
        {text}
    </div>
);
