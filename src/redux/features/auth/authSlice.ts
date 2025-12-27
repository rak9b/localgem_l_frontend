import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: any; token: string }>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            localStorage.setItem('accessToken', token);
        },
        updateUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('accessToken');
        },
    },
});

export const { setUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
