'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { Upload, DollarSign, MapPin, Clock } from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCreateTourMutation } from '@/redux/api/tourApi';
import { useRouter } from 'next/navigation';

const tourSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    itinerary: z.string().min(10, "Please provide a basic itinerary"),
    category: z.string().min(1, "Please select a category"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    duration: z.string().min(1, "Duration is required"),
    meetingPoint: z.string().min(5, "Meeting point is required"),
    price: z.coerce.number().min(0, "Price cannot be negative"),
    maxGroupSize: z.coerce.number().min(1, "Must have at least 1 guest"),
});

type TourForm = z.infer<typeof tourSchema>;

export default function CreateTour() {
    const router = useRouter();
    const [createTour, { isLoading: isCreating }] = useCreateTourMutation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(tourSchema),
    });

    const onSubmit = async (data: TourForm) => {
        try {
            const res = await createTour(data).unwrap();
            if (res.success) {
                toast.success("Tour Listed Successfully!");
                router.push(`/tours/${res.data.id}`);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to list tour");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">List a New Tour</h1>
                    <p className="text-gray-600 dark:text-gray-400">Share your local knowledge with the world.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8"
                >
                    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">

                        {/* Image Upload Placeholder */}
                        <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                            <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8" />
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Upload Tour Photos</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Showcase the experience. PNG, JPG up to 5MB</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <Label htmlFor="title">Tour Title</Label>
                                <Input id="title" placeholder="e.g., Hidden Jazz Bars of Rome" {...register('title')} />
                                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="What makes this tour unique?" className="h-32" {...register('description')} />
                                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="itinerary">Itinerary</Label>
                                <Textarea id="itinerary" placeholder="Stop 1 -> Stop 2 -> Stop 3" className="h-20" {...register('itinerary')} />
                                {errors.itinerary && <p className="mt-1 text-xs text-red-500">{errors.itinerary.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="category" className="mb-2 block">Category</Label>
                                    <Select
                                        id="category"
                                        options={CATEGORIES.filter(c => c !== 'All').map(c => ({ label: c, value: c }))}
                                        placeholder="Select a category"
                                        {...register('category')}
                                        error={errors.category?.message}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="duration">Duration</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input id="duration" className="pl-10" placeholder="e.g. 3 hours" {...register('duration')} />
                                    </div>
                                    {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="e.g. Rome" {...register('city')} />
                                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" placeholder="e.g. Italy" {...register('country')} />
                                    {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="meetingPoint">Meeting Point</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input id="meetingPoint" className="pl-10" placeholder="Address or Landmark" {...register('meetingPoint')} />
                                </div>
                                {errors.meetingPoint && <p className="mt-1 text-xs text-red-500">{errors.meetingPoint.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="maxGroupSize">Max Group Size</Label>
                                    <Input id="maxGroupSize" type="number" placeholder="8" {...register('maxGroupSize', { valueAsNumber: true })} />
                                    {errors.maxGroupSize && <p className="mt-1 text-xs text-red-500">{errors.maxGroupSize.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="price">Price per Person ($)</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input id="price" type="number" className="pl-10" placeholder="0.00" {...register('price', { valueAsNumber: true })} />
                                    </div>
                                    {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <Button type="button" variant="ghost">Cancel</Button>
                            <Button type="submit" isLoading={isCreating} className="px-8 bg-rose-600 hover:bg-rose-700">Publish Tour</Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
