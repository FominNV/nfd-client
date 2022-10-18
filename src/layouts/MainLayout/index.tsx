import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTypedSelector } from "store/selectors";
import NavBar from "components/NavBar";
import MainHeader from "components/Headers/MainHeader";
import classNames from "classnames";

import "./styles.scss";

const MainLayout: FC = ({ children }) => {
  const { menuPopup, orderPopup, pageTitle } = useTypedSelector((state) => state.common);
  const mainLayoutClassname = classNames("MainLayout", {
    "MainLayout_scrollbar-none": menuPopup || orderPopup,
  });

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className={mainLayoutClassname}>
        <NavBar />

        <div className="MainLayout__content">
          <MainHeader />
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
