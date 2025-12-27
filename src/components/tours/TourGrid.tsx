import React from 'react';
import { motion } from 'framer-motion';
import { TourCard } from './TourCard';
import { ToursMap } from './ToursMap';
import { Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { Tour } from '@/types';

interface TourGridProps {
    tours: Tour[];
    isLoading: boolean;
    isError: boolean;
    viewMode: 'list' | 'map';
    onRetry: () => void;
    onResetFilters: () => void;
}

export const TourGrid = ({ tours, isLoading, isError, viewMode, onRetry, onResetFilters }: TourGridProps) => {

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <div className="h-64 rounded-3xl bg-gray-100 dark:bg-slate-800 animate-pulse" />
                        <div className="space-y-2 p-2">
                            <div className="h-4 w-3/4 rounded bg-gray-100 dark:bg-slate-800 animate-pulse" />
                            <div className="h-4 w-1/2 rounded bg-gray-100 dark:bg-slate-800 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-20 bg-rose-50 dark:bg-rose-900/10 rounded-3xl border border-rose-100 dark:border-rose-900/50">
                <div className="mx-auto w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-4">
                    <Loader2 className="w-8 h-8 text-rose-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Connecting to Server...</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                    We're having trouble reaching the database. <br />
                    <span className="text-sm opacity-75">If you are running this locally, please ensure Docker and the Database are started.</span>
                </p>
                <Button variant="outline" className="mt-6" onClick={onRetry}>
                    Retry Connection
                </Button>
            </div>
        );
    }

    if (tours.length === 0) {
        return (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No tours found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Try changing your filters or search terms.</p>
                <Button variant="secondary" className="mt-4" onClick={onResetFilters}>
                    Clear All Filters
                </Button>
            </div>
        );
    }

    if (viewMode === 'map') {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <ToursMap tours={tours} />
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
            {tours.map((tour, idx) => (
                <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                >
                    <TourCard tour={tour} />
                </motion.div>
            ))}
        </motion.div>
    );
};
