import {
  FC, MouseEvent, useCallback, useMemo,
} from "react";
import dataSlider from "components/SliderBlock/Slider/data";
import classNames from "classnames";
import { ISliderDotProps } from "./types";

import "./styles.scss";

const SliderDot: FC<ISliderDotProps> = ({ slideIndex, setSlideIndex }) => {
  const onclickHandler = useCallback<EventFunc<MouseEvent<HTMLButtonElement>>>((e) => (
    setSlideIndex(Number(e.currentTarget.dataset.key))
  ), [setSlideIndex]);

  const dots = useMemo<JSX.Element[]>(() => (Array.from({ length: dataSlider.length }).map((_, index) => {
    const dotClassName = classNames("SliderDot__dot", {
      SliderDot__dot_active: slideIndex === index + 1,
    });

    return (
      <button
        data-key={index + 1}
        key={`dot_${index}`}
        onClick={onclickHandler}
        className={dotClassName}
      />
    );
  })), [onclickHandler, slideIndex]);

  return <div className="SliderDot">{dots}</div>;
};

export default SliderDot;
