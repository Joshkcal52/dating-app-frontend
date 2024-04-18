import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinHearts } from "@fortawesome/free-solid-svg-icons";

const MobileNavbar = () => {
  return (
    <div className="Navbar-wrapper">
      <Link to="/home" className="Home">
        <FontAwesomeIcon
          icon={faHouse}
          size="2xl"
          style={{ color: "#74C0FC" }}
        />
        Home
      </Link>
      <Link to="/calendar" className="Calendar">
        <FontAwesomeIcon
          icon={faCalendarDays}
          size="2xl"
          style={{ color: "#74C0FC" }}
        />
        Calendar
      </Link>
      <Link to="/contacts" className="contacts">
        <FontAwesomeIcon
          icon={faFaceGrinHearts}
          size="2xl"
          style={{ color: "#74C0FC" }}
        />
        Contacts
      </Link>
    </div>
  );
};

export default MobileNavbar;
