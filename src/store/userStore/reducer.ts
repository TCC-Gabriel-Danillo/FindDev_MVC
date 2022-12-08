import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from './types'
import { User } from '_/types'

const initialState: UserState = {
    users: [], 
    isLoading: false
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersLoading: (state) => {
            state.isLoading = true
        },
        addUsers: (state, action: PayloadAction<User[]>)  => {
            state.users = action.payload
        },
        usersLoaded: (state) => {
            state.isLoading = false
        }
    },
  })
  
export const { addUsers, usersLoaded, usersLoading } = usersSlice.actions 
export const usersReducer =  usersSlice.reducer

