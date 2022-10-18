export type FormatNumberType = (value: number) => string;

export type FormatTermType = (
  dateFrom: string | number | Date,
  dateTo: string | number | Date
) => string;

export type GetCoordinatesType = (address: string) => Promise<number[]>;

export interface IGeoResponse {
  data: {
    response: {
      GeoObjectCollection: {
        featureMember: IGeoObject[];
      };
    };
  };
}

interface IGeoObject {
  GeoObject: {
    Point: {
      pos: string;
    };
    name: string;
  };
}
