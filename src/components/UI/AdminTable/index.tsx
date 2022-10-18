import {
  FC, MouseEvent, ReactNode, useCallback, useEffect, useMemo, useRef,
} from "react";
import Loading from "components/UI/AdminLoading";
import { IAdminTableProps } from "./types";

import "./style.scss";

const AdminTable: FC<IAdminTableProps> = ({
  dataThead,
  dataTbody,
  dataColgroup,
  loading,
  tdHeight,
  scrollTop,
  callback,
  setScroll,
}) => {
  const table = useRef<Nullable<HTMLDivElement>>(null);

  const onClickHandler = useCallback<EventFunc<MouseEvent<HTMLTableRowElement>>>((e) => {
    if (e.currentTarget.dataset.id && callback) {
      callback(Number(e.currentTarget.dataset.id));
    }
  }, [callback]);

  const onScrollHandler = useCallback<EventFunc<MouseEvent<HTMLTableElement>>>((e) => {
    if (setScroll) {
      setScroll(e.currentTarget.scrollTop);
    }
  }, [setScroll]);

  useEffect(() => {
    if (scrollTop && table.current && !loading) {
      setTimeout(() => {
        table.current?.scrollBy(0, scrollTop);
      });
    }
  }, [loading]);

  const colgroup = useMemo<ReactNode>(
    () => (
      <colgroup>
        {dataColgroup
          && dataColgroup.map((elem, index) => (
            <col
              key={`col_${index}`}
              style={{ width: elem }}
            />
          ))}
      </colgroup>
    ),
    [dataColgroup],
  );

  const thead = useMemo<ReactNode>(
    () => (
      <tr>
        {dataThead.map((elem, index) => (
          <th
            key={`th_${index}`}
            className="AdminTable__th"
          >
            {elem}
          </th>
        ))}
      </tr>
    ),
    [dataThead],
  );

  const tbody = useMemo<ReactNode>(
    () => !loading
      && dataTbody
      && dataTbody.map((elem, index) => (
        <tr
          data-id={elem[0] as string}
          key={`tr_${index}`}
          className="AdminTable__tr"
          onClick={onClickHandler}
        >
          {elem.map((item, i) => {
            if (i > 0) {
              return (
                <td
                  key={`td_${i}`}
                  className="AdminTable__td"
                  style={{ height: tdHeight || `${36}px` }}
                >
                  {item}
                </td>
              );
            }
            return false;
          })}
        </tr>
      )),
    [loading, dataTbody, tdHeight, onClickHandler],
  );

  const fetching = useMemo(
    () => loading && (
    <div className="AdminTable__loading">
      <Loading />
    </div>
    ),
    [loading],
  );

  return (
    <div className="AdminTable">
      <div className="AdminTable__table-h-wrap">
        <table className="AdminTable__table">
          {colgroup}
          <thead className="AdminTable__thead">{thead}</thead>
        </table>
      </div>
      <div
        className="AdminTable__table-b-wrap"
        ref={table}
        onScroll={onScrollHandler}
      >
        <table className="AdminTable__table">
          {colgroup}
          <tbody className="AdminTable__tbody">{tbody}</tbody>
        </table>
        {fetching}
      </div>
    </div>
  );
};

export default AdminTable;
