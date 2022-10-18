import { FC } from "react";
import { useTypedSelector } from "store/selectors";
import { Helmet } from "react-helmet-async";
import AdminSidebar from "components/Sidebars/AdminSidebarBlock/AdminSidebar";

import "./styles.scss";

const AdminLayout: FC = ({ children }) => {
  const { pageTitle } = useTypedSelector((state) => state.common);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="AdminLayout">
        <AdminSidebar />
        {children}
      </div>
    </>
  );
};
export default AdminLayout;
