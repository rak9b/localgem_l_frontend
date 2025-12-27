import { baseApi } from '../api/baseApi';
import { Tour } from '@/types';

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTours: builder.query<{ success: boolean; data: Tour[]; meta?: { page: number; limit: number; total: number; totalPage: number } }, Record<string, any> | void>({
            query: (params) => ({
                url: '/tours',
                method: 'GET',
                params: params || {},
            }),
            providesTags: ['Tour'],
            transformResponse: (response: { success: boolean; data: any[]; meta?: any }) => ({
                ...response,
                data: response.data.map(tour => ({
                    ...tour,
                    guideName: tour.guide?.name || 'Local Guide',
                    guideAvatar: tour.guide?.avatar || undefined,
                    reviewCount: tour.reviews?.length || 0,
                    coordinates: tour.coordinateX && tour.coordinateY ? { x: tour.coordinateX, y: tour.coordinateY } : undefined
                }))
            })
        }),
        getSingleTour: builder.query<{ success: boolean; data: Tour }, string>({
            query: (id) => `/tours/${id}`,
            providesTags: (result, error, id) => [{ type: 'Tour', id }],
            transformResponse: (response: { success: boolean; data: any }) => ({
                ...response,
                data: {
                    ...response.data,
                    guideName: response.data.guide?.name || 'Local Guide',
                    guideAvatar: response.data.guide?.avatar || undefined,
                    reviewCount: response.data.reviews?.length || 0,
                    coordinates: response.data.coordinateX && response.data.coordinateY ? { x: response.data.coordinateX, y: response.data.coordinateY } : undefined
                }
            })
        }),
        createTour: builder.mutation<any, Partial<Tour>>({
            query: (data) => ({
                url: '/tours',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Tour'],
        }),
    }),
});

export const { useGetToursQuery, useGetSingleTourQuery, useCreateTourMutation } = tourApi;
