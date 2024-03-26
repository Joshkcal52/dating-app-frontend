import React from "react";
import "../styles/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinHearts } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="Navbar-wrapper">
      <div className="Home">
        <FontAwesomeIcon
          icon={faHouse}
          size="2xl"
          style={{ color: "#74C0FC" }}
        />
        Home
      </div>
      <div className="Calendar">
        <FontAwesomeIcon
          icon={faCalendarDays}
          size="2xl"
          style={{ color: "#74C0FC" }}
        />
        Calendar
      </div>
      <div className="People">
        <FontAwesomeIcon
          icon={faFaceGrinHearts}
          size="2xl"
          style={{ color: "#74C0FC" }}
        />
        People
      </div>
    </div>
  );
};

export default Navbar;
