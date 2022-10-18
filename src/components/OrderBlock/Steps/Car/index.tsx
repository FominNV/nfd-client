import {
  FC, ReactNode, useCallback, useEffect, useMemo, useState,
} from "react";
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getEntities } from "store/admin/actions";
import { setLoading } from "store/common/actions";
import { setLockOrderStep } from "store/user/actions";
import OrderRadio from "components/UI/OrderRadio";
import OrderLoading from "components/UI/OrderLoading";
import { URLS } from "api/Axios/data";
import { AdminActionTypes } from "store/admin/types";
import { OrderStepId } from "pages/OrderPage/types";
import OrderCarCard from "../../OrderCarCard";

import "./styles.scss";

const Car: FC = () => {
  const { cars, categories } = useTypedSelector((state) => state.admin);
  const { carId } = useTypedSelector((state) => state.user.orderData);
  const { loading } = useTypedSelector((state) => state.common);
  const [filterCars, setFilterCars] = useState<string>("Все модели");
  const params = useParams();
  const dispatch = useDispatch();

  const loadCars = useCallback<VoidFunc<void>>(async () => {
    dispatch(setLoading(true));
    await Promise.all([
      dispatch(getEntities(URLS.CAR_URL, AdminActionTypes.GET_ALL_CARS)),
      dispatch(
        getEntities(URLS.CATEGORY_URL, AdminActionTypes.GET_ALL_CATEGORIES),
      ),
    ]);
    dispatch(setLoading(false));
  }, [dispatch]);

  const loadCategories = useCallback<VoidFunc<void>>(async () => {
    dispatch(setLoading(true));
    await Promise.all([
      dispatch(getEntities(URLS.CAR_URL, AdminActionTypes.GET_ALL_CARS)),
      dispatch(
        getEntities(URLS.CATEGORY_URL, AdminActionTypes.GET_ALL_CATEGORIES),
      ),
    ]);
    dispatch(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!cars.all && params.id === OrderStepId.CAR) {
      dispatch(setLoading(true));
      loadCars();
    }
  }, [cars.all, params.id, loadCars, dispatch]);

  useEffect(() => {
    if (!categories.all && params.id === OrderStepId.CAR) {
      dispatch(setLoading(true));
      loadCategories();
    }
  }, [categories.all, params.id, loadCategories, dispatch]);

  useEffect(() => {
    if (cars.all && categories.all && params.id === OrderStepId.CAR) {
      dispatch(setLoading(false));
    }
  }, [cars.all, categories.all, params.id, loadCategories, dispatch]);

  useEffect(() => {
    if (carId) {
      dispatch(setLockOrderStep(OrderStepId.EXTRA, true));
    }
  }, [dispatch, carId]);

  const categoryRadios = useMemo<ReactNode>(
    () => categories.all
      && categories.all
        .reduce((prev, current) => prev.concat(current.name), ["Все модели"])
        .map((elem, index) => (
          <OrderRadio
            id={`radio_car_${index}`}
            value={elem}
            key={`radio_car_${index}`}
            name="cars"
            checked={!index}
            setState={setFilterCars}
          />
        )),
    [categories.all],
  );

  const carList = useMemo<ReactNode>(() => {
    if (cars.all) {
      const carData = filterCars === "Все модели"
        ? cars.all
        : cars.all.filter((elem) => elem.categoryId.name === filterCars);

      return carData.map((elem, index) => (
        <OrderCarCard
          id={elem.id}
          key={`carCard_${index}`}
          name={elem.name}
          priceMin={elem.priceMin}
          priceMax={elem.priceMax}
          img={elem.thumbnail.path}
        />
      ));
    }
    return null;
  }, [cars.all, filterCars]);

  const fetching = useMemo<ReactNode>(
    () => loading && <OrderLoading />,
    [loading],
  );

  return (
    <div className="Car">
      <fieldset
        name="cars"
        className="Car__radios"
        defaultValue="all"
      >
        {categoryRadios}
      </fieldset>

      <div className="Car__cars">
        {carList}
        {fetching}
      </div>
    </div>
  );
};

export default Car;
