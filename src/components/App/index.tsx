import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "pages/AdminPage";
import LoginPage from "pages/LoginPage";
import Page404 from "pages/Page404";
import MainPage from "pages/MainPage";
import OrderPage from "pages/OrderPage";
import { PATHS } from "routes/consts";

import "./styles.scss";

const App: FC = () => (
  <Routes>
    <Route
      path="/"
      element={<MainPage />}
    />
    <Route
      path={PATHS.ADMIN}
      element={<LoginPage />}
    />
    <Route
      path={PATHS.ADMIN_LOGIN}
      element={<LoginPage />}
    />
    <Route
      path={PATHS.ADMIN_CONFIG}
      element={<AdminPage />}
    />
    <Route
      path={PATHS.MAIN}
      element={<MainPage />}
    />
    <Route
      path={`${PATHS.ORDER}:id`}
      element={<OrderPage />}
    />
    <Route
      path="*"
      element={<Page404 />}
    />
  </Routes>
);

export default App;
