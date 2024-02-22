import { useEffect, useRef, useState } from "react";
import { useAuth } from "../AuthContext/authContect";
import "../CSS/PagesCSS/EditProfile.css";
import {
  CategoryWithPositions,
  Language,
  Profile,
  User,
  WorkCategory,
} from "../Models";
import { LoadingScreen } from ".";
import axios from "axios";
import * as yup from "yup";
import { CertainSelect } from "../Components";

interface ChangePassword {
  Password: string;
  NewPassword: string;
  NewPassword2: string;
}
const changePasswordSchema = yup.object().shape({
  Password: yup.string().required("Aktualne hasło jest wymagane"),
  NewPassword: yup
    .string()
    .min(8, "Nowe hasło musi mieć co najmniej 8 znaków")
    .required("Nowe hasło jest wymagane"),
  NewPassword2: yup
    .string()
    .oneOf(
      [yup.ref("NewPassword")],
      "Potwierdzenie nowego hasła musi być identyczne"
    )
    .required("Potwierdzenie nowego hasła jest wymagane"),
});

const EditProfile = () => {
  //Page Var's
  const { _User, _ReloadUser, isAuthenticated } = useAuth();
  const [profile, SetProfile] = useState<Profile>({} as Profile);
  const [loading, SetLoading] = useState<boolean>(true);
  //Password Change
  const [password, SetPassword] = useState<ChangePassword>({
    Password: "",
    NewPassword: "",
    NewPassword2: "",
  });
  //Current Job Position
  const [selectedCategory, SetSelectedCategory] = useState<number>(0);
  const [selectedPosition, SetSelectedPosition] = useState<number>(0);
  const [jobDescription, SelectedJobDescription] = useState<string>("");
  const [categories, SetCategories] = useState<WorkCategory[]>([]);
  const [positions, SetPositions] = useState<CategoryWithPositions[]>([]);
  //Language
  const [languages, SetLanguages] = useState<Language[]>([]);
  const [languageID, SetLanguageID] = useState<number | undefined>(undefined);
  const [level, SetLevel] = useState<string | undefined>(undefined);
  //
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
  //
  useEffect(() => {
    SetLoading(true);
    const loadProfile = async () => {
      if (_User?.Profile) {
        const profile: User = (
          await axios.get("http://localhost:2137/user/" + _User.ProfileID)
        ).data;

        SetProfile(profile.Profile);
        const [categories, languages] = await Promise.all([
          await axios.get("http://localhost:2137/workcategory/"),
          await axios.get("http://localhost:2137/languages"),
        ]);

        if (profile.Profile.CurrentJobPositionID) {
          const CategoryID = (
            await axios.get(
              "http://localhost:2137/cwp/category/" +
                _User.Profile.CurrentJobPositionID
            )
          ).data;
          SetSelectedCategory(CategoryID.WorkCategoryID);
          SetSelectedPosition(profile.Profile.CurrentJobPositionID);
        }
        SetCategories(categories.data);
        SetLanguages(languages.data);
        SetLoading(false);
      }
    };
    loadProfile();
  }, [isAuthenticated]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2137/cwp/position/" + selectedCategory
        );
        SetPositions(response.data);
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
        <div className="col-6">
          <div className="ProfileStyle">
            <div>
              <h4 className="text-center">Profil Uzytkownika</h4>
              <hr />
            </div>
            <img
              src="https://fotoblysk.com/wp-content/uploads/2016/07/xRing-light-portret-1.jpg.pagespeed.ic.PuM47N375f.jpg"
              alt="profile image"
            />
            <form
              className="ProfileInfo d-flex flex-column"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios
                    .patch("http://localhost:2137/profile/update", profile, {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      withCredentials: true,
                    })
                    .then((res) => {
                      if (res.status === 200) {
                        alert("Pomyślnie zaktualizowano profil");
                        setTimeout(() => {
                          _ReloadUser();
                        });
                      }
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
                    await axios
                      .post(
                        "http://localhost:2137/user/changepassword",
                        {
                          ID: _User?.ID,
                          Password: password.Password,
                          NewPassword: password.NewPassword,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                          withCredentials: true,
                        }
                      )
                      .then((res) => {
                        if (res.status == 200)
                          alert("Pomyslnie zmieniono haslo");
                        else alert("Wystapil problem podczas zmiany hasla");
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
                await axios
                  .post(
                    "http://localhost:2137/profile/updatecurrentjob",
                    {
                      ID: _User?.ID,
                      JobPosition: selectedPosition,
                      JobDescription: jobDescription,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      withCredentials: true,
                    }
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      alert("OK");
                    }
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <CertainSelect
                clases="form-select"
                name="JobCategory"
                onSelect={SetSelectedCategory}
                options={categories.sort((z) => z.ID)}
                placeholder="Wybierz Kategorie"
                selectedIndex={selectedCategory}
              />
              <CertainSelect
                clases="form-select"
                name="JobPosition"
                onSelect={SetSelectedPosition}
                placeholder="Wybierz Pozycje"
                options={positions.map((z) => z.JobPosition)}
                selectedIndex={selectedPosition}
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
                  if (
                    profile.Languages.find((z) => z.LanguageID == languageID)
                  ) {
                    await axios
                      .patch("http://localhost:2137/languages", {
                        ProfileID: profile.ID,
                        LanguageID: languageID,
                        Level: level,
                      })
                      .then(async (res) => {
                        if (res.status == 200) {
                          alert("OK");
                          _ReloadUser();
                        }
                      });
                  } else {
                    await axios
                      .post("http://localhost:2137/languages", {
                        ProfileID: _User?.ID,
                        Level: level,
                        LanguageID: languageID,
                      })
                      .then(async (res) => {
                        if (res.status == 200) {
                          alert("OK");
                          _ReloadUser();
                        }
                      })
                      .catch((err) => console.log(err));
                  }
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
                  options={[
                    { ID: "A1", Name: "A1" },
                    { ID: "A2", Name: "A2" },
                    { ID: "B1", Name: "B1" },
                    { ID: "B2", Name: "B2" },
                    { ID: "C1", Name: "C1" },
                    { ID: "C2", Name: "C2" },
                  ]}
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
                        <p>{element.Language.Name}</p>
                        <div
                          className="LanguageLevel"
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
                            await axios
                              .delete(
                                "http://localhost:2137/languages/userlanguage/" +
                                  element.ID
                              )
                              .then((res) => {
                                if (res.status == 200) {
                                  alert("OK");
                                  _ReloadUser();
                                }
                              });
                          }}
                        >
                          Delete
                        </button>
                      </li>
                    );
                  }) || <h4 className="text-center">Brak dodanych jezykow</h4>}
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
