import { URLS } from "api/Axios/data";
import { Dispatch } from "react";
import {
  ICar, ICity, IOrder, IOrderStatus, IPoint, IRate,
} from "store/admin/types";

export interface IUserState {
  orderData: IOrderData;
  postedOrder: Nullable<IOrder>;
  orderStatuses: IOrderStatuses;
  unlockedStep: IUnlockedOrderStep;
}

export interface IOrderData {
  [index: string]: string | number | ICity | IPoint | ICar | IRate | null | boolean
  cityId: Nullable<ICity>
  pointId: Nullable<IPoint>
  carId: Nullable<ICar>
  rateId: Nullable<IRate>
  color: Nullable<string>
  dateFrom: Nullable<number>
  dateTo: Nullable<number>
  price: Nullable<number>
  isFullTank: boolean
  isNeedChildChair: boolean
  isRightWheel: boolean
}

export interface IResponse {
  data: IOrder
}

export interface IUnlockedOrderStep {
  [index: string]: boolean
  place: boolean
  car: boolean
  extra: boolean
  total: boolean
}

export interface IOrderDate {
  dateFrom: number
  dateTo: number
}

export interface IOrderExtra {
  [index: string]: Nullable<string> | boolean;
  color: string;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}

export interface IOrderStatuses {
  [index: string]: Nullable<IOrderStatus>
  new: Nullable<IOrderStatus>
  confirm: Nullable<IOrderStatus>
  cancel: Nullable<IOrderStatus>
}

export enum OrderStatusType {
  NEW = "Неподтвержденный",
  CONFIRM = "Подтвержденный",
  CANCEL = "Отмененный",
  DONE = "Завершенный",
}

export type OrderDispatch<T> = (...arg: T[]) => UserAction;

export type PostOrderType = (
  url: URLS,
  lock: IOrderData
) => (dispatch: Dispatch<UserAction>) => Promise<void>;

export type SetLockStepType = (
  key: keyof IUnlockedOrderStep,
  lock: boolean
) => UserAction;

export type SetOrderStatusType = (
  key: keyof IOrderStatuses,
  status: IOrderStatus
) => UserAction;

export enum UserActionTypes {
  SET_ORDER_CITY = "SET_ORDER_CITY",
  SET_ORDER_POINT = "SET_ORDER_POINT",
  SET_ORDER_CAR = "SET_ORDER_CAR",
  SET_ORDER_RATE = "SET_ORDER_RATE",
  SET_ORDER_DATE = "SET_ORDER_DATE",
  SET_ORDER_EXTRA = "SET_ORDER_EXTRA",
  SET_ORDER_PRICE = "SET_ORDER_PRICE",
  SET_LOCK_STEP = "SET_LOCK_STEP",
  SET_POSTED_ORDER = "SET_POSTED_ORDER",
  POST_ORDER = "POST_ORDER",
  GET_POSTED_ORDER = "GET_POSTED_ORDER",
  SET_ORDER_STATUS = "SET_ORDER_STATUSES",
}

type SetOrderCityAction = {
  type: UserActionTypes.SET_ORDER_CITY
  payload: { city: Nullable<ICity> }
};

type SetOrderPointAction = {
  type: UserActionTypes.SET_ORDER_POINT
  payload: { point: Nullable<IPoint> }
};

type SetOrderCarAction = {
  type: UserActionTypes.SET_ORDER_CAR
  payload: { car: Nullable<ICar> }
};

type SetOrderDateAction = {
  type: UserActionTypes.SET_ORDER_DATE;
  payload: { date: Nullable<IOrderDate> };
};

type SetOrderExtraAction = {
  type: UserActionTypes.SET_ORDER_EXTRA
  payload: { extra: Nullable<IOrderExtra> }
};

type SetPriceAction = {
  type: UserActionTypes.SET_ORDER_PRICE
  payload: { price: Nullable<number> }
};

type SetLockStepAction = {
  type: UserActionTypes.SET_LOCK_STEP
  payload: { key: keyof IUnlockedOrderStep; lock: boolean }
};

type SetOrderRateAction = {
  type: UserActionTypes.SET_ORDER_RATE
  payload: { rate: Nullable<IRate> }
};

type SetPostedOrderAction = {
  type: UserActionTypes.SET_POSTED_ORDER;
  payload: { postedOrder: Nullable<IOrder> };
};

type PostOrderAction = {
  type: UserActionTypes.POST_ORDER;
  payload: { postedOrder: Nullable<IOrder> } ;
};

type GetPostedOrderAction = {
  type: UserActionTypes.GET_POSTED_ORDER;
  payload: { postedOrder: Nullable<IOrder> };
};

type SetOrderStatusAction = {
  type: UserActionTypes.SET_ORDER_STATUS;
  payload: { key: keyof IOrderStatuses; status: IOrderStatus };
};

export type UserAction =
  | SetOrderCityAction
  | SetOrderPointAction
  | SetOrderCarAction
  | SetLockStepAction
  | SetOrderDateAction
  | SetOrderExtraAction
  | SetPriceAction
  | SetOrderRateAction
  | SetPostedOrderAction
  | PostOrderAction
  | GetPostedOrderAction
  | SetOrderStatusAction;
