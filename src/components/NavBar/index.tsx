import {
  FC, MouseEvent, ReactNode, useCallback, useMemo,
} from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "store/selectors";
import { setLanguage, showMenuPopup } from "store/common/actions";
import PopupMenu from "components/Popups/PopupMenu";
import classNames from "classnames";

import { ReactComponent as Close } from "assets/icons/NavBar/close.svg";
import { ReactComponent as Burger } from "assets/icons/NavBar/menu_btn.svg";
import { ReactComponent as Eng } from "assets/icons/NavBar/eng.svg";
import { ReactComponent as Rus } from "assets/icons/NavBar/rus.svg";
import { ReactComponent as Circle } from "assets/icons/NavBar/circle.svg";

import "./styles.scss";

const NavBar: FC = () => {
  const { menuPopup, rusLang } = useTypedSelector((state) => state.common);
  const dispatch = useDispatch();

  const toggleLanguage = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(setLanguage(!rusLang));
  }, [dispatch, rusLang]);

  const toggleMenu = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(showMenuPopup(!menuPopup));
  }, [dispatch, menuPopup]);

  const menuIcon = useMemo<ReactNode>(
    () => (menuPopup ? (
      <Close className="NavBar__menu_icon" />
    ) : (
      <Burger className="NavBar__menu_icon" />
    )),
    [menuPopup],
  );

  const langIcon = useMemo<ReactNode>(() => (rusLang ? <Rus /> : <Eng />), [rusLang]);
  const popuMenu = useMemo<ReactNode>(() => menuPopup && <PopupMenu />, [menuPopup]);

  const navbarClassName = classNames("NavBar__menu", { NavBar__menu_active: menuPopup });
  const langClassName = classNames("NavBar__lang", { NavBar__lang_active: menuPopup });

  return (
    <>
      {popuMenu}
      <nav className="NavBar">
        <button
          className={navbarClassName}
          onClick={toggleMenu}
        >
          {menuIcon}
        </button>

        <div className={langClassName}>
          <button
            className="NavBar__lang_btn"
            onClick={toggleLanguage}
          >
            <div className="NavBar__lang_name">{langIcon}</div>
            <div className="NavBar__lang_circle">
              <Circle />
            </div>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
