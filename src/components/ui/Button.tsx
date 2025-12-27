import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    children,
    disabled,
    ...props
}) => {
    const variants = {
        primary: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
        secondary: 'bg-teal-500 text-white hover:bg-teal-600 shadow-sm',
        outline: 'border-2 border-gray-200 bg-transparent hover:bg-gray-50 text-gray-900 dark:text-gray-100 dark:border-slate-700',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    const sizes = {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 py-2 rounded-lg',
        lg: 'h-12 px-6 text-lg rounded-xl',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center font-medium transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};
