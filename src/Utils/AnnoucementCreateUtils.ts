import * as Yup from "yup";
import ApiManager from "../ApiMenager/ApiManager";
import { NavigateFunction } from "react-router-dom";
export const selectsDataValues = async (api: ApiManager) => {
  const [Categories, TypesOfContracts, WorkingTime, WorkType, JobLevels] = [
    await api.get("workcategory"),
    await api.get("typeofcontract"),
    await api.get("workingtime"),
    await api.get("workType"),
    await api.get("joblevel"),
  ];
  return {
    Categories: Categories.data,
    TypesOfContracts: TypesOfContracts.data,
    WorkingTime: WorkingTime.data,
    WorkType: WorkType.data,
    JobLevels: JobLevels.data,
  };
};

export const AnnoucementValidationShema = Yup.object().shape({
  Title: Yup.string()
    .required("Tytuł jest wymagany")
    .min(5, "Tytuł musi mieć minimum 5 znaków")
    .max(100, "Tytuł musi mieć maksymalnie 100 znaków"),
  Description: Yup.string()
    .required("Opis jest wymagany")
    .min(10, "Opis musi mieć minimum 10 znaków")
    .max(1000, "Opis musi mieć maksymalnie 1000 znakow"),
  WorkCategoryID: Yup.number().min(1, "Kategoria jest wymagana"),
  JobPositionID: Yup.number().min(1, "Pozycja jest wymagana"),
  JobLevelID: Yup.number().min(1, "Poziom pracy jest wymagany"),
  TypeOfContractID: Yup.number().min(1, "Rodzaj umowy jest wymagany"),
  WorkingTimeID: Yup.number().min(1, "Czas pracy jest wymagany"),
  WorkTypeID: Yup.number().min(1, "Typ pracy jest wymagany"),
  ExpirationDate: Yup.date().required("Data ważności jest wymagana").nullable(),
  MinWage: Yup.number().min(0, "Wynagrodzenie minimalne nie może być ujemne"),
  MaxWage: Yup.number()
    .min(0, "Wynagrodzenie maksymalne nie może być ujemne")
    .when("MinWage", (minWage, schema) => {
      return schema.min(
        minWage as unknown as number,
        "Wynagrodzenie maksymalne nie może być mniejsze niż minimalne"
      );
    }),
});

export const listElementValidator = Yup.string()
  .required()
  .min(4, "Tekst musi mieć co najmniej 4 znaki")
  .max(150, "Tekst nie może przekraczać 150 znaków");

export const handlePatch = async (
  api: ApiManager,
  navigate: NavigateFunction,
  announcement: any
) => {
  try {
    await AnnoucementValidationShema.validate(announcement, {
      abortEarly: false,
    });
    const res = await api.patch("announcement/", announcement);
    if (res.status === 200) {
      alert("Pomyślnie zaktualizowano");
      navigate("/");
    } else {
      alert("Wystąpił błąd");
    }
  } catch (err: any) {
    if (err.name === "ValidationError") {
      console.log("Validation errors:", err.errors);
      alert(`Validation errors: ${err.errors.join(", ")}`);
    } else {
      console.error("An error occurred:", err);
      alert("Wystąpił błąd");
    }
  }
};
export const handlePost = async (
  api: ApiManager,
  navigate: NavigateFunction,
  announcement: any
) => {
  try {
    await AnnoucementValidationShema.validate(announcement, {
      abortEarly: false,
    });
    const res = await api.post("announcement/", announcement);
    if (res.status === 201) {
      alert("Pomyślnie dodano");
      navigate("/");
    } else {
      alert("Wystąpił błąd podczas dodawania ogłoszenia");
    }
  } catch (error: any) {
    if (error instanceof Yup.ValidationError) {
      const errorMessages = error.inner.map((err) => err.message).join("\n");
      alert("Wystąpiły błędy walidacji:\n" + errorMessages);
    } else {
      console.log(error);
      alert("Wystąpił błąd: " + error.message);
    }
  }
};

export const getJobPositionsWithCertainCategory = async (
  api: ApiManager,
  announcement: any,
  SetJobPositions: React.Dispatch<React.SetStateAction<any[]>>
) => {
  api.get("cwp/" + announcement?.WorkCategoryID).then((res) => {
    SetJobPositions(res.data);
  });
};

export const addToListIfValid = async (
  getList: string[],
  getElement: string,
  setElement: React.Dispatch<React.SetStateAction<string>>,
  setList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    await listElementValidator.validate(getElement, { abortEarly: false });
    if (!getList.find((z) => z.toLowerCase() === getElement.toLowerCase())) {
      setList([...getList, getElement]);
      setElement("");
    } else {
      alert("Taki element już istnieje");
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.log(error);
      alert(error.errors[0]);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
