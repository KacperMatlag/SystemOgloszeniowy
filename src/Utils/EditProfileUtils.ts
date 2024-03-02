import * as yup from "yup";
import ApiManager from "../ApiMenager/ApiManager";
import { Language, Service, WorkCategory } from "../Models";
import { AxiosResponse } from "axios";
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
    api.getData<WorkCategory[]>("workcategory"),
    api.getData<Language[]>("languages"),
    api.getData<Service[]>("services/services"),
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
