import { IOrder } from "store/admin/types";

export type ChangeOrderStatusType = (order: IOrder, statusId: number, path: string) => void;
