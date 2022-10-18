import { MouseEvent } from "react";

export enum AdminButtonBgColor {
  BLUE = "blue",
  RED = "red",
  GRAY_LIGHT = "gray-light",
}

export enum AdminButtonFontColor {
  WHITE = "white",
  BLUE_DARK = "blue-dark",
}

export interface IAdminButtonProps {
  name: string;
  bgColor: AdminButtonBgColor;
  color?: AdminButtonFontColor;
  disabled?: boolean;
  navigatePath?: string;
  loading?: boolean;
  onClick?: EventFunc<MouseEvent>;
}
