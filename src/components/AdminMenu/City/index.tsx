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

const City: FC = () => {
  const { adminToken, cities, adminMenu } = useTypedSelector((state) => state.admin);
  const { loading } = useTypedSelector((state) => state.common);
  const [tableScrollTop, setAdminTableScrollTop] = useState<number>(0);
  const [currentAdminTableScrollTop, setCurrentAdminTableScrollTop] = useState<number>(0);
  const dispatch = useDispatch();

  const loadCities = useCallback<VoidFunc<void>>(async () => {
    dispatch(setLoading(true));
    await dispatch(getEntities(URLS.CITY_URL, AdminActionTypes.GET_ALL_CITIES));
    dispatch(setLoading(false));
  }, [dispatch]);

  const configCity = useCallback<VoidFunc<number>>((id) => {
    setCurrentAdminTableScrollTop(tableScrollTop);
    dispatch(setAdminPopup({
      configMode: PopupConfigMode.UPDATE,
      entityMode: PopupEntityMode.CITY,
      id,
    }));
  }, [tableScrollTop, dispatch]);

  const addCity = useCallback<EventFunc<MouseEvent>>(() => {
    setCurrentAdminTableScrollTop(2000);
    dispatch(setAdminPopup({
      configMode: PopupConfigMode.CREATE,
      entityMode: PopupEntityMode.CITY,
      id: null,
    }));
  }, [dispatch]);

  useEffect(() => {
    if (!cities.all && adminToken && adminMenu === AdminMenu.CITY) {
      loadCities();
    }
  }, [cities.all, adminToken, adminMenu, loadCities]);

  useEffect(() => {
    if (cities.updated !== null) {
      loadCities();
    }
  }, [cities.updated, loadCities]);

  const result = useMemo<ReactNode>(
    () => !loading
      && cities.all && (
      <div className="Menu__result">
        Всего:
        {" "}
        {cities.all.length}
      </div>
    ),
    [loading, cities],
  );

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (cities.all) {
        const data: string[][] = [[]];
        cities.all.forEach((elem) => {
          data.push([elem.id.toString(), elem.name]);
        });
        return data.sort((a, b) => a[1].localeCompare(b[1]));
      }
      return null;
    },
    [cities.all],
  );

  const addCategoryButton = useMemo<ReactNode>(() => (
    !loading && (
    <div className="Menu__btn-add">
      <Button
        name="Добавить"
        bgColor={AdminButtonBgColor.BLUE}
        onClick={addCity}
      />
    </div>
    )
  ), [loading, addCity]);

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
          callback={configCity}
        />
      </div>
    </div>
  );
};

export default City;
