import {
  faAdd,
  faBars,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import { useState } from "react";
import "../CSS/main.css";
import "../CSS/index.css";
import { useAuth } from "../AuthContext/authContect";
import { useApi } from "../ApiMenager/ApiContext";

const Navbar: React.FC = () => {
  const api = useApi();
  const [menuIsActive, MenuSetActivity] = useState(false);
  const MenuChangeState = () => {
    MenuSetActivity(!menuIsActive);
  };
  const { isAuthenticated, _logout, _User } = useAuth();
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
        <Link to="/" className="menuItem">
          Firmy
        </Link>
        {isAuthenticated && (
          <Link to="/Dodaj" className="menuItem" onClick={MenuChangeState}>
            <FontAwesomeIcon icon={faAdd} />
          </Link>
        )}
        <Link
          to={isAuthenticated ? "/Profil/" + _User?.Profile?.ID : "/Logowanie"}
          className="menuItem"
          onClick={MenuChangeState}
        >
          {!isAuthenticated ? "Zaloguj sie" : <FontAwesomeIcon icon={faUser} />}
        </Link>
        {isAuthenticated && (
          <Link
            to="/"
            className="menuItem"
            onClick={async () => {
              await api.get("user/logout").then(() => {
                _logout();
                MenuChangeState();
              });
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Link>
        )}
      </div>
      <button onClick={MenuChangeState} className="menu-activator btn">
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
};

export default Navbar;
