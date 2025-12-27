'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/auth/authSlice';
import { useLoginMutation } from '@/redux/api/authApi';
import { Button } from '@/components/ui/Button';
import { AlertCircle, ArrowLeft, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [login, { isLoading: isLoginLoading }] = useLoginMutation();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        setError(null);
        try {
            const result = await login(data).unwrap();
            dispatch(setUser({ user: result.data.user, token: result.data.accessToken }));
            router.push('/dashboard');
        } catch (err: any) {
            setError(err?.data?.message || 'Login failed. Please check your credentials.');
        }
    };


    return (
        <div className="min-h-screen flex bg-white dark:bg-slate-950">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-transparent"></div>
                <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                            <Compass className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">LocalGems</span>
                    </Link>
                    <div>
                        <h2 className="text-4xl font-bold mb-6">&quot;Travel is the only thing you buy that makes you richer.&quot;</h2>
                        <p className="text-rose-100 text-lg">Join a community of explorers and local experts.</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full space-y-8"
                >
                    <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-rose-600 transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="font-medium text-rose-600 dark:text-rose-400 hover:text-rose-500">
                                Sign up for free
                            </Link>
                        </p>
                    </div>



                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    {...register('password')}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-4 flex items-center border border-red-100 dark:border-red-900/50">
                                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                                <div className="text-sm text-red-700 dark:text-red-300">
                                    {error}
                                </div>
                            </div>
                        )}

                        <div className="text-center">
                            <span className="text-xs text-gray-400 uppercase tracking-widest px-2 bg-white dark:bg-gray-950 relative z-10">LOGIN WITH EMAIL</span>
                            <div className="border-b border-gray-200 dark:border-gray-800 -mt-2"></div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-rose-600 dark:text-rose-400 hover:text-rose-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-12 text-base rounded-xl bg-rose-600 hover:bg-rose-700" isLoading={isLoginLoading}>
                            Sign in
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
