import { useAppSelector } from "./useAppSelector";

export const useUsersSelector = () => useAppSelector((state) => state.usersState)