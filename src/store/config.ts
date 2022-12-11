import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from "./usersStore"
import { authReducer } from "./authStore"
import {
  DatabaseRepositoryImp
} from '_/repositories'
import {
  HttpAdapterImp
} from "_/adapters"
import { FIREBASE_COLLECTION, GITHUB_URL } from '_/constants'
import { MiddlewareOptions } from '_/types'
import { AuthServiceImp } from '_/services/authService'


const gitApi = new HttpAdapterImp(GITHUB_URL.API_BASE_URL)
const gitAuth = new HttpAdapterImp(GITHUB_URL.AUTH_BASE_URL)
const authService = new AuthServiceImp(gitApi, gitAuth)

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware<MiddlewareOptions>({
      thunk: {
        extraArgument: {
          authService,
          userDatabaseRepository: new DatabaseRepositoryImp(FIREBASE_COLLECTION.USERS)
        }
      }
    })
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch