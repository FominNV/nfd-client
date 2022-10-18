import { Dispatch, SetStateAction } from "react";

export interface IOrderDateProps {
  id: string
  label: string
  disabled?: boolean
  defaultValue?: string
  setState: Dispatch<SetStateAction<Nullable<string>>>
}
