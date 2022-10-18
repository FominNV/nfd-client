import { URLS } from "api/Axios/data";
import Button from "components/UI/AdminButton";
import { AdminButtonBgColor } from "components/UI/AdminButton/types";
import AdminTable from "components/UI/AdminTable";
import {
  FC, MouseEvent, ReactNode, useCallback, useEffect, useMemo, useState,
} from "react";
import { useDispatch } from "react-redux";
import { getEntities } from "store/admin/actions";
import { AdminActionTypes, AdminMenu } from "store/admin/types";
import { setAdminPopup, setLoading } from "store/common/actions";
import { PopupConfigMode, PopupEntityMode } from "store/common/types";
import { useTypedSelector } from "store/selectors";
import { dataAdminTableColgroup, dataAdminTableHeads } from "./data";

import "./styles.scss";

const Rate: FC = () => {
  const {
    adminToken, rates, rateTypes, adminMenu,
  } = useTypedSelector((state) => state.admin);
  const { loading } = useTypedSelector((state) => state.common);
  const [tableScrollTop, setAdminTableScrollTop] = useState<number>(0);
  const [currentAdminTableScrollTop, setCurrentAdminTableScrollTop] = useState<number>(0);
  const dispatch = useDispatch();

  const loadRates = useCallback<VoidFunc<number>>(async () => {
    dispatch(setLoading(true));
    await dispatch(getEntities(URLS.RATE_URL, AdminActionTypes.GET_ALL_RATES));
    dispatch(setLoading(false));
  }, [dispatch]);

  const configRate = useCallback<VoidFunc<number>>((id) => {
    setCurrentAdminTableScrollTop(tableScrollTop);
    dispatch(setAdminPopup({
      configMode: PopupConfigMode.UPDATE,
      entityMode: PopupEntityMode.RATE,
      id,
    }));
  }, [tableScrollTop, dispatch]);

  const addRate = useCallback<EventFunc<MouseEvent>>(() => {
    setCurrentAdminTableScrollTop(2000);
    dispatch(setAdminPopup({
      configMode: PopupConfigMode.CREATE,
      entityMode: PopupEntityMode.RATE,
      id: null,
    }));
  }, [dispatch]);

  useEffect(() => {
    if (!rates.all && adminToken && adminMenu === AdminMenu.RATE) {
      loadRates();
    }
  }, [rates.all, adminToken, adminMenu, loadRates]);

  useEffect(() => {
    if (!rateTypes.all && adminToken && adminMenu === AdminMenu.RATE) {
      dispatch(getEntities(URLS.RATE_TYPE_URL, AdminActionTypes.GET_ALL_RATE_TYPES));
    }
  }, [rateTypes.all, adminToken, adminMenu, loadRates, dispatch]);

  useEffect(() => {
    if (rates.updated !== null) {
      loadRates();
    }
  }, [rates.updated, loadRates]);

  const result = useMemo<ReactNode>(
    () => !loading
      && rates.all && (
      <div className="Menu__result">
        Всего:
        {rates.all.length}
      </div>
    ),
    [loading, rates],
  );

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (rates.all) {
        const data: string[][] = [[]];
        rates.all.forEach((elem) => {
          data.push([
            elem.id.toString(),
            elem.rateTypeId ? elem.rateTypeId.name : "НЕ УКАЗАНО",
            elem.rateTypeId ? elem.rateTypeId.unit : "НЕ УКАЗАНО",
            `${elem.price.toString()} ₽`,
          ]);
        });
        return data.sort((a, b) => a[0].localeCompare(b[0]));
      }
      return null;
    },
    [rates.all],
  );

  const addCategoryButton = useMemo<ReactNode>(() => (
    !loading && (
    <div className="Menu__btn-add">
      <Button
        name="Добавить"
        bgColor={AdminButtonBgColor.BLUE}
        onClick={addRate}
      />
    </div>
    )
  ), [loading, addRate]);

  return (
    <div className="Menu">
      <div className="Menu__header">
        {result}
        {addCategoryButton}
      </div>

      <div className="Menu__table">
        <AdminTable
          dataThead={dataAdminTableHeads}
          dataTbody={dataTBody}
          dataColgroup={dataAdminTableColgroup}
          loading={loading}
          scrollTop={currentAdminTableScrollTop}
          setScroll={setAdminTableScrollTop}
          callback={configRate}
        />
      </div>
    </div>
  );
};

export default Rate;
