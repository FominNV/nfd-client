import { FC, MouseEvent, useCallback } from "react";
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import { formatNumber } from "common";
import classNames from "classnames";
import { setOrderCar } from "store/user/actions";
import { IOrderCarCardProps } from "./types";

import "./styles.scss";

const OrderCarCard: FC<IOrderCarCardProps> = ({
  id, name, priceMin, priceMax, img,
}) => {
  const { carId } = useTypedSelector((state) => state.user.orderData);
  const { cars } = useTypedSelector((state) => state.admin);
  const dispatch = useDispatch();

  const setCar = useCallback<EventFunc<MouseEvent>>(() => cars.all && cars.all.forEach((elem) => {
    if (elem.id === id) dispatch(setOrderCar(elem));
  }), [cars.all, id, dispatch]);

  const cardClassName = classNames("OrderCarCard", {
    OrderCarCard_active: id === carId?.id,
  });
  const price = `${formatNumber(priceMin)} - ${formatNumber(priceMax)} ₽`;

  return (
    <button
      className={cardClassName}
      onClick={setCar}
    >
      <div className="OrderCarCard__text-wrap">
        <div className="OrderCarCard__name">{name}</div>
        <div className="OrderCarCard__price">{price}</div>
      </div>

      <div className="OrderCarCard__img-wrap">
        <img
          src={img}
          alt="car"
          className="OrderCarCard__img"
        />
      </div>
    </button>
  );
};

export default OrderCarCard;
