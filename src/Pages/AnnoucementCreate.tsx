import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import "../CSS/PagesCSS/AnnoucementCreate.css";
import * as Yup from "yup";
import type {
  JobLevel,
  TypeOfContract,
  WorkCategory,
  WorkingTime,
  WorkType,
} from "../Models/index";

function AnnoucementCreate() {
  const [loading, SetLoading] = useState(true);
  const [announcement, SetAnnouncementOptions] = useState({
    Title: "",
    Description: "",
    WorkCategoryID: 0,
    JobPositionID: 0,
    JobLevelID: 0,
    TypeOfContractID: 0,
    WorkingTimeID: 0,
    WorkTypeID: 0,
    ExpirationDate: "",
    MinWage: 0,
    MaxWage: 0,
    Requirements: "",
    Responsibilities: "",
    WhatTheEmployerOffers: "",
    CompanyID: 1,
  });
  const [categories, SetCategories] = useState<WorkCategory[]>([]);
  const [positions, SetJobPositions] = useState<any[]>([]);
  const [jobLevels, SetJobLevels] = useState<JobLevel[]>([]);
  const [typesOfContract, SetTypeOfContract] = useState<TypeOfContract[]>([]);
  const [workingTimes, SetWorkingTimes] = useState<WorkingTime[]>([]);
  const [workTypes, SetWorkTypes] = useState<WorkType[]>([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const [Categories, TypesOfContracts, WorkingTime, WorkType, JobLevels] =
          await Promise.all([
            axios.get("http://localhost:2137/workcategory"),
            axios.get("http://localhost:2137/typeofcontract"),
            axios.get("http://localhost:2137/workingtime"),
            axios.get("http://localhost:2137/workType"),
            axios.get("http://localhost:2137/joblevel"),
          ]);
        SetCategories(Categories.data);
        SetTypeOfContract(TypesOfContracts.data);
        SetWorkingTimes(WorkingTime.data);
        SetWorkTypes(WorkType.data);
        SetJobLevels(JobLevels.data);
        SetLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
    SetLoading(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get("http://localhost:2137/cwp/" + announcement.WorkCategoryID)
          .then((res) => {
            SetJobPositions(res.data);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [announcement.WorkCategoryID]);

  const validationSchema = Yup.object().shape({
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
    ExpirationDate: Yup.date()
      .required("Data ważności jest wymagana")
      .nullable(),
    MinWage: Yup.number().min(0, "Wynagrodzenie minimalne nie może być ujemne"),
    MaxWage: Yup.number()
      .min(0, "Wynagrodzenie maksymalne nie może być ujemne")
      .when("MinWage", (minWage, schema) => {
        return schema.min(
          minWage,
          "Wynagrodzenie maksymalne nie może być mniejsze niż minimalne"
        );
      }),
    Requirements: Yup.string()
      .required("Wymagania są wymagane")
      .min(10, "Wymagania muszą mieć minimum 10 znaków")
      .max(1000, "Wymagania muszą mieć maksymalnie 1000 znakow"),
    Responsibilities: Yup.string()
      .required("Obowiązki są wymagane")
      .min(10, "Obowiązki muszą mieć minimum 10 znaków")
      .max(1000, "Obowiązki muszą mieć maksymalnie 1000 znakow"),
    WhatTheEmployerOffers: Yup.string()
      .required("Oferty pracodawcy są wymagane")
      .min(10, "Co oferuje pracodawca musi mieć minimum 10 znaków")
      .max(1000, "Co oferuje pracodawca musi mieć maksymalnie 1000 znakow"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(announcement);
      console.log(positions);
      await validationSchema.validate(announcement, { abortEarly: false });
      axios
        .post("http://localhost:2137/announcement/", announcement)
        .then((res) => {
          if (res.status === 200) {
            alert("Pomyślnie dodano");
          } else {
            alert("Jakiś błąd");
          }
        });
    } catch (error: any) {
      const alert = document.createElement("div");
      alert.classList.add("alert", "alert-danger", "alert-visible");
      alert.innerText += error.errors[0];
      document.body.append(alert);
      setTimeout(() => {
        alert.remove();
      }, 2000);
    }
  };

  if (loading) return <LoadingScreen />;
  return (
    <div className="container-lg">
      <form className="d-flex flex-column create-form" onSubmit={handleSubmit}>
        <span>Tytuł</span>
        <input
          type="text"
          name="Title"
          className="form-control"
          placeholder="Tytuł ogłoszenia"
          onChange={(e) => {
            SetAnnouncementOptions({ ...announcement, Title: e.target.value });
          }}
        />
        <span>Opis</span>
        <textarea
          name="Description"
          placeholder="Opis ogloszenia"
          cols={30}
          rows={10}
          className="form-control"
          onChange={(e) => {
            SetAnnouncementOptions({
              ...announcement,
              Description: e.target.value,
            });
          }}
        ></textarea>
        <span>Kategoria</span>
        <select
          name="CategoryID"
          className="form-select"
          onChange={(e) => {
            SetAnnouncementOptions({
              ...announcement,
              WorkCategoryID: parseInt(e.target.value),
            });
          }}
        >
          <option value="0" selected disabled>
            Wybierz Kategorie
          </option>
          {categories.map((key: WorkCategory, value) => {
            return (
              <option key={value} value={key.ID}>
                {key.Name}
              </option>
            );
          })}
        </select>
        <span>Pozycja</span>
        <select
          className="form-control"
          name="PositionID"
          onChange={(e) => {
            SetAnnouncementOptions({
              ...announcement,
              JobPositionID: parseInt(e.target.value),
            });
            console.log(e.target.value);
            
          }}
        >
          <option value="0" selected disabled>
            Wybierz Pozycje
          </option>
          {positions.map((key, value) => {
            return (
              <option key={value} value={key.JobPosition.ID}>
                {key.JobPosition.Name}
              </option>
            );
          })}
        </select>
        <span>Poziom pracy</span>
        <select
          name="JobLevelID"
          className="form-control"
          onChange={(e) =>
            SetAnnouncementOptions({
              ...announcement,
              JobLevelID: parseInt(e.target.value),
            })
          }
        >
          <option value="0" selected disabled>
            Wybierz poziom pracy
          </option>
          {jobLevels.map((key: JobLevel, value) => {
            return (
              <option key={value} value={key.ID}>
                {key.Name}
              </option>
            );
          })}
        </select>
        <span>Rodzaj Umowy</span>
        <select
          name="TypeOfContractID"
          className="form-control"
          onChange={(e) =>
            SetAnnouncementOptions({
              ...announcement,
              TypeOfContractID: parseInt(e.target.value),
            })
          }
        >
          <option value="0" disabled selected>
            Wybierz rodzaj umowy
          </option>
          {typesOfContract.map((key: TypeOfContract, value) => {
            return (
              <option key={value} value={key.ID}>
                {key.Name}
              </option>
            );
          })}
        </select>
        <span>Czas Pracy</span>
        <select
          name="WorkingTimeID"
          className="form-control"
          onChange={(e) =>
            SetAnnouncementOptions({
              ...announcement,
              WorkingTimeID: parseInt(e.target.value),
            })
          }
        >
          <option value="0" disabled selected>
            Wybierz czas pracy
          </option>
          {workingTimes.map((key: WorkingTime, value) => {
            return (
              <option key={value} value={key.ID}>
                {key.Name}
              </option>
            );
          })}
        </select>
        <span>Typ pracy</span>
        <select
          name="WorkTypeID"
          className="form-control"
          onChange={(e) =>
            SetAnnouncementOptions({
              ...announcement,
              WorkTypeID: parseInt(e.target.value),
            })
          }
        >
          <option value="0" selected disabled>
            Wybierz typ pracy
          </option>
          {workTypes.map((key: WorkType, value) => {
            return (
              <option key={value} value={key.ID}>
                {key.Name}
              </option>
            );
          })}
        </select>
        <span>Data wygasniecia</span>
        <input
          className="form-control"
          type="date"
          name="ExpirationDate"
          onChange={(e) =>
            SetAnnouncementOptions({
              ...announcement,
              ExpirationDate: e.target.value,
            })
          }
        />
        <span>Wynagrodzenie</span>
        <div className="d-flex">
          <input
            className="form-control"
            type="number"
            name="MinWage"
            placeholder="Minimalne wynagrodzenie"
            onChange={(e) =>
              SetAnnouncementOptions({
                ...announcement,
                MinWage: parseFloat(e.target.value),
              })
            }
          />
          -
          <input
            className="form-control"
            type="number"
            name="MaxWage"
            placeholder="Maksymlane wynagrodzenie"
            onChange={(e) =>
              SetAnnouncementOptions({
                ...announcement,
                MaxWage: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <span>Wymagania</span>
        <textarea
          cols={30}
          rows={10}
          name="Requirements"
          placeholder="Wymagania postawione kandydatowi"
          className="form-control"
          onChange={(e) =>
            SetAnnouncementOptions({
              ...announcement,
              Requirements: e.target.value,
            })
          }
        ></textarea>
        <span>Obowiazki</span>
        <textarea
          className="form-control"
          cols={30}
          placeholder="Obowiazki kandydata"
          rows={10}
          name="Responsibilities"
          onChange={(e) =>
            SetAnnouncementOptions({
              ...announcement,
              Responsibilities: e.target.value,
            })
          }
        ></textarea>
        <span>Oferowane przez pracodawce</span>
        <textarea
          cols={30}
          rows={10}
          name="WhatTheEmployerOffers"
          placeholder="Co pracodawca oferuje kandydatowi"
          className="form-control"
          onChange={(e) =>
            SetAnnouncementOptions({
              ...announcement,
              WhatTheEmployerOffers: e.target.value,
            })
          }
        ></textarea>
        <pre>{JSON.stringify(announcement)}</pre>
        <input type="submit" value="Dodaj" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default AnnoucementCreate;
