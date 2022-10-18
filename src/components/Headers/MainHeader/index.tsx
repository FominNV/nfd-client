import { FC } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "store/selectors";
import Container from "components/Container";

import { ReactComponent as Map } from "assets/icons/MainHeader/map.svg";
import { PATHS } from "routes/consts";

import "./styles.scss";

const MainHeader: FC = () => {
  const { city } = useTypedSelector((state) => state.common);

  return (
    <header className="MainHeader">
      <Container>
        <div className="MainHeader__content">
          <Link
            to={PATHS.MAIN}
            className="MainHeader__logo"
          >
            Need for drive
          </Link>

          <div className="MainHeader__city">
            <Map />
            <div className="MainHeader__city_name">{city}</div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default MainHeader;
