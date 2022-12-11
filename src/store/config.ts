import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from "./usersStore"
import { authReducer } from "./authStore"
import {
  HttpRepositoryImp,
  DatabaseRepositoryImp
} from '_/repositories'
import { FIREBASE_COLLECTION, GITHUB_URL } from '_/constants'
import { MiddlewareOptions } from '_/types'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware<MiddlewareOptions>({
      thunk: {
        extraArgument: {
          gitHubApi: new HttpRepositoryImp(GITHUB_URL.API_BASE_URL),
          gitHubAuthApi: new HttpRepositoryImp(GITHUB_URL.AUTH_BASE_URL),
          userDatabaseRepository: new DatabaseRepositoryImp(FIREBASE_COLLECTION.USERS)
        }
      }
    })
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch