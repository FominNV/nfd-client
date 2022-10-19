import { FC } from "react";
import ReactLoading from "react-loading";

import "./styles.scss";

const OrderLoading: FC = () => (
  <div className="OrderLoading">
    <ReactLoading
      type="spinningBubbles"
      color="green"
      height={36}
      width={36}
    />
  </div>
);

export default OrderLoading;
