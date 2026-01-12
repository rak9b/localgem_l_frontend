import { baseApi } from '../api/baseApi';
import { User } from '@/types';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<{ success: boolean; data: User }, void>({
            query: () => '/users/me',
            providesTags: ['User'],
        }),
        updateProfile: builder.mutation<{ success: boolean; data: User }, Partial<User>>({
            query: (data) => ({
                url: '/users/me',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        getAdminStats: builder.query<{
            success: boolean;
            data: {
                totalUsers: number;
                totalTours: number;
                totalBookings: number;
                totalRevenue: number;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                recentActivities: any[] // We'll keep any for now unless we have a specific Activity type
            }
        }, void>({
            query: () => '/users/admin/stats',
            providesTags: ['User'],
        }),
        getAllUsers: builder.query<{ success: boolean; data: User[] }, void>({
            query: () => '/users',
            providesTags: ['User'],
        }),
    }),
});

export const {
    useGetMeQuery,
    useUpdateProfileMutation,
    useGetAdminStatsQuery,
    useGetAllUsersQuery
} = userApi;
