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
  AddCompany,
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
            <Route path="/Profil/:id/Edytuj" element={<EditProfile />} />
            <Route path="/Profil/:id/Edytuj/firma" element={<AddCompany />} />
            <Route path="/*" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
