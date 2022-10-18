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
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import { getEntities } from "store/admin/actions";
import { setLoading } from "store/common/actions";
import Button from "components/UI/AdminButton";
import Select from "components/UI/AdminSelect";
import Paginater from "components/UI/AdminPaginater";
import { AdminButtonBgColor } from "components/UI/AdminButton/types";
import { IFilterState, IFilterPoints } from "components/FilterPoint/types";
import Loading from "components/UI/AdminLoading";
import { URLS } from "api/Axios/data";
import { AdminActionTypes, AdminMenu, IOrder } from "store/admin/types";
import OrderCard from "../OrderCard";
import FilterPoint from "../../../FilterPoint";
import { dataFilterPoint } from "./data";

import "./styles.scss";

const Order: FC = () => {
  const {
    adminToken, adminMenu, orders, cities, rates, statuses,
  } =    useTypedSelector((state) => state.admin);
  const { loading } = useTypedSelector((state) => state.common);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [city, setCity] = useState<IFilterState>({ id: 0, name: "Любой" });
  const [rate, setRate] = useState<IFilterState>({ id: 0, name: "Любой" });
  const [status, setStatus] = useState<IFilterState>({ id: 0, name: "Любой" });
  const [filterPoints, setFilterPoints] = useState<IFilterPoints>({
    city: null,
    rate: null,
    status: null,
  });
  const contentBlock = useRef<Nullable<HTMLDivElement>>(null);
  const dispatch = useDispatch();

  const setCurrentScroll = useCallback<VoidFunc<void>>(() => {
    if (contentBlock.current) {
      setScrollTop(contentBlock.current.scrollTop);
    }
  }, []);

  const setCityState = useCallback<VoidFunc<string>>(
    (name) => {
      if (name === "Любой") {
        setCity({ id: 0, name: "Любой" });
      } else if (cities.all && name !== "Любой") {
        cities.all.forEach((elem) => {
          if (elem.name === name) {
            setCity({
              id: elem.id,
              name: elem.name,
            });
          }
        });
      }
    },
    [cities.all],
  );

  const setStatusState = useCallback<VoidFunc<string>>(
    (name) => {
      if (name === "Любой") {
        setStatus({ id: 0, name: "Любой" });
      } else if (statuses.all && name !== "Любой") {
        statuses.all.forEach((elem) => {
          if (elem.name === name) {
            setStatus({
              id: elem.id,
              name: elem.name,
            });
          }
        });
      }
    },
    [statuses.all],
  );

  const setRateState = useCallback<VoidFunc<string>>(
    (name) => {
      if (name === "Любой") {
        setRate({ id: 0, name: "Любой" });
      } else if (rates.all && name !== "Любой") {
        rates.all.forEach((elem) => {
          if (elem.rateTypeId && elem.rateTypeId.name === name) {
            setRate({
              id: elem.id,
              name: elem.rateTypeId.name,
            });
          }
        });
      }
    },
    [rates.all],
  );

  const loadOrders = useCallback<VoidFunc<Nullable<string | number>>>(
    async (token, page, cityId, rateId, orderStatusId) => {
      dispatch(setLoading(true));
      await dispatch(
        getEntities(
          URLS.ADMIN_ORDER_URL,
          AdminActionTypes.GET_LIMIT_ORDERS,
          {
            limit: 20, page, cityId, rateId, orderStatusId,
          },
          token as string,
        ),
      );
      dispatch(setLoading(false));
    },
    [dispatch],
  );

  const activateFilterPoints = useCallback<EventFunc<MouseEvent>>(() => {
    const filterCity = city.id ? city : null;
    const filterRate = rate.id ? rate : null;
    const filterStatus = status.id ? status : null;
    setFilterPoints({
      city: filterCity,
      rate: filterRate,
      status: filterStatus,
    });
    setPageNumber(1);
  }, [city, rate, status]);

  const clearFilterPoints = useCallback<EventFunc<MouseEvent>>(() => {
    setFilterPoints({ city: null, rate: null, status: null });
    setPageNumber(1);
  }, []);

  useEffect(() => {
    if (adminToken && !orders.limit && adminMenu === AdminMenu.ORDER) {
      loadOrders(adminToken, pageNumber);
    }
  }, [adminToken, orders.limit, adminMenu, pageNumber, loadOrders]);

  useEffect(() => {
    if (adminToken && adminMenu === AdminMenu.ORDER) {
      const currentCityId = filterPoints.city ? filterPoints.city.id : null;
      const currentRateId = filterPoints.rate ? filterPoints.rate.id : null;
      const currentStatusId = filterPoints.status
        ? filterPoints.status?.id
        : null;
      loadOrders(
        adminToken,
        pageNumber,
        currentCityId,
        currentRateId,
        currentStatusId,
      );
    }
  }, [adminToken, orders.updated, pageNumber, filterPoints, loadOrders]);

  useEffect(() => {
    if (!cities.all && adminToken && adminMenu === AdminMenu.ORDER) {
      dispatch(getEntities(URLS.CITY_URL, AdminActionTypes.GET_ALL_CITIES));
    }
    if (!rates.all && adminToken && adminMenu === AdminMenu.ORDER) {
      dispatch(getEntities(URLS.RATE_URL, AdminActionTypes.GET_ALL_RATES));
    }
    if (!statuses.all && adminToken && adminMenu === AdminMenu.ORDER) {
      dispatch(
        getEntities(
          URLS.ORDER_STATUS_URL,
          AdminActionTypes.GET_ALL_ORDER_STATUSES,
        ),
      );
    }
  }, [cities.all, rates.all, statuses.all, adminToken, adminMenu, dispatch]);

  useEffect(() => {
    if (!filterPoints.city) setCity({ id: 0, name: "Любой" });
    if (!filterPoints.rate) setRate({ id: 0, name: "Любой" });
    if (!filterPoints.status) setStatus({ id: 0, name: "Любой" });
  }, [filterPoints]);

  useEffect(() => {
    if (!loading && contentBlock.current && scrollTop) {
      setTimeout(() => {
        contentBlock.current?.scrollBy(0, scrollTop);
        setScrollTop(0);
      });
    }
  }, [loading, contentBlock]);

  const result = orders.limit ? orders.limit.length : 0;

  const citySelect = useMemo<ReactNode>(() => {
    if (cities.all) {
      const data: string[] = cities.all.map((elem) => elem.name);
      return (
        <Select
          key="order_city_select"
          id="order_city_select"
          label="Город"
          value={city.name}
          data={["Любой", ...data]}
          callback={setCityState}
        />
      );
    }
    return false;
  }, [cities.all, city.name, setCityState]);

  const rateSelect = useMemo<ReactNode>(() => {
    if (rates.all) {
      const data: string[] = rates.all.map((elem) => (elem.rateTypeId ? elem.rateTypeId.name : "НЕ УКАЗАНО"));
      return (
        <Select
          key="order_rate_select"
          id="order_rate_select"
          label="Тариф"
          value={rate.name}
          data={["Любой", ...data]}
          callback={setRateState}
        />
      );
    }
    return false;
  }, [rates.all, rate.name, setRateState]);

  const statusSelect = useMemo<ReactNode>(() => {
    if (statuses.all) {
      const data: string[] = statuses.all.map((elem) => elem.name);
      return (
        <Select
          key="order_status_select"
          id="order_status_select"
          label="Статус"
          value={status.name}
          data={["Любой", ...data]}
          callback={setStatusState}
        />
      );
    }
    return false;
  }, [statuses.all, status.name, setStatusState]);

  const orderFilterPoints = useMemo<ReactNode>(
    () => dataFilterPoint.map((elem) => {
      const value = filterPoints[elem.id] && filterPoints[elem.id]?.name;
      return (
        <FilterPoint
          key={`order_filter_point_${elem.id}`}
          id={elem.id.toString()}
          name={elem.name}
          value={value || null}
          setState={setFilterPoints}
        />
      );
    }),
    [filterPoints],
  );

  const clearFilterButton = useMemo<ReactNode>(
    () => (filterPoints.city || filterPoints.rate || filterPoints.status) && (
    <div className="Order__btn-clear-filter">
      <Button
        name="X"
        bgColor={AdminButtonBgColor.RED}
        onClick={clearFilterPoints}
      />
    </div>
    ),
    [
      filterPoints.city,
      filterPoints.rate,
      filterPoints.status,
      clearFilterPoints,
    ],
  );

  const cards = useMemo<ReactNode>(
    () => orders.limit
      && orders.limit.map((elem) => (
        <OrderCard
          key={`order_card_${elem.id}`}
          order={elem}
          setCurrentScroll={setCurrentScroll}
        />
      )),
    [orders.limit, setCurrentScroll],
  );

  const fetching = useMemo<ReactNode>(() => loading && <Loading />, [loading]);

  const content = useMemo<ReactNode>(
    () => fetching || cards,
    [fetching, cards],
  );

  const pagination = useMemo<ReactNode>(
    () => orders.limit
      && Math.ceil(orders.limit.length / 20) > 1 && (
        <Paginater
          pageCount={Math.ceil(orders.limit.length / 20)}
          currentNumber={pageNumber}
          disabled={loading}
          setState={setPageNumber}
        />
    ),
    [orders.limit, pageNumber, loading],
  );

  return (
    <div className="Order">
      <div className="Order__header">
        <div className="Order__selects">
          {citySelect}
          {rateSelect}
          {statusSelect}
          <div className="Order__result">
            Всего:
            {" "}
            {result}
            <div className="Order__filter-points">{orderFilterPoints}</div>
          </div>
        </div>

        <div className="Order__buttons">
          {clearFilterButton}
          <div className="Order__btn-set-filter">
            <Button
              name="Применить"
              bgColor={AdminButtonBgColor.BLUE}
              disabled={!city.id && !rate.id && !status.id}
              onClick={activateFilterPoints}
            />
          </div>
        </div>
      </div>

      <div
        className="Order__content"
        ref={contentBlock}
      >
        {content}
      </div>
      <div className="Order__paginater">{pagination}</div>
    </div>
  );
};

export default Order;
