import { IPoint } from "store/admin/types";

export interface IGeoCoordinate {
  name: string
  coord: number[]
}

export type ShowOnMapType = (place: string, data: IGeoCoordinate[]) => void;
export type SetPlaceByStreetType = (place: string, data: IPoint[]) => void;
