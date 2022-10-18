import { FC } from "react";

import loading from "assets/images/Loading/loading.gif";

import "./styles.scss";

const AdminLoading: FC = () => (
  <div className="AdminLoading">
    <img
      className="AdminLoading__img"
      src={loading}
      alt="loading"
    />
  </div>
);

export default AdminLoading;
