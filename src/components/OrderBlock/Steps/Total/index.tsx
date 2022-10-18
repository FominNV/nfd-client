import { FC, ReactNode, useMemo } from "react";
import { useTypedSelector } from "store/selectors";
import { format } from "date-fns";
import dataServiceItems from "./data";

import "./styles.scss";

const Total: FC = () => {
  const { orderData } = useTypedSelector((state) => state.user);

  const addServices = useMemo<ReactNode>(
    () => dataServiceItems.map((elem) => {
      if (orderData[elem.id]) {
        return (
          <div
            className="Total__item"
            key={elem.id}
          >
            {elem.title}
            {" "}
            <span className="Total__item_text-light">{elem.value}</span>
          </div>
        );
      }
      return false;
    }),
    [orderData],
  );

  const availableDate = useMemo<ReactNode>(
    () => orderData.dateFrom && (
    <div className="Total__item">
      Доступна с
      {" "}
      <span className="Total__item_text-light">
        {format(new Date(orderData.dateFrom), "dd.MM.yyyy kk:mm")}
      </span>
    </div>
    ),
    [orderData.dateFrom],
  );

  const carNumber = useMemo<ReactNode>(
    () => orderData.carId && (
    <div className="Total__car-number">
      {orderData.carId.number.replace(/(\d+)/g, " $1 ")}
    </div>
    ),
    [orderData.carId],
  );

  const carImage = useMemo<ReactNode>(
    () => orderData.carId && (
    <img
      src={orderData.carId.thumbnail.path}
      className="Total__car__img"
      alt="car_image"
    />
    ),
    [orderData.carId],
  );

  const carName = orderData.carId && <div className="Total__car__model">{orderData.carId.name}</div>;

  return (
    <div className="Total">
      <div className="Total__car">
        {carName}
        {carImage}
      </div>
      {carNumber}
      {addServices}
      {availableDate}
    </div>
  );
};

export default Total;
