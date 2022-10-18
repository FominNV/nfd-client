import {
  CommonActionTypes,
  CommonDispatch,
  IAdminPopup,
  IError,
} from "./types";

export const setLoading: CommonDispatch<boolean> = (loading) => ({
  type: CommonActionTypes.SET_LOADING,
  payload: { loading },
});

export const setPageTitle: CommonDispatch<string> = (pageTitle) => ({
  type: CommonActionTypes.SET_PAGE_TITLE,
  payload: { pageTitle },
});

export const setBannerText: CommonDispatch<Nullable<string>> = (bannerText) => ({
  type: CommonActionTypes.SET_BANNER_TEXT,
  payload: { bannerText },
});

export const setLanguage: CommonDispatch<boolean> = (rusLang) => ({
  type: CommonActionTypes.SET_LANGUAGE,
  payload: { rusLang },
});

export const setAdminPopup: CommonDispatch<Nullable<IAdminPopup>> = (adminPopup) => ({
  type: CommonActionTypes.SET_CONFIG_POPUP,
  payload: { adminPopup },
});

export const showMenuPopup: CommonDispatch<boolean> = (menuPopup) => ({
  type: CommonActionTypes.SHOW_MENU_POPUP,
  payload: { menuPopup },
});

export const showOrderPopup: CommonDispatch<boolean> = (orderPopup) => ({
  type: CommonActionTypes.SHOW_ORDER_POPUP,
  payload: { orderPopup },
});

export const setError: CommonDispatch<Nullable<IError>> = (error) => ({
  type: CommonActionTypes.SET_ERROR,
  payload: { error },
});
