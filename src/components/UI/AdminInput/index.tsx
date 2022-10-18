import {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

import { ReactComponent as Show } from "assets/icons/AdminInput/show.svg";
import { ReactComponent as Hide } from "assets/icons/AdminInput/hide.svg";
import { IAdminInputProps } from "./types";

import "./styles.scss";

const AdminInput: FC<IAdminInputProps> = ({
  id,
  label,
  type,
  value,
  maxLength,
  placeholder,
  defaultValue,
  error,
  readOnly,
  setState,
}) => {
  const [innerType, setInnerType] = useState<string>("password");
  const input = useRef<HTMLInputElement | null>(null);

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>(
    (e) => {
      setState(e.currentTarget.value);
    },
    [setState],
  );

  const clearAdminInputValue = useCallback<EventFunc<MouseEvent>>(
    (e) => {
      e.preventDefault();
      setState("");
      input.current?.focus();
    },
    [setState],
  );

  const showPasswordHandler = useCallback<EventFunc<MouseEvent>>((e) => {
    e.preventDefault();
    if (innerType === "password") {
      setInnerType("text");
    } else {
      setInnerType("password");
    }
  }, [innerType]);

  useEffect(() => {
    if (defaultValue) {
      setState(defaultValue);
    }
  }, []);

  const inputClassName = classNames("AdminInput__input", {
    AdminInput__input_error: error,
  });
  const clearButtonClassName = classNames("AdminInput__btn", {
    AdminInput__btn_active: value && !readOnly,
  });
  const errorClassName = classNames("AdminInput__error", {
    AdminInput__error_active: error,
  });
  const watchPassword = classNames("AdminInput__watch-password", {
    "AdminInput__watch-password_active": type === "password" && value,
  });

  const showButtonIcon = useMemo(
    () => (innerType === "text" ? <Hide /> : <Show />),
    [innerType],
  );
  const currentType = type === "password" ? innerType : type;

  return (
    <div className="AdminInput">
      <div className="AdminInput__header">
        <label
          className="AdminInput__label"
          htmlFor={id}
        >
          {label}
        </label>

        <button
          className={clearButtonClassName}
          onClick={clearAdminInputValue}
        >
          Очистить
        </button>
      </div>

      <div className="AdminInput__input-block">
        <input
          id={id}
          type={currentType}
          className={inputClassName}
          value={value}
          name={label}
          ref={input}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChangeHandler}
          readOnly={readOnly}
          autoComplete="on"
        />

        <button
          className={watchPassword}
          onClick={showPasswordHandler}
        >
          {showButtonIcon}
        </button>

        <div className={errorClassName}>{error}</div>
      </div>
    </div>
  );
};

export default AdminInput;
