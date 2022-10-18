import {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useRef,
} from "react";
import classNames from "classnames";
import { IAdminTextareaProps } from "./types";

import "./styles.scss";

const AdminTextarea: FC<IAdminTextareaProps> = ({
  id,
  label,
  value,
  maxLength,
  placeholder,
  error,
  setState,
}) => {
  const area = useRef<HTMLTextAreaElement | null>(null);

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLTextAreaElement>>>(
    (e) => {
      setState(e.currentTarget.value);
    },
    [setState],
  );

  const clearInputValue = useCallback<EventFunc<MouseEvent>>(
    (e) => {
      e.preventDefault();
      setState("");
      area.current?.focus();
    },
    [setState],
  );

  const areaClassName = classNames("AdminTextarea__area", {
    AdminTextarea__area_error: error,
  });
  const clearButtonClassName = classNames("AdminTextarea__btn", {
    AdminTextarea__btn_active: value,
  });
  const errorClassName = classNames("AdminTextarea__error", {
    AdminTextarea__error_active: error,
  });

  return (
    <div className="AdminTextarea">
      <div className="AdminTextarea__header">
        <label
          className="AdminTextarea__label"
          htmlFor={id}
        >
          {label}
        </label>

        <button
          className={clearButtonClassName}
          onClick={clearInputValue}
        >
          Очистить
        </button>
      </div>

      <div className="AdminTextarea__area-block">
        <textarea
          id={id}
          className={areaClassName}
          value={value}
          name={label}
          ref={area}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />

        <div className={errorClassName}>{error}</div>
      </div>
    </div>
  );
};

export default AdminTextarea;
