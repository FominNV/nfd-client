import React, { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import classNames from "classnames";
import { IAdminButtonProps } from "./types";

import "./styles.scss";

const AdminButton: FC<IAdminButtonProps> = ({
  name,
  color,
  bgColor,
  disabled,
  navigatePath,
  loading,
  onClick,
}) => {
  const navigate = useNavigate();
  const buttonClassName = classNames("AdminButton", color, bgColor);

  const onMouseDownHandler = useCallback<EventFunc<React.MouseEvent>>(() => {
    const path = navigatePath || "";
    navigate(path);
  }, [navigate, navigatePath]);

  const fetching = loading && (
    <div className="AdminButton__loading">
      <ReactLoading
        type="spokes"
        color="white"
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
      <div className="AdminButton__filter" />
      <div className="AdminButton__name">{fetching || name}</div>
    </button>
  );
};

export default React.memo(AdminButton);
