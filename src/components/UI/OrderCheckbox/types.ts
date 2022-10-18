import { Dispatch, SetStateAction } from "react";

export interface IOrderCheckboxProps {
  id: string
  label: string
  checked?: boolean
  setState: Dispatch<SetStateAction<boolean>>
}

export interface ICheckbox {
  id: string
  label: string
}
