import {
  FC, MouseEvent, useCallback,
} from "react";
import classNames from "classnames";
import { ReactComponent as Check } from "assets/icons/AdminCheckbox/check.svg";
import { IAdminCheckboxProps } from "./types";

import "./styles.scss";

const AdminCheckbox: FC<IAdminCheckboxProps> = ({
  id, label, checked, disabled, setState,
}) => {
  const onClickHandler = useCallback<EventFunc<MouseEvent>>((e) => {
    e.preventDefault();
    setState((state) => {
      if (state.includes(label)) {
        return state.filter((elem) => elem !== label);
      }
      return [...state, label];
    });
  }, [label, setState]);

  const checkboxCustomClassName = classNames("AdminCheckbox__custom", {
    AdminCheckbox__custom_checked: checked,
  }, {
    AdminCheckbox__custom_disabled: disabled,
  });

  return (
    <button
      className="AdminCheckbox"
      onClick={onClickHandler}
      disabled={disabled}
    >
      <div className={checkboxCustomClassName}>
        <Check className="AdminCheckbox__icon" />
      </div>
      <label
        className="AdminCheckbox__label"
        htmlFor={id}
      >
        {label}
      </label>
    </button>
  );
};

export default AdminCheckbox;
