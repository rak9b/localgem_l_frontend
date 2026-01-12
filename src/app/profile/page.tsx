'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Camera, MapPin, Mail, Phone, Globe, Calendar, Edit2, Save, X, Award, Heart, Star } from 'lucide-react';
import { MOCK_USER_BOOKINGS, MOCK_PASSPORT_STAMPS } from '@/data/mockData';

export default function ProfilePage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || 'Sarah Jenkins',
        email: user?.email || 'sarah@tourist.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        bio: 'Adventure seeker and culture enthusiast. Love exploring hidden gems and meeting locals around the world!',
        languages: 'English, Spanish',
        website: 'sarahtravels.com'
    });

    const stats = {
        tripsCompleted: MOCK_USER_BOOKINGS.filter(b => b.status === 'COMPLETED').length,
        citiesVisited: MOCK_PASSPORT_STAMPS.length,
        reviewsWritten: 8,
        wishlistItems: 12
    };

    const handleSave = () => {
        // TODO: API call to update profile
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Cover Image */}
                <div className="relative h-64 rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-rose-500 to-orange-500">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200')] bg-cover bg-center opacity-30" />
                    <button className="absolute bottom-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
                        <Camera className="w-5 h-5" />
                    </button>
                </div>

                {/* Profile Header */}
                <div className="relative -mt-20 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-950 bg-gray-200 overflow-hidden shadow-xl">
                                <img
                                    src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256'}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-rose-600 rounded-full text-white hover:bg-rose-700 transition-colors shadow-lg">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formData.name}</h1>
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {formData.location}
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                        className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-gray-900 dark:bg-white dark:text-gray-900"}
                                    >
                                        {isEditing ? (
                                            <><Save className="w-4 h-4 mr-2" /> Save</>
                                        ) : (
                                            <><Edit2 className="w-4 h-4 mr-2" /> Edit Profile</>
                                        )}
                                    </Button>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.tripsCompleted}</div>
                                        <div className="text-xs text-gray-500">Trips</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.citiesVisited}</div>
                                        <div className="text-xs text-gray-500">Cities</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.reviewsWritten}</div>
                                        <div className="text-xs text-gray-500">Reviews</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.wishlistItems}</div>
                                        <div className="text-xs text-gray-500">Saved</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* About Section */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">About</h2>
                            {isEditing ? (
                                <Textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={4}
                                    className="w-full"
                                />
                            ) : (
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{formData.bio}</p>
                            )}
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-gray-400 mr-4" />
                                    {isEditing ? (
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="flex-1"
                                        />
                                    ) : (
                                        <span className="text-gray-600 dark:text-gray-300">{formData.email}</span>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-gray-400 mr-4" />
                                    {isEditing ? (
                                        <Input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="flex-1"
                                        />
                                    ) : (
                                        <span className="text-gray-600 dark:text-gray-300">{formData.phone}</span>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <Globe className="w-5 h-5 text-gray-400 mr-4" />
                                    {isEditing ? (
                                        <Input
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            className="flex-1"
                                            placeholder="yourwebsite.com"
                                        />
                                    ) : (
                                        <a href={`https://${formData.website}`} target="_blank" rel="noopener noreferrer" className={"text-rose-600 hover:underline"}>
                                            {formData.website}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Travel Passport */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Travel Passport</h2>
                                <Badge className="bg-yellow-100 text-yellow-700 border-none">
                                    <Award className="w-3 h-3 mr-1" /> Explorer
                                </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {MOCK_PASSPORT_STAMPS.map((stamp) => (
                                    <motion.div
                                        key={stamp.id}
                                        whileHover={{ scale: 1.05, rotate: 0 }}
                                        style={{ rotate: stamp.rotation, borderColor: stamp.color, color: stamp.color }}
                                        className="aspect-square rounded-full border-2 border-dashed flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-all"
                                    >
                                        <span className="text-xs font-bold uppercase">{stamp.city}</span>
                                        <span className="text-[10px] opacity-70">{stamp.date}</span>
                                    </motion.div>
                                ))}
                                <div className="aspect-square rounded-full border-2 border-dashed border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-300 text-2xl">
                                    +
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">

                        {/* Languages */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Languages</h3>
                            {isEditing ? (
                                <Input
                                    value={formData.languages}
                                    onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                                    placeholder="English, Spanish, ..."
                                />
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {formData.languages.split(',').map((lang, i) => (
                                        <Badge key={i} variant="outline" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                                            {lang.trim()}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Member Since */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Member Since</h3>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <Calendar className="w-5 h-5 mr-3 text-rose-500" />
                                June 2023
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Achievements</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl">
                                    <Award className="w-6 h-6 text-yellow-600" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-sm text-gray-900 dark:text-white">Early Explorer</div>
                                        <div className="text-xs text-gray-500">Joined in 2023</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                                    <Star className="w-6 h-6 text-blue-600" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-sm text-gray-900 dark:text-white">Super Reviewer</div>
                                        <div className="text-xs text-gray-500">8 reviews written</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-900/10 rounded-xl">
                                    <Heart className="w-6 h-6 text-rose-600" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-sm text-gray-900 dark:text-white">Local Favorite</div>
                                        <div className="text-xs text-gray-500">12 tours wishlisted</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
