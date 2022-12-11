import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from "./usersStore"
import { authReducer } from "./authStore"
import { DatabaseRepositoryImp } from '_/repositories'
import { HttpAdapterImp, LocationAdapterImp } from "_/adapters"
import { FIREBASE_COLLECTION, GITHUB_URL } from '_/constants'
import { MiddlewareOptions } from '_/types'
import { AuthServiceImp } from '_/services/authService'
import { UserServiceImp } from '_/services/userService'


const gitApi = new HttpAdapterImp(GITHUB_URL.API_BASE_URL)
const gitAuth = new HttpAdapterImp(GITHUB_URL.AUTH_BASE_URL)
const authService = new AuthServiceImp(gitApi, gitAuth)

const locationAdatper = new LocationAdapterImp()
const userDatabaseRepository = new DatabaseRepositoryImp(FIREBASE_COLLECTION.USERS)
const userService = new UserServiceImp(locationAdatper, userDatabaseRepository)

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
          userService
        }
      }
    })
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch