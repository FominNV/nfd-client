import { Dispatch, SetStateAction } from "react";

export interface IAdminTableProps {
  dataThead: string[]
  dataTbody: Nullable<(string | JSX.Element)[][]>
  dataColgroup?: string[]
  loading?: boolean
  tdHeight?: number
  scrollTop?: number
  callback?: (id: number) => void
  setScroll?: Dispatch<SetStateAction<number>>
}
