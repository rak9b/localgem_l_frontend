import { baseApi } from './baseApi';
import { Booking } from '@/types';

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation<{ success: boolean; data: Booking }, {
            tourId: string;
            guests: number;
            tourDate: string;
            specialRequirements?: string;
            contactPhone?: string;
            paymentMethodId?: string
        }>({
            query: (data) => ({
                url: '/bookings',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Booking'],
        }),
        getMyBookings: builder.query<{ success: boolean; data: Booking[] }, void>({
            query: () => '/bookings/my-bookings',
            providesTags: ['Booking'],
            transformResponse: (response: { success: boolean; data: (Booking & { tour?: { title: string; images: string[] }; user?: { name: string }; bookingDate: string; totalAmount: number })[] }) => ({
                ...response,
                data: response.data.map(booking => ({
                    ...booking,
                    tourTitle: booking.tourTitle || booking.tour?.title || 'Tour',
                    tourImage: booking.tourImage || booking.tour?.images?.[0] || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
                    touristName: booking.touristName || booking.user?.name || 'User',
                    date: booking.date || booking.bookingDate,
                    totalPrice: booking.totalPrice || booking.totalAmount,
                }))
            })
        }),
    }),
});

export const { useCreateBookingMutation, useGetMyBookingsQuery } = bookingApi;
