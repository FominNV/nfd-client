import {
  FC, MouseEvent, useCallback, useMemo, useState,
} from "react";
import { useTypedSelector } from "store/selectors";
import SliderBtn from "components/SliderBlock/SliderBtn";
import SliderDot from "components/SliderBlock/SliderDot";
import SliderItem from "components/SliderBlock/SliderItem";

import dataSlider from "./data";

import "./styles.scss";

const Slider: FC = () => {
  const { menuPopup } = useTypedSelector((state) => state.common);
  const [slideIndex, setSlideIndex] = useState<number>(1);

  const nextSlide = useCallback<EventFunc<MouseEvent>>(() => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  }, [slideIndex]);

  const prevSlide = useCallback<EventFunc<MouseEvent>>(() => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  }, [slideIndex]);

  const slides = useMemo<JSX.Element[]>(() => dataSlider.map((elem, index) => (
    <SliderItem
      active={index + 1 === slideIndex}
      key={`slide_${index}`}
      path={elem.imgPath}
      title={elem.title}
      text={elem.text}
      buttonColor={elem.btnColor}
    />
  )), [slideIndex]);

  const popup = useMemo<JSX.Element | false>(() => (
    menuPopup && <div className="Slider__popup" />
  ), [menuPopup]);

  return (
    <div className="Slider">
      {popup}
      {slides}

      <SliderBtn
        moveSlide={nextSlide}
        direction="next"
      />
      <SliderBtn
        moveSlide={prevSlide}
        direction="prev"
      />

      <SliderDot
        slideIndex={slideIndex}
        setSlideIndex={setSlideIndex}
      />
    </div>
  );
};

export default Slider;
