import { Dispatch, SetStateAction } from "react";

export interface IAdminTextareaProps {
  id: string
  label: string
  placeholder: string
  maxLength?: number
  value: string
  error?: Nullable<string>
  setState: Dispatch<SetStateAction<string>>
}
