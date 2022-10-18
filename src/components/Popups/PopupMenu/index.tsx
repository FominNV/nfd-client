import { FC, ReactNode, useMemo } from "react";
import { PATHS } from "routes/consts";
import dataPopupMenu from "./data";

import "./styles.scss";

const PopupMenu: FC = () => {
  const authLinks = useMemo<ReactNode>(
    () => dataPopupMenu.auth.map((elem, index) => (
      <a
        href={PATHS.ADMIN_LOGIN}
        className="PopupMenu__auth__item"
        key={`item_${index}`}
      >
        {elem}
      </a>
    )),
    [],
  );

  return (
    <div className="PopupMenu">
      <div className="PopupMenu__links">
        <a
          href={PATHS.ADMIN_LOGIN}
          className="PopupMenu__links__item"
        >
          Панель управления
        </a>
      </div>

      <div className="PopupMenu__auth">{authLinks}</div>
    </div>
  );
};

export default PopupMenu;
