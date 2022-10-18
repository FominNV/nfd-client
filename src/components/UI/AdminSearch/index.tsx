import {
  FC,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { IAdminSearchProps } from "./types";

import "./styles.scss";

const AdminSearch: FC<IAdminSearchProps> = ({
  id,
  label,
  value,
  defaultValue,
  placeholder,
  data,
  maxLength,
  error,
  disabled,
  setState,
}) => {
  const [showDataBlock, setShowDataBlock] = useState<boolean>(false);
  const input = useRef<HTMLInputElement | null>(null);

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>((e) => {
    setState(e.currentTarget.value);
  }, [setState]);

  const clearInputValue = useCallback<EventFunc<MouseEvent>>((e) => {
    e.preventDefault();
    setState("");
    input.current?.focus();
  }, [setState]);

  const onMouseDownHandler = useCallback<EventFunc<MouseEvent<HTMLButtonElement>>>((e) => {
    e.preventDefault();
    if (e.currentTarget.name === "нет совпадений") {
      setShowDataBlock(false);
      return;
    }
    setState(e.currentTarget.name);
    setShowDataBlock(false);
  }, [setState]);

  const onFocusHandler = useCallback<EventFunc<FocusEvent>>(() => {
    setShowDataBlock(true);
  }, []);

  const onBlurHandler = useCallback<EventFunc<FocusEvent>>(() => {
    setState(value as string);
    setShowDataBlock(false);
  }, [setState, value]);

  const onKeypressHandler = useCallback<EventFunc<KeyboardEvent<HTMLInputElement>>>(
    (e) => {
      if (e.key === "Enter") {
        setState(value as string);
        setShowDataBlock(false);
      }
    },
    [setState, value],
  );

  const dataList = useMemo<ReactNode>(() => {
    let resultData = data;

    if (value) {
      const filtered = data.filter((elem) => elem.toLowerCase().includes(value.toLowerCase()));
      resultData = filtered.length > 0 ? filtered : ["нет совпадений"];
    }

    return resultData.map((elem, index) => (
      <button
        className="AdminSearch__data-block__btn"
        key={id + index}
        name={elem}
        onMouseDown={onMouseDownHandler}
      >
        {elem}
      </button>
    ));
  }, [data, value, id, onMouseDownHandler]);

  useEffect(() => {
    if (defaultValue) {
      setState(defaultValue);
    }
  }, [defaultValue, setState]);

  const inputClassName = classNames("AdminSearch__input", {
    AdminSearch__input_error: error,
  });
  const clearButtonClassName = classNames("AdminSearch__btn", {
    AdminSearch__btn_active: value && !disabled,
  });
  const dataBlockClassName = classNames("AdminSearch__data-block", {
    "AdminSearch__data-block_active": showDataBlock,
  });
  const errorClassName = classNames("AdminSearch__error", {
    AdminSearch__error_active: error,
  });

  return (
    <div className="AdminSearch">
      <div className="AdminSearch__header">
        <label
          className="AdminSearch__label"
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

      <div className="AdminSearch__input-block">
        <input
          id={id}
          type="text"
          className={inputClassName}
          value={value}
          name={label}
          ref={input}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onKeyDown={onKeypressHandler}
          disabled={disabled}
          autoComplete="off"
        />
        <div className={dataBlockClassName}>{dataList}</div>
        <div className={errorClassName}>{error}</div>
      </div>
    </div>
  );
};

export default AdminSearch;
