import * as Yup from "yup";
import ApiManager from "../ApiMenager/ApiManager";

import { AxiosResponse } from "axios";
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

export const SideEffectPost = async (
  res: AxiosResponse,
  api: ApiManager,
  duties: string[],
  requirements: string[],
  emploeyOffers: string[]
) => {
  if (res.status === 201) {
    setTimeout(async () => {
      await api.post(
        "duties",
        duties.map((e) => {
          return { ID: null, Name: e, AnnouncementID: res.data.ID };
        })
      );
      await api.post(
        "requirements",
        requirements.map((e) => {
          return { ID: null, Name: e, AnnouncementID: res.data.ID };
        })
      );
      await api.post(
        "WhatTheEmployerOffers",
        emploeyOffers.map((e) => {
          return { ID: null, Name: e, AnnouncementID: res.data.ID };
        })
      );
    });
    alert("Pomyślnie dodano");
  }
};

export const handleSubmit = async (
  e: React.FormEvent,
  api: ApiManager,
  duties: any,
  requirements: any,
  emploeyOffers: any,
  announcement: any
) => {
  e.preventDefault();
  try {
    await AnnoucementValidationShema.validate(announcement, {
      abortEarly: false,
    });
    await api.post("announcement/", announcement).then(async (res: any) => {
      await SideEffectPost(res, api, duties, requirements, emploeyOffers);
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const getJobPositionsWithCertainCategory = async (
  api: ApiManager,
  announcement: any,
  SetJobPositions: React.Dispatch<React.SetStateAction<any[]>>
) => {
  api.get("cwp/" + announcement.WorkCategoryID).then((res) => {
    SetJobPositions(res.data);
  });
};

export const addToListIfValid = async (
  getList: string[],
  getElement: string,
  SetElement: React.Dispatch<React.SetStateAction<string>>,
  SetList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    await listElementValidator.validate(getElement, {
      abortEarly: false,
    });
    if (!getList.find((z) => z.toLowerCase() === getElement.toLowerCase())) {
      SetList([...getList, getElement]);
      SetElement("");
    } else {
      alert("Taki element juz istnieje");
    }
  } catch (error: any) {
    console.log(error);
    alert(error.errors[0]);
  }
};
