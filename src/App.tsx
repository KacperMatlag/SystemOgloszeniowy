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
import { AuthProvider } from "./AuthContext/authContect";
import EditProfile from "./Pages/EditProfile";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Ogloszenia" element={<AnnouncementList />} />
            <Route path="/Ogloszenia/:id" element={<AnnouncementView />} />
            <Route path="/Dodaj" element={<AnnouncementCreate />} />
            <Route path="/Logowanie" element={<LoginRegister />} />
            <Route path="/Profil/:id" element={<Profile />} />
            <Route path="/Profil/Edytuj" element={<EditProfile />} />
            <Route path="/*" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
