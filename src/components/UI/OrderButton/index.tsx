import React, { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

import classNames from "classnames";
import { IOrderButtonProps } from "./types";

import "./styles.scss";

const OrderButton: FC<IOrderButtonProps> = ({
  name,
  color,
  borderRadius,
  bgColor,
  disabled,
  navigatePath,
  loading,
  onClick,
}) => {
  const navigate = useNavigate();
  const buttonClassName = classNames(
    "OrderButton",
    color,
    borderRadius,
    bgColor,
  );

  const onMouseDownHandler = useCallback<EventFunc<React.MouseEvent>>(() => {
    const path = navigatePath || "";
    navigate(path);
  }, [navigate, navigatePath]);

  const fetching = loading && (
    <div className="OrderButton__loading">
      <ReactLoading
        type="spokes"
        color="gray"
        height={18}
        width={18}
      />
    </div>
  );

  return (
    <button
      className={buttonClassName}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onMouseDownHandler}
    >
      <div className="OrderButton__filter" />
      <div className="OrderButton__name">{fetching || name}</div>
    </button>
  );
};

export default OrderButton;
