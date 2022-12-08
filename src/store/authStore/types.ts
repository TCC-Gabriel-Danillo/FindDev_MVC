import { User } from "_/types"

export interface AuthState {
    user?: User
    isLoading: boolean
    isAuthenticated: boolean
}