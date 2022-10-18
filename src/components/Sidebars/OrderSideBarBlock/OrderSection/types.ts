import { OrderStepId } from "pages/OrderPage/types";

export interface IOrderButton {
  id: OrderStepId;
  name: string;
  path: string;
  unlockStep: OrderStepId;
}
