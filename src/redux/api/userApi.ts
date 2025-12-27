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
        getAdminStats: builder.query<any, void>({
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
