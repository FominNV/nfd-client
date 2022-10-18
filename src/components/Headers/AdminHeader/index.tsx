import {
  FC, MouseEvent, useCallback, useState,
} from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as Search } from "assets/icons/AdminHeader/search.svg";
import { ReactComponent as Notification } from "assets/icons/AdminHeader/notification.svg";
import { ReactComponent as Dropdown } from "assets/icons/AdminHeader/dropdown.svg";
import { logoutAdmin, setAdminToken } from "store/admin/actions";
import { AdminButtonBgColor } from "components/UI/AdminButton/types";
import classNames from "classnames";
import AdminButton from "components/UI/AdminButton";
import avatar from "assets/images/Header/avatar.jpg";

import "./styles.scss";

const AdminHeader: FC = () => {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onClickHandler = useCallback<EventFunc<MouseEvent>>(() => {
    setShowLogout(!showLogout);
  }, [showLogout]);

  const logoutUser = useCallback<EventFunc<MouseEvent>>(() => {
    sessionStorage.removeItem("adminToken");
    dispatch(setAdminToken(null));
    dispatch(logoutAdmin());
  }, [dispatch]);

  const userPanelFrontClassName = classNames("AdminHeader__user-panel__front", {
    "AdminHeader__user-panel__front_flip": showLogout,
  });
  const userPanelBackClassName = classNames("AdminHeader__user-panel__back", {
    "AdminHeader__user-panel__back_flip": !showLogout,
  });

  return (
    <div className="AdminHeader">
      <div className="AdminHeader__search-wrap">
        <input
          type="text"
          className="AdminHeader__search"
          placeholder="Поиск ..."
        />
        <div className="AdminHeader__search-icon">
          <Search />
        </div>
      </div>

      <div className="AdminHeader__notification">
        <div className="AdminHeader__notification-icon">
          <Notification />
          <div className="AdminHeader__notification-count">2</div>
        </div>
      </div>

      <div className="AdminHeader__user-panel">
        <button
          className={userPanelFrontClassName}
          onClick={onClickHandler}
        >
          <img
            className="AdminHeader__avatar"
            src={avatar}
            alt="avatar"
          />
          <p className="AdminHeader__name">Admin</p>
          <Dropdown />
        </button>

        <div className={userPanelBackClassName}>
          <button
            className="AdminHeader__btn-flip"
            onClick={onClickHandler}
          />
          <div className="AdminHeader__btn-logout">
            <AdminButton
              name="Выйти"
              bgColor={AdminButtonBgColor.RED}
              onClick={logoutUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
