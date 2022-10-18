import { PATHS } from "routes/consts";
import { IBreadcrumb } from "./types";

const dataBreadcrumbs: IBreadcrumb[] = [
  {
    id: "place",
    title: "Местоположение",
    path: PATHS.ORDER_PLACE,
  },
  {
    id: "car",
    title: "Модель",
    path: PATHS.ORDER_CAR,
  },
  {
    id: "extra",
    title: "Дополнительно",
    path: PATHS.ORDER_EXTRA,
  },
  {
    id: "total",
    title: "Итого",
    path: PATHS.ORDER_TOTAL,
  },
];

export default dataBreadcrumbs;
