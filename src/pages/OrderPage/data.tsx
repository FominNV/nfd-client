import Place from "components/OrderBlock/Steps/Place";
import Car from "components/OrderBlock/Steps/Car";
import Extra from "components/OrderBlock/Steps/Extra";
import Total from "components/OrderBlock/Steps/Total";
import Ordered from "components/OrderBlock/Steps/Ordered";
import Canceled from "components/OrderBlock/Steps/Canceled";
import { OrderStatusType } from "store/user/types";
import {
  IDataPageTitleItem, IDataStatusItem, IOrderStep, OrderStepId,
} from "./types";

export const dataOrderSteps: IOrderStep[] = [
  {
    id: OrderStepId.PLACE,
    component: <Place />,
  },
  {
    id: OrderStepId.CAR,
    component: <Car />,
  },
  {
    id: OrderStepId.EXTRA,
    component: <Extra />,
  },
  {
    id: OrderStepId.TOTAL,
    component: <Total />,
  },
  {
    id: OrderStepId.ORDERED,
    component: <Ordered />,
  },
  {
    id: OrderStepId.CANCELED,
    component: <Canceled />,
  },
];

export const dataOrderStatuses: IDataStatusItem[] = [
  {
    key: "new",
    status: OrderStatusType.NEW,
  },
  {
    key: "confirm",
    status: OrderStatusType.CONFIRM,
  },
  {
    key: "cancel",
    status: OrderStatusType.CANCEL,
  },
];

export const dataPageTitles: IDataPageTitleItem[] = [
  {
    id: OrderStepId.PLACE,
    title: "NFD / Выбор места",
  },
  {
    id: OrderStepId.CAR,
    title: "NFD / Выбор авто",
  },
  {
    id: OrderStepId.EXTRA,
    title: "NFD / Выбор услуг",
  },
  {
    id: OrderStepId.TOTAL,
    title: "NFD / Итого",
  },
  {
    id: OrderStepId.ORDERED,
    title: "NFD / Ваш заказ",
  },
  {
    id: OrderStepId.CANCELED,
    title: "NFD / Отмена",
  },
];
