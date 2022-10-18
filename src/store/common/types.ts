export interface ICommonState {
  loading: boolean;
  pageTitle: string;
  bannerText: Nullable<string>;
  adminPopup: Nullable<IAdminPopup>;
  menuPopup: boolean;
  orderPopup: boolean;
  rusLang: boolean;
  city: string;
  error: Nullable<IError>;
}

export interface IAdminPopup {
  configMode: PopupConfigMode,
  entityMode: PopupEntityMode,
  id: Nullable<number>
}

export enum PopupConfigMode {
  CREATE = "create",
  UPDATE = "update",
}

export enum PopupEntityMode {
  CATEGORY = "category",
  CITY = "city",
  POINT = "point",
  RATE = "rate",
  RATE_TYPE = "rate_type",
  STATUS = "status",
}

export interface IError {
  number: number;
  message: string;
}

export interface CommonDispatch<T> {
  (value: T): CommonAction
}

export enum CommonActionTypes {
  SET_LOADING = "SET_LOADING",
  SET_PAGE_TITLE = "SET_PAGE_TITLE",
  SET_BANNER_TEXT = "SET_BANNER_TEXT",
  SET_CONFIG_POPUP = "SET_CONFIG_POPUP",
  SET_LANGUAGE = "SET_LANGUAGE",
  SHOW_MENU_POPUP = "SHOW_MENU_POPUP",
  SHOW_ORDER_POPUP = "SHOW_ORDER_POPUP",
  SET_ERROR = "SET_ERROR",
}

type SetLoadingAction = {
  type: CommonActionTypes.SET_LOADING
  payload: { loading: boolean }
};

type SetPageTitleAction = {
  type: CommonActionTypes.SET_PAGE_TITLE
  payload: { pageTitle: string }
};

type SetBannerTextAction = {
  type: CommonActionTypes.SET_BANNER_TEXT
  payload: { bannerText: Nullable<string> }
};

type SetConfigPopupAction = {
  type: CommonActionTypes.SET_CONFIG_POPUP;
  payload: { adminPopup: Nullable<IAdminPopup> };
};

type SetLanguageAction = {
  type: CommonActionTypes.SET_LANGUAGE;
  payload: { rusLang: boolean };
};

type ShowMenuPopupAction = {
  type: CommonActionTypes.SHOW_MENU_POPUP;
  payload: { menuPopup: boolean };
};

type ShowOrderPopupAction = {
  type: CommonActionTypes.SHOW_ORDER_POPUP;
  payload: { orderPopup: boolean };
};

type SetErrorAction = {
  type: CommonActionTypes.SET_ERROR;
  payload: { error: Nullable<IError> };
};

export type CommonAction =
  | SetLoadingAction
  | SetPageTitleAction
  | SetBannerTextAction
  | SetConfigPopupAction
  | SetLanguageAction
  | ShowMenuPopupAction
  | SetErrorAction
  | ShowOrderPopupAction;
