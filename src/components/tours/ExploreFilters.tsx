import React from 'react';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { CATEGORIES } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ExploreFiltersProps {
    className?: string;
    filters: any;
    setFilters: (filters: any) => void;
    cities?: string[];
}

export const ExploreFilters = ({ className, filters, setFilters, cities = [] }: ExploreFiltersProps) => {

    const handleCategoryChange = (cat: string) => {
        setFilters((prev: any) => ({ ...prev, category: prev.category === cat ? '' : cat, page: 1 }));
    };

    const handleCityChange = (city: string) => {
        setFilters((prev: any) => ({ ...prev, city: prev.city === city ? '' : city, page: 1 }));
    };

    const resetFilters = () => {
        setFilters({
            page: 1, limit: 9,
            search: '', category: '', city: '',
            minPrice: '', maxPrice: '',
            sortBy: 'rating'
        });
    };

    return (
        <div className={cn("bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-slate-800 sticky top-28 self-start", className)}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50 dark:border-slate-800">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center">
                    <SlidersHorizontal className="w-5 h-5 mr-2.5 text-rose-500" /> Filters
                </h3>
                <button
                    onClick={resetFilters}
                    className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 bg-rose-50 dark:bg-rose-900/20 px-3 py-1.5 rounded-full transition-colors"
                >
                    Reset
                </button>
            </div>

            <div className="space-y-6">
                {/* Search */}
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Search</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search tours..."
                            className="pl-9 h-10 text-sm"
                            value={filters.search || ''}
                            onChange={(e) => setFilters((prev: any) => ({ ...prev, search: e.target.value, page: 1 }))}
                        />
                    </div>
                </div>

                {/* Price Range */}
                <div className="border-t border-gray-100 dark:border-slate-800 pt-6">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Price Range ($)</label>
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Min"
                            type="number"
                            className="h-9 text-sm"
                            value={filters.minPrice || ''}
                            onChange={(e) => setFilters((prev: any) => ({ ...prev, minPrice: e.target.value, page: 1 }))}
                        />
                        <span className="text-gray-400">-</span>
                        <Input
                            placeholder="Max"
                            type="number"
                            className="h-9 text-sm"
                            value={filters.maxPrice || ''}
                            onChange={(e) => setFilters((prev: any) => ({ ...prev, maxPrice: e.target.value, page: 1 }))}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="border-t border-gray-100 dark:border-slate-800 pt-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Categories</label>
                    <div className="space-y-2">
                        {CATEGORIES.map(cat => (
                            <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                                <div className={cn(
                                    "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                                    filters.category === cat
                                        ? "border-rose-600 bg-rose-600"
                                        : "border-gray-300 dark:border-slate-600 group-hover:border-rose-400"
                                )}>
                                    {filters.category === cat && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                                <span className={cn(
                                    "text-sm transition-colors",
                                    filters.category === cat ? "text-rose-600 font-medium" : "text-gray-600 dark:text-gray-400"
                                )}>
                                    {cat}
                                </span>
                                <input
                                    type="radio"
                                    name="category"
                                    className="hidden"
                                    checked={filters.category === cat}
                                    onChange={() => handleCategoryChange(cat)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Cities (Optional - could be dynamic) */}
                {cities.length > 0 && (
                    <div className="border-t border-gray-100 dark:border-slate-800 pt-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Cities</label>
                        <div className="space-y-2">
                            {cities.map(city => (
                                <label key={city} className="flex items-center space-x-2 cursor-pointer group">
                                    <div className={cn(
                                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                                        filters.city === city
                                            ? "border-rose-600 bg-rose-600 text-white"
                                            : "border-gray-300 dark:border-slate-600 group-hover:border-rose-400"
                                    )}>
                                        {filters.city === city && <MapPin className="w-2.5 h-2.5" />}
                                    </div>
                                    <span className={cn(
                                        "text-sm transition-colors",
                                        filters.city === city ? "text-rose-600 font-medium" : "text-gray-600 dark:text-gray-400"
                                    )}>
                                        {city}
                                    </span>
                                    <input
                                        type="radio"
                                        name="city"
                                        className="hidden"
                                        checked={filters.city === city}
                                        onChange={() => handleCityChange(city)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
