import { FC, ReactNode, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "store/selectors";
import { format } from "date-fns";
import { OrderStepId } from "pages/OrderPage/types";
import OrderLoading from "components/UI/OrderLoading";
import dataServiceItems from "../Total/data";

import "./styles.scss";

const Ordered: FC = () => {
  const { postedOrder } = useTypedSelector((state) => state.user);
  const { loading } = useTypedSelector((state) => state.common);
  const params = useParams();

  const addServices = useMemo<ReactNode>(
    () => dataServiceItems.map((elem) => {
      if (postedOrder && postedOrder[elem.id]) {
        return (
          <div
            className="Ordered__item"
            key={elem.id}
          >
            {elem.title}
            {" "}
            <span className="Ordered__item_text-light">{elem.value}</span>
          </div>
        );
      }
      return false;
    }),
    [postedOrder],
  );

  const availableDate = useMemo<ReactNode>(
    () => postedOrder
      && params.id === OrderStepId.ORDERED && (
        <div className="Ordered__item">
          Доступна с
          {" "}
          <span className="Ordered__item_text-light">
            {format(new Date(postedOrder.dateFrom), "dd.MM.yyyy kk:mm")}
          </span>
        </div>
    ),
    [postedOrder, params.id],
  );

  const carNumber = useMemo<ReactNode>(
    () => postedOrder && postedOrder.carId && postedOrder.carId.number  && (
    <div className="Total__car-number">
      {postedOrder.carId.number.replace(/(\d+)/g, " $1 ")}
    </div>
    ),
    [postedOrder],
  );

  const carImage = useMemo<ReactNode>(
    () => postedOrder && postedOrder.carId && postedOrder.carId.thumbnail.path && (
    <img
      src={postedOrder.carId.thumbnail.path}
      className="Ordered__car__img"
      alt="car_image"
    />
    ),
    [postedOrder],
  );

  const content = useMemo<ReactNode>(
    () => (loading ? (
      <OrderLoading />
    ) : (
      <>
        <div className="Ordered__order-text">Ваш заказ подтверждён</div>
        <div className="Ordered__car">
          <div className="Ordered__car__model">
            {postedOrder && postedOrder.carId && postedOrder.carId.name}
          </div>
          {carImage}
        </div>
        {carNumber}
        {addServices}
        {availableDate}
      </>
    )),
    [
      loading,
      carImage,
      addServices,
      postedOrder,
      availableDate,
      carNumber,
    ],
  );

  return <div className="Ordered">{content}</div>;
};

export default Ordered;
