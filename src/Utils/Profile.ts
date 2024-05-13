import { NavigateFunction } from "react-router-dom";
import ApiManager from "../ApiMenager/ApiManager";
import { Education, User } from "../Models";

export const languageColor = (text: string) => {
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
export const formatYear = (element: Education) => {
  return `${element.StartDate} - ${element.EndDate ?? "teraz"}`;
};
export const LoadProfile = async (
  api: ApiManager,
  id: string | undefined,
  SetUserProfile: React.Dispatch<React.SetStateAction<User | undefined>>,
  SetLoading: React.Dispatch<React.SetStateAction<boolean>>,
  naviagte: NavigateFunction
) => {
  try {
    const res = await api.get("user/profile/" + id);
    SetUserProfile(res.data);
  } catch (error: any) {
    if (error.response?.status == 404) {
      naviagte("/404");
    }
  }
  SetLoading(false);
};
