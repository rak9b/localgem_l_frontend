'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, MapPin, List } from 'lucide-react';
import { TourCard } from '@/components/tours/TourCard';
import { ToursMap } from '@/components/tours/ToursMap';
import { ExploreFilters } from '@/components/tours/ExploreFilters';
import { TourGrid } from '@/components/tours/TourGrid';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MOCK_TOURS, CATEGORIES } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useGetToursQuery } from '@/redux/api/tourApi';
import { cn } from '@/lib/utils';
import { ITourFilters } from '@/types';

export default function Explore() {
    // Filter State
    const [filters, setFilters] = useState<ITourFilters>({
        page: 1,
        limit: 9,
        search: '',
        category: '',
        city: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'rating',
        sortOrder: 'desc'
    });

    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [showFilters, setShowFilters] = useState(false);

    // Debounce search query to avoid too many API calls
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);
        return () => clearTimeout(timer);
    }, [filters]);

    // Fetch Tours with filters
    const { data: toursData, isLoading, isError, refetch } = useGetToursQuery(debouncedFilters);

    // Graceful Fallback to Mock Data if API fails or is empty (for demo purposes)
    const shouldUseMock = isError;
    const tours = shouldUseMock ? MOCK_TOURS : (toursData?.data || []);
    const meta = toursData?.meta;

    // Extract unique cities for filter (optional optimization: fetch efficiently from backend)
    const cities = useMemo(() => {
        const sourceTours = shouldUseMock ? MOCK_TOURS : tours;
        const uniqueCities = Array.from(new Set(sourceTours.map(t => t.city))).sort();
        return uniqueCities.length > 0 ? uniqueCities : ['Rome', 'Tokyo', 'Paris', 'Barcelona', 'New York', 'London', 'Dubai'];
    }, [tours, shouldUseMock]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        let sortBy = 'rating';
        let sortOrder: 'asc' | 'desc' = 'desc';

        if (value === 'price-low') { sortBy = 'price'; sortOrder = 'asc'; }
        if (value === 'price-high') { sortBy = 'price'; sortOrder = 'desc'; }
        if (value === 'newest') { sortBy = 'createdAt'; sortOrder = 'desc'; }

        setFilters(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Explore Tours</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Find unique experiences in {meta?.total || 0} destinations.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        {/* Sort Dropdown */}
                        <div className="hidden md:block">
                            <select
                                className="h-10 pl-3 pr-8 rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:ring-rose-500"
                                onChange={handleSortChange}
                            >
                                <option value="rating">Top Rated</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>

                        {/* View Toggle */}
                        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-gray-200 dark:border-slate-800">
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    viewMode === 'list'
                                        ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                <List className="w-4 h-4 mr-2" /> List
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={cn(
                                    "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    viewMode === 'map'
                                        ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                <MapPin className="w-4 h-4 mr-2" /> Map
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Toggle */}
                <div className="md:hidden mb-6">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                </div>

                {shouldUseMock && (
                    <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-amber-900 dark:text-amber-200 text-sm">Demo Mode Active</h4>
                            <p className="text-sm text-amber-700 dark:text-amber-300/80">
                                We couldn't connect to the live database, so we're showing you some sample tours instead.
                                Features like filtering and sorting might be limited.
                            </p>
                        </div>
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar Filters */}
                    <div className={cn("lg:block", showFilters ? "block" : "hidden")}>
                        <ExploreFilters
                            filters={filters}
                            setFilters={setFilters}
                            cities={cities}
                        />
                    </div>

                    {/* Results Area */}
                    <div className="lg:col-span-3">
                        <TourGrid
                            tours={tours}
                            isLoading={isLoading && !shouldUseMock}
                            isError={isError && !shouldUseMock}
                            viewMode={viewMode}
                            onRetry={refetch}
                            onResetFilters={() => setFilters({ ...filters, search: '', category: '', city: '', minPrice: '', maxPrice: '', page: 1 })}
                        />

                        {/* Pagination (Simple) */}
                        {meta && meta.totalPage > 1 && (
                            <div className="mt-12 flex justify-center gap-2">
                                <Button
                                    variant="outline"
                                    disabled={filters.page === 1}
                                    onClick={() => setFilters((prev: ITourFilters) => ({ ...prev, page: (prev.page || 1) - 1 }))}
                                >
                                    Previous
                                </Button>
                                <span className="flex items-center px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Page {filters.page} of {meta.totalPage}
                                </span>
                                <Button
                                    variant="outline"
                                    disabled={(filters.page || 1) >= meta.totalPage}
                                    onClick={() => setFilters((prev: ITourFilters) => ({ ...prev, page: (prev.page || 1) + 1 }))}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
