import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./CSS/index.css";
import "./CSS/main.css";
import { Footer, Navbar } from "./Components";
import {
  Home,
  AnnouncementList,
  AnnouncementView,
  LoginRegister,
  Profile,
  AnnouncementCreate,
} from "./Pages";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Ogloszenia" element={<AnnouncementList />} />
            <Route path="/Ogloszenia/:id" element={<AnnouncementView />} />
            <Route path="/Dodaj" element={<AnnouncementCreate />} />
            <Route path="/Logowanie" element={<LoginRegister />} />
            <Route path="/Profil" element={<Profile />} />
            <Route path="/*" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
