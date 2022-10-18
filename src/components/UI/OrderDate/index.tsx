import {
  ChangeEvent, FC, FocusEvent, MouseEvent, useCallback, useEffect, useState,
} from "react";
import classNames from "classnames";
import { format } from "date-fns";

import { ReactComponent as Clear } from "assets/icons/OrderInput/clear.svg";
import { IOrderDateProps } from "./types";

import "./styles.scss";

const OrderDate: FC<IOrderDateProps> = ({
  id, label, disabled, defaultValue, setState,
}) => {
  const [innerValue, setInnerValue] = useState<string>("");
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>((e) => {
    if (new Date(e.currentTarget.value).getTime() < Date.now()) {
      setInnerValue(format(Date.now(), "yyyy-MM-dd'T'kk:mm"));
      setState(format(Date.now(), "yyyy-MM-dd'T'kk:mm"));
    } else {
      setInnerValue(e.currentTarget.value);
      setState(e.currentTarget.value);
    }
  }, [setState]);

  const clearInputValue = useCallback<EventFunc<MouseEvent>>(() => {
    setInnerValue("");
    setState(null);
  }, [setState]);

  const onFocusHandler = useCallback<EventFunc<FocusEvent>>(() => {
    setShowPlaceholder(false);
  }, []);

  const onBlurHandler = useCallback<EventFunc<FocusEvent>>(() => {
    if (!innerValue) {
      setShowPlaceholder(true);
    }
  }, [innerValue]);

  useEffect(() => {
    if (defaultValue) {
      setInnerValue(defaultValue);
      setState(defaultValue);
    }
  }, []);

  useEffect(() => {
    if (innerValue) {
      setShowPlaceholder(false);
    } else {
      setShowPlaceholder(true);
    }
  }, [innerValue]);

  const clearButtonClassName = classNames("OrderDate__btn", {
    OrderDate__btn_active: innerValue,
  });
  const inputClassName = classNames("OrderDate__input", {
    OrderDate__input_filled: innerValue,
  });
  const placeholderClassName = classNames("OrderDate__input-placeholder", {
    "OrderDate__input-placeholder_active": showPlaceholder,
  });

  return (
    <div className="OrderDate">
      <label
        className="OrderDate__label"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="OrderDate__input-block">
        <input
          id={id}
          type="datetime-local"
          className={inputClassName}
          name={label}
          value={innerValue}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          disabled={disabled}
        />

        <div className={placeholderClassName}>Введите дату и время</div>

        <button
          className={clearButtonClassName}
          onClick={clearInputValue}
        >
          <Clear />
        </button>
      </div>
    </div>
  );
};

export default OrderDate;
