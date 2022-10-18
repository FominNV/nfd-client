import { PATHS } from "routes/consts";
import { IAdminFooterLink } from "./types";

const dataLinks: IAdminFooterLink[] = [
  {
    id: "link_main",
    name: "Главная страница",
    path: PATHS.MAIN,
  },
  {
    id: "link_link",
    name: "Ссылка",
    path: PATHS.MAIN,
  },
];

export default dataLinks;
