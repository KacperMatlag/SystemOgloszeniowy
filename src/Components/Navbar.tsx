import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import { useState } from "react";
const Navbar: React.FC = () => {
  const [menuIsActive, MenuSetActivity] = useState(false);
  const MenuChangeState = () => {
    MenuSetActivity(!menuIsActive);
  };
  return (
    <nav>
      <Link to={"/"}>
        <img src={logo} alt="logo" />
      </Link>
      <div
        className={`NavbarLinksContainer ${
          menuIsActive ? "menu-active" : "menu-disactive"
        }`}
      >
        <Link to="/" className="menuItem" onClick={MenuChangeState}>
          Strona Główna
        </Link>
        <Link to="/Ogloszenia" className="menuItem" onClick={MenuChangeState}>
          Ogłoszenia
        </Link>
        <Link
          to="/"
          className="menuItem"
          onClick={async () => {
            await axios.get("http://localhost:2137/user/logout", {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            });
          }}
        >
          Firmy
        </Link>
        <Link to="/Logowanie" className="Login" onClick={MenuChangeState}>
          Zaloguj Się
        </Link>
      </div>
      <button
        onClick={MenuChangeState}
        className="menu-activator btn d-sm-block d-md-none"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
};

export default Navbar;
