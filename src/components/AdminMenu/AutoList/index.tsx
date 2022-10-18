import {
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "store/selectors";
import {
  getEntities, setAdminMenu, setAutoCardUpdateMode, setConfigCar,
} from "store/admin/actions";
import AdminTable from "components/UI/AdminTable";
import Button from "components/UI/AdminButton";
import Select from "components/UI/AdminSelect";
import Paginater from "components/UI/AdminPaginater";
import FilterPoint from "components/FilterPoint";
import { formatNumber } from "common";
import { URLS } from "api/Axios/data";
import { AdminActionTypes, AdminMenu } from "store/admin/types";
import { AdminButtonBgColor } from "components/UI/AdminButton/types";
import { IFilterPoints, IFilterState } from "components/FilterPoint/types";
import { dataAdminTableColgroup, dataAdminTableHeads } from "./data";

import "./styles.scss";

const AutoList: FC = () => {
  const {
    adminToken, cars, adminMenu, categories,
  } = useTypedSelector(
    (state) => state.admin,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [tableScrollTop, setAdminTableScrollTop] = useState<number>(0);
  const [currentAdminTableScrollTop, setCurrentAdminTableScrollTop] = useState<number>(0);
  const [category, setCategory] = useState<IFilterState>({
    id: 0,
    name: "Любая",
  });
  const [filterPoints, setFilterPoints] = useState<IFilterPoints>({
    category: null,
  });
  const table = useRef<Nullable<HTMLDivElement>>(null);
  const dispatch = useDispatch();

  const setCategoryState = useCallback<VoidFunc<string>>(
    (name) => {
      if (name === "Любая") {
        setCategory({ id: 0, name: "Любая" });
      } else if (name !== "Любая") {
        categories.all?.forEach((elem) => {
          if (elem.name === name) {
            setCategory({
              id: elem.id,
              name: elem.name,
            });
          }
        });
      }
    },
    [categories],
  );

  const activateFilterPoints = useCallback<EventFunc<MouseEvent>>(() => {
    if (category.id) setFilterPoints({ category });
    setPageNumber(1);
  }, [category]);

  const clearFilterPoints = useCallback<EventFunc<MouseEvent>>(() => {
    setFilterPoints({ category: null });
    setPageNumber(1);
  }, []);

  const loadCars = useCallback<VoidFunc<Nullable<string | number>>>(
    async (page, categoryId) => {
      setLoading(true);
      await dispatch(
        getEntities(URLS.CAR_URL, AdminActionTypes.GET_LIMIT_CARS, {
          limit: 20,
          page,
          categoryId,
        }),
      );
      setLoading(false);
    },
    [dispatch],
  );

  const configCar = useCallback<VoidFunc<number>>((id) => {
    setCurrentAdminTableScrollTop(tableScrollTop);
    if (cars.limit) {
      cars.limit.forEach((elem) => {
        if (elem.id === id) {
          dispatch(setConfigCar(elem));
          dispatch(setAutoCardUpdateMode(true));
          dispatch(setAdminMenu(AdminMenu.AUTO_CARD));
        }
      });
    }
  }, [tableScrollTop, cars.limit, dispatch]);

  useEffect(() => {
    if (adminToken && adminMenu === AdminMenu.AUTO_LIST) {
      const currentCategoryId = filterPoints.category
        ? filterPoints.category.id
        : null;
      loadCars(pageNumber, currentCategoryId);
    }
  }, [adminToken, pageNumber, filterPoints.category, loadCars]);

  useEffect(() => {
    if (adminToken && !cars.limit && adminMenu === AdminMenu.AUTO_LIST) {
      loadCars(pageNumber);
    }
  }, [adminToken, cars.limit, adminMenu, pageNumber, loadCars]);

  useEffect(() => {
    if (adminToken && cars.updated !== null && adminMenu === AdminMenu.AUTO_LIST) {
      loadCars(pageNumber);
    }
  }, [cars.updated]);

  useEffect(() => {
    if (!categories.all && adminMenu === AdminMenu.AUTO_LIST) {
      dispatch(getEntities(URLS.CATEGORY_URL, AdminActionTypes.GET_ALL_CATEGORIES));
    }
  }, [adminMenu, categories.all, dispatch]);

  useEffect(() => {
    if (!filterPoints.category) {
      setCategory({ id: 0, name: "Любая" });
    }
  }, [filterPoints.category]);

  useEffect(() => {
    if (currentAdminTableScrollTop) {
      setCurrentAdminTableScrollTop(0);
    }
  }, [pageNumber]);

  const select = useMemo<ReactNode>(() => {
    if (categories.all) {
      const data: string[] = categories.all.map((elem) => elem.name);
      return (
        <Select
          key="auto_list_select"
          id="category"
          label="Категория"
          value={category.name}
          data={["Любая", ...data]}
          callback={setCategoryState}
        />
      );
    }
    return false;
  }, [categories.all, category.name, setCategoryState]);

  const result = cars.limit ? cars.limit.length : 0;

  const clearFilterButton = useMemo<ReactNode>(
    () => filterPoints.category && (
    <div className="Order__btn-clear-filter">
      <Button
        name="X"
        bgColor={AdminButtonBgColor.RED}
        onClick={clearFilterPoints}
      />
    </div>
    ),
    [filterPoints.category, clearFilterPoints],
  );

  const dataTBody = useMemo<Nullable<(string | JSX.Element)[][]>>(() => {
    if (cars.limit) {
      const data: (string | JSX.Element)[][] = [[]];
      cars.limit.forEach((elem) => {
        const image = elem.thumbnail ? (
          <img
            className="AutoList__car-img"
            src={elem.thumbnail.path}
            alt="car"
          />
        ) : (
          "НЕТ ФОТО"
        );
        const number = (
          <span className="AutoList__car-number">
            {elem.number
              ? elem.number.replace(/(\d+)/g, " $1 ").toLocaleUpperCase()
              : "НЕ УКАЗАН"}
          </span>
        );
        const price = `${formatNumber(elem.priceMin)}₽ - ${formatNumber(
          elem.priceMax,
        )}₽`;

        data.push([
          elem.id.toString(),
          elem.name,
          image,
          number,
          elem.categoryId ? elem.categoryId.name : "НЕТ КАТЕГОРИИ",
          elem.colors.join(", "),
          price,
          elem.description,
        ]);
      });
      return data;
    }
    return null;
  }, [cars.limit]);

  const pagination = useMemo<ReactNode>(
    () => cars.limit
      && Math.ceil(cars.limit.length / 20) > 1 && (
        <Paginater
          pageCount={Math.ceil(cars.limit.length / 20)}
          currentNumber={pageNumber}
          disabled={loading}
          setState={setPageNumber}
        />
    ),
    [cars.limit, pageNumber, loading],
  );

  return (
    <div className="AutoList">
      <div className="AutoList__header">
        <div className="AutoList__selects">
          {select}
          <div className="AutoList__result">
            Всего:
            {" "}
            {result}
            <div className="AutoList__filter-point">
              <FilterPoint
                key="auto_list_filter_point_category"
                id="category"
                name="Категория"
                value={filterPoints.category && filterPoints.category.name}
                setState={setFilterPoints}
              />
            </div>
          </div>
        </div>

        <div className="AutoList__buttons">
          {clearFilterButton}

          <div className="AutoList__btn-set-filter">
            <Button
              name="Применить"
              bgColor={AdminButtonBgColor.BLUE}
              disabled={!category.id}
              onClick={activateFilterPoints}
            />
          </div>
        </div>
      </div>

      <div
        className="AutoList__table"
        ref={table}
      >
        <AdminTable
          dataThead={dataAdminTableHeads}
          dataTbody={dataTBody}
          dataColgroup={dataAdminTableColgroup}
          loading={loading}
          tdHeight={100}
          scrollTop={currentAdminTableScrollTop}
          callback={configCar}
          setScroll={setAdminTableScrollTop}
        />
      </div>
      <div className="AutoList__paginater">{pagination}</div>
    </div>
  );
};

export default AutoList;
