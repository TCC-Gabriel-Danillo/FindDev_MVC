import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './types'
import { User } from '_/types'

const initialState: AuthState = {
    user: undefined,
    isLoading: false,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLoading: (state) => {
            state.isLoading = true
        },
        addUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload
            state.isAuthenticated = !!action.payload
        },
        removeUser: (state) => {
            state.user = undefined
            state.isAuthenticated = false
        },
        authLoaded: (state) => {
            state.isLoading = false
        }
    },
})

export const { authLoaded, authLoading, addUser, removeUser } = authSlice.actions
export const authReducer = authSlice.reducer

