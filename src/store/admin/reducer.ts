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
    count: 0,
    all: null,
    limit: null,
    updated: null,
  },
  cars: {
    count: 0,
    all: null,
    limit: null,
    updated: null,
    config: null,
  },
  cities: {
    count: 0,
    all: null,
    updated: null,
  },
  rates: {
    count: 0,
    all: null,
    updated: null,
  },
  rateTypes: {
    count: 0,
    all: null,
    updated: null,
  },
  categories: {
    count: 0,
    all: null,
    updated: null,
  },
  points: {
    count: 0,
    all: null,
    updated: null,
  },
  statuses: {
    count: 0,
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
          limit: action.payload.entities?.data.data as IOrder[],
          count: action.payload.entities?.data.count || 0,
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_ORDER: {
      return {
        ...state,
        orders: {
          ...state.orders,
          updated: action.payload.updatedEntity?.data.data as IOrder,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_ORDER: {
      return {
        ...state,
        orders: {
          ...state.orders,
          updated: action.payload.updatedEntity?.data.data as IOrder,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_ORDER: {
      return {
        ...state,
        orders: {
          ...state.orders,
          updated: action.payload.updatedEntity?.data.data as IOrder,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_CITIES:
      return {
        ...state,
        cities: {
          ...state.cities,
          all: action.payload.entities?.data.data as ICity[],
          count: action.payload.entities?.data.count || 0,
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_CITY: {
      return {
        ...state,
        cities: {
          ...state.cities,
          updated: action.payload.updatedEntity?.data.data as ICity,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_CITY: {
      return {
        ...state,
        cities: {
          ...state.cities,
          updated: action.payload.updatedEntity?.data.data as ICity,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_CITY: {
      return {
        ...state,
        cities: {
          ...state.cities,
          updated: action.payload.updatedEntity?.data.data as ICity,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_RATES:
      return {
        ...state,
        rates: {
          ...state.rates,
          all: action.payload.entities?.data.data as IRate[],
          count: action.payload.entities?.data.count || 0,
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_RATE: {
      return {
        ...state,
        rates: {
          ...state.rates,
          updated: action.payload.updatedEntity?.data.data as IRate,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_RATE: {
      return {
        ...state,
        rates: {
          ...state.rates,
          updated: action.payload.updatedEntity?.data.data as IRate,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_RATE: {
      return {
        ...state,
        rates: {
          ...state.rates,
          updated: action.payload.updatedEntity?.data.data as IRate,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_RATE_TYPES:
      return {
        ...state,
        rateTypes: {
          ...state.rateTypes,
          all: action.payload.entities?.data.data as IRateType[],
          count: action.payload.entities?.data.count || 0,
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_RATE_TYPE: {
      return {
        ...state,
        rateTypes: {
          ...state.rateTypes,
          updated: action.payload.updatedEntity?.data.data as IRateType,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_RATE_TYPE: {
      return {
        ...state,
        rateTypes: {
          ...state.rateTypes,
          updated: action.payload.updatedEntity?.data.data as IRateType,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_RATE_TYPE: {
      return {
        ...state,
        rateTypes: {
          ...state.rateTypes,
          updated: action.payload.updatedEntity?.data.data as IRateType,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_CARS:
      return {
        ...state,
        cars: {
          ...state.cars,
          all: action.payload.entities?.data.data as ICar[],
        },
        error: action.payload.error,
      };

    case AdminActionTypes.GET_LIMIT_CARS:
      return {
        ...state,
        cars: {
          ...state.cars,
          limit: action.payload.entities?.data.data as ICar[],
          count: action.payload.entities?.data.count || 0,
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_CAR: {
      return {
        ...state,
        cars: {
          ...state.cars,
          updated: action.payload.updatedEntity?.data.data as ICar,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_CAR: {
      return {
        ...state,
        cars: {
          ...state.cars,
          updated: action.payload.updatedEntity?.data.data as ICar,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_CAR: {
      return {
        ...state,
        cars: {
          ...state.cars,
          updated: action.payload.updatedEntity?.data.data as ICar,
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
          all: action.payload.entities?.data.data as ICategory[],
          count: action.payload.entities?.data.count || 0,
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_CATEGORY: {
      return {
        ...state,
        categories: {
          ...state.categories,
          updated: action.payload.updatedEntity?.data.data as ICategory,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_CATEGORY: {
      return {
        ...state,
        categories: {
          ...state.categories,
          updated: action.payload.updatedEntity?.data.data as ICategory,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_CATEGORY: {
      return {
        ...state,
        categories: {
          ...state.categories,
          updated: action.payload.updatedEntity?.data.data as ICategory,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_POINTS:
      return {
        ...state,
        points: {
          ...state.points,
          all: action.payload.entities?.data.data as IPoint[],
          count: action.payload.entities?.data.count || 0,
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_POINT: {
      return {
        ...state,
        points: {
          ...state.points,
          updated: action.payload.updatedEntity?.data.data as IPoint,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_POINT: {
      return {
        ...state,
        points: {
          ...state.points,
          updated: action.payload.updatedEntity?.data.data as IPoint,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_POINT: {
      return {
        ...state,
        points: {
          ...state.points,
          updated: action.payload.updatedEntity?.data.data as IPoint,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.GET_ALL_ORDER_STATUSES:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          all: action.payload.entities?.data.data as IOrderStatus[],
          count: action.payload.entities?.data.count || 0,
        },
        error: action.payload.error,
      };

    case AdminActionTypes.CREATE_ORDER_STATUS: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          updated: action.payload.updatedEntity?.data.data as IOrderStatus,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.UPDATE_ORDER_STATUS: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          updated: action.payload.updatedEntity?.data.data as IOrderStatus,
        },
        error: action.payload.error,
      }; }

    case AdminActionTypes.DELETE_ORDER_STATUS: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          updated: action.payload.updatedEntity?.data.data as IOrderStatus,
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
