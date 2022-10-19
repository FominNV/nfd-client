import {
  FC, MouseEvent, ReactNode, useCallback, useMemo,
} from "react";
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import { showOrderPopup } from "store/common/actions";
import OrderPoint from "components/OrderBlock/OrderPoint";
import OrderButton from "components/UI/OrderButton";
import { OrderButtonBgColor } from "components/UI/OrderButton/types";
import { formatTerm } from "common";
import { dataOrderExtra } from "../OrderSideBar/data";

import "./styles.scss";

const OrderedSection: FC = () => {
  const { postedOrder } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClickHandler = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(showOrderPopup(true));
  }, [dispatch]);

  const orderedPlace = useMemo<ReactNode>(
    () => (
      <OrderPoint
        title="Пункт выдачи"
        key="order_place"
        value={`${postedOrder && postedOrder.cityId.name},`}
        noWrapValue={postedOrder ? postedOrder.pointId.address : ""}
      />
    ),
    [postedOrder],
  );

  const orderedCar = useMemo<ReactNode>(
    () => (
      <OrderPoint
        title="Модель"
        key="order_model"
        noWrapValue={postedOrder?.carId.name}
      />
    ),
    [postedOrder],
  );

  const orderedCarColor = useMemo<ReactNode>(
    () => (
      <OrderPoint
        title="Цвет"
        key="order_color"
        noWrapValue={postedOrder?.color}
      />
    ),
    [postedOrder],
  );

  const orderedTerm = useMemo<ReactNode>(() => {
    const term = formatTerm(
      postedOrder?.createdAt as number,
      postedOrder?.dateTo as number,
    );
    return (
      <OrderPoint
        title="Длительность аренды"
        key="order_term"
        noWrapValue={term}
      />
    );
  }, [postedOrder]);

  const orderedExtraServices = useMemo<ReactNode>(
    () => postedOrder && dataOrderExtra.map((elem, index) => {
      if (postedOrder[elem.id]) {
        return (
          <OrderPoint
            title={elem.title}
            key={`order_extra_${index}`}
            noWrapValue={elem.value}
          />
        );
      }
      return false;
    }),
    [postedOrder],
  );

  const orderedPrice = useMemo<ReactNode>(
    () => (
      <>
        <span
          className="SideBarSection__total-price_price"
          key="orderer_price"
        >
          Цена:&nbsp;
        </span>
        {postedOrder?.price as number}
        {" "}
        ₽
      </>
    ),
    [postedOrder],
  );

  return (
    <section className="SideBarSection">
      <div className="SideBarSection__order-points">
        {orderedPlace}
        {orderedCar}
        {orderedCarColor}
        {orderedTerm}
        {orderedExtraServices}
      </div>

      <p className="SideBarSection__total-price">{orderedPrice}</p>

      <div className="SideBarSection__btn-wrap">
        <div className="SideBarSection__btn SideBarSection__btn_active">
          <OrderButton
            name="Отменить"
            bgColor={OrderButtonBgColor.BROWN_RED}
            key="ordered_btn"
            onClick={onClickHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default OrderedSection;
