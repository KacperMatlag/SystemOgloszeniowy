import { useState, useEffect } from "react";
import { JobRowControl, CertainSelect } from "../Components/index";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import {} from "../CSS/PagesCSS/AnnouncementList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingScreen from "./LoadingScreen";
import type {
  Annoucement,
  Company,
  JobLevel,
  TypeOfContract,
  WorkCategory,
  WorkType,
  WorkingTime,
  CategoryWithPositions
} from "../Models/index";

const AnnouncementList = () => {
  const location = useLocation();
  const params = useParams();
  const queryParams = new URLSearchParams(location.search);

  const [loading, Setloading] = useState<boolean>(true);
  const [jobPosition, SetJobPosition] = useState<CategoryWithPositions[]>([]);
  const [companies, SetCompanies] = useState<Company[]>([]);
  const [categories, SetCategories] = useState<WorkCategory[]>([]);
  const [announcements, SetAnnouncements] = useState<Annoucement[]>([]);
  const [jobLevel, SetJobLevel] = useState<JobLevel[]>([]);
  const [typeOfContract, SetTypeOfContract] = useState<TypeOfContract[]>([]);
  const [workingTime, SetWorkingTime] = useState<WorkingTime[]>([]);
  const [workType, SetWorktype] = useState<WorkType[]>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          jobPositions,
          companies,
          categories,
          announcements,
          jobLevel,
          typeOfContract,
          workingTime,
          workType,
        ] = await Promise.all([
          axios.get("http://localhost:2137/cwp"),
          axios.get("http://localhost:2137/company"),
          axios.get("http://localhost:2137/workcategory"),
          params
            ? axios.get(
                "http://localhost:2137/announcement/filter?" + queryParams
              )
            : axios.get("http://localhost:2137/announcement/"),
          axios.get("http://localhost:2137/joblevel"),
          axios.get("http://localhost:2137/typeofcontract"),
          axios.get("http://localhost:2137/workingtime"),
          axios.get("http://localhost:2137/workType"),
        ]);
        setTimeout(() => {
          SetJobPosition(jobPositions.data);
          SetCompanies(companies.data);
          SetCategories(categories.data);
          SetAnnouncements(
            announcements.data.filter(
              (announcement: Annoucement) =>
                announcement.daysUntilExpiration >= 0
            )
          );
          SetJobLevel(jobLevel.data);
          SetTypeOfContract(typeOfContract.data);
          SetWorkingTime(workingTime.data);
          SetWorktype(workType.data);
          Setloading(false);
        }, 100);
      } catch (error) {
        console.error("Error while fetching data", error);
        Setloading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2137/announcement/filter?` +
          `WorkCategoryID=${selectCategory}` +
          `&WorkTypeID=${workTypeSelect}` +
          `&CompanyID=${companySelect}` +
          `&JobPositionID=${jobPositionSelect}` +
          `&JobLevelID=${jobLevelSelect}` +
          `&TypeOfContractID=${typeOfContractSelect}` +
          `&WorkingTimeID=${workingTimeSelect}` +
          `&Title=${titleInput}` +
          `&MinWage=${minWage}` +
          `&MaxWage=${maxWage}`
      );
      SetAnnouncements(response.data);
    } catch (error) {
      console.error("Error while fetching filtered data", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobPositionResponse] = await Promise.all([
          axios.get("http://localhost:2137/cwp/" + selectCategory),
        ]);
        SetJobPosition(jobPositionResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectCategory]);
  if (loading) return <LoadingScreen />;
  return (
    <div className="overflow-hidden w-100 row">
      <div className="col-lg-12 col-xl-2 menu">
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
      <div className="col-lg-12 col-xl-10">
        <div
          className="w-75 d-flex m-auto flex-column mt-5"
          style={{ gap: "50px", minHeight: "80vh" }}
        >
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <Link key={index} to={`/ogloszenia/${announcement.ID}`}>
                <JobRowControl data={announcement} />
              </Link>
            ))
          ) : (
            <h1 className="text-center">No announcements available</h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default AnnouncementList;
