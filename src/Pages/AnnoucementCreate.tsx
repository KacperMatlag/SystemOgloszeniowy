import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import "../CSS/PagesCSS/AnnoucementCreate.css";
import type {
  Annoucement,
  Company,
  JobLevel,
  Profile,
  TypeOfContract,
  User,
  WorkCategory,
  WorkingTime,
  WorkType,
} from "../Models/index";
import { ButtonProps } from "react-bootstrap";
import {
  addToListIfValid,
  getJobPositionsWithCertainCategory,
  handlePatch,
  handlePost,
  selectsDataValues,
} from "../Utils/AnnoucementCreateUtils";
import { useApi } from "../ApiMenager/ApiContext";
import { useAuth } from "../AuthContext/authContect";
import { useNavigate, useParams } from "react-router-dom";

const AnnoucementCreate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, SetEdit] = useState<boolean>(false);
  const { _User, isAuthenticated, _ReloadUser } = useAuth();
  const api = useApi();
  const [loading, SetLoading] = useState(true);
  const [announcement, SetAnnouncement] = useState<Annoucement>(
    {} as Annoucement
  );

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
  const [profile, SetProfile] = useState<User>();
  useEffect(() => {
    const fetchData = async () => {
      //_ReloadUser();
      if (!isAuthenticated) return;
      if (id && isAuthenticated) {
        SetEdit(true);
        await api.get("announcement/" + id).then((res) => {
          SetAnnouncement(res.data);
          Setduties(res.data.Duties.map((z: any) => z.Name));
          SetRequirements(res.data.Requirements.map((z: any) => z.Name));
          SetEmploeyOffers(
            res.data.WhatTheEmployerOffers.map((z: any) => z.Name)
          );
        });
      }
      // if (_User?.Profile.Companies.length == 0) {
      //   alert("Musisz miec przynajmniej 1 firme");
      //   navigate(-1);
      // }
      const selectValues = await selectsDataValues(api);
      SetCategories(selectValues.Categories);
      SetTypeOfContract(selectValues.TypesOfContracts);
      SetWorkingTimes(selectValues.WorkingTime);
      SetWorkTypes(selectValues.WorkType);
      SetJobLevels(selectValues.JobLevels);

      await api.get("user/" + _User?.ID).then((res) => {
        SetProfile(res.data);
      });

      SetLoading(false);
    };
    fetchData();
  }, [isAuthenticated]);

  useEffect(() => {
    const validateAnnouncement = async () => {
      if (!announcement) return;
      if (edit)
        await api
          .get("announcement/usercompanies/" + _User?.ProfileID)
          .then((res) => {
            const data = res.data as Annoucement[];
            if (!data.find((z) => z.ID == id)) {
              navigate("/");
            }
          });
    };
    validateAnnouncement();
  }, [announcement?.ID]);

  useEffect(() => {
    getJobPositionsWithCertainCategory(api, announcement, SetJobPositions);
  }, [announcement?.WorkCategoryID]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="container-lg">
      <form
        className="d-flex flex-column create-form"
        onSubmit={async (e) => {
          e.preventDefault();
          const data = {
            ...announcement,
            Duties: duties,
            Requirements: requirements,
            EmploeyOffers: emploeyOffers,
          };
          if (!edit) await handlePost(api, navigate, data);
          else handlePatch(api, navigate, data);
          console.log(_User?.Profile.Companies);
        }}
      >
        <span>Tytuł</span>
        <input
          type="text"
          name="Title"
          className="form-control"
          placeholder="Tytuł ogłoszenia"
          defaultValue={announcement?.Title}
          onChange={(e) => {
            SetAnnouncement({ ...announcement, Title: e.target.value });
          }}
        />
        <span>Opis</span>
        <textarea
          defaultValue={announcement?.Description}
          name="Description"
          placeholder="Opis ogloszenia"
          cols={30}
          rows={10}
          className="form-control"
          onChange={(e) => {
            SetAnnouncement({
              ...announcement,
              Description: e.target.value,
            });
          }}
        ></textarea>
        <span>Kategoria</span>
        <select
          defaultValue={categories
            .map((z) => z.ID)
            .find((y) => y == announcement?.WorkCategoryID)}
          name="CategoryID"
          className="form-select"
          onChange={(e) => {
            SetAnnouncement({
              ...announcement,
              WorkCategoryID: parseInt(e.target.value),
              JobPositionID: 0,
            });
          }}
        >
          <option value="0">Wybierz Kategorie</option>
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
          defaultValue={announcement?.JobPositionID}
          onChange={(e) => {
            SetAnnouncement({
              ...announcement,
              JobPositionID: parseInt(e.target.value),
            });
          }}
        >
          <option value="0">Wybierz Pozycje</option>
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
          defaultValue={jobLevels
            .map((z) => z.ID)
            .find((y) => y == announcement?.JobLevelID)}
          name="JobLevelID"
          className="form-control"
          onChange={(e) =>
            SetAnnouncement({
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
          defaultValue={typesOfContract
            .map((z) => z.ID)
            .find((y) => y == announcement?.TypeOfContractID)}
          name="TypeOfContractID"
          className="form-control"
          onChange={(e) =>
            SetAnnouncement({
              ...announcement,
              TypeOfContractID: parseInt(e.target.value),
            })
          }
        >
          <option value="0" selected disabled>
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
          defaultValue={workingTimes
            .map((z) => z.ID)
            .find((y) => y == announcement?.WorkingTimeID)}
          name="WorkingTimeID"
          className="form-control"
          onChange={(e) =>
            SetAnnouncement({
              ...announcement,
              WorkingTimeID: parseInt(e.target.value),
            })
          }
        >
          <option value="0" selected disabled>
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
          defaultValue={workTypes
            .map((z) => z.ID)
            .find((y) => y == announcement?.WorkTypeID)}
          name="WorkTypeID"
          className="form-control"
          onChange={(e) =>
            SetAnnouncement({
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
          value={
            (announcement?.ExpirationDate &&
              new Date(announcement.ExpirationDate)
                .toISOString()
                .split("T")[0]) ||
            ""
          }
          onChange={(e) =>
            SetAnnouncement({
              ...announcement,
              ExpirationDate: e.target.value,
            })
          }
        />
        <span>Wynagrodzenie</span>
        <div className="d-flex">
          <input
            defaultValue={announcement?.MinWage}
            className="form-control"
            type="number"
            name="MinWage"
            placeholder="Minimalne wynagrodzenie"
            onChange={(e) =>
              SetAnnouncement({
                ...announcement,
                MinWage: parseFloat(e.target.value),
              })
            }
          />
          <span>-</span>
          <input
            defaultValue={announcement?.MaxWage}
            className="form-control"
            type="number"
            name="MaxWage"
            placeholder="Maksymlane wynagrodzenie"
            onChange={(e) =>
              SetAnnouncement({
                ...announcement,
                MaxWage: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <span>Firma</span>
        <select
          defaultValue={_User?.Profile.Companies.map((z) => z.ID).find(
            (y) => y == announcement?.Company?.ID
          )}
          name="Company"
          id="CompanySelect"
          className="form-select"
          onChange={(e) => {
            SetAnnouncement({
              ...announcement,
              CompanyID: Number(e.target.value),
            });
          }}
        >
          <option value={0} selected disabled>
            Wybierz firme
          </option>
          {profile?.Profile.Companies?.map((element) => {
            return (
              <option value={element?.Company.ID}>
                {element?.Company.Name}
              </option>
            );
          })}
        </select>
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
        <input
          type="submit"
          value={edit ? "Edytuj" : "Dodaj"}
          className="btn btn-primary"
        />
      </form>
    </div>
  );
};
export default AnnoucementCreate;
