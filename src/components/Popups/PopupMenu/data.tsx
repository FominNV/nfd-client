import { ReactComponent as Ok } from "assets/icons/PopupMenu/ok.svg";
import { ReactComponent as Vk } from "assets/icons/PopupMenu/vk.svg";
import { ReactComponent as Tg } from "assets/icons/PopupMenu/telegram.svg";

import { IDataPopupMenu } from "./types";

const dataPopupMenu: IDataPopupMenu = {
  link: ["Парковка", "Страховка", "Бензин", "Обслуживание"],
  auth: [
    <Ok
      width={32}
      height={32}
    />,
    <Vk
      width={32}
      height={32}
    />,
    <Tg
      width={32}
      height={32}
    />,
  ],
};

export default dataPopupMenu;
