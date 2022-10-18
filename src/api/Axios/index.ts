import axios from "axios";
import { URLS } from "./data";

export default axios.create({
  baseURL: URLS.BASE_URL,
  headers: {
    "X-Api-Factory-Application-Id": process.env.REACT_APP_API_KEY as string,
  },
});
