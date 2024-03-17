import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import "../CSS/PagesCSS/AnnoucementCreate.css";
import type {
  JobLevel,
  TypeOfContract,
  WorkCategory,
  WorkingTime,
  WorkType,
} from "../Models/index";
import { ButtonProps } from "react-bootstrap";
import {
  addToListIfValid,
  getJobPositionsWithCertainCategory,
  handleSubmit,
  selectsDataValues,
} from "../Utils/AnnoucementCreateUtils";
import { useApi } from "../ApiMenager/ApiContext";

const AnnoucementCreate: React.FC = () => {
  const api = useApi();
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
    CompanyID: 1,
  });

  const [requirement, SetRequirement] = useState<string>("");
  const [requirements, SetRequirements] = useState<string[]>([]);

  const [duty, SetDuty] = useState<string>("");
  const [duties, Setduties] = useState<string[]>([]);

  const [emploeyOffer, SetEmploeyOffer] = useState<string>("");
  const [emploeyOffers, SetEmploeyOffers] = useState<string[]>([]);

  const [categories, SetCategories] = useState<WorkCategory[]>([]);
  const [positions, SetJobPositions] = useState<any[]>([]);
  const [jobLevels, SetJobLevels] = useState<JobLevel[]>([]);
  const [typesOfContract, SetTypeOfContract] = useState<TypeOfContract[]>([]);
  const [workingTimes, SetWorkingTimes] = useState<WorkingTime[]>([]);
  const [workTypes, SetWorkTypes] = useState<WorkType[]>([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const selectValues = await selectsDataValues(api);
        SetCategories(selectValues.Categories);
        SetTypeOfContract(selectValues.TypesOfContracts);
        SetWorkingTimes(selectValues.WorkingTime);
        SetWorkTypes(selectValues.WorkType);
        SetJobLevels(selectValues.JobLevels);
        SetLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
    SetLoading(false);
  }, []);

  useEffect(() => {
    getJobPositionsWithCertainCategory(api, announcement, SetJobPositions);
  }, [announcement.WorkCategoryID]);

  if (loading) return <LoadingScreen />;
  return (
    <div className="container-lg">
      <form
        className="d-flex flex-column create-form"
        onSubmit={(e) => {
          handleSubmit(
            e,
            api,
            duties,
            requirements,
            emploeyOffers,
            announcement
          );
        }}
      >
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
              JobPositionID: 0,
            });
          }}
        >
          <option value="0" selected>
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
          value={announcement.JobPositionID}
          onChange={(e) => {
            SetAnnouncementOptions({
              ...announcement,
              JobPositionID: parseInt(e.target.value),
            });
          }}
        >
          <option value="0" selected>
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
          <span>-</span>
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
        <span>Obowiazki</span>
        <div className="d-flex AnnouncementOptions">
          <div className="d-flex w-100 AnnouncementInput">
            <input
              type="text"
              className="form-control"
              name="Responsibilities"
              value={duty}
              onChange={(e) => {
                SetDuty(e.target.value);
              }}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={async () => {
                await addToListIfValid(duties, duty, SetDuty, Setduties);
              }}
            >
              Dodaj
            </button>
          </div>
          <ul>
            {duties.map((element) => {
              return (
                <li className="d-flex">
                  <div>{element}</div>
                  <button
                    className="btn btn-danger"
                    type="button"
                    id={element}
                    onClick={(e) => {
                      Setduties(
                        duties.filter((z) => z != (e.target as ButtonProps).id)
                      );
                    }}
                  >
                    Usun
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <span>Wymagania</span>
        <div className="d-flex AnnouncementOptions">
          <div className="d-flex w-100 AnnouncementInput">
            <input
              type="text"
              className="form-control"
              name="Requirements"
              value={requirement}
              onChange={(e) => {
                SetRequirement(e.target.value);
              }}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={async () => {
                await addToListIfValid(
                  requirements,
                  requirement,
                  SetRequirement,
                  SetRequirements
                );
              }}
            >
              Dodaj
            </button>
          </div>
          <ul>
            {requirements.map((element) => {
              return (
                <li className="d-flex">
                  <div>{element}</div>
                  <button
                    className="btn btn-danger"
                    type="button"
                    id={element}
                    onClick={(e) => {
                      SetRequirements(
                        requirements.filter(
                          (z) => z != (e.target as ButtonProps).id
                        )
                      );
                    }}
                  >
                    Usun
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <span>Oferowane przez pracodawce</span>
        <div className="d-flex flex-row AnnouncementOptions">
          <div className="d-flex w-100 AnnouncementInput">
            <input
              type="text"
              className="form-control"
              name="employeroffer"
              value={emploeyOffer}
              onChange={(e) => {
                SetEmploeyOffer(e.target.value);
              }}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={async () => {
                await addToListIfValid(
                  emploeyOffers,
                  emploeyOffer,
                  SetEmploeyOffer,
                  SetEmploeyOffers
                );
              }}
            >
              Dodaj
            </button>
          </div>
          <ul>
            {emploeyOffers.map((element) => {
              return (
                <li className="d-flex">
                  <div>{element}</div>
                  <button
                    className="btn btn-danger"
                    type="button"
                    id={element}
                    onClick={(e) => {
                      SetEmploeyOffers(
                        emploeyOffers.filter(
                          (z) => z != (e.target as ButtonProps).id
                        )
                      );
                    }}
                  >
                    Usun
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <pre>{JSON.stringify(duties)}</pre>
        <pre>{JSON.stringify(requirements)}</pre>
        <pre>{JSON.stringify(emploeyOffers)}</pre>
        <pre>{JSON.stringify(announcement)}</pre>
        <input type="submit" value="Dodaj" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default AnnoucementCreate;
