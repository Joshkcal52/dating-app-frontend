import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";

const Navbar = () => {
  return (
    <div className="Navbar-wrapper">
      <button className="btn-31">
        <span class="text-container">
          <span class="text">
            <Link to="/home" className="Home">
              Home
            </Link>
          </span>
        </span>
      </button>
      <button className="btn-31">
        <span class="text-container">
          <span class="text">
            <Link to="/contacts" className="contacts">
              Contacts
            </Link>
          </span>
        </span>
      </button>
      <button className="btn-31">
        <span class="text-container">
          <span class="text">
            <Link to="/events" className="contacts">
              Events
            </Link>
          </span>
        </span>
      </button>
      <button className="btn-31">
        <span class="text-container">
          <span class="text">
            <Link to="/category" className="category">
              Category
            </Link>
          </span>
        </span>
      </button>
    </div>
  );
};

export default Navbar;
