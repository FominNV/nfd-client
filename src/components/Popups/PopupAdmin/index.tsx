import {
  Dispatch,
  FC,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTypedSelector } from "store/selectors";
import { setBannerText, setAdminPopup } from "store/common/actions";
import { useDispatch } from "react-redux";
import { createEntity, updateEntity, deleteEntity } from "store/admin/actions";
import AdminButton from "components/UI/AdminButton";
import AdminInput from "components/UI/AdminInput";
import classNames from "classnames";
import { URLS } from "api/Axios/data";
import { PopupConfigMode, PopupEntityMode } from "store/common/types";
import { AdminButtonBgColor } from "components/UI/AdminButton/types";
import { ReactComponent as Close } from "assets/icons/OrderCard/cancel.svg";
import { AdminActionTypes, ICity, IRateType } from "store/admin/types";
import Select from "components/UI/AdminSelect";
import AdminTextarea from "components/UI/AdminTextarea";
import {
  CheckFieldType,
  CreateSecondFieldComponent,
  FetchBodyType,
  PostEntiyId,
  SetAddBodyType,
  SetConfigFieldsType,
} from "./types";
import { dataEntityBannerText } from "./data";

import "./styles.scss";

const PopupAdmin: FC = () => {
  const { adminPopup } = useTypedSelector((state) => state.common);
  const {
    adminToken, categories, cities, error,
  } = useTypedSelector((state) => state.admin);
  const {
    rates, rateTypes, statuses, points,
  } = useTypedSelector((state) => state.admin);
  const [loading, setLoading] = useState<boolean>(false);
  const [entityId, setEntityId] = useState<Nullable<number>>(null);
  const [labelName, setLabelName] = useState<string>("");
  const [labelValue, setLabelValue] = useState<string>("");
  const [labelSecondValue, setLabelSecondValue] = useState<string>("");
  const [firstFieldType, setFirstFieldType] = useState<string>("text");
  const [secondFieldType, setSecondFieldType] = useState<string>("input");
  const [firstField, setFirstField] = useState<string>("");
  const [secondField, setSecondField] = useState<string>("");
  const [thirdField, setThirdField] = useState<string>("");
  const [postEntityId, setPostEntityId] = useState<PostEntiyId>(null);
  const [firstFieldError, setFirstFieldError] = useState<Nullable<string>>(null);
  const [secondFieldError, setSecondFieldError] = useState<Nullable<string>>(null);
  const [thirdFieldError, setThirdFieldError] = useState<Nullable<string>>(null);
  const [fieldCount, setFieldCount] = useState<number>(1);
  const [postButtonName, setPostButtonName] = useState<string>("Обновить");
  const [selectData, setSelectData] = useState<string[]>([]);
  const [url, setUrl] = useState<Nullable<URLS>>(null);
  const [createType, setCreateType] = useState<Nullable<AdminActionTypes>>(null);
  const [updateType, setUpdateType] = useState<Nullable<AdminActionTypes>>(null);
  const [deleteType, setDeleteType] = useState<Nullable<AdminActionTypes>>(null);
  const [body, setBody] = useState<FetchBodyType>(null);
  const dispatch = useDispatch();

  const clearFields = useCallback<VoidFunc<void>>(() => {
    setFirstField("");
    setSecondField("");
    setThirdField("");
  }, []);

  const setFetchParams = useCallback<VoidFunc<PopupEntityMode>>((mode) => {
    switch (mode) {
      case PopupEntityMode.CATEGORY:
        setUrl(URLS.CATEGORY_URL);
        setCreateType(AdminActionTypes.CREATE_CATEGORY);
        setUpdateType(AdminActionTypes.UPDATE_CATEGORY);
        setDeleteType(AdminActionTypes.DELETE_CATEGORY);
        break;

      case PopupEntityMode.CITY:
        setUrl(URLS.CITY_URL);
        setCreateType(AdminActionTypes.CREATE_CITY);
        setUpdateType(AdminActionTypes.UPDATE_CITY);
        setDeleteType(AdminActionTypes.DELETE_CITY);
        break;

      case PopupEntityMode.POINT:
        setUrl(URLS.POINT_URL);
        setCreateType(AdminActionTypes.CREATE_POINT);
        setUpdateType(AdminActionTypes.UPDATE_POINT);
        setDeleteType(AdminActionTypes.DELETE_POINT);
        break;

      case PopupEntityMode.RATE:
        setUrl(URLS.RATE_URL);
        setCreateType(AdminActionTypes.CREATE_RATE);
        setUpdateType(AdminActionTypes.UPDATE_RATE);
        setDeleteType(AdminActionTypes.DELETE_RATE);
        break;

      case PopupEntityMode.RATE_TYPE:
        setUrl(URLS.RATE_TYPE_URL);
        setCreateType(AdminActionTypes.CREATE_RATE_TYPE);
        setUpdateType(AdminActionTypes.UPDATE_RATE_TYPE);
        setDeleteType(AdminActionTypes.DELETE_RATE_TYPE);
        break;

      case PopupEntityMode.STATUS:
        setUrl(URLS.ORDER_STATUS_URL);
        setCreateType(AdminActionTypes.CREATE_ORDER_STATUS);
        setUpdateType(AdminActionTypes.UPDATE_ORDER_STATUS);
        setDeleteType(AdminActionTypes.DELETE_ORDER_STATUS);
        break;

      default:
        break;
    }
  }, []);

  const setConfigFields = useCallback<SetConfigFieldsType>(
    (mode, id) => {
      switch (mode) {
        case PopupEntityMode.CATEGORY:
          if (id && categories.all) {
            categories.all.forEach((elem) => {
              if (elem.id === id) {
                setFirstField(elem.name);
                setSecondField(elem.description);
              }
            });
          } else clearFields();
          setEntityId(Number(id));
          setFieldCount(2);
          setFirstFieldType("text");
          setLabelName("Название категории");
          setLabelValue("Описание категории");
          setSecondFieldType("area");
          break;

        case PopupEntityMode.CITY:
          if (id && cities.all) {
            cities.all.forEach((elem) => {
              if (elem.id === id) {
                setFirstField(elem.name);
              }
            });
          } else clearFields();
          setEntityId(Number(id));
          setFieldCount(1);
          setFirstFieldType("text");
          setLabelName("Название города");
          break;

        case PopupEntityMode.POINT:
          if (id && points.all) {
            points.all.forEach((elem) => {
              if (elem.id === id) {
                setFirstField(elem.name);
                setSecondField(elem.cityId ? elem.cityId?.name : "НЕ УКАЗАН");
                setThirdField(elem.address);
              }
            });
          } else clearFields();
          setEntityId(Number(id));
          setFieldCount(3);
          setFirstFieldType("text");
          setLabelName("Название пункта");
          setLabelValue("Название города");
          setLabelSecondValue("Адрес");
          setSecondFieldType("select");
          break;

        case PopupEntityMode.RATE:
          if (id && rates.all) {
            rates.all.forEach((elem) => {
              if (elem.id === id) {
                setFirstField(elem.price.toString());
                setSecondField(
                  elem.rateTypeId ? elem.rateTypeId.name : "НЕ УКАЗАНО",
                );
                setThirdField(
                  elem.rateTypeId ? elem.rateTypeId.unit : "НЕ УКАЗАНО",
                );
              }
            });
          } else clearFields();
          setEntityId(Number(id));
          setFieldCount(3);
          setFirstFieldType("number");
          setLabelName("Стоимость");
          setLabelValue("Наименование");
          setLabelSecondValue("Длительность");
          setSecondFieldType("select");
          break;

        case PopupEntityMode.RATE_TYPE:
          if (id && rateTypes.all) {
            rateTypes.all.forEach((elem) => {
              if (elem.id === id) {
                setFirstField(elem.name);
                setSecondField(elem.unit);
              }
            });
          } else clearFields();
          setEntityId(Number(id));
          setFieldCount(2);
          setFirstFieldType("text");
          setLabelName("Наименование");
          setLabelValue("Длительность");
          setSecondFieldType("input");
          break;

        case PopupEntityMode.STATUS:
          if (id && statuses.all) {
            statuses.all.forEach((elem) => {
              if (elem.id === id) {
                setFirstField(elem.name);
              }
            });
          } else clearFields();
          setEntityId(Number(id));
          setFieldCount(1);
          setFirstFieldType("text");
          setLabelName("Наименование");
          break;

        default:
          break;
      }
    },
    [
      categories.all,
      cities.all,
      points.all,
      rateTypes.all,
      rates.all,
      statuses.all,
      clearFields,
    ],
  );

  const checkField = useCallback<CheckFieldType>(
    (stateValue, setError, fieldType) => {
      if (fieldType === "text" && stateValue.trim().length < 3) {
        setError("Значение должно быть не менее 3 символов");
        return false;
      }
      if (
        fieldType === "number"
        && (!Number(stateValue.trim()) || Number(stateValue.trim()) <= 0)
      ) {
        setError("Некорректное значение");
        return false;
      }
      setError(null);
      return true;
    },
    [],
  );

  const checkAllStates = useCallback<CheckType<void>>(() => {
    const valueArray: string[] = [firstField, secondField, thirdField];
    const setErrorArray: Dispatch<SetStateAction<Nullable<string>>>[] = [
      setFirstFieldError,
      setSecondFieldError,
      setThirdFieldError,
    ];
    const fieldTypes = [firstFieldType, "text", "text"];
    let flag = true;
    Array.from({ length: fieldCount }).forEach((_, index) => {
      if (
        !checkField(valueArray[index], setErrorArray[index], fieldTypes[index])
      ) {
        flag = false;
      }
    });
    return flag;
  }, [
    fieldCount,
    firstField,
    secondField,
    thirdField,
    firstFieldType,
    checkField,
    setFirstFieldError,
    setSecondFieldError,
    setThirdFieldError,
  ]);

  const cancelConfig = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(setAdminPopup(null));
    setFirstFieldError(null);
    setSecondFieldError(null);
    setThirdFieldError(null);
    clearFields();
  }, [clearFields, dispatch]);

  const createNewEntity = useCallback<EventFunc<MouseEvent>>(async () => {
    if (
      adminToken
      && checkAllStates()
      && url
      && createType
      && body
      && adminPopup
    ) {
      setLoading(true);
      await dispatch(createEntity(url, createType, body, adminToken));
      setLoading(false);
      dispatch(setAdminPopup(null));
      clearFields();
      if (!error) {
        dispatch(
          setBannerText(dataEntityBannerText[adminPopup.entityMode].create),
        );
      }
    }
  }, [adminToken, url, error, createType, body, adminPopup, checkAllStates, clearFields, dispatch]);

  const updateCurrentEntity = useCallback<EventFunc<MouseEvent>>(async () => {
    if (
      adminToken
      && checkAllStates()
      && url
      && updateType
      && body
      && entityId
      && adminPopup
    ) {
      setLoading(true);
      await dispatch(updateEntity(url, updateType, body, entityId, adminToken));
      setLoading(false);
      dispatch(setAdminPopup(null));
      clearFields();
      setTimeout(() => {
        if (!error) {
          dispatch(
            setBannerText(dataEntityBannerText[adminPopup.entityMode].update),
          );
        }
      });
    }
  }, [
    adminToken,
    url,
    updateType,
    body,
    error,
    entityId,
    adminPopup,
    clearFields,
    checkAllStates,
    dispatch,
  ]);

  const removeEntity = useCallback<EventFunc<MouseEvent>>(async () => {
    if (adminToken && url && deleteType && entityId && adminPopup) {
      setLoading(true);
      await dispatch(deleteEntity(url, deleteType, entityId, adminToken));
      setLoading(false);
      dispatch(setAdminPopup(null));
      clearFields();
      setTimeout(() => {
        if (!error) {
          dispatch(
            setBannerText(dataEntityBannerText[adminPopup.entityMode].delete),
          );
        }
      });
    }
  }, [adminToken, url, error, deleteType, entityId, adminPopup, clearFields, dispatch]);

  const createSecondFieldComponent = useCallback<CreateSecondFieldComponent>(
    (type) => {
      if (type === "select") {
        return (
          <Select
            id="config_popup_select_second_field"
            key="config_popup_select_second_field"
            label={labelValue}
            value={secondField}
            error={secondFieldError}
            data={selectData}
            callback={setSecondField}
          />
        );
      }
      if (type === "area") {
        return (
          <div className="PopupAdmin__area">
            <AdminTextarea
              id="config_popup_area_second_field"
              key="config_popup_area_second_field"
              label={labelValue}
              value={secondField}
              maxLength={250}
              error={secondFieldError}
              placeholder="Введите описание"
              setState={setSecondField}
            />
          </div>
        );
      }
      return (
        <AdminInput
          id="config_popup_input_second_field"
          key="config_popup_input_second_field"
          label={labelValue}
          type="text"
          value={secondField}
          error={secondFieldError}
          placeholder="Введите название"
          setState={setSecondField}
        />
      );
    },
    [labelValue, secondField, secondFieldError, selectData, setSecondField],
  );

  const createFetchBody = useCallback<VoidFunc<PopupEntityMode>>(
    (mode) => {
      switch (mode) {
        case PopupEntityMode.CATEGORY:
          setBody({ name: firstField, description: secondField });
          break;

        case PopupEntityMode.CITY:
          setBody({ name: firstField });
          break;

        case PopupEntityMode.POINT:
          setBody({
            name: firstField,
            cityId: postEntityId as ICity,
            address: thirdField,
          });
          break;

        case PopupEntityMode.RATE:
          setBody({
            rateTypeId: postEntityId as IRateType,
            price: Number(firstField),
          });
          break;

        case PopupEntityMode.RATE_TYPE:
          setBody({
            name: firstField,
            unit: secondField,
          });
          break;

        case PopupEntityMode.STATUS:
          setBody({ name: firstField });
          break;

        default:
          break;
      }
    },
    [firstField, secondField, thirdField, postEntityId],
  );

  const setAddBody = useCallback<SetAddBodyType>((name, data) => {
    data.forEach((elem) => {
      if (elem.name === name) setPostEntityId(elem);
    });
  }, []);

  useEffect(() => {
    if (adminPopup) {
      const parent = document.querySelector("html");
      if (parent) {
        parent.style.overflow = "hidden";
      }
    } else {
      const parent = document.querySelector("html");
      if (parent) {
        parent.style.overflow = "visible";
      }
    }
  }, [adminPopup]);

  useEffect(() => {
    if (adminPopup) {
      setFetchParams(adminPopup.entityMode);
      setConfigFields(adminPopup.entityMode, adminPopup.id);
    }
  }, [adminPopup, setFetchParams, setConfigFields]);

  useEffect(() => {
    if (
      adminPopup
      && !firstFieldError
      && !secondFieldError
      && !thirdFieldError
    ) {
      createFetchBody(adminPopup.entityMode);
    }
  }, [
    adminPopup,
    firstFieldError,
    secondFieldError,
    thirdFieldError,
    createFetchBody,
  ]);

  useEffect(() => {
    if (adminPopup && adminPopup.configMode === PopupConfigMode.CREATE) {
      setPostButtonName("Создать");
    } else {
      setPostButtonName("Обновить");
    }
  }, [adminPopup, createNewEntity, updateCurrentEntity]);

  useEffect(() => {
    if (firstFieldError) {
      checkField(firstField, setFirstFieldError, firstFieldType);
    }
    if (secondFieldError) {
      checkField(secondField, setSecondFieldError, "text");
    }
    if (thirdFieldError) {
      checkField(thirdField, setThirdFieldError, "text");
    }
  }, [
    firstField,
    secondField,
    thirdField,
    firstFieldType,
    firstFieldError,
    secondFieldError,
    thirdFieldError,
    checkField,
  ]);

  useEffect(() => {
    if (
      adminPopup
      && adminPopup.entityMode === PopupEntityMode.POINT
      && cities.all
    ) {
      const data: string[] = cities.all.map((elem, index) => {
        if (index === 0 && !secondField) setSecondField(elem.name);
        return elem.name;
      });
      setSelectData(data);
    }
  }, [adminPopup, cities.all, secondField]);

  useEffect(() => {
    if (
      adminPopup
      && adminPopup.entityMode === PopupEntityMode.RATE
      && rateTypes.all
    ) {
      const data: string[] = rateTypes.all.map((elem, index) => {
        if (index === 0 && !secondField) setSecondField(elem.name);
        return elem.name;
      });
      setSelectData(data);
    }
  }, [adminPopup, rateTypes.all, secondField]);

  useEffect(() => {
    if (adminPopup && secondField) {
      if (adminPopup.entityMode === PopupEntityMode.RATE && rateTypes.all) {
        setAddBody(secondField, rateTypes.all);
        rateTypes.all.forEach((elem) => {
          if (elem.name === secondField) setThirdField(elem.unit);
        });
      } else if (adminPopup.entityMode === PopupEntityMode.POINT && cities.all) {
        setAddBody(secondField, cities.all);
      }
    }
  }, [adminPopup, secondField, rateTypes.all, cities.all, setAddBody]);

  const postFunction = useMemo<EventFunc<MouseEvent> | undefined>(() => {
    if (adminPopup) {
      return adminPopup.configMode === PopupConfigMode.CREATE
        ? createNewEntity
        : updateCurrentEntity;
    }
    return undefined;
  }, [adminPopup, createNewEntity, updateCurrentEntity]);

  useEffect(() => {
    if (error) {
      dispatch(setBannerText(null));
    }
  }, [error, dispatch]);

  const thirdFieldInput = useMemo<ReactNode>(() => {
    const readOnly = !!(
      adminPopup && adminPopup.entityMode === PopupEntityMode.RATE
    );
    if (fieldCount === 3) {
      return (
        <AdminInput
          id="config_popup_input_second_value"
          key="config_popup_input_second_value"
          label={labelSecondValue}
          type="text"
          value={thirdField}
          error={thirdFieldError}
          readOnly={readOnly}
          placeholder="Введите название"
          setState={setThirdField}
        />
      );
    }
    return false;
  }, [
    adminPopup,
    fieldCount,
    labelSecondValue,
    thirdField,
    thirdFieldError,
    setThirdField,
  ]);

  const secondFieldComponent = useMemo<ReactNode>(
    () => fieldCount >= 2 && createSecondFieldComponent(secondFieldType),
    [fieldCount, secondFieldType, createSecondFieldComponent],
  );

  const popupClassName = classNames("PopupAdmin", {
    PopupAdmin_active: adminPopup,
  });
  const deleteButtonClassName = classNames("PopupAdmin__btn", {
    PopupAdmin__btn_hidden:
      adminPopup && adminPopup.configMode !== PopupConfigMode.UPDATE,
  });

  return (
    <div className={popupClassName}>
      <div className="PopupAdmin__content">
        <button
          className="PopupAdmin__btn-cancel"
          onClick={cancelConfig}
          disabled={loading}
        >
          <Close
            width={16}
            height={16}
          />
        </button>

        <AdminInput
          id="config_popup_input_firstField"
          key="config_popup_input_firstField"
          label={labelName}
          type="text"
          value={firstField}
          error={firstFieldError}
          placeholder="Введите название"
          setState={setFirstField}
        />

        {secondFieldComponent}
        {thirdFieldInput}

        <div className="PopupAdmin__buttons">
          <div className="PopupAdmin__btn">
            <AdminButton
              name={postButtonName}
              bgColor={AdminButtonBgColor.BLUE}
              onClick={postFunction}
              loading={loading}
              disabled={loading}
            />
          </div>

          <div className={deleteButtonClassName}>
            <AdminButton
              name="Удалить"
              bgColor={AdminButtonBgColor.RED}
              onClick={removeEntity}
              loading={loading}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupAdmin;
