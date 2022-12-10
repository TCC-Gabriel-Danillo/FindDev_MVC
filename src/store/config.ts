import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from "./usersStore"
import { authReducer } from "./authStore"

export const store = configureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch