import { FC } from "react";
import Container from "components/Container";

import "./styles.scss";

const MainFooter: FC = () => (
  <footer className="MainFooter">
    <Container>
      <div className="MainFooter__content">
        <p className="MainFooter__info">© 2016-2019 «Need for drive»</p>

        <a
          href="tel:+74952342244"
          className="MainFooter__phone"
        >
          8 (495) 234-22-44
        </a>
      </div>
    </Container>
  </footer>
);

export default MainFooter;
