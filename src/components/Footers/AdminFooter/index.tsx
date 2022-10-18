import { FC, ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";
import dataLinks from "./data";

import "./styles.scss";

const AdminFooter: FC = () => {
  const links = useMemo<ReactNode>(
    () => dataLinks.map((elem) => (
      <Link
        key={elem.id}
        to={elem.path}
        className="AdminFooter__links_item"
      >
        {elem.name}
      </Link>
    )),
    [],
  );

  return (
    <div className="AdminFooter">
      <div className="AdminFooter__links">{links}</div>

      <div className="AdminFooter__info">Copyright © 2020 NFD</div>
    </div>
  );
};

export default AdminFooter;
