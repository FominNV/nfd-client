import { FC, useCallback } from "react";
import classNames from "classnames";
import { IAdminSidebarItemProps } from "./types";

import "./styles.scss";

const AdminSidebarItem: FC<IAdminSidebarItemProps> = ({
  id, name, icon, active, callback,
}) => {
  const onClickHandler = useCallback(() => {
    callback(name);
  }, [name, callback]);

  const AdminSidebarItemClassName = classNames("AdminSidebarItem", {
    AdminSidebarItem_active: active,
  });

  return (
    <button
      className={AdminSidebarItemClassName}
      onClick={onClickHandler}
    >
      <div className="AdminSidebarItem__icon">{icon}</div>
      <div className="AdminSidebarItem__name">{name}</div>
    </button>
  );
};

export default AdminSidebarItem;
