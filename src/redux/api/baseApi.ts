import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('authorization', `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Tour', 'User', 'Booking'],
    endpoints: () => ({}),
});
