import { FC } from "react";
import Container from "components/Container";
import { getYear } from "date-fns";

import "./styles.scss";

const MainFooter: FC = () => (
  <footer className="MainFooter">
    <Container>
      <div className="MainFooter__content">
        <p className="MainFooter__info">
          © 2021-
          {getYear(Date.now())}
          {" "}
          «Need for drive»
        </p>

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
