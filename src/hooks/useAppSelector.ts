import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "_/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

