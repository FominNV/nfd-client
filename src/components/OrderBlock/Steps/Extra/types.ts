import { IRate } from "store/admin/types";

type CheckDatesItem = string | number | Date | null;
export type CheckDatesType = (from: CheckDatesItem, to: CheckDatesItem) => boolean;

export type SetOrderDatesType = (
  rate: IRate,
  from: string | number | Date,
  to?: string | number | Date
) => void;

export type CalcOrderPriceType = (
  rate: IRate,
  from?: CheckDatesItem,
  to?: CheckDatesItem
) => number;

export const minuteRate = "Поминутный";
