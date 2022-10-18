import { MouseEvent } from "react";

export interface IConfigButtonsProps {
  id: number
  onClickArray: (EventFunc<MouseEvent> | undefined)[]
  disableArray: boolean[]
  deleteButton?: boolean
}

export interface IConfigButton {
  name: string
  icon: JSX.Element
}
