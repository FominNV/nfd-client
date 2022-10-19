import Axios from "api/Axios";
import { URLS } from "api/Axios/data";
import {
  AdminActionTypes,
  AdminDispatch,
  AdminFetch,
  CreateEntityType,
  DeleteEntityType,
  GetEntitiesType,
  IAdmin,
  ICar,
  IError,
  IResponse,
  UpdateEntityType,
} from "./types";

export const loginAdmin: AdminFetch = (data) => async (dispatch) => {
  await Axios.post<IResponse, IResponse>(
    URLS.ADMIN_LOGIN_URL,
    {
      username: data?.username,
      password: data?.password,
    },
  )
    .then((response) => {
      dispatch({
        type: AdminActionTypes.LOGIN,
        payload: { admin: response?.data as IAdmin, error: null },
      });
    })
    .catch((err) => {
      dispatch({
        type: AdminActionTypes.SET_ERROR,
        payload: {
          error: { code: err.code, status: err.request.status },
        },
      });
    });
};

export const logoutAdmin: AdminDispatch<void> = () => ({
  type: AdminActionTypes.LOGOUT,
  payload: { admin: null },
});

export const setAdminToken: AdminDispatch<Nullable<string>> = (adminToken) => ({
  type: AdminActionTypes.SET_ADMIN_TOKEN,
  payload: { adminToken },
});

export const setError: AdminDispatch<Nullable<IError>> = (error) => ({
  type: AdminActionTypes.SET_ERROR,
  payload: { error },
});

export const setAdminMenu: AdminDispatch<string> = (adminMenu) => ({
  type: AdminActionTypes.SET_ADMIN_MENU,
  payload: { adminMenu },
});

export const getEntities: GetEntitiesType = (
  url,
  type,
  params,
) => async (dispatch) => {
  await Axios.get<IResponse, IResponse>(url, {
    params,
  })
    .then((response) => {
      dispatch({
        type,
        payload: {
          entities: response,
          error: null,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: AdminActionTypes.SET_ERROR,
        payload: {
          entities: null,
          error: { code: err.code, status: err.request.status },
        },
      });
    });
};

export const createEntity: CreateEntityType = (
  url,
  type,
  body,
  token,
) => async (dispatch) => {
  await Axios.post<IResponse, IResponse>(url, body, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  })
    .then((response) => {
      dispatch({
        type,
        payload: {
          updatedEntity: response,
          error: null,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: AdminActionTypes.SET_ERROR,
        payload: {
          updatedEntity: null,
          error: { code: err.code, status: err.request.status },
        },
      });
    });
};

export const updateEntity: UpdateEntityType = (
  url,
  type,
  body,
  id,
  token,
) => async (dispatch) => {
  await Axios.put<IResponse, IResponse>(url + id, body, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  })
    .then((response) => {
      dispatch({
        type,
        payload: {
          updatedEntity: response,
          error: null,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: AdminActionTypes.SET_ERROR,
        payload: {
          updatedEntity: null,
          error: { code: err.code, status: err.request.status },
        },
      });
    });
};

export const deleteEntity: DeleteEntityType = (url, type, id, token) => async (
  dispatch,
) => {
  await Axios.delete<IResponse, IResponse>(url + id, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  })
    .then((response) => {
      dispatch({
        type,
        payload: {
          updatedEntity: response,
          error: null,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: AdminActionTypes.SET_ERROR,
        payload: {
          updatedEntity: null,
          error: { code: err.code, status: err.request.status },
        },
      });
    });
};

export const setConfigCar: AdminDispatch<Nullable<ICar>> = (configCar) => ({
  type: AdminActionTypes.SET_CONFIG_CAR,
  payload: { configCar },
});

export const setAutoCardUpdateMode: AdminDispatch<boolean> = (
  autoCardUpdateMode,
) => ({
  type: AdminActionTypes.SET_AUTO_CARD_UPDATE_MODE,
  payload: { autoCardUpdateMode },
});
