import { IUserState, UserAction, UserActionTypes } from "./types";

const initialState: IUserState = {
  orderData: {
    cityId: null,
    pointId: null,
    carId: null,
    rateId: null,
    color: null,
    dateFrom: null,
    dateTo: null,
    price: null,
    isFullTank: false,
    isNeedChildChair: false,
    isRightWheel: false,
  },
  postedOrder: null,
  orderStatuses: {
    new: null,
    confirm: null,
    cancel: null,
  },
  unlockedStep: {
    place: true,
    car: false,
    extra: false,
    total: false,
  },
};

export function userReducer(
  state: IUserState = initialState,
  action: UserAction,
): IUserState {
  switch (action.type) {
    case UserActionTypes.SET_ORDER_CITY:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          cityId: action.payload.city,
        },
      };

    case UserActionTypes.SET_ORDER_POINT:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          pointId: action.payload.point,
        },
      };

    case UserActionTypes.SET_ORDER_CAR:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          carId: action.payload.car,
        },
      };

    case UserActionTypes.SET_ORDER_DATE:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          ...action.payload.date,
        },
      };

    case UserActionTypes.SET_ORDER_EXTRA:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          ...action.payload.extra,
        },
      };

    case UserActionTypes.SET_ORDER_PRICE:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          price: action.payload.price,
        },
      };

    case UserActionTypes.SET_LOCK_STEP:
      return {
        ...state,
        unlockedStep: {
          ...state.unlockedStep,
          [action.payload.key]: action.payload.lock,
        },
      };

    case UserActionTypes.SET_ORDER_RATE:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          rateId: action.payload.rate,
        },
      };

    case UserActionTypes.SET_POSTED_ORDER:
      return {
        ...state,
        postedOrder: action.payload.postedOrder,
      };

    case UserActionTypes.POST_ORDER:
      return {
        ...state,
        postedOrder: action.payload.postedOrder,
      };

    case UserActionTypes.GET_POSTED_ORDER:
      return {
        ...state,
        postedOrder: action.payload.postedOrder,
      };

    case UserActionTypes.SET_ORDER_STATUS:
      return {
        ...state,
        orderStatuses: {
          ...state.orderStatuses,
          [action.payload.key]: action.payload.status,
        },
      };

    default:
      return state;
  }
}
