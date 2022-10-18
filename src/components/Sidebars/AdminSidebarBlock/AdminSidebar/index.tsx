import {
  FC, ReactNode, useCallback, useMemo, useState,
} from "react";
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import { setAdminMenu } from "store/admin/actions";
import { ReactComponent as Logo } from "assets/icons/Admin/logo.svg";
import { ReactComponent as Open } from "assets/icons/Sidebar/open.svg";
import { ReactComponent as Back } from "assets/icons/Sidebar/back.svg";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { PATHS } from "routes/consts";
import dataAdminSidebar from "./data";
import AdminSidebarItem from "../AdminSidebarItem";

import "./styles.scss";

const AdminSidebar: FC = () => {
  const { adminMenu } = useTypedSelector((state) => state.admin);
  const [showBar, setShowBar] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setMenu = useCallback<VoidFunc<string>>((name) => {
    dispatch(setAdminMenu(name));
  }, [dispatch]);

  const barIcon = useMemo<ReactNode>(() => (
    showBar ? (
      <Back
        width={20}
        height={20}
      />
    ) : (
      <Open
        width={20}
        height={20}
      />
    )
  ), [showBar]);

  const menuItems = useMemo<ReactNode>(() => (
    dataAdminSidebar.map((elem) => (
      <AdminSidebarItem
        id={elem.id}
        key={elem.id}
        name={elem.name}
        icon={elem.icon}
        active={elem.name === adminMenu}
        callback={setMenu}
      />
    ))
  ), [adminMenu, setMenu]);

  const AdminSidebarClassName = classNames("AdminSidebar", {
    AdminSidebar_active: showBar,
  });

  return (
    <div className={AdminSidebarClassName}>
      <button
        className="AdminSidebar__btn-show"
        onClick={() => setShowBar(!showBar)}
      >
        {barIcon}
      </button>
      <button
        onClick={() => navigate(PATHS.MAIN)}
        className="AdminSidebar__header"
      >
        <div className="AdminSidebar__logo">
          <Logo
            width={21.5}
            height={21.5}
          />
        </div>
        Need for car
      </button>
      {menuItems}
    </div>
  );
};

export default AdminSidebar;
