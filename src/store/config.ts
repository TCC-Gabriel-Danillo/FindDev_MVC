import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { usersReducer } from "./usersStore"
import { authReducer } from "./authStore"
import { DatabaseRepositoryImp } from '_/repositories'
import { HttpAdapterImp, LocationAdapterImp } from "_/adapters"
import { FIREBASE_COLLECTION, GITHUB_URL } from '_/constants'
import { MiddlewareOptions } from '_/types'
import { AuthServiceImp } from '_/services/authService'
import { UserServiceImp } from '_/services/userService'
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';



// PERSISTOR
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth']
}

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// SERVICES
const gitApi = new HttpAdapterImp(GITHUB_URL.API_BASE_URL)
const gitAuth = new HttpAdapterImp(GITHUB_URL.AUTH_BASE_URL)
const authService = new AuthServiceImp(gitApi, gitAuth)

const locationAdatper = new LocationAdapterImp()
const userDatabaseRepository = new DatabaseRepositoryImp(FIREBASE_COLLECTION.USERS)
const userService = new UserServiceImp(locationAdatper, userDatabaseRepository)


// STORE
export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware<MiddlewareOptions>({
      serializableCheck: false,
      thunk: {
        extraArgument: {
          authService,
          userService
        }
      }
    })
  },
})
export const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch