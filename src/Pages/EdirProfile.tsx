import {} from "../CSS/PagesCSS/EditProfile.css";
const EditProfile = () => {
  return (
    <div className="Profile">
      <div className="container-xl ProfileContainer">
        <div className="row">
          <div className="ProfileSection ProfileStyle col-6">
            <h4 className="text-center">Profil Uzytkownika</h4>
            <img
              src="https://fotoblysk.com/wp-content/uploads/2016/07/xRing-light-portret-1.jpg.pagespeed.ic.PuM47N375f.jpg"
              alt="profile image"
            />
            <form className="ProfileInfo d-flex flex-column">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Imie"
              />
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Nazwisko"
              />
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="Email"
              />
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                placeholder="Nr telefonu"
              />
              <input
                type="date"
                className="form-control"
                id="floatingInput"
                placeholder="Data urodzenia"
              />
              <button type="submit" className="btn btn-primary">
                Aktualizuj dane
              </button>
            </form>
          </div>
          <div className="col-6 d-flex flex-column" style={{ gap: "20px" }}>
            <div className="ProfileStyle h-50 Center">
              <h4 className="text-center">Profil Uzytkownika</h4>
              <form className="ProfileInfo d-flex flex-column Center">
                <input
                  type="passwors"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Stare haslo"
                />
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Nowe haslo"
                />
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Powtorz nowe haslo"
                />
                <button type="submit" className="btn btn-primary">
                  Aktualizuj profil
                </button>
              </form>
            </div>
            <div className="ProfileStyle h-50 Center">
              <h4 className="text-center">Obecna praca</h4>
              <form className="ProfileInfo d-flex flex-column Center">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Obecna pozycja</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <textarea
                  className="form-control"
                  placeholder="Opis"
                  id="floatingTextarea"
                  style={{ height: "50%" }}
                ></textarea>
                <button type="submit" className="btn btn-primary">
                  Aktualizuj profil
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="ProfileStyle h-100 Center">
              <h4 className="text-center">Adres zamieszkania</h4>
              <form className="ProfileInfo d-flex flex-column Center">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Powtorz nowe haslo"
                />
                <button type="submit" className="btn btn-primary">
                  Aktualizuj profil
                </button>
              </form>
            </div>
          </div>
          <div className="col-4">
            <div className="ProfileStyle h-100 Center">
              <h4 className="text-center">Edukacja</h4>
              <form className="ProfileInfo d-flex flex-column Center">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Powtorz nowe haslo"
                />
                <button type="submit" className="btn btn-primary">
                  Aktualizuj profil
                </button>
              </form>
            </div>
          </div>
          <div className="col-4">
            <div className="ProfileStyle h-100 Center">
              <h4 className="text-center">Jezyki</h4>
              <form className="ProfileInfo d-flex flex-column Center">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Powtorz nowe haslo"
                />
                <button type="submit" className="btn btn-primary">
                  Aktualizuj profil
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
