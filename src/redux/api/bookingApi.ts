import { baseApi } from './baseApi';

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation<any, {
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
        getMyBookings: builder.query<{ success: boolean; data: any[] }, void>({
            query: () => '/bookings/my-bookings',
            providesTags: ['Booking'],
            transformResponse: (response: { success: boolean; data: any[] }) => ({
                ...response,
                data: response.data.map(booking => ({
                    ...booking,
                    tourTitle: booking.tour?.title || 'Tour',
                    tourImage: booking.tour?.images?.[0] || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
                    touristName: booking.user?.name || 'User',
                    date: booking.bookingDate,
                    totalPrice: booking.totalAmount,
                }))
            })
        }),
    }),
});

export const { useCreateBookingMutation, useGetMyBookingsQuery } = bookingApi;
