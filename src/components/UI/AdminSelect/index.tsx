import {
  FC,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ReactComponent as Drop } from "assets/icons/AdminSelect/drop.svg";
import classNames from "classnames";
import { IAdminSelectProps } from "./types";

import "./styles.scss";

const AdminSelect: FC<IAdminSelectProps> = ({
  id, label, data, value, error, callback,
}) => {
  const [showDataBlock, setShowDataBlock] = useState<boolean>(false);

  const onClickHandler = useCallback<
  EventFunc<MouseEvent<HTMLButtonElement | HTMLInputElement>>
  >((e) => {
    e.preventDefault();
    setShowDataBlock(!showDataBlock);
  }, [showDataBlock]);

  const onMouseDownHandler = useCallback<
  EventFunc<MouseEvent<HTMLButtonElement>>
  >(
    (e) => {
      e.preventDefault();
      callback(e.currentTarget.name);
    },
    [callback],
  );

  const onBlurHandler = useCallback<EventFunc<FocusEvent>>(() => {
    setShowDataBlock(false);
  }, []);

  const dataList = useMemo<ReactNode>(
    () => data
      && data.map((elem, index) => (
        <button
          className="AdminSelect__data-block__btn"
          key={id + index}
          name={elem}
          onClick={onClickHandler}
          onMouseDown={onMouseDownHandler}
        >
          {elem}
        </button>
      )),
    [data, id, onClickHandler, onMouseDownHandler],
  );

  const selectClassName = classNames("AdminSelect__select", {
    AdminSelect__select_error: error,
  });
  const errorClassName = classNames("AdminSelect__error", {
    AdminSelect__error_active: error,
  });
  const dataBlockClassName = classNames("AdminSelect__data-block", {
    "AdminSelect__data-block_active": showDataBlock,
  });

  return (
    <div className="AdminSelect">
      <label
        className="AdminSelect__label"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="AdminSelect__select-wrap">
        <input
          id={id}
          type="text"
          className={selectClassName}
          value={value}
          name={label}
          onBlur={onBlurHandler}
          onClick={onClickHandler}
          autoComplete="off"
          readOnly
        />
        <div className="AdminSelect__arrow">
          <div className="AdminSelect__icon AdminSelect__icon_reverse">
            <Drop />
          </div>
          <div className="AdminSelect__icon">
            <Drop />
          </div>
        </div>

        <div className={dataBlockClassName}>{dataList}</div>
        <div className={errorClassName}>{error}</div>
      </div>
    </div>
  );
};

export default AdminSelect;
