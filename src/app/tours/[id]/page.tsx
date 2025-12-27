'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Calendar, MapPin, Clock, Share2, Heart, Shield, ArrowLeft, Users, CheckCircle, Globe, Star, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ToursMap } from '@/components/tours/ToursMap';
import { TourCard } from '@/components/tours/TourCard';
import { useGetToursQuery } from '@/redux/api/tourApi';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import PaymentModal from '@/components/booking/PaymentModal';
import { useGetSingleTourQuery } from '@/redux/api/tourApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { addToWishlist, removeFromWishlist } from '@/redux/features/wishlist/wishlistSlice';
import { toast } from 'react-hot-toast';
import { MOCK_TOURS } from '@/data/mockData';

export default function TourDetails() {
    const { id } = useParams() as { id: string };

    const [selectedDate, setSelectedDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    // Mock Data Fallback Logic
    const { data: tourData, isLoading, isError } = useGetSingleTourQuery(id);

    // Check if we should use mock data
    const useMock = isError || (!isLoading && !tourData?.data);

    // Find mock tour if needed
    const mockTour = useMock ? MOCK_TOURS.find(t => t.id === id) || MOCK_TOURS[0] : null;

    const tour = useMock ? mockTour : tourData?.data;

    const dispatch = useDispatch();
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const { currency, rate } = useSelector((state: RootState) => state.currency);
    const isWishlisted = wishlist.includes(id);

    const formatPrice = (price: number) => {
        const amount = price * rate;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const handleBookingClick = () => {
        if (!selectedDate) {
            toast.error('Please select a date first');
            return;
        }
        setIsPaymentOpen(true);
    };

    const handleToggleWishlist = () => {
        if (isWishlisted) {
            dispatch(removeFromWishlist(id));
            toast.success('Removed from wishlist');
        } else {
            dispatch(addToWishlist(id));
            toast.success('Added to wishlist');
        }
    };

    if (isLoading && !useMock) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-[60vh] w-full bg-gray-200 dark:bg-slate-800 rounded-3xl animate-pulse mb-8" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="h-96 bg-gray-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
                            <div className="h-40 bg-gray-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
                        </div>
                        <div className="lg:col-span-1">
                            <div className="h-96 bg-gray-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!tour) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950">
                <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tour not found</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">The tour you're looking for might have been moved or doesn't exist.</p>
                    <Link href="/explore">
                        <Button className="bg-rose-600 hover:bg-rose-700">Back to Explore</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const totalAmount = tour.price * guests * 1.1; // Including fees

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                tour={{ id, title: tour.title, price: tour.price }}
                bookingDetails={{ date: selectedDate, guests }}
            />

            {/* Hero Image */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-80"></div>
                <img
                    src={tour.images[0]}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-24 left-4 sm:left-8 z-20">
                    <Link href="/explore">
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 backdrop-blur-md">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 z-20 max-w-7xl mx-auto">
                    <Badge className="mb-4 bg-rose-600 text-white border-none">{tour.category}</Badge>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
                    >
                        {tour.title}
                    </motion.h1>
                    <div className="flex flex-wrap items-center gap-6 text-gray-200 text-sm md:text-base">
                        <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-rose-400" />
                            {tour.city}, {tour.country}
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-rose-400" />
                            {tour.duration}
                        </div>
                        <div className="flex items-center">
                            <Globe className="w-5 h-5 mr-2 text-rose-400" />
                            {tour.languages.join(', ')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo Mode Alert */}
            {useMock && (
                <div className="absolute top-24 right-4 sm:right-8 z-30 max-w-sm">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-amber-500/90 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-lg flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-bold text-sm">Demo Mode Active</p>
                            <p className="text-xs opacity-90 mt-0.5">Showing mock data because server is unreachable.</p>
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About this experience</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                                {tour.description}
                            </p>

                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Itinerary</h3>
                                <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl text-gray-700 dark:text-gray-300">
                                    {tour.itinerary}
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">What's included</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['Local Expert Guide', 'Insider Tips', 'Small Group', 'Flexible Cancellation'].map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Location / Map */}
                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Location</h3>
                                <div className="h-80 w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800">
                                    <ToursMap tours={[tour]} />
                                </div>
                                <p className="mt-4 text-sm text-gray-500 flex items-center bg-gray-50 dark:bg-slate-800/50 p-3 rounded-lg w-fit">
                                    <MapPin className="w-4 h-4 mr-2 text-rose-500" />
                                    Meeting Point: <span className="font-medium text-gray-900 dark:text-white ml-1">{tour.meetingPoint}</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Host Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-6 items-start"
                        >
                            <img
                                src={tour.guideAvatar}
                                alt={tour.guideName}
                                className="w-20 h-20 rounded-full object-cover border-4 border-gray-50 dark:border-slate-800"
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Hosted by {tour.guideName}</h3>
                                    <Badge variant="outline" className="gap-1 border-rose-200 text-rose-700 dark:border-rose-900/30 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/10">
                                        <Shield className="w-3 h-3" /> Verified Guide
                                    </Badge>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                                    "I love sharing my city's hidden gems with travelers from around the world."
                                </p>
                                <Button variant="outline" size="sm" className="hover:bg-gray-100 dark:hover:bg-slate-800">Contact Guide</Button>
                            </div>
                        </motion.div>

                        {/* Reviews Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                    <Star className="w-5 h-5 text-yellow-500 mr-2 fill-current" />
                                    {tour.rating} ({tour.reviewCount} reviews)
                                </h3>
                            </div>

                            <div className="space-y-6 mb-8">
                                {tour.reviews && tour.reviews.length > 0 ? (
                                    tour.reviews.slice(0, 3).map((review: any) => (
                                        <div key={review.id} className="pb-6 border-b border-gray-50 dark:border-slate-800 last:border-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    {review.user?.avatar ? (
                                                        <img src={review.user.avatar} alt="User" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                                                            {review.user?.name?.charAt(0) || 'U'}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-gray-900 dark:text-white">{review.user?.name || 'Traveler'}</p>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={cn("w-3 h-3", i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300")} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                "{review.comment}"
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Booking Widget */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl shadow-rose-500/10 border border-gray-100 dark:border-slate-800"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {formatPrice(tour.price)}
                                    </span>
                                    <span className="text-gray-500 text-sm ml-1">/ person</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-500">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleToggleWishlist}
                                        className={cn(
                                            "p-2 rounded-full transition-colors",
                                            isWishlisted ? "text-rose-500 bg-rose-50 dark:bg-rose-900/20" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                                        )}
                                    >
                                        <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Select Date</label>
                                    <Input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Guests</label>
                                    <div className="flex items-center border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-2">
                                        <Users className="w-4 h-4 text-gray-400 mr-3" />
                                        <select
                                            value={guests}
                                            onChange={(e) => setGuests(Number(e.target.value))}
                                            className="w-full bg-transparent focus:outline-none dark:text-white"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 space-y-2 mt-4">
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>{formatPrice(tour.price)} x {guests} guests</span>
                                        <span>{formatPrice(tour.price * guests)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>Service fee</span>
                                        <span>{formatPrice(tour.price * guests * 0.1)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-slate-700 pt-2 flex justify-between font-bold text-gray-900 dark:text-white">
                                        <span>Total</span>
                                        <span>{formatPrice(totalAmount)}</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full text-lg h-14 shadow-lg shadow-rose-600/20 bg-rose-600 hover:bg-rose-700"
                                onClick={handleBookingClick}
                            >
                                Request to Book
                            </Button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                You won't be charged yet. Free cancellation up to 24h before.
                            </p>
                        </motion.div>
                    </div>

                </div>

                {/* Similar Tours Section */}
                <div className="mt-20 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">You might also like</h2>
                    <SimilarTours city={tour.city} currentTourId={tour.id} />
                </div>
            </div>
        </div>
    );
}

// Sub-component for Similar Tours to handle its own data fetching
const SimilarTours = ({ city, currentTourId }: { city: string, currentTourId: string }) => {
    // Import hook here to avoid circular dependency issues if placed at top level with conditional logic
    const { useGetToursQuery } = require('@/redux/api/tourApi');
    const { data } = useGetToursQuery({ city, limit: 4 });
    const similarTours = data?.data?.filter((t: any) => t.id !== currentTourId).slice(0, 3) || [];

    // Import TourCard dynamically or use the one from props/context if needed
    // For simplicity, we assume TourCard is available in scope or we import it again
    const { TourCard } = require('@/components/tours/TourCard');

    if (similarTours.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarTours.map((tour: any) => (
                <TourCard key={tour.id} tour={tour} />
            ))}
        </div>
    );
};
