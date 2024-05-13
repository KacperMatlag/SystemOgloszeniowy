import { useState, useEffect } from "react";
import { JobRowControl, CertainSelect } from "../Components/index";
import { Link } from "react-router-dom";
import "../CSS/PagesCSS/AnnouncementList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingScreen from "./LoadingScreen";
import type {
  Company,
  JobLevel,
  TypeOfContract,
  WorkCategory,
  WorkType,
  WorkingTime,
  CategoryWithPositions,
  AnnouncementFilterResponse,
} from "../Models/index";
import {
  createPaginationButtons,
  selectsDataValues,
} from "../Utils/AnnouncementListUtils";
import { useApi } from "../ApiMenager/ApiContext";

const AnnouncementList: React.FC = () => {
  const api = useApi();
  const link = window.location.href;
  const queryParams =
    link.indexOf("?") > 0 ? link.substring(link.indexOf("?") + 1) : null;

  const [loading, Setloading] = useState<boolean>(true);
  const [jobPosition, SetJobPosition] = useState<CategoryWithPositions[]>([]);
  const [companies, SetCompanies] = useState<Company[]>([]);
  const [categories, SetCategories] = useState<WorkCategory[]>([]);
  const [announcements, SetAnnouncements] =
    useState<AnnouncementFilterResponse>();
  const [jobLevel, SetJobLevel] = useState<JobLevel[]>([]);
  const [typeOfContract, SetTypeOfContract] = useState<TypeOfContract[]>([]);
  const [workingTime, SetWorkingTime] = useState<WorkingTime[]>([]);
  const [workType, SetWorktype] = useState<WorkType[]>([]);
  const [currentPage, SetCurrentPage] = useState<number>(1);
  const [paginationButton, SetPaginationButtons] = useState<string[]>([]);
  //
  const [selectCategory, SetSelectCategory] = useState("");
  const [jobPositionSelect, SetJobPositionSelect] = useState("");
  const [companySelect, SetCompanySelect] = useState("");
  const [jobLevelSelect, SetJobLevelSelect] = useState("");
  const [workTypeSelect, SetWorkTypeSelect] = useState("");
  const [typeOfContractSelect, SetTypeOfContractSelect] = useState("");
  const [workingTimeSelect, SetWorkingTimeSelect] = useState("");
  const [titleInput, SetTitleInput] = useState("");
  const [minWage, SetMinWage] = useState("");
  const [maxWage, SetMaxWage] = useState("");
  const [firstLoad, SetFirstLoad] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await selectsDataValues(api, queryParams);
      SetPaginationButtons(
        createPaginationButtons(
          data.announcements.maxPage,
          data.announcements.page
        )
      );
      SetJobPosition(data.jobPositions);
      SetCompanies(data.companies);
      SetAnnouncements(data.announcements);
      SetCategories(data.categories);
      SetJobLevel(data.jobLevel);
      SetTypeOfContract(data.typeOfContract);
      SetWorkingTime(data.workingTime);
      SetWorktype(data.workType);
      Setloading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (firstLoad && queryParams != "") {
      SetFirstLoad(false);
      return Setloading(false);
    }
    const pageChange = async () => {
      await filterApiCall().then((res) => {
        SetPaginationButtons(
          createPaginationButtons(res.data.maxPage, res.data.page)
        );
        SetAnnouncements(res.data);
        Setloading(false);
      });
    };
    pageChange();
  }, [currentPage]);

  const filterApiCall = async () => {
    return await api.get(
      `announcement/filter?` +
        `WorkCategoryID=${selectCategory}` +
        `&WorkTypeID=${workTypeSelect}` +
        `&CompanyID=${companySelect}` +
        `&JobPositionID=${jobPositionSelect}` +
        `&JobLevelID=${jobLevelSelect}` +
        `&TypeOfContractID=${typeOfContractSelect}` +
        `&WorkingTimeID=${workingTimeSelect}` +
        `&Title=${titleInput}` +
        `&MinWage=${minWage}` +
        `&MaxWage=${maxWage}` +
        `&page=${currentPage}`
    );
  };

  const handleFilterClick = async () => {
    SetCurrentPage(1);
    const annoucements = await filterApiCall();
    SetAnnouncements(annoucements.data);
    SetPaginationButtons(
      createPaginationButtons(annoucements.data.maxPage, annoucements.data.page)
    );
    Setloading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const jobPositionResponse = await api.get("cwp/" + selectCategory);
      SetJobPosition(jobPositionResponse.data);
    };
    fetchData();
  }, [selectCategory]);

  if (loading) return <LoadingScreen />;
  return (
    <div className="overflow-hidden w-100 row gy-3">
      <div className="col-lg-12 col-xl-4 menu">
        <div className="m-auto p-3 FormWrap">
          <form
            className="m-auto d-flex flex-column"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              name="Title"
              className="form-control"
              placeholder="Tytuł"
              onChange={(e) => SetTitleInput(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              name="MinWage"
              placeholder="Minimalne wynagrodzenie"
              onChange={(e) => SetMinWage(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              name="MaxWage"
              placeholder="Maksymalne wynagrodzenie"
              onChange={(e) => SetMaxWage(e.target.value)}
            />
            <CertainSelect
              name="WorkCategoryID"
              options={categories}
              onSelect={SetSelectCategory}
              placeholder="Kategoria"
              clases="form-select"
            />
            <CertainSelect
              name="JobPositionID"
              options={jobPosition.map((item) => item.JobPosition)}
              onSelect={SetJobPositionSelect}
              placeholder="Stanowisko"
              clases="form-select"
            />
            <CertainSelect
              name="CompanyID"
              options={companies}
              onSelect={SetCompanySelect}
              placeholder="Firma"
              clases="form-select"
            />
            <CertainSelect
              name="JobLevelID"
              options={jobLevel}
              onSelect={SetJobLevelSelect}
              placeholder="Poziom"
              clases="form-select"
            />
            <CertainSelect
              name="TypeOfContractID"
              options={typeOfContract}
              onSelect={SetTypeOfContractSelect}
              placeholder="Umowa"
              clases="form-select"
            />
            <CertainSelect
              name="WorkingTimeID"
              options={workingTime}
              onSelect={SetWorkingTimeSelect}
              placeholder="Czas pracy"
              clases="form-select"
            />
            <CertainSelect
              name="WorkTypeID"
              options={workType}
              onSelect={SetWorkTypeSelect}
              placeholder="Rodzaj pracy"
              clases="form-select"
            />
            <button className="btn btn-primary" onClick={handleFilterClick}>
              Szukaj
            </button>
          </form>
        </div>
      </div>
      <div className="col-lg-12 col-xl-8 menu2">
        <div
          className="w-100 d-flex flex-column my-3"
          style={{ gap: "10px", minHeight: "80vh" }}
        >
          {announcements?.data && announcements.data.length > 0 ? (
            announcements?.data?.map((announcement, index) => (
              <Link key={index} to={`/ogloszenia/${announcement.ID}`}>
                <JobRowControl data={announcement} />
              </Link>
            ))
          ) : (
            <h1 className="text-center">No announcements available</h1>
          )}
        </div>
        <div className="paginationMenu d-flex align-items-center justify-content-left">
          {paginationButton.length > 1 &&
            paginationButton?.map((z) => {
              return (
                <button
                  key={Math.random()}
                  onClick={async () => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    SetCurrentPage(Number(z));
                  }}
                  className={z == currentPage?.toString() ? "currentPage" : ""}
                  style={{ pointerEvents: z == "..." ? "none" : "all" }}
                >
                  {z}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementList;
