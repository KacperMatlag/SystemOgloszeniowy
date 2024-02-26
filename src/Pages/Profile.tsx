import { useEffect, useState } from "react";
import "../CSS/PagesCSS/Profile.css";
import { User } from "../Models";
import axios from "axios";
import { useAuth } from "../AuthContext/authContect";
import { LoadingScreen } from ".";
import { Link, useParams } from "react-router-dom";

const LanguageColor = (text: string) => {
  switch (text[0]) {
    case "A":
      return "Red";
    case "B":
      return "lightgreen";
    case "C":
      return "Green";
    default:
      break;
  }
};

const ProfilePage: React.FC = () => {
  const { _User } = useAuth();
  const [userProfile, SetUserProfile] = useState<User>({} as User);
  const [loading, SetLoading] = useState<boolean>(true);
  const { id } = useParams();
  useEffect(() => {
    const LoadProfile = async () => {
      try {
        const res = await axios.get("http://localhost:2137/user/" + id);
        SetUserProfile(res.data);
        SetLoading(false);
      } catch (error) {
        console.error("Error loading profile:", error);
        SetLoading(false);
      }
    };
    LoadProfile();
  }, [_User]);
  if (loading) return <LoadingScreen />;
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
                <h4 className="text-center">{userProfile.Login}</h4>
              </div>
              {_User?.ID == id && (
                <Link to="/Profil/Edytuj">
                  <button className="btn btn-primary">Edytuj</button>
                </Link>
              )}
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
                    <td>{userProfile.Profile?.Name}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Nazwisko</b>
                    </td>
                    <td>{userProfile.Profile?.Surname}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Data urodzenia</b>
                    </td>
                    <td>
                      {new Date(
                        userProfile.Profile?.DateOfBirth as Date
                      ).toLocaleDateString() ?? "Nie podano"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Email</b>
                    </td>
                    <td>{userProfile.Profile?.Email}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Numer telefonu</b>
                    </td>
                    <td>{userProfile.Profile?.PhoneNumber ?? "-"}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Adres</b>
                    </td>
                    <td>{userProfile.Profile?.AddressID ?? "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row gy-5" style={{ minHeight: "400px" }}>
          <div className="col-xl-4 col-md-6">
            <div className="Style">
              <div>
                <h4 className="text-center">Platformy</h4>
                <hr />
              </div>
              <div className="Platforms Scroll d-flex flex-wrap">
                {userProfile.Profile.Services.length === 0 ? (
                  <h5>Brak usług dostępnych</h5>
                ) : (
                  userProfile.Profile.Services.map((element, index) => (
                    <div className="PlatformElement" key={index}>
                      <div className="ImageBox">
                        <img
                          src={element.Service.ImageUrl}
                          alt={element.Service.Name}
                        />
                      </div>
                      <a href={element.Link} target="_blank">
                        {element.Link}
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="Style LanguageView">
              <div>
                <h4 className="text-center">Jezyki</h4>
                <hr />
              </div>
              <div className="Scroll">
                <ul>
                  {userProfile.Profile.Languages.length == 0 ? (
                    <h5 className="text-center">Nie podano</h5>
                  ) : (
                    userProfile.Profile?.Languages.map((element, indext) => {
                      return (
                        <li key={indext}>
                          <div>{element.Language.Name}</div>
                          <div>
                            <div
                              style={{
                                backgroundColor: LanguageColor(element.Level),
                              }}
                              className="Radius"
                            >
                              {element.Level}
                            </div>
                          </div>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="Style">
              <h4 className="text-center">Aktualne stanowisko pracy</h4>
              <hr />
              <h5 className="text-center">
                <div
                  className="d-flex flex-column Scroll"
                  style={{ gap: "30px" }}
                >
                  <b>
                    {userProfile.Profile?.JobPosition?.Name ?? "Nie podano"}
                  </b>
                  <p>
                    {userProfile.Profile?.CurrentJobPositionDescription ||
                      "Nie podano"}
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
export default ProfilePage;
