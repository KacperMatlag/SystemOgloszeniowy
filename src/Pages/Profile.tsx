import { useEffect, useState } from "react";
import "../CSS/PagesCSS/Profile.css";
import { User } from "../Models";
import { useAuth } from "../AuthContext/authContect";
import { LoadingScreen } from ".";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../ApiMenager/ApiContext";
import { LoadProfile, formatYear, languageColor } from "../Utils/Profile";

const ProfilePage: React.FC = () => {
  const api = useApi();
  const { _User, isAuthenticated } = useAuth();
  const [userProfile, SetUserProfile] = useState<User | undefined>();
  const [loading, SetLoading] = useState<boolean>(true);
  const { id } = useParams();
  const naviagte = useNavigate();
  useEffect(() => {
    const LoadData = async () => {
      LoadProfile(api, id, SetUserProfile, SetLoading, naviagte);
    };
    LoadData();
  }, []);
  if (loading) return <LoadingScreen />;
  return (
    <div className="ProfileContainer">
      <div className="container-xxl">
        <div className="row gy-2">
          <div className="col-xl-6 col-md-12">
            <div className="ProfileView Style flex-column">
              <h4 className="text-center">Profil</h4>
              <hr className="w-100" />
              <div className="CenterInfo flex-column">
                <img
                  src={
                    userProfile?.Profile.ProfilePictureURL ??
                    "https://fotoblysk.com/wp-content/uploads/2016/07/xRing-light-portret-1.jpg.pagespeed.ic.PuM47N375f.jpg"
                  }
                  alt="zdjecie"
                />
                <h4 className="text-center">{`${userProfile?.Profile.Name} ${userProfile?.Profile.Surname}`}</h4>
              </div>
              {_User?.Profile.ID == id && isAuthenticated && (
                <Link to={`/Profil/${id}/Edytuj`}>
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
                    <td>{userProfile?.Profile?.Name}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Nazwisko</b>
                    </td>
                    <td>{userProfile?.Profile?.Surname}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Data urodzenia</b>
                    </td>
                    <td>
                      {new Date(
                        userProfile?.Profile?.DateOfBirth as Date
                      ).toLocaleDateString() ?? "Nie podano"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Email</b>
                    </td>
                    <td>{userProfile?.Profile?.Email}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Numer telefonu</b>
                    </td>
                    <td>{userProfile?.Profile?.PhoneNumber ?? "-"}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Adres</b>
                    </td>
                    <td>{userProfile?.Profile?.Address?.Address ?? "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row gy-2" style={{ minHeight: "400px" }}>
          <div className="col-xl-4 col-md-6">
            <div className="Style">
              <div>
                <h4 className="text-center">Platformy</h4>
                <hr />
              </div>
              <div className="Platforms Scroll d-flex flex-wrap">
                {userProfile?.Profile.Services.map((element, index) => (
                  <div className="PlatformElement" key={index}>
                    <div className="ImageBox">
                      <img
                        src={element.Service.ImageUrl}
                        alt={element.Service.Name}
                      />
                    </div>
                    <a href={`${element.Link}`} target="_blank">
                      {element.Link}
                    </a>
                  </div>
                )) || <h5>Brak usług dostępnych</h5>}
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
                  {userProfile?.Profile?.Languages.map((element, indext) => {
                    return (
                      <li key={indext}>
                        <div>{element.Language.Name}</div>
                        <div>
                          <div
                            style={{
                              backgroundColor: languageColor(element.Level),
                            }}
                            className="Radius"
                          >
                            {element.Level}
                          </div>
                        </div>
                      </li>
                    );
                  }) || <h5 className="text-center">Nie podano</h5>}
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
                    {userProfile?.Profile?.JobPosition?.Name ?? "Nie podano"}
                  </b>
                  <p>
                    {userProfile?.Profile?.CurrentJobPositionDescription ||
                      "Nie podano"}
                  </p>
                </div>
              </h5>
            </div>
          </div>
        </div>
        <div
          className="row gy-2"
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
                    <th scope="col">Data Rozpoczęcia</th>
                    <th scope="col">Data Zakończenia</th>
                  </tr>
                </thead>
                <tbody>
                  {userProfile?.Profile.Course.map((element, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{element.Name}</td>
                        <td>{element.Organizer}</td>
                        <td>
                          {new Date(
                            element.StartDate ?? ""
                          ).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(element.EndDate ?? "").toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row gy-2" style={{ height: "400px", margin: "20px 0" }}>
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
                  {userProfile?.Profile.Education.map((element, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{element.SchoolName}</td>
                        <td>{element.City}</td>
                        <td>{element.SchoolType?.Name ?? "-"}</td>
                        <td>{element.FieldOfStudy ?? "-"}</td>
                        <td>{formatYear(element)}</td>
                      </tr>
                    );
                  })}
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
