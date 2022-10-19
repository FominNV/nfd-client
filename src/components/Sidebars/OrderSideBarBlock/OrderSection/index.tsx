import {
  FC, MouseEvent, ReactNode, useCallback, useMemo,
} from "react";
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading, showOrderPopup } from "store/common/actions";
import { postOrder, setPostedOrder } from "store/user/actions";
import OrderPoint from "components/OrderBlock/OrderPoint";
import OrderButton from "components/UI/OrderButton";
import classNames from "classnames";
import { OrderButtonBgColor } from "components/UI/OrderButton/types";
import { formatNumber, formatTerm } from "common";
import { URLS } from "api/Axios/data";
import dataOrderButtons from "./data";
import { dataOrderExtra } from "../OrderSideBar/data";

import "./styles.scss";

const OrderSection: FC = () => {
  const { orderData, unlockedStep } = useTypedSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();

  const makeOrder = useCallback<EventFunc<MouseEvent>>(async () => {
    if (Object.values(orderData).every((elem) => elem !== null)) {
      dispatch(setLoading(true));
      dispatch(showOrderPopup(true));
      await dispatch(postOrder(URLS.ORDER_URL, orderData));
      dispatch(setLoading(false));
    }
  }, [orderData, dispatch]);

  const remakeOrder = useCallback<EventFunc<MouseEvent>>(async () => {
    dispatch(setPostedOrder(null));
  }, [dispatch]);

  const orderPlace = useMemo<ReactNode>(() => {
    if (orderData.cityId && orderData.pointId) {
      return (
        <OrderPoint
          title="Пункт выдачи"
          key="order_place"
          value={`${orderData.cityId.name},`}
          noWrapValue={orderData.pointId.name}
        />
      );
    }
    return null;
  }, [orderData.cityId, orderData.pointId]);

  const orderCar = useMemo<ReactNode>(() => {
    if (orderData.carId) {
      return (
        <OrderPoint
          title="Модель"
          key="order_model"
          noWrapValue={orderData.carId.name}
        />
      );
    }
    return null;
  }, [orderData.carId]);

  const carColor = useMemo<ReactNode>(() => {
    if (orderData.color) {
      return (
        <OrderPoint
          title="Цвет"
          key="order_color"
          noWrapValue={orderData.color}
        />
      );
    }
    return null;
  }, [orderData.color]);

  const orderTerm = useMemo<ReactNode>(() => {
    if (orderData.dateFrom && orderData.dateTo) {
      return (
        <OrderPoint
          title="Длительность аренды"
          key="order_term"
          noWrapValue={formatTerm(orderData.dateFrom, orderData.dateTo)}
        />
      );
    }
    return null;
  }, [orderData.dateFrom, orderData.dateTo]);

  const orderExtraServices = useMemo<ReactNode>(
    () => dataOrderExtra.map((elem, index) => {
      if (orderData[elem.id]) {
        return (
          <OrderPoint
            title={elem.title}
            key={`order_extra_${index}`}
            noWrapValue={elem.value}
          />
        );
      }
      return null;
    }),
    [orderData],
  );

  const orderButtons = useMemo<ReactNode>(
    () => dataOrderButtons.map((elem, index) => {
      const buttonClassName = classNames("SideBarSection__btn", {
        SideBarSection__btn_active: params.id === elem.id,
      });
      const disabled = !unlockedStep[elem.unlockStep];
      const onClick = elem.name === "Заказать" ? makeOrder : remakeOrder;

      return (
        <div
          className={buttonClassName}
          key={elem.id + index}
        >
          <OrderButton
            name={elem.name}
            bgColor={OrderButtonBgColor.GREEN}
            disabled={disabled}
            key={elem.id + index}
            navigatePath={elem.path}
            onClick={onClick}
          />
        </div>
      );
    }),
    [params.id, unlockedStep, makeOrder, remakeOrder],
  );

  const orderPrice = useMemo<ReactNode>(() => {
    const currentPrice = orderData.price
      ? `${orderData.price} ₽`
      : orderData.carId
        && `от ${formatNumber(orderData.carId.priceMin)} до ${formatNumber(
          orderData.carId.priceMax,
        )} ₽`;

    if (currentPrice) {
      return (
        <>
          <span
            className="SideBarSection__total-price_price"
            key="order_price"
          >
            Цена:&nbsp;
          </span>
          {currentPrice}
        </>
      );
    }
    return null;
  }, [orderData.carId, orderData.price]);

  return (
    <section className="SideBarSection">
      <div className="SideBarSection__order-points">
        {orderPlace}
        {orderCar}
        {carColor}
        {orderTerm}
        {orderExtraServices}
      </div>

      <p className="SideBarSection__total-price">{orderPrice}</p>
      <div className="SideBarSection__btn-wrap">{orderButtons}</div>
    </section>
  );
};

export default OrderSection;
