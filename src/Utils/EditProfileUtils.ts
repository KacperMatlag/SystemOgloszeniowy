import * as yup from "yup";
import ApiManager from "../ApiMenager/ApiManager";
import { Language, Profile, Service, User, WorkCategory } from "../Models";
import axios, { AxiosResponse } from "axios";
import React from "react";
import BingMapResponse from "../Models/BingMapsResponse";
export interface ChangePassword {
  Password: string;
  NewPassword: string;
  NewPassword2: string;
}
export const changePasswordSchema = yup.object().shape({
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
export const LanguageColor = (text: string) => {
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

export const LoadSelects = async (api: ApiManager) => {
  const [categories, languages, services] = await Promise.all([
    api.get("workcategory"),
    api.get("languages"),
    api.get("services/services"),
  ]);
  return {
    categories: categories.data,
    languages: languages.data,
    services: services.data,
  };
};

export const DefaultResponseAction = async (
  action: () => void,
  res: AxiosResponse<any, any>,
  s200 = "OK",
  error = "cos poszlo nie tak"
) => {
  if (res.status == 200) {
    alert(s200);
    setTimeout(() => {
      action();
    }, 0);
  } else alert(error);
};

export const LanguageLevels = [
  { ID: "A1", Name: "A1" },
  { ID: "A2", Name: "A2" },
  { ID: "B1", Name: "B1" },
  { ID: "B2", Name: "B2" },
  { ID: "C1", Name: "C1" },
  { ID: "C2", Name: "C2" },
];

export const SetupFormDataForPatch = (profile: Profile, file?: File) => {
  console.log(file);

  const form = new FormData();
  if (file) form.append("files", file);
  form.append("ID", String(profile.ID));
  form.append("Name", String(profile.Name));
  form.append("Surname", String(profile.Surname));
  form.append("Email", String(profile.Email));
  form.append("PhoneNumber", String(profile.PhoneNumber));
  form.append("DateOfBirth", String(profile.DateOfBirth));
  return form;
};
export interface Address {
  Town: string;
  BlockNumber: string;
  PostCode: string;
}

export const SearchForAddress = async (
  api: ApiManager,
  address: Address,
  SetSearchedAddress: React.Dispatch<
    React.SetStateAction<BingMapResponse | undefined>
  >
) => {
  const apiRequest = `https://dev.virtualearth.net/REST/v1/Locations?addressline=${
    address.Town
  }+${address.BlockNumber}+${address.PostCode}&include=queryParse&key=${
    import.meta.env.VITE_BING_MAP_KEY
  }`;
  await api.customCall(apiRequest).then((res) => {
    if (res.status == 200) SetSearchedAddress(res.data);
  });
};

export const ChangepasswordEvent = async (
  password: ChangePassword,
  api: ApiManager,
  _User: User | null,
  _ReloadUser: () => void,
  Password: ChangePassword,
  SetPassword: React.Dispatch<React.SetStateAction<ChangePassword>>
) => {
  changePasswordSchema
    .validate(password, { abortEarly: false })
    .then(async () => {
      await api
        .post("user/changepassword", {
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
          SetPassword({
            ...Password,
            NewPassword: "",
            NewPassword2: "",
            Password: "",
          });
        });
    });
};

export const UpdateProfileInfo = async (
  _ReloadUser: () => void,
  api: ApiManager,
  profile: Profile,
  file?: File
) => {
  console.log(file);

  await api
    .patch("profile/update", SetupFormDataForPatch(profile, file))
    .then((res) => {
      DefaultResponseAction(
        _ReloadUser,
        res,
        "Pomyślnie zaktualizowano profil"
      );
    });
};
export const ChangeJob = async (
  api: ApiManager,
  data: {
    ID: number | undefined;
    JobPosition: number | undefined;
    JobDescription: string;
  },
  _ReloadUser: () => void
) => {
  await api
    .post("profile/updatecurrentjob", data)
    .then((res) => {
      DefaultResponseAction(_ReloadUser, res);
    })
    .catch((err) => console.log(err));
};

export const FormatUserAddress = (address: string) => {
  const addressArr = address.split(",");
  return {
    Town: (
      addressArr[1].trim().substring(addressArr[1].trim().indexOf(" ")) +
      " " +
      addressArr[0].trim().substring(0, addressArr[0].lastIndexOf(" "))
    ).trim(),
    BuildingNumber: addressArr[0]
      .substring(addressArr[0].lastIndexOf(" "))
      .trim(),
    PostCode: addressArr[1].trim(),
  };
};
