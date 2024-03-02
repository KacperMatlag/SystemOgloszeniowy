import * as Yup from "yup";
import ApiManager from "../ApiMenager/ApiManager";
export const selectsDataValues = async (api: ApiManager) => {
  const promises = [
    api.getData("workcategory"),
    api.getData("typeofcontract"),
    api.getData("workingtime"),
    api.getData("workType"),
    api.getData("joblevel"),
  ];

  const results = await Promise.allSettled(promises);

  const data = results.map((result) => {
    if (result.status === "fulfilled") {
      return result.value.data;
    } else {
      return null;
    }
  });

  const [Categories, TypesOfContracts, WorkingTime, WorkType, JobLevels] = data;

  return { Categories, TypesOfContracts, WorkingTime, WorkType, JobLevels };
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

export const employerOfferValidator = Yup.object().shape({
  emploeyOffer: Yup.string()
    .required()
    .min(4, "Tekst musi mieć co najmniej 4 znaki")
    .max(150, "Tekst nie może przekraczać 150 znaków"),
});
export const requirementsValidator = Yup.object().shape({
  requirement: Yup.string()
    .required()
    .min(4, "Tekst musi mieć co najmniej 4 znaki")
    .max(150, "Tekst nie może przekraczać 150 znaków"),
});
export const dutiesValidator = Yup.object().shape({
  duty: Yup.string()
    .required()
    .min(4, "Tekst musi mieć co najmniej 4 znaki")
    .max(150, "Tekst nie może przekraczać 150 znaków"),
});
