import {
  FC, MouseEvent, useCallback, useState,
} from "react";
import { ReactComponent as Check } from "assets/icons/OrderCheckbox/check.svg";
import classNames from "classnames";
import { IOrderCheckboxProps } from "./types";

import "./styles.scss";

const OrderCheckBox: FC<IOrderCheckboxProps> = ({
  id, label, checked, setState,
}) => {
  const [inputChecked, setInputChecked] = useState(checked || false);

  const onClickHandler = useCallback<EventFunc<MouseEvent>>(() => {
    setState((prev) => !prev);
    setInputChecked(!inputChecked);
  }, [setState, inputChecked]);

  const checkClessName = classNames("OrderCheckbox__check", {
    OrderCheckbox__check_active: inputChecked,
  });

  return (
    <label
      htmlFor={id}
      className="OrderCheckbox"
    >
      <input
        id={id}
        type="checkbox"
        className="OrderCheckbox__checkbox"
        defaultChecked={checked}
        onClick={onClickHandler}
      />

      <div className="OrderCheckbox__custom">
        <Check className={checkClessName} />
      </div>

      <p className="OrderCheckbox__text">{label}</p>
    </label>
  );
};

export default OrderCheckBox;
