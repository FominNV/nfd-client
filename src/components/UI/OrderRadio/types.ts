import { Dispatch, SetStateAction } from "react";

export interface IOrderRadioProps {
  id: string
  value: string
  name: string
  checked?: boolean
  setState: Dispatch<SetStateAction<string>>
}

export interface IRadio {
  id: string
  label: string
}
