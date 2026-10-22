import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppUser } from "../types";
import { getAuthErrorMessage, loginWithEmail, loginWithGoogle, logout, registerWithEmail } from "../services/authService";
import { showNotification } from "./notificationSlice";

interface AuthState {
    user: AppUser | null;
    isAuthReady: boolean;
    status: 'idle' | 'pending';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthReady: false,
    status: 'idle',
    error: null
}

export const loginThunk = createAsyncThunk<void,
    { email: string; password: string },
    { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        await loginWithEmail(email, password)
    } catch (e) {
        return rejectWithValue(getAuthErrorMessage(e))
    }
})

export const registerThunk = createAsyncThunk<void,
    { email: string; password: string },
    { rejectValue: string }
>('auth/register', async ({ email, password }, { rejectWithValue }) => {
    try {
        await registerWithEmail(email, password)
    } catch (e) {
        return rejectWithValue(getAuthErrorMessage(e))
    }
})

export const googleThunk = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/google',
    async (_, { rejectWithValue }) => {
        try {
            await loginWithGoogle();
        } catch (e) {
            return rejectWithValue(getAuthErrorMessage(e))
        }
    }
)

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    await logout();
    dispatch(showNotification({ message: 'Ви вийшли з акаунту', type: 'info' }));
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AppUser | null>) => {
            state.user = action.payload
            state.isAuthReady = true
        },
        clearAuthError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        [loginThunk, registerThunk, googleThunk].forEach((thunk) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.status = 'pending'
                    state.error = null
                })
                .addCase(thunk.fulfilled, (state) => {
                    state.status = 'idle'
                })
                .addCase(thunk.rejected, (state, action) => {
                    state.status = 'idle'
                    state.error = action.payload || null
                })
        })
    }
})

export const { setUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;