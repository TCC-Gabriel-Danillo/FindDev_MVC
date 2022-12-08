import { User } from "_/types"

export interface UserState {
    users: User[]
    isLoading: boolean
}