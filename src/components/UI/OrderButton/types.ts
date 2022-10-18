import { MouseEvent } from "react";

export enum OrderButtonBgColor {
  GREEN = "green",
  GREEN_DARK = "greenDark",
  CLOUDY = "cloudy",
  BROWN_RED = "brownRed",
  PURPLE = "purple",
}

export enum OrderButtonColor {
  WHITE = "white",
  GRAY = "gray",
}

export enum OrderButtonBorderRadius {
  SMALL = "small",
  MEDIUM = "medium",
}

export interface IOrderButtonProps {
  name: string
  bgColor: OrderButtonBgColor
  color?: OrderButtonColor
  borderRadius?: OrderButtonBorderRadius
  disabled?: boolean
  navigatePath?: string
  loading?: boolean
  onClick?: EventFunc<MouseEvent>
}
