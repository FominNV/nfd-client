import {
  FC,
  FormEventHandler,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import classNames from "classnames";
import { AdminButtonBgColor, AdminButtonFontColor } from "components/UI/AdminButton/types";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "store/selectors";
import { setAdminMenu, setAutoCardUpdateMode } from "store/admin/actions";
import AdminInput from "components/UI/AdminInput";
import Search from "components/UI/AdminSearch";
import AdminButton from "components/UI/AdminButton";
import AdminCheckbox from "components/UI/AdminCheckbox";
import { AdminMenu } from "store/admin/types";
import { ReactComponent as Clear } from "assets/icons/Admin/clear.svg";
import { dataAutoColors, dataConfigButton } from "./data";
import { IConfigProps } from "./types";

import "./styles.scss";

const Config: FC<IConfigProps> = ({
  allColors,
  model,
  modelError,
  dataTypes,
  type,
  typeError,
  number,
  numberError,
  minPrice,
  minPriceError,
  maxPrice,
  maxPriceError,
  pricesError,
  colorInputValue,
  checkedColors,
  colorError,
  setModel,
  setType,
  setNumber,
  setMinPrice,
  setMaxPrice,
  setAllColors,
  setCheckedColors,
  createCar,
  updateCar,
  removeCar,
  setColorInputValue,
  clearAllErrors,
  clearAllStates,
}) => {
  const { autoCardUpdateMode } = useTypedSelector((state) => state.admin);
  const { loading } = useTypedSelector((state) => state.common);
  const dispatch = useDispatch();

  const onSubmitHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      if (
        !allColors.includes(colorInputValue.trim())
        && dataAutoColors.includes(colorInputValue.trim())
      ) {
        setAllColors((state) => [...state, colorInputValue.trim()]);
      }
    },
    [allColors, colorInputValue, setAllColors],
  );

  const cancelUpdate = useCallback<EventFunc<MouseEvent>>(() => {
    clearAllErrors();
    clearAllStates();
    dispatch(setAutoCardUpdateMode(false));
    dispatch(setAdminMenu(AdminMenu.AUTO_LIST));
  }, [clearAllErrors, clearAllStates, dispatch]);

  const clearAll = useCallback<EventFunc<MouseEvent>>(() => {
    clearAllErrors();
    clearAllStates();
    dispatch(setAutoCardUpdateMode(false));
  }, [clearAllErrors, clearAllStates, dispatch]);

  const inputType = useMemo<ReactNode>(
    () => dataTypes && (
    <Search
      id="auto_card_input_type"
      label="?????? ????????????????????"
      placeholder="???????????????? ??????"
      maxLength={20}
      value={type}
      error={typeError}
      data={dataTypes}
      setState={setType}
    />
    ),
    [dataTypes, type, typeError, setType],
  );

  const checkboxes = useMemo<ReactNode>(
    () => allColors.map((elem, index) => (
      <AdminCheckbox
        key={`config_checkbox_${index}`}
        id={`config_checkbox_${index}`}
        label={elem}
        checked={checkedColors.includes(elem)}
        setState={setCheckedColors}
      />
    )),
    [allColors, checkedColors, setCheckedColors],
  );

  const buttons = useMemo<ReactNode>(
    () => {
      const onClicks = [updateCar, cancelUpdate, removeCar];
      return dataConfigButton.map((elem, index) => {
        const buttonClassname = classNames("Config__btn", {
          Config__btn_right: index === 2,
        });
        const fontColor =          index === 1
          ? AdminButtonFontColor.BLUE_DARK
          : AdminButtonFontColor.WHITE;

        return (
          <div
            key={`config_btn_${index}`}
            className={buttonClassname}
          >
            <AdminButton
              key={`config_btn_${index}`}
              name={elem.name}
              bgColor={elem.bgColor}
              color={fontColor}
              onClick={onClicks[index]}
              loading={loading}
              disabled={loading}
            />
          </div>
        );
      });
    },
    [loading, updateCar, cancelUpdate, removeCar],
  );

  const currentButtons = useMemo<ReactNode>(
    () => (autoCardUpdateMode ? (
      buttons
    ) : (
      <div className="Config__btn">
        <AdminButton
          name="??????????????"
          bgColor={AdminButtonBgColor.BLUE}
          onClick={createCar}
          loading={loading}
          disabled={loading}
        />
      </div>
    )),
    [autoCardUpdateMode, buttons, loading, createCar],
  );

  const carNumber = number ? number.replace(/(\d+)/g, " $1 ") : "???? ????????????";

  const inputPriceWrapClassName = classNames("Config__input-wrap", {
    "Config__input-wrap_error": pricesError,
  });
  const pricesErrorClassName = classNames("Config__price-error", {
    "Config__price-error_active": pricesError,
  });

  const allColorError =    colorError === "???????????????????? ???????????? ????????." ? "???????????????????? ???????????? ????????." : null;
  const checkedColorError =    colorError === "???????????????????? ?????????????? ????????."
    ? "???????????????????? ?????????????? ????????."
    : null;

  const checkboxesWrapClassName = classNames("Config__checkboxes", {
    Config__checkboxes_error: checkedColorError,
  });
  const checkboxesErrorClassName = classNames("Config__checkboxes__error", {
    Config__checkboxes__error_active: checkedColorError,
  });

  return (
    <div className="Config">
      <div className="Config__header">
        <p>?????????????????? ????????????????????</p>
        <button
          className="Config__btn-clear"
          onClick={clearAll}
        >
          <Clear />
        </button>
      </div>
      <div className="Config__content-wrap">
        <div className="Config__content">
          <div className="Config__content__item">
            <AdminInput
              id="auto_card_input_model"
              label="???????????? ????????????????????"
              type="text"
              maxLength={20}
              placeholder="?????????????? ????????????"
              value={model}
              error={modelError}
              setState={setModel}
            />
          </div>

          <div className="Config__content__item">{inputType}</div>

          <div className="Config__content__item">
            <div className="Config__input-wrap">
              <div className="Config__input-number">
                <AdminInput
                  id="auto_card_input_number"
                  label="?????????? ????????????????????"
                  type="text"
                  maxLength={9}
                  placeholder="?????????????? ?????????? ????????????"
                  value={number}
                  error={numberError}
                  setState={setNumber}
                />
              </div>
              <div className="Config__car-number">{carNumber}</div>
            </div>
          </div>

          <div className="Config__content__item">
            <div className={inputPriceWrapClassName}>
              <div className="Config__input-price">
                <AdminInput
                  id="auto_card_input_min_price"
                  label="??????. ????????, ???"
                  type="text"
                  placeholder="?????????????? ?????????????????????? ??????????????????"
                  maxLength={20}
                  value={minPrice}
                  error={minPriceError}
                  setState={setMinPrice}
                />
              </div>
              <div className="Config__input-price">
                <AdminInput
                  id="auto_card_input_max_price"
                  label="????????. ????????, ???"
                  type="text"
                  placeholder="?????????????? ???????????????????????? ??????????????????"
                  maxLength={20}
                  value={maxPrice}
                  error={maxPriceError}
                  setState={setMaxPrice}
                />
              </div>
              <div className={pricesErrorClassName}>{pricesError}</div>
            </div>
          </div>

          <div className="Config__content__item">
            <form
              className="Config__form"
              onSubmit={onSubmitHandler}
            >
              <div className="Config__input-color">
                <Search
                  id="auto_card_input_color"
                  label="?????????????????? ??????????"
                  data={dataAutoColors}
                  placeholder="?????????????? ????????"
                  value={colorInputValue}
                  error={allColorError}
                  setState={setColorInputValue}
                />
              </div>

              <button className="Config__add-color">
                <div className="Config__add-color__icon Config__add-color__icon_h" />
                <div className="Config__add-color__icon Config__add-color__icon_v" />
              </button>
            </form>
            <div className={checkboxesWrapClassName}>
              {checkboxes}
              <div className={checkboxesErrorClassName}>
                {checkedColorError}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Config__footer">{currentButtons}</div>
    </div>
  );
};

export default Config;
