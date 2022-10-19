import { FC, ReactNode, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PATHS } from "routes/consts";
import { showMenuPopup } from "store/common/actions";
import dataPopupMenu from "./data";

import "./styles.scss";

const PopupMenu: FC = () => {
  const dispatch = useDispatch();

  const authLinks = useMemo<ReactNode>(
    () => dataPopupMenu.auth.map((elem, index) => (
      <Link
        onClick={() => dispatch(showMenuPopup(false))}
        to={PATHS.ADMIN_LOGIN}
        className="PopupMenu__auth__item"
        key={`item_${index}`}
      >
        {elem}
      </Link>
    )),
    [dispatch],
  );

  return (
    <div className="PopupMenu">
      <div className="PopupMenu__links">
        <Link
          onClick={() => dispatch(showMenuPopup(false))}
          to={PATHS.ADMIN_LOGIN}
          className="PopupMenu__links__item"
        >
          Панель управления
        </Link>
      </div>

      <div className="PopupMenu__auth">{authLinks}</div>
    </div>
  );
};

export default PopupMenu;
