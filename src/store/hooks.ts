import type { TypedUseSelectorHook } from "react-redux"

/*eslint no-restricted-imports: ["error", "fs"]*/
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
