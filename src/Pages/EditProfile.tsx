import { useEffect, useRef, useState } from "react";
import { useAuth } from "../AuthContext/authContect";
import "../CSS/PagesCSS/EditProfile.css";
import {
  Annoucement,
  CategoryWithPositions,
  Language,
  Profile,
  School,
  Service,
  WorkCategory,
  Course,
  Employment,
} from "../Models";
import { LoadingScreen } from ".";
import {
  CertainSelect,
  EditProfileListElement,
  LanguageListElement,
  ServiceListElement,
} from "../Components";
import {
  ChangePassword,
  LoadSelects,
  DefaultResponseAction,
  LanguageLevels,
  SearchForAddress,
  Address,
  ChangepasswordEvent,
  UpdateProfileInfo,
  ChangeJob,
  FormatUserAddress,
  EducationElement,
  educationPost,
  LanguageColor,
} from "../Utils/EditProfileUtils";
import { useApi } from "../ApiMenager/ApiContext";
import BingMapResponse from "../Models/BingMapsResponse";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EducationTableRow } from "../Components/EditProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const EditProfile = () => {
  const api = useApi();
  //Page Var's
  const { _User, _ReloadUser } = useAuth();
  const [profile, SetProfile] = useState<Profile | undefined>(undefined);
  //Password Change
  const [password, SetPassword] = useState<ChangePassword>({
    Password: "",
    NewPassword: "",
    NewPassword2: "",
  });
  //Current Job Position
  const [selectedCategory, SetSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [selectedPosition, SetSelectedPosition] = useState<number | undefined>(
    undefined
  );
  const [jobDescription, SelectedJobDescription] = useState<string>("");
  const [categories, SetCategories] = useState<WorkCategory[]>();
  const [positions, SetPositions] = useState<CategoryWithPositions[]>([]);
  //Language
  const [languages, SetLanguages] = useState<Language[]>([]);
  const [languageID, SetLanguageID] = useState<number | undefined>(undefined);
  const [level, SetLevel] = useState<string | undefined>(undefined);
  //Services
  const [services, SetServices] = useState<Service[]>([]);
  const [service, SetService] = useState<number>(0);
  const [link, SetLink] = useState<string>("");

  const [file, Setfile] = useState<File>();
  const inputFile = useRef<HTMLInputElement>(null);
  const profileImage = useRef<HTMLImageElement>(null);

  const [announcements, SetAnnouncements] = useState<Annoucement[]>([]);
  const [address, SetAddress] = useState<Address>({
    BlockNumber: "",
    Town: "",
    PostCode: "",
  });
  const [searchedAddress, SetSearchedAddress] = useState<BingMapResponse>();
  const [Education, SetEducation] = useState<EducationElement>();
  const [SchoolTypes, SetSchoolTypes] = useState<School[]>([]);
  const [Course, SetCourse] = useState<Course>();
  const [Employment, SetEmployment] = useState<Employment>({} as Employment);
  const { id } = useParams();

  useEffect(() => {
    const updateProfile = async () => {
      if (Number(id) == _User?.Profile?.ID) {
        await api.get("user/profile/" + _User.ProfileID).then(async (res) => {
          SetProfile(res.data.Profile);
        });
        SelectedJobDescription(profile?.CurrentJobPositionDescription ?? "");
      }
    };
    updateProfile();
  }, [_User]);
  useEffect(() => {
    const loadProfile = async () => {
      const selectData = await LoadSelects(api, profile?.ID);
      setTimeout(async () => {
        SetCategories(selectData.categories);
        SetLanguages(selectData.languages);
        SetServices(selectData.services);
        SetSchoolTypes(selectData.schooltype);
        await api
          .get("announcement/userCompanies/" + profile?.ID)
          .then((res) => {
            SetAnnouncements(res.data);
          });

        if (
          profile?.CurrentJobPositionDescription ||
          profile?.CurrentJobPositionID
        ) {
          const CategoryID = (
            await api.get("cwp/category/" + profile?.CurrentJobPositionID)
          ).data;
          SetSelectedCategory(CategoryID.WorkCategory.ID);
          SelectedJobDescription(profile.CurrentJobPositionDescription ?? "");
        }

        if (profile?.Address?.Address) {
          const add = FormatUserAddress(profile.Address?.Address);
          SetAddress({
            Town: add.Town,
            BlockNumber: add.BuildingNumber,
            PostCode: add.PostCode,
          });
        }
      }, 0);
    };
    loadProfile();
  }, [profile]);
  useEffect(() => {
    const fetchData = async () => {
      await api.get("cwp/position/" + selectedCategory).then((res) => {
        SetPositions(res.data);
      });
    };
    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    const load = () => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          if (typeof reader.result === "string") {
            if (profileImage && profileImage.current) {
              profileImage.current.src = reader.result;
            }
          }
        });
      }
    };
    load();
  }, [file]);

  if (!profile) return <LoadingScreen />;

  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-6 d-flex flex-column">
          <div className="ProfileStyle" style={{ height: "800px" }}>
            <div className="Header">
              <h4 className="text-center">Profil Uzytkownika</h4>
              <hr />
            </div>
            <form
              className="ProfileInfo d-flex flex-column MainContent"
              encType="multipart/form-data"
              onSubmit={async (e) => {
                e.preventDefault();
                UpdateProfileInfo(_ReloadUser, api, profile, file);
              }}
            >
              <div className="d-flex flex-column justify-content-between">
                <div
                  className="ImageContainer"
                  onClick={() => {
                    inputFile.current?.click();
                  }}
                >
                  <img
                    src={
                      profile.ProfilePictureURL ??
                      "https://fotoblysk.com/wp-content/uploads/2016/07/xRing-light-portret-1.jpg.pagespeed.ic.PuM47N375f.jpg"
                    }
                    alt="profile image"
                    className="ProfilePicture"
                    ref={profileImage}
                  />
                  <img
                    src="https://static.thenounproject.com/png/3322766-200.png"
                    alt="change image"
                    className="ImageChange"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger w-25"
                  onClick={async () => {
                    SetProfile({ ...profile, ProfilePictureURL: undefined });
                  }}
                >
                  usun zdjecie
                </button>
                <input
                  type="file"
                  name="files"
                  className="d-none"
                  ref={inputFile}
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      Setfile(e.target.files[0]);
                    }
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Imie"
                  defaultValue={profile.Name ?? ""}
                  onChange={(e) => {
                    SetProfile({ ...profile, Name: e.target.value });
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nazwisko"
                  value={profile.Surname ?? ""}
                  onChange={(e) => {
                    SetProfile({ ...profile, Surname: e.target.value });
                  }}
                />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={profile.Email ?? ""}
                  onChange={(e) => {
                    SetProfile({ ...profile, Email: e.target.value });
                  }}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nr telefonu"
                  value={profile.PhoneNumber ?? ""}
                  onChange={(e) => {
                    SetProfile({ ...profile, PhoneNumber: e.target.value });
                  }}
                />
                <input
                  type="date"
                  className="form-control"
                  placeholder="Data urodzenia"
                  defaultValue={profile?.DateOfBirth as unknown as number}
                  onChange={(e) => {
                    SetProfile({
                      ...profile,
                      DateOfBirth: new Date(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="Footer">
                <button type="submit" className="btn btn-primary w-100">
                  Aktualizuj dane
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-6 d-flex flex-column" style={{ gap: "20px" }}>
          <div className="ProfileStyle h-50 Center">
            <div className="Header">
              <h4 className="text-center">Profil Uzytkownika</h4>
              <hr />
            </div>
            <form
              className="ProfileInfo d-flex flex-column Center MainContent"
              onSubmit={async (e) => {
                e.preventDefault();
                ChangepasswordEvent(
                  password,
                  api,
                  _User,
                  _ReloadUser,
                  password,
                  SetPassword
                );
              }}
            >
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ gap: "30px" }}
              >
                <input
                  type="password"
                  className="form-control"
                  placeholder="Stare haslo"
                  value={password.Password}
                  onChange={(e) => {
                    SetPassword({ ...password, Password: e.target.value });
                  }}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Nowe haslo"
                  value={password.NewPassword}
                  onChange={(e) => {
                    SetPassword({ ...password, NewPassword: e.target.value });
                  }}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Powtorz nowe haslo"
                  value={password.NewPassword2}
                  onChange={(e) => {
                    SetPassword({ ...password, NewPassword2: e.target.value });
                  }}
                />
              </div>
              <div className="Footer">
                <button type="submit" className="btn btn-primary w-100">
                  Aktualizuj profil
                </button>
              </div>
            </form>
          </div>
          <div className="ProfileStyle h-50 Center">
            <div className="Header">
              <h4 className="text-center">Obecna praca</h4>
              <hr />
            </div>
            <form
              className="ProfileInfo d-flex flex-column MainContent"
              onSubmit={async (e) => {
                const data = {
                  ID: _User?.Profile.ID,
                  JobPosition: selectedPosition,
                  JobDescription: jobDescription,
                };
                e.preventDefault();
                ChangeJob(api, data, _ReloadUser);
              }}
            >
              <div className="d-flex flex-column justify-content-around">
                <CertainSelect
                  clases="form-select"
                  name="JobCategory"
                  onSelect={SetSelectedCategory}
                  options={categories?.sort((z) => z.ID)}
                  placeholder="Wybierz Kategorie"
                  selectedIndex={selectedCategory}
                />
                <CertainSelect
                  clases="form-select"
                  name="JobPosition"
                  onSelect={SetSelectedPosition}
                  placeholder="Wybierz Pozycje"
                  options={positions.map((z) => z.JobPosition)}
                  selectedIndex={profile.CurrentJobPositionID}
                />
                <textarea
                  className="form-control"
                  placeholder="Opis"
                  id="floatingTextarea"
                  style={{ height: "50%" }}
                  defaultValue={profile.CurrentJobPositionDescription}
                  onChange={(e) => {
                    SelectedJobDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="Footer">
                <button type="submit" className="btn btn-primary w-100">
                  Aktualizuj profil
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row p-0 companiesrow">
          <div className="col-6">
            <div className="ProfileStyle h-100">
              <div className="Header">
                <h4 className="text-center">Zarzadzaj firmami</h4>
                <hr />
              </div>
              <div className="companies d-flex flex-column MainContent">
                <div className="companieslist" style={{ gap: "10px" }}>
                  {profile.Companies?.map((z) => {
                    return (
                      <EditProfileListElement
                        text={z.Company.Name}
                        imageLink={z.Company.Image}
                        api={api}
                        ID={z.Company.ID}
                        deleteEndpoint="company"
                        onDelete={async () => {
                          SetProfile({
                            ...profile,
                            Companies: profile.Companies.filter(
                              (y) => y.Company.ID != z.Company.ID
                            ),
                          });
                          await api
                            .get("announcement/userCompanies/" + profile?.ID)
                            .then((res) => {
                              SetAnnouncements(res.data);
                            });
                        }}
                      />
                    );
                  })}
                </div>
                <div className="Footer">
                  <Link to={`/Profil/${id}/edytuj/firma`}>
                    <button className="btn btn-primary w-100">
                      Dodaj Firme
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="ProfileStyle h-100">
              <div className="Header">
                <h4 className="text-center">Zarzadzaj Ogloszeniami</h4>
                <hr />
              </div>
              <div className="companies d-flex flex-column MainContent">
                <div className="companieslist" style={{ gap: "10px" }}>
                  {announcements.map((z) => {
                    return (
                      <Link to={"/ogloszenia/" + z.ID}>
                        <EditProfileListElement
                          imageLink={z.Company?.Image}
                          text={z.Title}
                          api={api}
                          ID={Number(z.ID)}
                          deleteEndpoint="announcement"
                          editLink={`/Ogloszenia/${z.ID}/Edytuj`}
                          onDelete={() => {
                            SetAnnouncements(
                              announcements.filter((y) => y.ID != z.ID)
                            );
                          }}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{ maxHeight: "300px !important", height: "400px" }}
        >
          <div className="col-12 p-0">
            <div className="ProfileStyle h-100">
              <div className="Header">
                <h4 className="text-center m-0">Adres</h4>
                <hr />
              </div>
              <div className="d-flex flex-row">
                <form
                  className="w-50 MainContent p-2 d-flex flex-column MainContent"
                  style={{ gap: "10px" }}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    SearchForAddress(api, address, SetSearchedAddress);
                  }}
                >
                  <span>Miejscowosc</span>
                  <input
                    type="text"
                    value={address.Town}
                    className="form-control"
                    onChange={(e) => {
                      SetAddress({ ...address, Town: e.target.value });
                    }}
                  />
                  <span>Numer budynku</span>
                  <input
                    type="text"
                    className="form-control"
                    value={address.BlockNumber}
                    onChange={(e) => {
                      SetAddress({ ...address, BlockNumber: e.target.value });
                    }}
                  />
                  <span>Kod pocztowy</span>
                  <input
                    type="text"
                    className="form-control"
                    value={address.PostCode}
                    onChange={(e) => {
                      SetAddress({ ...address, PostCode: e.target.value });
                    }}
                  />
                  <div className="Footer">
                    <button type="submit" className="btn btn-primary w-100">
                      Szukaj
                    </button>
                  </div>
                </form>
                <div
                  className="w-50"
                  style={{
                    maxHeight: "300px",
                    height: "300px",
                    overflowY: "auto",
                  }}
                >
                  {searchedAddress &&
                  searchedAddress.resourceSets &&
                  searchedAddress.resourceSets.length &&
                  searchedAddress.resourceSets[0].resources?.length ? (
                    searchedAddress?.resourceSets[0]?.resources?.map((z) => {
                      const baseUrl = "https://maps.google.com/maps";
                      const defaultCoordinates = [0, 0];
                      const embedUrl = z.point.coordinates
                        ? `${baseUrl}/place?q=${z.point.coordinates[0]},${z.point.coordinates[1]}&z=15&output=embed`
                        : `${baseUrl}/place?q=${defaultCoordinates[0]},${defaultCoordinates[1]}&z=15&output=embed`;
                      return (
                        <div
                          className="d-flex flex-column h-100 "
                          style={{ gap: "10px" }}
                        >
                          <iframe
                            src={embedUrl}
                            width="600"
                            height="200"
                            style={{ border: "0px" }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                          <div className="Footer">
                            <button
                              key={z.bbox?.toString()}
                              className="btn btn-primary w-100"
                              onClick={async () => {
                                await api
                                  .post("profile/updateAddress", {
                                    Address: {
                                      Address: z.name,
                                      Longitude: z.point.coordinates
                                        ? z.point.coordinates[0]
                                        : 1,
                                      Latitude: z.point.coordinates
                                        ? z.point.coordinates[1]
                                        : 1,
                                    },
                                    ProfileID: profile.ID ?? 2,
                                  })
                                  .then((res) => {
                                    if (res.status == 200)
                                      DefaultResponseAction(_ReloadUser, res);
                                  });
                              }}
                            >
                              {z.name}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : profile.Address?.Address ? (
                    <h5 className="text-center">{profile.Address.Address}</h5>
                  ) : (
                    <h4 className="text-center">Nie znaleziono</h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row p-0 LanguageRow">
          <div className="col-4">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div className="Header">
                <h4 className="text-center">Jezyki</h4>
                <hr />
              </div>
              <form
                className=" ProfileInfo d-flex flex-column MainContent"
                onSubmit={async (e) => {
                  e.preventDefault();

                  const data = {
                    ProfileID: profile.ID,
                    LanguageID: languageID,
                    Level: level,
                  };

                  let res;
                  if (
                    profile.Languages.find((z) => z.LanguageID == languageID)
                  ) {
                    res = await api.patch(
                      "http://localhost:2137/languages",
                      data
                    );
                  } else res = await api.post("languages", data);
                  DefaultResponseAction(_ReloadUser, res);
                  // if (res.status == 200 || res.status == 201) {
                  //   defa
                  //   SetProfile({
                  //     ...profile,
                  //     Languages: [...profile.Languages, res.data],
                  //   });
                  // }
                }}
              >
                <div
                  className="d-flex flex-column aling-items-center justify-content-center"
                  style={{ gap: "30px" }}
                >
                  <CertainSelect
                    clases="form-select"
                    name="LanguageName"
                    onSelect={SetLanguageID}
                    placeholder="Jezyk"
                    options={languages}
                  />
                  <CertainSelect
                    clases="form-select"
                    name="Language"
                    placeholder="Poziom"
                    options={LanguageLevels}
                    onSelect={SetLevel}
                  />
                </div>
                <div className="Footer">
                  <button type="submit" className="btn btn-primary w-100">
                    Zatwierdz
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-8">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div className="Header">
                <h4 className="text-center">Twoje jezyki</h4>
                <hr />
              </div>
              <div className="ProfileInfo UserLanguageList">
                <ul>
                  {profile?.Languages?.map((element) => {
                    return (
                      <li key={element.ID}>
                        <p className="m-0 text-middle">
                          {element.Language.Name}
                        </p>
                        <div
                          className="LanguageLevel text-middle"
                          style={{
                            backgroundColor: LanguageColor(element.Level),
                          }}
                        >
                          {element.Level}
                        </div>
                        <button
                          className="btn btn-danger"
                          id={element.ID.toString()}
                          onClick={async () => {
                            await api
                              .delete("languages/userlanguage", element.ID)
                              .then((res) => {
                                DefaultResponseAction(_ReloadUser, res);
                              });
                          }}
                        >
                          Delete
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row LanguageRow p-0">
          <div className="col-4">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div className="Header">
                <h4 className="text-center">Serwisy</h4>
                <hr />
              </div>
              <form
                className=" ProfileInfo d-flex flex-column MainContent"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const data = {
                    ProfileID: profile.ID,
                    ServiceID: service,
                    Link: link,
                  };
                  const searchUserService = profile.Services?.find(
                    (z) => z.ServiceID == service
                  );
                  if (searchUserService) {
                    await api
                      .patch("services/updateuserlink", data)
                      .then((res) => {
                        DefaultResponseAction(_ReloadUser, res);
                      });
                  } else {
                    await api.post("services/adduserlink", data).then((res) => {
                      DefaultResponseAction(_ReloadUser, res);
                    });
                  }
                }}
              >
                <div
                  className="d-flex flex-column justify-content-center"
                  style={{ gap: "30px" }}
                >
                  <CertainSelect
                    clases="form-select"
                    name="Services"
                    onSelect={SetService}
                    placeholder="Serwisy"
                    options={services}
                  />
                  <input
                    type="text"
                    name="Link"
                    className="form-control"
                    placeholder="URL"
                    value={link}
                    onChange={(e) => {
                      SetLink(e.target.value);
                    }}
                  />
                </div>
                <div className="Footer">
                  <button type="submit" className="btn btn-primary w-100">
                    Zatwierdz
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-8">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div className="Header">
                <h4 className="text-center">Twoje serwisy</h4>
                <hr />
              </div>
              <div className="ProfileInfo ServiceList">
                <ul>
                  {profile?.Services?.map((element, index) => {
                    return (
                      <ServiceListElement
                        api={api}
                        data={element}
                        key={index}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row p-0">
          <div className="col-4">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div className="Header">
                <h4 className="text-center">Edukacja</h4>
                <hr />
              </div>
              <form
                className=" ProfileInfo d-flex flex-column MainContent"
                onSubmit={async (e) => {
                  e.preventDefault();
                  educationPost(api, Education, profile, SetProfile);
                }}
              >
                <div
                  className="d-flex flex-column justify-content-center"
                  style={{ gap: "30px" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nazwa szkoły/uczelni"
                    value={Education?.SchoolName}
                    onChange={(e) =>
                      SetEducation({ ...Education, SchoolName: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Kierunek"
                    onChange={(e) => {
                      SetEducation({
                        ...Education,
                        FieldOfStudy: e.target.value,
                      });
                    }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Miasto"
                    onChange={(e) =>
                      SetEducation({ ...Education, City: e.target.value })
                    }
                  />
                  <select
                    className="form-control"
                    onChange={(e) => {
                      SetEducation({
                        ...Education,
                        SchoolType: Number(e.target.value),
                      });
                    }}
                  >
                    <option value="0" disabled selected>
                      Rodzaj szkoły
                    </option>
                    {SchoolTypes.map((z) => {
                      return (
                        <option key={z.Name} value={z.ID}>
                          {z.Name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="d-flex flex-column" style={{ gap: "5px" }}>
                    <b>Zakres czasowy [rok]</b>
                    <div className="d-flex" style={{ gap: "5px" }}>
                      <input
                        type="number"
                        placeholder="Poczatek"
                        className="form-control"
                        onChange={(e) =>
                          SetEducation({
                            ...Education,
                            StartDate: Number(e.target.value),
                          })
                        }
                      />
                      <input
                        type="number"
                        placeholder="Koniec"
                        className="form-control"
                        onChange={(e) =>
                          SetEducation({
                            ...Education,
                            EndDate: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="Footer">
                  <button type="submit" className="btn btn-primary w-100">
                    Zatwierdz
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-8">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div className="Header">
                <h4 className="text-center">Twoja edukacja</h4>
                <hr />
              </div>
              <div className="ProfileInfo EducationList">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nazwa</th>
                      <th>Profil</th>
                      <th>Miasto</th>
                      <th>Data rozpoczęcia</th>
                      <th>Data zakończenia</th>
                      <th>usun</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.Education.map((z) => {
                      return (
                        <EducationTableRow
                          Api={api}
                          Education={z}
                          Profile={profile}
                          SetProfile={SetProfile}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row p-0">
          <div className="col-4">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div className="Header">
                <h4 className="text-center">Kursy</h4>
                <hr />
              </div>
              <form
                className=" ProfileInfo d-flex flex-column MainContent"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const post = await api.post("course", {
                    ...Course,
                    ProfileID: profile.ID,
                  });
                  if (post.status == 201) {
                    alert("OK");
                    SetProfile({
                      ...profile,
                      Course: [...profile.Course, post.data],
                    });
                  }
                }}
              >
                <div
                  className="d-flex flex-column justify-content-center"
                  style={{ gap: "30px" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nazwa kursu"
                    value={Course?.Name}
                    onChange={(e) => {
                      SetCourse({ ...Course, Name: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Organizator"
                    value={Course?.Organizer}
                    onChange={(e) => {
                      SetCourse({ ...Course, Organizer: e.target.value });
                    }}
                  />
                  <div className="d-flex flex-column" style={{ gap: "5px" }}>
                    <b>Zakres czasowy [rok]</b>
                    <div className="d-flex" style={{ gap: "5px" }}>
                      <input
                        type="date"
                        placeholder="Poczatek"
                        className="form-control"
                        onChange={(e) =>
                          SetCourse({
                            ...Course,
                            StartDate: new Date(e.target.value),
                          })
                        }
                      />
                      <input
                        type="date"
                        placeholder="Koniec"
                        className="form-control"
                        onChange={(e) =>
                          SetCourse({
                            ...Course,
                            EndDate: new Date(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="Footer">
                  <button type="submit" className="btn btn-primary w-100">
                    Zatwierdz
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-8">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div className="Header">
                <h4 className="text-center">Twoja kursy</h4>
                <hr />
              </div>
              <div className="ProfileInfo EducationList">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nazwa</th>
                      <th>Organizator</th>
                      <th>Data rozpoczęcia</th>
                      <th>Data zakończenia</th>
                      <th>usun</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.Course?.map((z) => {
                      return (
                        <tr>
                          <td>{z.Name}</td>
                          <td>{z.Organizer}</td>
                          <td>{new Date(z.StartDate ?? "").toDateString()}</td>
                          <td>{new Date(z.EndDate ?? "").toDateString()}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={async () => {
                                await api.delete("course", z.ID).then((res) => {
                                  if (res.status == 200) {
                                    SetProfile({
                                      ...profile,
                                      Course: profile.Course.filter(
                                        (y) => y.ID != res.data.ID
                                      ),
                                    });
                                  }
                                });
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row p-0">
          <div className="col-4">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div className="Header">
                <h4 className="text-center">Historia zatrudnienia</h4>
                <hr />
              </div>
              <form
                className=" ProfileInfo d-flex flex-column MainContent"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await api
                    .post("employment", {
                      ...Employment,
                      ProfileID: profile.ID,
                    })
                    .then((res) => {
                      if (res.status == 201) {
                        _ReloadUser();
                        alert("Pomyslnie dodano");
                      } else {
                        alert("Wystapil blad");
                      }
                    });
                }}
              >
                <div
                  className="d-flex flex-column justify-content-center"
                  style={{ gap: "30px" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nazwa Firmy"
                    value={Employment?.Company}
                    onChange={(e) => {
                      SetEmployment({ ...Employment, Company: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Organizator"
                    value={Employment?.Position}
                    onChange={(e) => {
                      SetEmployment({
                        ...Employment,
                        Position: e.target.value,
                      });
                    }}
                  />
                  <div className="d-flex flex-column" style={{ gap: "5px" }}>
                    <b>Zakres czasowy [rok]</b>
                    <div className="d-flex" style={{ gap: "5px" }}>
                      <input
                        type="date"
                        placeholder="Poczatek"
                        className="form-control"
                        onChange={(e) =>
                          SetEmployment({
                            ...Employment,
                            StartDate: new Date(e.target.value),
                          })
                        }
                      />
                      <input
                        type="date"
                        placeholder="Koniec"
                        className="form-control"
                        onChange={(e) =>
                          SetEmployment({
                            ...Employment,
                            EndDate: new Date(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="Footer">
                  <button type="submit" className="btn btn-primary w-100">
                    Zatwierdz
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-8">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div className="Header">
                <h4 className="text-center">Twoja historia zatrudnienia</h4>
                <hr />
              </div>
              <div className="ProfileInfo EducationList">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nazwa</th>
                      <th>Organizator</th>
                      <th>Data rozpoczęcia</th>
                      <th>Data zakończenia</th>
                      <th>usun</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.Employment?.map((y) => {
                      return (
                        <tr>
                          <td>{y.Company}</td>
                          <td>{y.Position}</td>
                          <td>{new Date(y.StartDate ?? "").toDateString()}</td>
                          <td>{new Date(y.EndDate ?? "").toDateString()}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={async () => {
                                await api
                                  .delete("employment", y.ID)
                                  .then(() => {
                                    SetProfile({
                                      ...profile,
                                      Employment: profile.Employment.filter(
                                        (o) => o.ID != y.ID
                                      ),
                                    });
                                  });
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row p-0">
          <div className="col-12">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div className="Header">
                <h4 className="text-center">Twoja aplikacje</h4>
                <hr />
              </div>
              <div className="ProfileInfo EducationList">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Firma</th>
                      <th>Ogloszenie</th>
                      <th>Data aplikowania</th>
                      <th>usun</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.Applications?.map((y) => {
                      return (
                        <tr>
                          <td>{y.Announcement.Company?.Name}</td>
                          <td>
                            <a href={"/ogloszenia/" + y.Announcement.ID}>
                              {y.Announcement.Title}
                            </a>
                          </td>
                          <td>{new Date(y.createdAt ?? "").toDateString()}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={async () => {
                                await api
                                  .delete("application", y.ID)
                                  .then((res) => {
                                    if (res.status == 200) {
                                      alert("Pomyslnie usunieto");
                                      _ReloadUser();
                                    }
                                  });
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
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
    </div>
  );
};

export default EditProfile;
