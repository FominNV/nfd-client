import Axios from "api/Axios";
import { URLS } from "api/Axios/data";
import { Dispatch } from "react";
import {
  ICar, ICity, IOrder, IPoint, IRate,
} from "store/admin/types";
import {
  IOrderExtra,
  IResponse,
  OrderDispatch,
  UserActionTypes,
  SetLockStepType,
  SetOrderStatusType,
  IOrderDate,
  UserAction,
  PostOrderType,
} from "./types";

export const setOrderCity: OrderDispatch<Nullable<ICity>> = (city) => ({
  type: UserActionTypes.SET_ORDER_CITY,
  payload: { city },
});

export const setOrderPoint: OrderDispatch<Nullable<IPoint>> = (point) => ({
  type: UserActionTypes.SET_ORDER_POINT,
  payload: { point },
});

export const setOrderCar: OrderDispatch<Nullable<ICar>> = (car) => ({
  type: UserActionTypes.SET_ORDER_CAR,
  payload: { car },
});

export const setOrderDate: OrderDispatch<Nullable<IOrderDate>> = (date) => ({
  type: UserActionTypes.SET_ORDER_DATE,
  payload: { date },
});

export const setOrderExtra: OrderDispatch<Nullable<IOrderExtra>> = (extra) => ({
  type: UserActionTypes.SET_ORDER_EXTRA,
  payload: { extra },
});

export const setOrderPrice: OrderDispatch<Nullable<number>> = (price) => ({
  type: UserActionTypes.SET_ORDER_PRICE,
  payload: { price },
});

export const setLockOrderStep: SetLockStepType = (key, lock) => ({
  type: UserActionTypes.SET_LOCK_STEP,
  payload: { key, lock },
});

export const setOrderRate: OrderDispatch<Nullable<IRate>> = (rate) => ({
  type: UserActionTypes.SET_ORDER_RATE,
  payload: { rate },
});

export const setPostedOrder: OrderDispatch<Nullable<IOrder>> = (postedOrder) => ({
  type: UserActionTypes.SET_POSTED_ORDER,
  payload: { postedOrder },
});

export const postOrder: PostOrderType =  (url, body) => async (dispatch: Dispatch<UserAction>) => {
  Axios.post<IResponse, IResponse>(url as string, body)
    .then((res) => {
      dispatch({
        type: UserActionTypes.POST_ORDER,
        payload: { postedOrder: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: UserActionTypes.POST_ORDER,
        payload: { postedOrder: null },
      });
    });
};

export const getPostedOrder = (orderId: string) => async (
  dispatch: Dispatch<UserAction>,
) => {
  const url = URLS.ORDER_URL + orderId;
  Axios.get<IResponse, IResponse>(url)
    .then((res) => {
      dispatch({
        type: UserActionTypes.GET_POSTED_ORDER,
        payload: { postedOrder: res.data },
      });
    })
    .catch(() => {
      dispatch({
        type: UserActionTypes.GET_POSTED_ORDER,
        payload: { postedOrder: null },
      });
    });
};

export const setOrderStatus: SetOrderStatusType = (key, status) => ({
  type: UserActionTypes.SET_ORDER_STATUS,
  payload: { key, status },
});
