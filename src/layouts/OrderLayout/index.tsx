import { FC } from "react";
import MainLayout from "layouts/MainLayout";
import Breadcrumbs from "components/Breadcrumbs";

import "./styles.scss";

const OrderLayout: FC = ({ children }) => (
  <MainLayout>
    <Breadcrumbs />
    {children}
  </MainLayout>
);

export default OrderLayout;
