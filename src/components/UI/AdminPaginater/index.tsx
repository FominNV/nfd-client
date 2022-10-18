import {
  FC, MouseEvent, useCallback, useMemo,
} from "react";
import { ReactComponent as Prev } from "assets/icons/AdminPaginater/prev.svg";
import { ReactComponent as Next } from "assets/icons/AdminPaginater/next.svg";
import classNames from "classnames";
import { IAdminPaginaterProps } from "./types";

import "./styles.scss";

const AdminPaginater: FC<IAdminPaginaterProps> = ({
  pageCount,
  currentNumber,
  disabled,
  setState,
}) => {
  const setPageNumber = useCallback<EventFunc<MouseEvent<HTMLButtonElement>>>(
    (e) => {
      if (e.currentTarget.dataset.number) {
        setState(Number(e.currentTarget.dataset.number));
      }
    },
    [setState],
  );

  const setPreviousPage = useCallback<EventFunc<MouseEvent>>(() => {
    setState(currentNumber - 1);
  }, [currentNumber, setState]);

  const setNextPage = useCallback<EventFunc<MouseEvent>>(() => {
    setState(currentNumber + 1);
  }, [currentNumber, setState]);

  const numberButtons = useMemo(
    () => Array.from({ length: pageCount }).map((_, index) => {
      const buttonClassName = classNames(
        "AdminPaginater__btn",
        {
          AdminPaginater__btn_active: currentNumber === index + 1,
        },
        {
          AdminPaginater__btn_show:
              index + 1 === currentNumber - 1
              || index + 1 === currentNumber + 1,
        },
      );
      const buttonWidth = `${String(index + 1).length * 12}px`;

      return (
        <button
          key={`paginater_button_${index}`}
          className={buttonClassName}
          data-number={index + 1}
          disabled={disabled}
          onClick={setPageNumber}
          style={{ width: buttonWidth }}
        >
          {index + 1}
        </button>
      );
    }),
    [pageCount, currentNumber, disabled, setPageNumber],
  );

  const buttonStartClassName = classNames("AdminPaginater__btn", {
    AdminPaginater__btn_show: currentNumber > 2,
  });
  const buttonEndClassName = classNames("AdminPaginater__btn", {
    AdminPaginater__btn_show: pageCount - currentNumber > 1,
  });
  const dotsStartClassName = classNames("AdminPaginater__dots", {
    AdminPaginater__dots_show: currentNumber > 3,
  });
  const dotsEndClassName = classNames("AdminPaginater__dots", {
    AdminPaginater__dots_show: pageCount - currentNumber > 2,
  });

  return (
    <div className="AdminPaginater">
      <div className="AdminPaginater__buttons">
        <button
          className="AdminPaginater__btn AdminPaginater__btn_show"
          onClick={setPreviousPage}
          disabled={disabled || currentNumber === 1}
        >
          <Prev />
        </button>

        <button
          className={buttonStartClassName}
          onClick={setPageNumber}
          data-number={1}
          disabled={disabled}
        >
          1
        </button>
        <div className={dotsStartClassName}>...</div>

        {numberButtons}

        <div className={dotsEndClassName}>...</div>
        <button
          className={buttonEndClassName}
          onClick={setPageNumber}
          data-number={pageCount}
          disabled={disabled}
        >
          {pageCount}
        </button>

        <button
          className="AdminPaginater__btn AdminPaginater__btn_show"
          onClick={setNextPage}
          disabled={disabled || currentNumber === pageCount}
        >
          <Next />
        </button>
      </div>
    </div>
  );
};

export default AdminPaginater;
