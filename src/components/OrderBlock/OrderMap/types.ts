import { Dispatch, SetStateAction } from "react";
import { IGeoCoordinate } from "../Steps/Place/types";

export interface IMapState {
  center: number[]
  zoom: number
}

export interface IOrderMapProps {
  mapState: IMapState
  dataGeo: IGeoCoordinate[]
  setState: Dispatch<SetStateAction<Nullable<string>>>
}
