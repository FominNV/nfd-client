export interface IOrderStep {
  id: string
  component: JSX.Element
}

export interface IDataStatusItem {
  key: string
  status: string
}

export interface IDataPageTitleItem {
  id: string
  title: string
}

export enum OrderStepId {
  PLACE = "place",
  CAR = "car",
  EXTRA = "extra",
  TOTAL = "total",
  ORDERED = "ordered",
  CANCELED = "canceled",
}
