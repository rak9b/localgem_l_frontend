'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mb-8 text-rose-200 dark:text-rose-900/20"
            >
                <Compass className="w-64 h-64 opacity-50" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-lg"
            >
                <h1 className="text-9xl font-black text-gray-900 dark:text-white mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Looks like you're lost.</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link href="/">
                    <Button size="lg" className="bg-rose-600 hover:bg-rose-700 shadow-xl shadow-rose-500/20 px-8">
                        <Home className="w-5 h-5 mr-2" /> Return Home
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
