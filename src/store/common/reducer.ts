import { CommonAction, CommonActionTypes, ICommonState } from "./types";

const initialState: ICommonState = {
  loading: false,
  pageTitle: "NFD",
  bannerText: null,
  adminPopup: null,
  menuPopup: false,
  orderPopup: false,
  rusLang: false,
  city: "Кемерово",
  error: null,
};

export function commonReducer(
  state: ICommonState = initialState,
  action: CommonAction,
): ICommonState {
  switch (action.type) {
    case CommonActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case CommonActionTypes.SET_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload.pageTitle,
      };

    case CommonActionTypes.SET_BANNER_TEXT:
      return {
        ...state,
        bannerText: action.payload.bannerText,
      };

    case CommonActionTypes.SET_CONFIG_POPUP:
      return {
        ...state,
        adminPopup: action.payload.adminPopup,
      };

    case CommonActionTypes.SET_LANGUAGE:
      return {
        ...state,
        rusLang: action.payload.rusLang,
      };

    case CommonActionTypes.SHOW_MENU_POPUP:
      return {
        ...state,
        menuPopup: action.payload.menuPopup,
      };

    case CommonActionTypes.SHOW_ORDER_POPUP:
      return {
        ...state,
        orderPopup: action.payload.orderPopup,
      };

    case CommonActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
