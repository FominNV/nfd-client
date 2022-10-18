import { OrderStepId } from "pages/OrderPage/types";
import { PATHS } from "routes/consts";
import { IOrderButton } from "./types";

const dataOrderButtons: IOrderButton[] = [
  {
    id: OrderStepId.PLACE,
    name: "Выбрать модель",
    path: PATHS.ORDER_CAR,
    unlockStep: OrderStepId.CAR,
  },
  {
    id: OrderStepId.CAR,
    name: "Дополнительно",
    path: PATHS.ORDER_EXTRA,
    unlockStep: OrderStepId.EXTRA,
  },
  {
    id: OrderStepId.EXTRA,
    name: "Итого",
    path: PATHS.ORDER_TOTAL,
    unlockStep: OrderStepId.TOTAL,
  },
  {
    id: OrderStepId.TOTAL,
    name: "Заказать",
    path: PATHS.ORDER_TOTAL,
    unlockStep: OrderStepId.TOTAL,
  },
  {
    id: OrderStepId.CANCELED,
    name: "Оформить новый",
    path: PATHS.ORDER_PLACE,
    unlockStep: OrderStepId.PLACE,
  },
];

export default dataOrderButtons;
