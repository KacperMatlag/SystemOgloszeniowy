import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/authContect";
import "../CSS/PagesCSS/EditProfile.css";
import {
  CategoryWithPositions,
  Language,
  Profile,
  Service,
  User,
  WorkCategory,
} from "../Models";
import { LoadingScreen } from ".";
import { CertainSelect } from "../Components";
import {
  ChangePassword,
  changePasswordSchema,
  LanguageColor,
  LoadSelects,
  DefaultResponseAction,
  LanguageLevels,
} from "../Utils/EditProfileUtils";
import { useApi } from "../ApiMenager/ApiContext";
const EditProfile = () => {
  const api = useApi();
  //Page Var's
  const { _User, _ReloadUser } = useAuth();
  const [profile, SetProfile] = useState<Profile>({} as Profile);
  const [loading, SetLoading] = useState<boolean>(true);
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

  useEffect(() => {
    const updateProfile = async () => {
      if (_User?.Profile) {
        await api.getData<User>("user/" + _User.ProfileID).then((res) => {
          SetProfile(res.data.Profile);
        });
        const CategoryID = (
          await api.getData<CategoryWithPositions>(
            "cwp/category/" + profile.CurrentJobPositionID
          )
        ).data;

        if (!selectedPosition) {
          SetSelectedCategory(CategoryID?.WorkCategoryID ?? 0);
          SetSelectedPosition(profile?.CurrentJobPositionID ?? 0);
        }
        SelectedJobDescription(profile.CurrentJobPositionDescription ?? "");
      }
    };
    updateProfile();
  }, [_User, selectedCategory, selectedPosition]);
  useEffect(() => {
    SetLoading(true);
    const loadProfile = async () => {
      const selectData = LoadSelects(api);

      setTimeout(async () => {
        SetCategories((await selectData).categories);
        SetLanguages((await selectData).languages);
        SetServices((await selectData).services);
        SetLoading(false);
      }, 0);
    };
    loadProfile();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await api
          .getData<CategoryWithPositions[]>("cwp/position/" + selectedCategory)
          .then((res) => {
            SetPositions(res.data);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedCategory]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-6 d-flex flex-column">
          <div className="ProfileStyle">
            <div>
              <h4 className="text-center">Profil Uzytkownika</h4>
              <hr />
            </div>
            <img
              src="https://fotoblysk.com/wp-content/uploads/2016/07/xRing-light-portret-1.jpg.pagespeed.ic.PuM47N375f.jpg"
              alt="profile image"
              className="ProfilePicture"
            />
            <form
              className="ProfileInfo d-flex flex-column"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await api
                    .patchData<Profile>("profile/update", profile)
                    .then((res) => {
                      DefaultResponseAction(
                        _ReloadUser,
                        res,
                        "Pomyślnie zaktualizowano profil"
                      );
                    });
                } catch (error: any) {
                  console.log(error.error);
                }
              }}
            >
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
                changePasswordSchema
                  .validate(password, { abortEarly: false })
                  .then(async () => {
                    await api
                      .postData("user/changepassword", {
                        ID: _User?.ID,
                        Password: password.Password,
                        NewPassword: password.NewPassword,
                      })
                      .then((res) => {
                        DefaultResponseAction(
                          _ReloadUser,
                          res,
                          "Pomyslnie zmieniono haslo",
                          "Wystapil problem podczas zmiany hasla"
                        );
                      })
                      .catch((err) => alert(err.message ?? ""));
                  });
              }}
            >
              <input
                type="password"
                className="form-control"
                placeholder="Stare haslo"
                onChange={(e) => {
                  SetPassword({ ...password, Password: e.target.value });
                }}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Nowe haslo"
                onChange={(e) => {
                  SetPassword({ ...password, NewPassword: e.target.value });
                }}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Powtorz nowe haslo"
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
            <h4 className="text-center">Obecna praca</h4>
            <hr />
            <form
              className="ProfileInfo d-flex flex-column Center"
              onSubmit={async (e) => {
                e.preventDefault();
                await api
                  .postData<Profile>("profile/updatecurrentjob", {
                    ID: _User?.ID,
                    JobPosition: selectedPosition,
                    JobDescription: jobDescription,
                  })
                  .then((res) => {
                    DefaultResponseAction(_ReloadUser, res);
                  })
                  .catch((err) => console.log(err));
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
                    res = await api.patchData(
                      "http://localhost:2137/languages",
                      data
                    );
                  } else res = await api.postData("languages", data);
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
                  {profile?.Languages?.map((element, index) => {
                    return (
                      <li key={index}>
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
                              .deleteData("languages/userlanguage/", element.ID)
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
                      .patchData("services/updateuserlink", data)
                      .then((res) => {
                        DefaultResponseAction(_ReloadUser, res);
                      });
                  } else {
                    await api
                      .postData("services/adduserlink", data)
                      .then((res) => {
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
                      <li key={index} className="ServiceListElement d-flex">
                        <div className="ServiceImage">
                          <img
                            src={element.Service.ImageUrl}
                            alt={element.Service.ImageUrl}
                          />
                        </div>
                        <p className="text-middle m-0">
                          {element.Service.Name}
                        </p>
                        <div className="Link text-middle">{element.Link}</div>
                        <button
                          className="btn btn-danger"
                          id={element.ID.toString()}
                          onClick={async () => {
                            await api
                              .deleteData("services/deleteuserLink", element.ID)
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
      </div>
    </div>
  );
};

export default EditProfile;
