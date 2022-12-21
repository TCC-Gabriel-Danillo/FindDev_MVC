import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit'
import { usersReducer } from "./usersStore"
import { authReducer } from "./authStore"
import { MiddlewareOptions } from '_/types'
import { AuthService } from '_/services/authService'
import { UserService } from '_/services/userService'
import { persistReducer } from 'redux-persist';
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

// STORE
type StoreOptions = {
  preloadedState?: PreloadedState<RootState>,
  authService: AuthService,
  userService: UserService
}
export const setupStore = (options: StoreOptions) => {
  const { authService, userService, preloadedState } = options
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
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
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']