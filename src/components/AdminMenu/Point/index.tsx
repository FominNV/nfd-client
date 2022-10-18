import { URLS } from "api/Axios/data";
import Button from "components/UI/AdminButton";
import { AdminButtonBgColor } from "components/UI/AdminButton/types";
import AdminTable from "components/UI/AdminTable";
import {
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { getEntities } from "store/admin/actions";
import { AdminActionTypes, AdminMenu } from "store/admin/types";
import { setAdminPopup, setLoading } from "store/common/actions";
import { PopupConfigMode, PopupEntityMode } from "store/common/types";
import { useTypedSelector } from "store/selectors";
import { dataAdminTableColgroup, dataAdminTableHeads } from "./data";

import "./styles.scss";

const Point: FC = () => {
  const {
    adminToken, points, cities, adminMenu,
  } = useTypedSelector((state) => state.admin);
  const { loading } = useTypedSelector((state) => state.common);
  const [tableScrollTop, setAdminTableScrollTop] = useState<number>(0);
  const [currentAdminTableScrollTop, setCurrentAdminTableScrollTop] = useState<number>(0);
  const dispatch = useDispatch();

  const loadPoints = useCallback<VoidFunc<number>>(
    async () => {
      dispatch(setLoading(true));
      await dispatch(
        getEntities(URLS.POINT_URL, AdminActionTypes.GET_ALL_POINTS),
      );
      dispatch(setLoading(false));
    },
    [dispatch],
  );

  const configPoint = useCallback<VoidFunc<number>>(
    (id) => {
      setCurrentAdminTableScrollTop(tableScrollTop);
      dispatch(
        setAdminPopup({
          configMode: PopupConfigMode.UPDATE,
          entityMode: PopupEntityMode.POINT,
          id,
        }),
      );
    },
    [tableScrollTop, dispatch],
  );

  const addPoint = useCallback<EventFunc<MouseEvent>>(() => {
    setCurrentAdminTableScrollTop(2000);
    dispatch(
      setAdminPopup({
        configMode: PopupConfigMode.CREATE,
        entityMode: PopupEntityMode.POINT,
        id: null,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (!points.all && adminToken && adminMenu === AdminMenu.POINT) loadPoints();
  }, [points.all, adminToken, adminMenu, loadPoints]);

  useEffect(() => {
    if (!cities.all && adminToken && adminMenu === AdminMenu.POINT) {
      dispatch(getEntities(URLS.CITY_URL, AdminActionTypes.GET_ALL_CITIES));
    }
  }, [cities.all, adminToken, adminMenu, loadPoints, dispatch]);

  useEffect(() => {
    if (points.updated !== null) {
      loadPoints();
    }
  }, [points.updated, loadPoints]);

  const result = useMemo<ReactNode>(
    () => !loading
      && points.all && (
        <div className="Menu__result">
          Всего:
          {points.all.length}
        </div>
    ),
    [loading, points.all],
  );

  const dataTBody = useMemo<Nullable<string[][]>>(() => {
    if (points.all) {
      const data: string[][] = [[]];
      points.all.forEach((elem) => {
        data.push([
          elem.id.toString(),
          elem.name,
          elem.cityId ? elem.cityId.name : "НЕ УКАЗАН",
          elem.address,
        ]);
      });
      return data.sort((a, b) => a[0].localeCompare(b[0]));
    }
    return null;
  }, [points.all]);

  const addCategoryButton = useMemo<ReactNode>(
    () => !loading && (
    <div className="Menu__btn-add">
      <Button
        name="Добавить"
        bgColor={AdminButtonBgColor.BLUE}
        onClick={addPoint}
      />
    </div>
    ),
    [loading, addPoint],
  );

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
          callback={configPoint}
        />
      </div>
    </div>
  );
};

export default Point;
