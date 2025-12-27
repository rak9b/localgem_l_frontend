'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, CreditCard, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo');

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    tour: {
        id: string;
        title: string;
        price: number;
    };
    bookingDetails: {
        date: string;
        guests: number;
    };
}

function PaymentForm({ tour, bookingDetails, onClose }: Omit<PaymentModalProps, 'isOpen'>) {
    const stripe = useStripe();
    const elements = useElements();
    const [step, setStep] = useState<'guest-info' | 'payment'>('guest-info');
    const [isProcessing, setIsProcessing] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            specialRequirements: ''
        }
    });

    const [guestInfo, setGuestInfo] = useState<any>(null);

    const onGuestInfoSubmit = (data: any) => {
        setGuestInfo(data);
        setStep('payment');
    };

    const handlePayment = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            toast.error('Stripe has not loaded yet');
            return;
        }

        setIsProcessing(true);

        try {
            // Create payment intent on backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-intent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tourId: tour.id,
                    amount: tour.price * bookingDetails.guests,
                    ...guestInfo,
                    ...bookingDetails
                })
            });

            const { clientSecret } = await response.json();

            // Confirm payment
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) throw new Error('Card element not found');

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: guestInfo.fullName,
                        email: guestInfo.email,
                        phone: guestInfo.phone
                    }
                }
            });

            if (error) {
                toast.error(error.message || 'Payment failed');
            } else if (paymentIntent.status === 'succeeded') {
                toast.success('Booking confirmed! Check your email for details.');
                onClose();
                window.location.href = '/booking-success';
            }
        } catch (error: any) {
            console.error('Payment error:', error);
            toast.error('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            {step === 'guest-info' ? (
                <form onSubmit={handleSubmit(onGuestInfoSubmit)} className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Guest Information</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                                id="fullName"
                                {...register('fullName', { required: true })}
                                placeholder="John Doe"
                            />
                            {errors.fullName && <p className="text-xs text-red-500 mt-1">Name is required</p>}
                        </div>
                        <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                placeholder="john@example.com"
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">Valid email required</p>}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                            id="phone"
                            {...register('phone', { required: true })}
                            placeholder="+1 (555) 123-4567"
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">Phone is required</p>}
                    </div>

                    <div>
                        <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
                        <Textarea
                            id="specialRequirements"
                            {...register('specialRequirements')}
                            placeholder="Dietary restrictions, accessibility needs, etc."
                            className="h-24"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
                            Continue to Payment
                        </Button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handlePayment} className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Payment Details</h3>
                        <button onClick={onClose} type="button" className="text-gray-400 hover:text-gray-600 transition">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 space-y-3">
                        <h4 className="font-bold text-gray-900 dark:text-white">{tour.title}</h4>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Date:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{bookingDetails.date}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Guests:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{bookingDetails.guests}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Price per person:</span>
                            <span className="font-medium text-gray-900 dark:text-white">${tour.price}</span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-slate-700 pt-3 flex justify-between">
                            <span className="font-bold text-gray-900 dark:text-white">Total:</span>
                            <span className="font-bold text-2xl text-rose-600">${tour.price * bookingDetails.guests}</span>
                        </div>
                    </div>

                    {/* Stripe Card Element */}
                    <div>
                        <Label htmlFor="card-element">Card Information</Label>
                        <div className="mt-2 p-4 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
                            <CardElement
                                id="card-element"
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#1f2937',
                                            '::placeholder': {
                                                color: '#9ca3af'
                                            }
                                        },
                                        invalid: {
                                            color: '#ef4444'
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Lock className="w-4 h-4 text-green-600" />
                        <span>Secured by Stripe. Your payment info is encrypted.</span>
                    </div>

                    <div className="flex justify-between gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep('guest-info')}>
                            Back
                        </Button>
                        <Button
                            type="submit"
                            disabled={!stripe || isProcessing}
                            isLoading={isProcessing}
                            className="bg-rose-600 hover:bg-rose-700 gap-2"
                        >
                            <CreditCard className="w-4 h-4" />
                            {isProcessing ? 'Processing...' : `Pay $${tour.price * bookingDetails.guests}`}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default function PaymentModal({ isOpen, onClose, tour, bookingDetails }: PaymentModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 border border-gray-100 dark:border-slate-800">
                <Elements stripe={stripePromise}>
                    <PaymentForm tour={tour} bookingDetails={bookingDetails} onClose={onClose} />
                </Elements>
            </div>
        </div>
    );
}
