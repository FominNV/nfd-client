import {
  FC, ReactNode, useCallback, useEffect, useMemo, useState,
} from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "store/selectors";
import {
  setLockOrderStep,
  setOrderCity,
  setOrderPoint,
} from "store/user/actions";
import { setLoading } from "store/common/actions";
import { IMapState } from "components/OrderBlock/OrderMap/types";
import OrderInput from "components/UI/OrderInput";
import OrderMap from "components/OrderBlock/OrderMap";
import OrderLoading from "components/UI/OrderLoading";
import { getCoordinates } from "common";
import { getEntities } from "store/admin/actions";
import { URLS } from "api/Axios/data";
import { AdminActionTypes, IPoint } from "store/admin/types";
import { OrderStepId } from "pages/OrderPage/types";
import { IGeoCoordinate, SetPlaceByStreetType, ShowOnMapType } from "./types";

import "./styles.scss";

const Place: FC = () => {
  const { points, cities } = useTypedSelector((state) => state.admin);
  const { loading } = useTypedSelector((state) => state.common);
  const [cityName, setCityName] = useState<Nullable<string>>(null);
  const [address, setAddress] = useState<Nullable<string>>(null);
  const [streetGeo, setStreetGeo] = useState<Nullable<IGeoCoordinate[]>>(null);
  const [cityGeo, setCityGeo] = useState<Nullable<IGeoCoordinate[]>>(null);
  const [errorGeo, setErrorGeo] = useState<boolean>(false);
  const [mapState, setMapState] = useState<IMapState>({
    center: [55.355198, 86.086847],
    zoom: 10,
  });

  const params = useParams();
  const dispatch = useDispatch();

  const loadCities = useCallback(async () => {
    await dispatch(getEntities(URLS.CITY_URL, AdminActionTypes.GET_ALL_CITIES));
  }, [dispatch]);

  const loadPoints = useCallback(async () => {
    await dispatch(getEntities(URLS.POINT_URL, AdminActionTypes.GET_ALL_POINTS));
  }, [dispatch]);

  const setCoordinateStates = useCallback<VoidFunc<IPoint[]>>(async (data) => {
    try {
      const geoStreets = await Promise.all(
        data.map(async (elem) => {
          const pointCityName = elem.cityId.name;
          const pointStreetName = elem.address
            .split(",")[0]
            .replace(/^ул\./, "")
            .trim();
          const arrayAddress = elem.address.split(" ");
          const pointNumberValue = arrayAddress[arrayAddress.length - 1];
          const pointAddress = `${pointCityName}+${pointStreetName}+${pointNumberValue}`;
          const coordinates = await getCoordinates(pointAddress);

          return {
            name: elem.address,
            coord: coordinates,
          };
        }),
      );
      setStreetGeo(geoStreets);

      const geoCities = await Promise.all(
        data.map(async (elem) => {
          const coordinates = await getCoordinates(elem.cityId.name);
          return {
            name: elem.cityId.name,
            coord: coordinates,
          };
        }),
      );
      setCityGeo(geoCities);
    } catch (err) {
      setErrorGeo(true);
    }
  }, []);

  const setPointByStreet = useCallback<SetPlaceByStreetType>(
    (currentStreet, data) => data.forEach((elem) => {
      if (elem.address === currentStreet) {
        dispatch(
          setOrderCity(elem.cityId),
        );
        dispatch(
          setOrderPoint(elem),
        );
      }
    }),
    [dispatch],
  );

  const showCityOnMap = useCallback<ShowOnMapType>(
    (town, data) => data.forEach((elem) => {
      if (elem.name === town) {
        setMapState({ center: elem.coord, zoom: 10 });
      }
    }),
    [],
  );

  const showPointOnMap = useCallback<ShowOnMapType>(
    (pointAddress, data) => data.forEach((elem) => {
      if (elem.name === pointAddress) {
        setMapState({ center: elem.coord, zoom: 17 });
      }
    }),
    [],
  );

  useEffect(() => {
    if (!cities.all && params.id === OrderStepId.PLACE) {
      dispatch(setLoading(true));
      loadCities();
    }
  }, [cities.all, params.id, dispatch, loadCities]);

  useEffect(() => {
    if (!points.all && params.id === OrderStepId.PLACE) {
      dispatch(setLoading(true));
      loadPoints();
    }
  }, [points.all, params.id, dispatch, loadPoints]);

  useEffect(() => {
    if (points.all && cities.all && params.id === OrderStepId.PLACE) {
      dispatch(setLoading(false));
    }
  }, [points.all, cities.all, params.id, dispatch]);

  useEffect(() => {
    if (cityGeo && params.id === OrderStepId.PLACE) {
      dispatch(setLoading(false));
    }
  }, [cityGeo, params.id, dispatch]);

  useEffect(() => {
    if (cityName && address && cities.all && points.all) {
      points.all.forEach((elem) => {
        if (elem.cityId.name === cityName && elem.address === address) {
          dispatch(setOrderCity(elem.cityId));
          dispatch(setOrderPoint(elem));
          dispatch(setLockOrderStep(OrderStepId.CAR, true));
        }
      });
    } else if (!cityName) {
      setAddress(null);
      dispatch(setOrderCity(null));
      dispatch(setOrderPoint(null));
      dispatch(setLockOrderStep(OrderStepId.CAR, false));
      dispatch(setLockOrderStep(OrderStepId.EXTRA, false));
      dispatch(setLockOrderStep(OrderStepId.TOTAL, false));
    } else if (!address) {
      dispatch(setOrderPoint(null));
      dispatch(setLockOrderStep(OrderStepId.CAR, false));
    }
  }, [address, cities.all, cityName, dispatch, points.all]);

  useEffect(() => {
    if (points.all && params.id === OrderStepId.PLACE) {
      setCoordinateStates(points.all);
    }
  }, [points.all, params.id, setCoordinateStates]);

  useEffect(() => {
    if (address && streetGeo && points.all) {
      setPointByStreet(address, points.all);
      showPointOnMap(address, streetGeo);
    }
  }, [address, streetGeo, points.all, setPointByStreet, showPointOnMap]);

  useEffect(() => {
    if (cityName && cityGeo && !address) {
      showCityOnMap(cityName, cityGeo);
    }
  }, [cityName, address, cityGeo, showCityOnMap]);

  const citiesData = useMemo<string[]>(
    () => (cities.all ? cities.all.map((elem) => elem.name) : []),
    [cities.all],
  );

  const pointsData = useMemo<string[]>(() => {
    const currentPoints: string[] = [];
    if (cityName && points.all) {
      points.all.forEach((elem) => {
        if (elem.cityId?.name === cityName) currentPoints.push(elem.address);
      });
    }
    return currentPoints;
  }, [cityName, points.all]);

  const map = useMemo<ReactNode>(
    () => streetGeo
      && !errorGeo && (
        <OrderMap
          mapState={mapState}
          dataGeo={streetGeo}
          setState={setAddress}
        />
    ),
    [streetGeo, errorGeo, mapState],
  );

  const content = useMemo<ReactNode>(
    () => (loading ? (
      <OrderLoading />
    ) : (
      <>
        <div className="Place__inputs">
          <OrderInput
            id="city"
            label="Город"
            placeholder="Введите город"
            value={cityName}
            data={citiesData}
            setState={setCityName}
          />
          <OrderInput
            id="street"
            label="Пункт выдачи"
            placeholder="Начните вводить пункт ..."
            value={address}
            data={pointsData}
            setState={setAddress}
            disabled={!cityName}
          />
        </div>

        <div className="Place__map-wrap">
          <p className="Place__map-text">Выбрать на карте:</p>
          <div className="Place__map">
            {map || "Карта временно недоступна. . ."}
          </div>
        </div>
      </>
    )),
    [loading, cityName, address, citiesData, pointsData, map],
  );

  return (
    <div className="Place">
      {content}

    </div>
  );
};

export default Place;
