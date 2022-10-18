import { FC } from "react";
import { IOrderPointProps } from "./types";

import "./styles.scss";

const OrderPoint: FC<IOrderPointProps> = ({ title, value, noWrapValue }) => (
  <div className="OrderPoint">
    <div className="OrderPoint__title">{title}</div>
    <div className="OrderPoint__dots" />
    <div className="OrderPoint__value">
      {value}
      {" "}
      <p className="OrderPoint__value_no-wrap">{noWrapValue}</p>
    </div>
  </div>
);

export default OrderPoint;
