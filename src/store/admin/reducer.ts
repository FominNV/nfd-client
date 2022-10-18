import {
  AdminAction,
  AdminActionTypes,
  AdminMenu,
  IAdminState,
  ICar,
  ICategory,
  ICity,
  IOrder,
  IOrderStatus,
  IPoint,
  IRate,
  IRateType,
} from "./types";

const initialState: IAdminState = {
  admin: null,
  adminToken: null,
  error: null,
  adminMenu: AdminMenu.AUTO_CARD,
  orders: {
    all: null,
    limit: null,
    updated: null,
  },
  cars: {
    all: null,
    limit: null,
    updated: null,
    config: null,
  },
  cities: {
    all: null,
    updated: null,
  },
  rates: {
    all: null,
    updated: null,
  },
  rateTypes: {
    all: null,
    updated: null,
  },
  categories: {
    all: null,
    updated: null,
  },
  points: {
    all: null,
    updated: null,
  },
  statuses: {
    all: null,
    updated: null,
  },
  autoCardUpdateMode: false,
};

export function adminReducer(
  state: IAdminState = initialState,
  action: AdminAction,
): IAdminState {
  switch (action.type) {
    case AdminActionTypes.LOGIN:
      return {
        ...state,
        admin: action.payload.admin,
        adminToken: action.payload.admin?.token as string,
        error: action.payload.error,
      };

    case AdminActionTypes.LOGOUT:
      return {
        ...state,
        admin: action.payload.admin,
      };

    case AdminActionTypes.SET_ADMIN_TOKEN:
      return {
        ...state,
        adminToken: action.payload.adminToken,
      };

    case AdminActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    case AdminActionTypes.SET_ADMIN_MENU:
      return {
        ...state,
        adminMenu: action.payload.adminMenu,
      };

    case AdminActionTypes.GET_LIMIT_ORDERS:
      return {
        ...state,
        orders: {
          ...state.orders,
          limit: action.payload.entities?.data as IOrder[],
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_ORDER: {
      const data = action.payload.updatedEntity?.data as IOrder;
      return {
        ...state,
        orders: {
          ...state.orders,
          updated: data as IOrder,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_ORDER: {
      const data = action.payload.updatedEntity?.data as IOrder;
      return {
        ...state,
        orders: {
          ...state.orders,
          updated: data as IOrder,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_ORDER: {
      const data = action.payload.updatedEntity?.data as IOrder;
      return {
        ...state,
        orders: {
          ...state.orders,
          updated: data as IOrder,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_CITIES:
      return {
        ...state,
        cities: {
          ...state.cities,
          all: action.payload.entities?.data as ICity[],
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_CITY: {
      const data = action.payload.updatedEntity?.data as ICity;
      return {
        ...state,
        cities: {
          ...state.cities,
          updated: data as ICity,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_CITY: {
      const data = action.payload.updatedEntity?.data as ICity;
      return {
        ...state,
        cities: {
          ...state.cities,
          updated: data as ICity,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_CITY: {
      const data = action.payload.updatedEntity?.data as ICity;
      return {
        ...state,
        cities: {
          ...state.cities,
          updated: data as ICity,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_RATES:
      return {
        ...state,
        rates: {
          ...state.rates,
          all: action.payload.entities?.data as IRate[],
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_RATE: {
      const data = action.payload.updatedEntity?.data as IRate;
      return {
        ...state,
        rates: {
          ...state.rates,
          updated: data as IRate,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_RATE: {
      const data = action.payload.updatedEntity?.data as IRate;
      return {
        ...state,
        rates: {
          ...state.rates,
          updated: data as IRate,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_RATE: {
      const data = action.payload.updatedEntity?.data as IRate;
      return {
        ...state,
        rates: {
          ...state.rates,
          updated: data as IRate,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_RATE_TYPES:
      return {
        ...state,
        rateTypes: {
          ...state.rateTypes,
          all: action.payload.entities?.data as IRateType[],
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_RATE_TYPE: {
      const data = action.payload.updatedEntity?.data as IRateType;
      return {
        ...state,
        rateTypes: {
          ...state.rateTypes,
          updated: data as IRateType,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_RATE_TYPE: {
      const data = action.payload.updatedEntity?.data as IRateType;
      return {
        ...state,
        rateTypes: {
          ...state.rateTypes,
          updated: data as IRateType,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_RATE_TYPE: {
      const data = action.payload.updatedEntity?.data as IRateType;
      return {
        ...state,
        rateTypes: {
          ...state.rateTypes,
          updated: data as IRateType,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_CARS:
      return {
        ...state,
        cars: {
          ...state.cars,
          all: action.payload.entities?.data as ICar[],
        },
        error: action.payload.error,
      };

    case AdminActionTypes.GET_LIMIT_CARS:
      return {
        ...state,
        cars: {
          ...state.cars,
          limit: action.payload.entities?.data as ICar[],
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_CAR: {
      const data = action.payload.updatedEntity?.data as ICar;
      return {
        ...state,
        cars: {
          ...state.cars,
          updated: data as ICar,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_CAR: {
      const data = action.payload.updatedEntity?.data as ICar;
      return {
        ...state,
        cars: {
          ...state.cars,
          updated: data as ICar,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_CAR: {
      const data = action.payload.updatedEntity?.data as ICar;
      return {
        ...state,
        cars: {
          ...state.cars,
          updated: data as ICar,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.SET_CONFIG_CAR:
      return {
        ...state,
        cars: { ...state.cars, config: action.payload.configCar },
      };

    case AdminActionTypes.GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: {
          ...state.categories,
          all: action.payload.entities?.data as ICategory[],
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_CATEGORY: {
      const data = action.payload.updatedEntity?.data as ICategory;
      return {
        ...state,
        categories: {
          ...state.categories,
          updated: data as ICategory,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_CATEGORY: {
      const data = action.payload.updatedEntity?.data as ICategory;
      return {
        ...state,
        categories: {
          ...state.categories,
          updated: data as ICategory,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_CATEGORY: {
      const data = action.payload.updatedEntity?.data as ICategory;
      return {
        ...state,
        categories: {
          ...state.categories,
          updated: data as ICategory,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_POINTS:
      return {
        ...state,
        points: {
          ...state.points,
          all: action.payload.entities?.data as IPoint[],
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_POINT: {
      const data = action.payload.updatedEntity?.data as IPoint;
      return {
        ...state,
        points: {
          ...state.points,
          updated: data as IPoint,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_POINT: {
      const data = action.payload.updatedEntity?.data as IPoint;
      return {
        ...state,
        points: {
          ...state.points,
          updated: data as IPoint,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_POINT: {
      const data = action.payload.updatedEntity?.data as IPoint;
      return {
        ...state,
        points: {
          ...state.points,
          updated: data as IPoint,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_ORDER_STATUSES:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          all: action.payload.entities?.data as IOrderStatus[],
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_ORDER_STATUS: {
      const data = action.payload.updatedEntity?.data as IOrderStatus;
      return {
        ...state,
        statuses: {
          ...state.statuses,
          updated: data as IOrderStatus,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_ORDER_STATUS: {
      const data = action.payload.updatedEntity?.data as IOrderStatus;
      return {
        ...state,
        statuses: {
          ...state.statuses,
          updated: data as IOrderStatus,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_ORDER_STATUS: {
      const data = action.payload.updatedEntity?.data as IOrderStatus;
      return {
        ...state,
        statuses: {
          ...state.statuses,
          updated: data as IOrderStatus,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.SET_AUTO_CARD_UPDATE_MODE:
      return {
        ...state,
        autoCardUpdateMode: action.payload.autoCardUpdateMode,
      };

    default:
      return state;
  }
}
