import {
  ChangeEvent,
  FC,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

import { ReactComponent as Clear } from "assets/icons/OrderInput/clear.svg";
import { IOrderInputProps } from "./types";

import "./styles.scss";

const OrderInput: FC<IOrderInputProps> = ({
  id,
  label,
  value,
  defaultValue,
  placeholder,
  data,
  disabled,
  setState,
}) => {
  const [innerValue, setInnerValue] = useState<string>("");
  const [showDataBlock, setShowDataBlock] = useState<boolean>(false);

  const input = useRef<HTMLInputElement | null>(null);

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>(
    (e) => {
      setInnerValue(e.currentTarget.value);
    },
    [],
  );

  const clearInputValue = useCallback<EventFunc<MouseEvent>>((e) => {
    setInnerValue("");
    setState(null);
    input.current?.focus();
  }, [setState]);

  const onMouseDownHandler = useCallback<
  EventFunc<MouseEvent<HTMLButtonElement>>
  >((e) => {
    if (e.currentTarget.name === "нет совпадений") {
      setShowDataBlock(false);
      return;
    }

    setInnerValue(e.currentTarget.name);
    setShowDataBlock(false);
  }, []);

  const onFocusHandler = useCallback<EventFunc<FocusEvent>>(() => {
    setShowDataBlock(true);
  }, []);

  const onBlurHandler = useCallback<EventFunc<FocusEvent>>(() => {
    setState(innerValue);
    setShowDataBlock(false);
  }, [setState, innerValue]);

  const onKeypressHandler = useCallback<
  EventFunc<KeyboardEvent<HTMLInputElement>>
  >(
    (e) => {
      if (e.key === "Enter") {
        setState(innerValue);
        setShowDataBlock(false);
      }
    },
    [setState, innerValue],
  );

  const dataList = useMemo<JSX.Element[]>(() => {
    let resultData = data;

    if (innerValue) {
      const filtered = data.filter((elem) => elem.toLowerCase().includes(innerValue.toLowerCase()));
      resultData = filtered.length > 0 ? filtered : ["нет совпадений"];
    }

    return resultData.map((elem, index) => (
      <button
        className="OrderInput__data-block__btn"
        key={id + index}
        name={elem}
        onMouseDown={onMouseDownHandler}
      >
        {elem}
      </button>
    ));
  }, [data, innerValue, id, onMouseDownHandler]);

  useEffect(() => {
    if (value) {
      setInnerValue(value);
    } else {
      setInnerValue("");
    }
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      setInnerValue(defaultValue);
    }
  }, [defaultValue]);

  const clearButtonClassName = classNames("OrderInput__btn", {
    OrderInput__btn_active: innerValue,
  });
  const dataBlockClassName = classNames("OrderInput__data-block", {
    "OrderInput__data-block_active": showDataBlock,
  });

  return (
    <div className="OrderInput">
      <label
        className="OrderInput__label"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="OrderInput__input-block">
        <input
          id={id}
          type="text"
          className="OrderInput__inp"
          value={innerValue}
          name={label}
          ref={input}
          placeholder={placeholder}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onKeyDown={onKeypressHandler}
          disabled={disabled}
        />

        <button
          className={clearButtonClassName}
          onClick={clearInputValue}
        >
          <Clear />
        </button>

        <div className={dataBlockClassName}>{dataList}</div>
      </div>
    </div>
  );
};

export default OrderInput;
