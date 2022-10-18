import { formatDistance } from "date-fns";
import ru from "date-fns/locale/ru/index";
import axios from "axios";
import {
  FormatNumberType, FormatTermType, GetCoordinatesType, IGeoResponse,
} from "./types";

export const formatNumber: FormatNumberType = (value) => (
  new Intl.NumberFormat("ru-RU").format(value)
);

export const formatTerm: FormatTermType = (dateFrom, dateTo) => formatDistance(new Date(dateFrom), new Date(dateTo), {
  locale: ru,
});

export const getCoordinates: GetCoordinatesType = async (address) => {
  const apiKey = process.env.REACT_APP_YANDEX_KEY;
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${address}&format=json`;
  const res: IGeoResponse = await axios.get(url);
  const posArray = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
    " ",
  );
  return posArray.map((item) => Number(item)).reverse();
};
