import {} from "../CSS/PagesCSS/Profile.css";

const LanguageColor = (text: string) => {
  switch (text[0]) {
    case "A":
      return "Red";
    case "B":
      return "Yellow";
    case "C":
      return "Green";
    default:
      break;
  }
};

const Profile: React.FC = () => {
  return (
    <div className="ProfileContainer">
      <div className="container-xxl">
        <div className="row gy-5">
          <div className="col-xl-6 col-md-12">
            <div className="ProfileView Style flex-column">
              <h4 className="text-center">Profil</h4>
              <hr className="w-100" />
              <div className="CenterInfo flex-column">
                <img
                  src="https://fotoblysk.com/wp-content/uploads/2016/07/xRing-light-portret-1.jpg.pagespeed.ic.PuM47N375f.jpg"
                  alt="zdjecie"
                />
                <h4 className="text-center">Nazwa uzytkownika</h4>
              </div>
            </div>
          </div>
          <div className="col-xl-6 co-md-12">
            <div className="Style">
              <h4 className="text-center">Dane osobwe</h4>
              <hr />
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <b>Imie</b>
                    </td>
                    <td>Przyklad</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Nazwisko</b>
                    </td>
                    <td>Przyklad</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Data urodzenia</b>
                    </td>
                    <td>Przyklad</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Email</b>
                    </td>
                    <td>Przyklad</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Numer telefonu</b>
                    </td>
                    <td>Przyklad</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Adres</b>
                    </td>
                    <td>Przyklad</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row gy-5" style={{ minHeight: "400px" }}>
          <div className="col-xl-4 col-md-6">
            <div className="Style">
              <h4 className="text-center">Platformy</h4>
              <hr />
              <div className="Platforms d-flex flex-wrap">
                <div>
                  <img
                    src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                    alt="github"
                  />
                  <b>Konto 1</b>
                </div>
                <div>
                  <img
                    src="https://logowik.com/content/uploads/images/bitbucket9553.jpg"
                    alt="bitbucket"
                  />
                  <b>Konto 1</b>
                </div>
                <div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png"
                    alt="github"
                  />
                  <b>Konto 1</b>
                </div>
                <div>
                  <img
                    src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                    alt="github"
                  />
                  <b>Konto 1</b>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="Style LanguageView">
              <h4 className="text-center">Jezyki</h4>
              <hr />
              <ul>
                <li>
                  <div>Polski</div>
                  <div style={{ backgroundColor: LanguageColor("B1") }}>B1</div>
                </li>
                <li>
                  <div>Niemiecki</div>
                  <div style={{ backgroundColor: LanguageColor("A2") }}>A2</div>
                </li>
                <li>
                  <div>Wloski</div>
                  <div style={{ backgroundColor: LanguageColor("C1") }}>C1</div>
                </li>
                <li>
                  <div>Hiszpanski</div>
                  <div style={{ backgroundColor: LanguageColor("C1") }}>C1</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="Style">
              <h4 className="text-center">Aktualne stanowisko pracy</h4>
              <hr />
              <h5 className="text-center">
                <div className="d-flex flex-column" style={{ gap: "30px" }}>
                  <b>Nazwa zajmowanego stanowiska</b>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nesciunt doloribus ratione cumque eum atque. Non nostrum cum
                    rerum tempore ex magnam eos soluta? Facere id facilis
                    soluta, iste eligendi vel.
                  </p>
                </div>
              </h5>
            </div>
          </div>
        </div>
        <div
          className="row gy-5"
          style={{ height: "400px", maxHeight: "400px" }}
        >
          <div className="col-12">
            <div className="Style">
              <h4 className="text-center">Kursy</h4>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nazwa</th>
                    <th scope="col">Organizator</th>
                    <th scope="col">Data odbycia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Kurs Programowania</td>
                    <td>Firma XYZ Edukacja</td>
                    <td>2022-03-10 - 2022-03-12</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Szkolenie Zarządzania Projektem</td>
                    <td>Institute of Project Management</td>
                    <td>2022-03-10 - 2022-03-12</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Certyfikat Java Developer</td>
                    <td>Java Certification Institute</td>
                    <td>2022-03-10 - 2022-03-12</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row gy-5" style={{ height: "400px", margin: "20px 0" }}>
          <div className="col-12">
            <div className="Style">
              <h4 className="text-center">Wyksztalcenie</h4>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nazwa</th>
                    <th scope="col">Miejscowosc</th>
                    <th scope="col">Poziom</th>
                    <th scope="col">Kierunek</th>
                    <th scope="col">Czas trwania</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Uniwersytet XYZ</td>
                    <td>Miasto A</td>
                    <td>Licencjat</td>
                    <td>Informatyka</td>
                    <td>2001-2005</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Politechnika ABC</td>
                    <td>Miasto B</td>
                    <td>Magister</td>
                    <td>Inżynieria Elektryczna</td>
                    <td>2003-2005</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Akademia KLM</td>
                    <td>Miasto C</td>
                    <td>Licencjat</td>
                    <td>Psychologia</td>
                    <td>2002-2005</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Uniwersytet XYZ</td>
                    <td>Miasto A</td>
                    <td>Licencjat</td>
                    <td>Informatyka</td>
                    <td>2001-2005</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Politechnika ABC</td>
                    <td>Miasto B</td>
                    <td>Magister</td>
                    <td>Inżynieria Elektryczna</td>
                    <td>2003-2005</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Akademia KLM</td>
                    <td>Miasto C</td>
                    <td>Licencjat</td>
                    <td>Psychologia</td>
                    <td>2002-2005</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
