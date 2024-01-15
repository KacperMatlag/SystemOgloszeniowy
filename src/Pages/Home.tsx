import { useState, useEffect } from "react";
import {
  JobRowControl,
  JobSpotlight,
  CertainSelect,
} from "../Components/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/PagesCSS/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingScreen from "./LoadingScreen";
import * as tmp from "../temporary/announcementSample.json";
import type {
  Annoucement,
  Company,
  JobLevel,
  TypeOfContract,
  WorkCategory,
  WorkingTime,
  WorkType,
  CategoryWithPositions,
} from "../Models/index";

const Home: React.FC = () => {
  const navigate = useNavigate();
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
  const [title, SetTitleInput] = useState<string>("");
  const [spotlight, SetSpotlight] = useState<Annoucement | null>(null);
  const [count, SetCount] = useState<number>(0);
  //
  const [menu, SetMenu] = useState<boolean>(false);

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
          spotlight,
          count,
        ] = await Promise.all([
          axios.get("http://localhost:2137/cwp"),
          axios.get("http://localhost:2137/company"),
          axios.get("http://localhost:2137/workcategory"),
          axios.get("http://localhost:2137/announcement/latest"),
          axios.get("http://localhost:2137/joblevel"),
          axios.get("http://localhost:2137/typeofcontract"),
          axios.get("http://localhost:2137/workingtime"),
          axios.get("http://localhost:2137/workType"),
          axios.get("http://localhost:2137/announcement/random"),
          axios.get("http://localhost:2137/announcement/getcount"),
        ]);
        SetJobPosition(jobPositions.data);
        SetCompanies(companies.data);
        SetCategories(categories.data);
        SetAnnouncements(announcements.data);
        SetJobLevel(jobLevel.data);
        SetTypeOfContract(typeOfContract.data);
        SetWorkingTime(workingTime.data);
        SetWorktype(workType.data);
        SetSpotlight(spotlight.data);
        SetCount(count.data.count);
        Setloading(false);
        console.log(
          (
            await axios.get("http://localhost:2137/user/check", {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            })
          ).data
        );
      } catch (error) {
        //tymczasowe pod sprawdzanie widokow
        announcements.push(tmp as unknown as Annoucement);

        console.error("Błąd podczas pobierania danych", error);
        Setloading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get("http://localhost:2137/cwp/" + selectCategory).then((res) => {
          SetJobPosition(res.data);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectCategory]);

  if (loading) return <LoadingScreen />;
  return (
    <div id="HomeContainer">
      <div className="Banner">
        <div className="BannerInformations">
          <h2>Szukanie pracy nigdy nie było prostsze</h2>
          <p>
            Znajdź swoją ścieżkę zawodową z nami! Przeglądaj bogatą gamę
            ogłoszeń o pracę i otwórz drzwi do nowych możliwości. Twój nowy
            rozdział zawodowy zaczyna się tutaj!
          </p>
          <button>Zobacz wiecej</button>
        </div>
      </div>
      <section className="SearchSection">
        <h2 className="text-center">Wyszukiwarka</h2>
        <form
          id="SearchForm"
          className="d-flex flex-wrap"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(
              `/Ogloszenia?WorkCategoryID=${selectCategory}` +
                `&WorkTypeID=${workTypeSelect}` +
                `&CompanyID=${companySelect}` +
                `&JobPositionID=${jobPositionSelect}` +
                `&JobLevelID=${jobLevelSelect}` +
                `&TypeOfContractID=${typeOfContractSelect}` +
                `&WorkingTimeID=${workingTimeSelect}` +
                `&Title=${title}`
            );
          }}
        >
          <div id="SearchBarItems">
            <div id="SearchText">
              <input
                type="text"
                name="Title"
                className="form-control shadow-none"
                placeholder={"Mamy w swojej ofercie " + count + " ogloszen/ia"}
                onChange={(e) => SetTitleInput(e.target.value)}
              />
              <CertainSelect
                name="WorkCategoryID"
                options={categories}
                onSelect={SetSelectCategory}
                placeholder="Kategoria"
                clases="form-select shadow-none"
              />
              <CertainSelect
                name="JobPositionID"
                options={jobPosition.map((item) => item.JobPosition)}
                onSelect={SetJobPositionSelect}
                placeholder="Stanowisko"
                clases="form-select shadow-none"
              />
              <button className="btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
            <div
              id="AdvanceSearchOptions"
              className={menu ? "d-block visible" : "d-none"}
            >
              <FontAwesomeIcon
                icon={faX}
                id="CloseAdvanceSearch"
                onClick={() => {
                  SetMenu(!menu);
                }}
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
            </div>
          </div>
          <p
            id="AdvanceSearchIndicator"
            onClick={() => {
              SetMenu(!menu);
            }}
          >
            zaawansowane wyszukiwanie
          </p>
        </form>
      </section>
      <section className="row row-xl AnnouncementsSection w-100">
        <div className="col-xxl-8 p-3 JobSection">
          <h2 className="text-center">Ostatnio Dodane</h2>
          <div className="w-100 JobsList">
            {announcements.length <= 0 ? (
              <h4 className="text-center">Brak ostatio dodanych</h4>
            ) : (
              announcements.map((announcement: Annoucement, index: number) => {
                return (
                  <Link key={index} to={`/ogloszenia/${announcement.ID}`}>
                    <JobRowControl data={announcement} />
                  </Link>
                );
              })
            )}
          </div>
          <h2 className="text-center">Ostatnio oglądane</h2>
          <div className="w-75 m-auto JobsList">
            <h4 className="text-center">Nie masz ostatio ogladanych</h4>
          </div>
        </div>
        <div className="col-xxl-4 p-3 JobSpotlight">
          <h2 className="text-center m-3">Wyróżnione</h2>
          <div className="w-75 m-auto">
            {spotlight == null ? (
              <h4 className="text-center">Brak wyróżnionego ogloszenia</h4>
            ) : (
              <Link to={`/Ogloszenia/${spotlight.ID}`}>
                <JobSpotlight data={spotlight} />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
