import {
  FC, MouseEvent, useCallback, useMemo,
} from "react";
import classNames from "classnames";

import { ReactComponent as ArrowLeft } from "assets/icons/Slider/arrow-left.svg";
import { ReactComponent as ArrowRight } from "assets/icons/Slider/arrow-right.svg";
import { ISliderBtnProps } from "./types";

import "./styles.scss";

const SliderBtn: FC<ISliderBtnProps> = ({ direction, moveSlide }) => {
  const onClickHandler = useCallback<EventFunc<MouseEvent<HTMLButtonElement>>>(
    (e) => moveSlide(e),
    [moveSlide],
  );

  const buttonClassName = classNames(
    "SliderBtn",
    { SliderBtn_next: direction === "next" },
    { SliderBtn_prev: direction === "prev" },
  );

  const icon = useMemo<JSX.Element>(() => (
    direction === "next" ? <ArrowRight /> : <ArrowLeft />
  ), [direction]);

  return (
    <button
      onClick={onClickHandler}
      className={buttonClassName}
    >
      {icon}
    </button>
  );
};

export default SliderBtn;
