import {
  FC, MouseEvent, useCallback, useEffect,
} from "react";
import { IOrderRadioProps } from "./types";

import "./styles.scss";

const OrderRadio: FC<IOrderRadioProps> = ({
  id, value, name, checked, setState,
}) => {
  const onClickHandler = useCallback<EventFunc<MouseEvent>>(
    () => setState(value),
    [setState, value],
  );

  useEffect(() => {
    if (checked) {
      setState(value);
    }
  }, [checked, value, setState]);

  return (
    <label
      htmlFor={id}
      className="OrderRadio"
    >
      <input
        id={id}
        value={value}
        type="radio"
        className="OrderRadio__radio"
        defaultChecked={checked}
        name={name}
        onClick={onClickHandler}
      />

      <div className="OrderRadio__custom" />
      <p className="OrderRadio__text">{value}</p>
    </label>
  );
};

export default OrderRadio;
