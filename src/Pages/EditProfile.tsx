import { useEffect, useRef, useState } from "react";
import { useAuth } from "../AuthContext/authContect";
import "../CSS/PagesCSS/EditProfile.css";
import {
  CategoryWithPositions,
  Language,
  Profile,
  Service,
  WorkCategory,
} from "../Models";
import { LoadingScreen } from ".";
import {
  CertainSelect,
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
} from "../Utils/EditProfileUtils";
import { useApi } from "../ApiMenager/ApiContext";
import BingMapResponse from "../Models/BingMapsResponse";
import { Link, useNavigate, useParams } from "react-router-dom";

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

  const [address, SetAddress] = useState<Address>({
    BlockNumber: "",
    Town: "",
    PostCode: "",
  });
  const [searchedAddress, SetSearchedAddress] = useState<BingMapResponse>();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const updateProfile = async () => {
      if (Number(id) == _User?.Profile?.ID) {
        await api.get("user/" + _User.ProfileID).then((res) => {
          SetProfile(res.data.Profile);
        });

        const CategoryID = (
          await api.get("cwp/category/" + profile?.CurrentJobPositionID)
        ).data;
        if (!selectedPosition) {
          SetSelectedCategory(CategoryID?.WorkCategoryID ?? 0);
          SetSelectedPosition(profile?.CurrentJobPositionID ?? 0);
        }
        SelectedJobDescription(profile?.CurrentJobPositionDescription ?? "");
      } else if (_User?.Profile && Number(id) !== _User?.Profile?.ID) {
        console.log("syf");
      }
    };
    updateProfile();
  }, [_User, selectedCategory, selectedPosition]);
  useEffect(() => {
    const loadProfile = async () => {
      const selectData = await LoadSelects(api);
      setTimeout(async () => {
        SetCategories(selectData.categories);
        SetLanguages(selectData.languages);
        SetServices(selectData.services);
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
          <div className="ProfileStyle">
            <div>
              <h4 className="text-center">Profil Uzytkownika</h4>
              <hr />
            </div>
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
            <form
              className="ProfileInfo d-flex flex-column"
              encType="multipart/form-data"
              onSubmit={async (e) => {
                e.preventDefault();
                UpdateProfileInfo(_ReloadUser, api, profile, file);
              }}
            >
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
              <button type="submit" className="btn btn-primary">
                Aktualizuj dane
              </button>
            </form>
          </div>
        </div>
        <div className="col-6 d-flex flex-column" style={{ gap: "20px" }}>
          <div className="ProfileStyle h-50 Center">
            <div>
              <h4 className="text-center">Profil Uzytkownika</h4>
              <hr />
            </div>
            <form
              className="ProfileInfo d-flex flex-column Center"
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
              <button type="submit" className="btn btn-primary">
                Aktualizuj profil
              </button>
            </form>
          </div>
          <div className="ProfileStyle h-50 Center">
            <div>
              <h4 className="text-center">Obecna praca</h4>
              <hr />
            </div>
            <form
              className="ProfileInfo d-flex flex-column Center"
              onSubmit={async (e) => {
                const data = {
                  ID: _User?.ID,
                  JobPosition: selectedPosition,
                  JobDescription: jobDescription,
                };
                e.preventDefault();
                ChangeJob(api, data, _ReloadUser);
              }}
            >
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
              <button type="submit" className="btn btn-primary">
                Aktualizuj profil
              </button>
            </form>
          </div>
        </div>
        <div className="row p-0 companiesrow">
          <div className="col-6">
            <div className="ProfileStyle h-100">
              <div>
                <h4 className="text-center">Zarzadzaj firmami</h4>
                <hr />
              </div>
              <div className="companies d-flex flex-column">
                <div className="companieslist"></div>
                <div className="companymenu">
                  <Link to={`/Profil/${id}/edytuj/firma`}>
                    <button className="btn btn-primary">Dodaj Firme</button>
                  </Link>
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
              <div>
                <h4 className="text-center m-0">Adres</h4>
                <hr />
              </div>
              <div className="d-flex">
                <div className="w-50 h-100">
                  <form
                    className="p-2 d-flex flex-column"
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
                    <button type="submit" className="btn btn-primary">
                      Szukaj
                    </button>
                  </form>
                </div>
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
                          className="d-flex flex-column"
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
                          <button
                            key={z.bbox?.toString()}
                            className="btn btn-primary"
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
                      );
                    })
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
              <div>
                <h4 className="text-center">Jezyki</h4>
                <hr />
              </div>
              <form
                className=" ProfileInfo d-flex flex-column"
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
                }}
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
                <button type="submit" className="btn btn-primary">
                  Zatwierdz
                </button>
              </form>
            </div>
          </div>
          <div className="col-8">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div>
                <h4 className="text-center">Twoje jezyki</h4>
                <hr />
              </div>
              <div className="ProfileInfo UserLanguageList">
                <ul>
                  {profile?.Languages?.map((element) => {
                    return (
                      <LanguageListElement
                        api={api}
                        element={element}
                        _ReloadUser={_ReloadUser}
                        key={element.ID}
                      />
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
              <div>
                <h4 className="text-center">Serwisy</h4>
                <hr />
              </div>
              <form
                className=" ProfileInfo d-flex flex-column"
                onSubmit={async (e) => {
                  const data = {
                    ProfileID: profile.ID,
                    ServiceID: service,
                    Link: link,
                  };
                  e.preventDefault();
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
                <button type="submit" className="btn btn-primary">
                  Zatwierdz
                </button>
              </form>
            </div>
          </div>
          <div className="col-8">
            <div className="ProfileStyle d-flex flex-column h-100">
              <div>
                <h4 className="text-center">Twoje jezyki</h4>
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
      </div>
    </div>
  );
};

export default EditProfile;
