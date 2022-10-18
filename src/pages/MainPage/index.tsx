import { FC, useEffect } from "react";
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import { setPageTitle } from "store/common/actions";
import OrderButton from "components/UI/OrderButton";
import MainFooter from "components/Footers/MainFooter";
import Container from "components/Container";
import LandSection from "components/MainSections/LandSection";
import SliderSection from "components/MainSections/SliderSection";
import Slider from "components/SliderBlock/Slider";
import classNames from "classnames";
import { OrderButtonBgColor } from "components/UI/OrderButton/types";
import { PATHS } from "routes/consts";
import MainLayout from "layouts/MainLayout";

import "./styles.scss";

const MainPage: FC = () => {
  const { menuPopup } = useTypedSelector((state) => state.common);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("NFD / Главная"));
  }, [dispatch]);

  const mainClassname = classNames("MainPage", {
    "Main_scrollbar-none": menuPopup,
  });

  return (
    <div className={mainClassname}>
      <LandSection>
        <MainLayout>
          <main className="MainPage__main">
            <Container>
              <div className="MainPage__content">
                <p className="MainPage__tagline1">Каршеринг</p>
                <p className="MainPage__tagline2">Need for drive</p>
                <p className="MainPage__tagline3">
                  Поминутная аренда авто твоего города
                </p>

                <div className="MainPage__btn">
                  <OrderButton
                    name="Забронировать"
                    bgColor={OrderButtonBgColor.GREEN}
                    navigatePath={PATHS.ORDER_PLACE}
                  />
                </div>
              </div>
            </Container>
          </main>
          <MainFooter />
        </MainLayout>
      </LandSection>

      <SliderSection>
        <Slider />
      </SliderSection>
    </div>
  );
};

export default MainPage;
