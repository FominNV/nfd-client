import { Dispatch, SetStateAction } from "react";

export interface IAdminPaginaterProps {
  pageCount: number
  currentNumber: number
  disabled?: boolean
  setState: Dispatch<SetStateAction<number>>
}
