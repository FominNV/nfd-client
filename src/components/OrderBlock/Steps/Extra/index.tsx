import {
  FC, ReactNode, useCallback, useEffect, useMemo, useState,
} from "react";
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setOrderDate, setLockOrderStep, setOrderExtra, setOrderPrice, setOrderRate,
} from "store/user/actions";
import { format, hoursToMilliseconds } from "date-fns";
import OrderDate from "components/UI/OrderDate";
import OrderRadio from "components/UI/OrderRadio";
import OrderCheckbox from "components/UI/OrderCheckbox";
import classNames from "classnames";
import { setLoading } from "store/common/actions";
import { getEntities } from "store/admin/actions";
import { URLS } from "api/Axios/data";
import { AdminActionTypes } from "store/admin/types";
import { formatTerm } from "common";
import { OrderStepId } from "pages/OrderPage/types";
import { dataAddService } from "./data";
import {
  CalcOrderPriceType, CheckDatesType, minuteRate, SetOrderDatesType,
} from "./types";

import "./styles.scss";

const Extra: FC = () => {
  const {
    color, rateId, carId, dateFrom, dateTo, price,
  } = useTypedSelector((state) => state.user.orderData);
  const { rates } = useTypedSelector((state) => state.admin);
  const [carColor, setCarColor] = useState<string>("");
  const [orderDateFrom, setOrderDateFrom] = useState<Nullable<string>>(null);
  const [orderDateTo, setOrderDateTo] = useState<Nullable<string>>(null);
  const [errorDate, setErrorDate] = useState<Nullable<string>>(null);
  const [tarrif, setTarrif] = useState<string>("");
  const [term, setTerm] = useState<Nullable<string>>(null);
  const [fullTank, setFullTank] = useState<boolean>(false);
  const [childChair, setChildChair] = useState<boolean>(false);
  const [rightHandDrive, setRightHandDrive] = useState<boolean>(false);

  const params = useParams();
  const dispatch = useDispatch();

  const loadRates = useCallback<VoidFunc<void>>(async () => {
    dispatch(setLoading(true));
    await dispatch(getEntities(URLS.RATE_URL, AdminActionTypes.GET_ALL_RATES));
    dispatch(setLoading(false));
  }, [dispatch]);

  const checkDates = useCallback<CheckDatesType>((date1, date2) => {
    if (!date1 || !date2) return false;

    const from = new Date(date1).getTime();
    const to = new Date(date2).getTime();
    if (from > to) {
      setErrorDate("Введены некорректные даты");
      return false;
    }
    if (to - from < 3600000) {
      setErrorDate("Заказ должен быть не менее 1 часа");
      return false;
    }

    setErrorDate(null);
    return true;
  }, []);

  const setOrderDates = useCallback<SetOrderDatesType>(
    (currentRate, date1, date2) => {
      const days = Number(currentRate.rateTypeId.unit.replace(/\D+/g, "")) || 1;
      const from = new Date(date1).getTime();
      const to = date2
        ? new Date(date2).getTime()
        : new Date(date1).getTime() + hoursToMilliseconds(24 * days);
      dispatch(setOrderDate({ dateFrom: from, dateTo: to }));
    },
    [dispatch],
  );

  const calcOrderPrice = useCallback<CalcOrderPriceType>(
    (currentRate, date1 = null, date2 = null) => {
      let orderPrice = 0;
      if (checkDates(date1, date2)) {
        const from = new Date(orderDateFrom as string).getTime();
        const to = new Date(orderDateTo as string).getTime();
        orderPrice = Math.ceil((to - from) / 60000) * Number(currentRate.price);
      } else {
        orderPrice = currentRate.price;
      }

      if (fullTank) orderPrice += 500;
      if (childChair) orderPrice += 200;
      if (rightHandDrive) orderPrice += 1600;

      return orderPrice;
    },
    [
      fullTank,
      childChair,
      rightHandDrive,
      orderDateFrom,
      orderDateTo,
      checkDates,
    ],
  );

  useEffect(() => {
    if (params.id === OrderStepId.EXTRA) {
      const extra = {
        color: carColor,
        term,
        tarrif: tarrif.split(",")[0],
        isFullTank: fullTank,
        isNeedChildChair: childChair,
        isRightWheel: rightHandDrive,
      };
      dispatch(setOrderExtra(extra));
    }
  }, [
    params.id,
    carColor,
    term,
    tarrif,
    fullTank,
    childChair,
    rightHandDrive,
    dispatch,
  ]);

  useEffect(() => {
    if (!rates.all && params.id === OrderStepId.EXTRA) {
      loadRates();
    }
  }, [rates.all, params.id, loadRates, dispatch]);

  useEffect(() => {
    if (color && rateId && !errorDate && price) {
      dispatch(setLockOrderStep(OrderStepId.TOTAL, true));
    } else {
      dispatch(setLockOrderStep(OrderStepId.TOTAL, false));
    }
  }, [color, rateId, errorDate, price, dispatch]);

  useEffect(() => {
    if (
      params.id === OrderStepId.EXTRA
      && rateId
      && rateId.rateTypeId.name !== minuteRate
    ) {
      dispatch(setOrderPrice(calcOrderPrice(rateId)));
    } else if (
      rateId
      && rateId.rateTypeId.name === minuteRate
      && checkDates(orderDateFrom, orderDateTo)
    ) {
      dispatch(
        setOrderPrice(calcOrderPrice(rateId, orderDateFrom, orderDateTo)),
      );
    } else if (
      rateId
      && rateId.rateTypeId.name === minuteRate
      && !checkDates(orderDateFrom, orderDateTo)
    ) {
      dispatch(setOrderPrice(null));
    }
  }, [
    orderDateFrom,
    orderDateTo,
    params.id,
    rateId,
    dispatch,
    checkDates,
    calcOrderPrice,
  ]);

  useEffect(() => {
    if (rateId && rateId.rateTypeId.name !== minuteRate && orderDateFrom) {
      setOrderDates(rateId, orderDateFrom);
    } else if (
      rateId
      && rateId.rateTypeId.name === minuteRate
      && checkDates(orderDateFrom, orderDateTo)
    ) {
      setOrderDates(rateId, orderDateFrom as string, orderDateTo as string);
    } else {
      dispatch(setOrderDate(null));
    }
  }, [
    orderDateFrom,
    orderDateTo,
    rateId,
    errorDate,
    setOrderDates,
    checkDates,
    dispatch,
  ]);

  useEffect(() => {
    if (tarrif && rates.all) {
      rates.all.forEach((elem) => {
        if (tarrif.split(",")[0] === elem.rateTypeId.name) {
          dispatch(setOrderRate(elem));
        }
      });
    }
  }, [tarrif, rates.all, dispatch]);

  useEffect(() => {
    if (dateFrom && dateTo) {
      setTerm(formatTerm(dateFrom, dateTo));
    } else {
      setTerm(null);
    }
  }, [dateFrom, dateTo]);

  const colorRadios = useMemo<ReactNode>(
    () => carId
      && carId.colors.map((elem, index) => (
        <OrderRadio
          id={`radio_color_${index}`}
          value={elem}
          key={`radio_color_${index}`}
          name="colors"
          checked={!index}
          setState={setCarColor}
        />
      )),
    [carId],
  );

  const tarrifRadios = useMemo<ReactNode>(
    () => rates.all
      && rates.all.map((elem, index) => {
        const radioValue = `${elem.rateTypeId.name}, ${elem.price}₽/${elem.rateTypeId.unit}`;
        return (
          <OrderRadio
            id={`input_radio_${elem.rateTypeId.id}`}
            value={radioValue}
            key={elem.rateTypeId.id}
            name="tarrif"
            checked={!index}
            setState={setTarrif}
          />
        );
      }),
    [rates.all],
  );

  const serviceCheckboxes = useMemo<ReactNode>(() => {
    const setStatesArray = [setFullTank, setChildChair, setRightHandDrive];
    return dataAddService.map((elem, index) => (
      <OrderCheckbox
        id={`checkbox_${elem.id}_${index}`}
        label={elem.label}
        key={`checkbox_service_${index}`}
        setState={setStatesArray[index]}
      />
    ));
  }, []);

  const errorDateClassName = classNames("Extra__date-error", {
    "Extra__date-error_active":
      errorDate && rateId && rateId.rateTypeId.name === "Поминутный",
  });
  const dateBlockClassName = classNames("Extra__date-block", {
    "Extra__date-block_error":
      errorDate && rateId && rateId.rateTypeId.name === "Поминутный",
  });

  const disableInputDate = Boolean(rateId && rateId.rateTypeId.name !== "Поминутный");
  const defaultDateFrom = format(Date.now(), "yyyy-MM-dd'T'kk:mm");

  return (
    <div className="Extra">
      <div className="Extra__block">
        <p className="Extra__title">Цвет</p>
        <fieldset
          name="colors"
          className="Extra__color-radios"
        >
          {colorRadios}
        </fieldset>
      </div>

      <div className="Extra__block">
        <p className="Extra__title">Дата аренды</p>
        <div className={dateBlockClassName}>
          <div className={errorDateClassName}>{errorDate}</div>
          <OrderDate
            id="dateFrom"
            label="С"
            setState={setOrderDateFrom}
            defaultValue={defaultDateFrom}
          />
          <OrderDate
            id="dateTo"
            label="По"
            setState={setOrderDateTo}
            disabled={disableInputDate}
          />
        </div>
      </div>

      <div className="Extra__block">
        <p className="Extra__title">Тариф</p>
        <fieldset
          name="tarrif"
          className="Extra__tarrif-radios"
        >
          {tarrifRadios}
        </fieldset>
      </div>

      <div className="Extra__block">
        <p className="Extra__title">Доп услуги</p>
        <div className="Extra__add-service">{serviceCheckboxes}</div>
      </div>
    </div>
  );
};

export default Extra;
