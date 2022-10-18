import { FC, ReactNode, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "store/selectors";
import OrderedSection from "../OrderedSection";
import OrderSection from "../OrderSection";

import "./styles.scss";

const OrderSideBar: FC = () => {
  const { postedOrder } = useTypedSelector((state) => state.user);
  const params = useParams();

  const orderedContent = useMemo<ReactNode>(
    () => postedOrder
      && postedOrder.id.toString() === params.id && <OrderedSection />,
    [postedOrder, params.id],
  );
  const content = orderedContent || <OrderSection />;

  return (
    <div className="OrderSideBar">
      <h3 className="OrderSideBar__title">Ваш заказ:</h3>
      {content}
    </div>
  );
};

export default OrderSideBar;
