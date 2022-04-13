import React from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <div className="heading">
          <h1>Movie App</h1>
        </div>
      </Link>
    </div>
  );
};

export default Header;
