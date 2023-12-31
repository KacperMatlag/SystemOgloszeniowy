import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./CSS/index.css";
import "./CSS/main.css";
import logo from "./assets/react.svg";
import AnnouncementList from "./Pages/AnnouncementList";
import AnnouncementView from "./Pages/AnnouncementView";
import Home from "./Pages/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AnnoucementCreate from "./Pages/AnnoucementCreate";
import LoginRegister from "./Pages/LoginRegister";
import EditProfile from "./Pages/EdirProfile";
import Profile from "./Pages/Profile";

function App() {
  const [menuIsActive, MenuSetActivity] = useState(false);
  const MenuChangeState = () => {
    MenuSetActivity(!menuIsActive);
  };
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <nav>
            <img src={logo} alt="logo" />
            <div
              className={`NavbarLinksContainer ${
                menuIsActive ? "menu-active" : "menu-disactive"
              }`}
            >
              <Link to="/" className="menuItem" onClick={MenuChangeState}>
                Strona Główna
              </Link>
              <Link
                to="/Ogloszenia"
                className="menuItem"
                onClick={MenuChangeState}
              >
                Ogłoszenia
              </Link>
              <Link to="/" className="menuItem" onClick={MenuChangeState}>
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Ogloszenia" element={<AnnouncementList />} />
            <Route path="/Ogloszenia/:id" element={<AnnouncementView />} />
            <Route path="/Dodaj" element={<AnnoucementCreate />} />
            <Route path="/Logowanie" element={<LoginRegister />} />
            <Route path="/Profil" element={<Profile />} />
            <Route path="/EdycjaProfilu" element={<EditProfile />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <footer className="bg-black">
          <div className="row m-0">
            <div className="col-3">
              <img src={logo} alt="SomeLogo" />
              <p>SomeName</p>
            </div>
            <div className="col-3">
              <a href="#">Link1</a>
              <a href="#">Link2</a>
              <a href="#">Link3</a>
            </div>
            <div className="col-3">
              <a href="#">Link1</a>
              <a href="#">Link2</a>
            </div>
            <div className="col-3">
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Resources</a>
            </div>
            <hr />
            <div className="row">
              <section>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </section>
              <p>Copyright</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
