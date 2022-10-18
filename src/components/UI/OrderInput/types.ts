import { Dispatch, SetStateAction } from "react";

export interface IOrderInputProps {
  id: string
  label: string
  value?: Nullable<string>
  defaultValue?: Nullable<string>
  placeholder?: string
  data: string[]
  disabled?: boolean
  setState: Dispatch<SetStateAction<Nullable<string>>>
}
