import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import "../CSS/PagesCSS/AnnouncementView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faWallet,
  faLocationDot,
  faBriefcase,
  faClock,
  faFile,
  faHourglassStart,
  faLayerGroup,
  faCircleCheck,
  faPaperPlane,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import type { Annoucement } from "../Models/index";
import { useApi } from "../ApiMenager/ApiContext";
import { useAuth } from "../AuthContext/authContect";

const AnnouncementView: React.FC = () => {
  const navigate = useNavigate();
  const { _User, isAuthenticated, _ReloadUser } = useAuth();
  const { id } = useParams();
  const [announcement, SetAnnouncement] = useState<Annoucement | undefined>();
  interface Application {
    ID?: number;
    ProfileID?: number;
    AnnouncementID?: number;
  }
  const api = useApi();
  const [loading, SetLoading] = useState(true);
  const [isFloatingVisible, setFloatingVisibility] = useState(true);
  const [aplication, SetApplication] = useState<Application | undefined>(
    undefined
  );
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const announcementRes = await api.get(`announcement/${id}`);
        SetAnnouncement(announcementRes.data);
        SetLoading(false);
      } catch (error: any) {
        if (error.response?.status == 404) {
          navigate("/404");
        }
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const lastVisited = () => {
      _ReloadUser();
      if (!announcement || !announcement.ID) return;
      if (!localStorage.getItem("Last4")) localStorage.setItem("Last4", "[]");
      let list = Array.from(
        JSON.parse(localStorage.getItem("Last4") ?? "[]")
      ) as Annoucement[];
      if (list.findIndex((z) => z.ID == announcement.ID) != -1) return;
      if (list.length > 7) {
        list = list.slice(0, 7);
      }
      localStorage.setItem("Last4", JSON.stringify([announcement, ...list]));
      console.log(localStorage.getItem("Last4"));
    };
    lastVisited();
  }, [announcement]);

  useEffect(() => {
    if (!announcement?.ID || !_User?.Profile.ID) return;
    const loadApplication = async () => {
      const applicationCheck = await api.get(
        "application/" + announcement?.ID + "/" + _User?.Profile.ID
      );
      if (applicationCheck) SetApplication(applicationCheck.data);
    };
    loadApplication();
  }, [_User, announcement]);
  useEffect(() => {
    const handleScroll = () => {
      const containerBottom =
        container?.current?.getBoundingClientRect().bottom;
      if (containerBottom) {
        const isAboveContainer = window.scrollY < containerBottom;
        setFloatingVisibility(isAboveContainer);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (loading) return <LoadingScreen />;
  return (
    <>
      {isFloatingVisible &&
        !_User?.Profile.Companies.map((z) => z.Company.ID).includes(
          Number(announcement?.Company?.ID)
        ) &&
        isAuthenticated && (
          <div className="floatingApplicationPannel">
            <h5>
              Ilosć aplikacji na to stanowisko:{" "}
              {announcement?.Applications.length}
            </h5>
            <button
              className="btn btn-primary"
              onClick={async () => {
                if (!aplication?.ID) {
                  await api
                    .post("application", {
                      ProfileID: _User?.Profile.ID,
                      AnnouncementID: announcement?.ID,
                    })
                    .then((res) => {
                      if (res.status == 201) {
                        alert("Aplikujesz na to stanowisko");
                        SetApplication(res.data);
                      }
                    });
                } else {
                  await api.delete("application", aplication.ID).then((res) => {
                    if (res.status == 200) {
                      alert("Anulowano aplikacje");
                      SetApplication(undefined);
                    }
                  });
                }
              }}
            >
              <FontAwesomeIcon icon={aplication ? faX : faPaperPlane} />
              {aplication ? "Anuluj aplikacje" : "Aplikuj"}
            </button>
          </div>
        )}
      <div className="container-lg AnnouncementVievContainer" ref={container}>
        <p>
          Dodano: {new Date(announcement?.CreatedAt ?? "").toLocaleDateString()}
        </p>
        <header className="d-flex flex-column">
          <div
            id="MainInfo"
            className="d-flex align-items-center justify-content-around w-100 flex-lg-row flex-column"
          >
            <div className="d-flex align-items-center justify-content-around HeaderInfo">
              <img src={announcement?.Company?.Image} alt="Zdjecie firmy" />
              <div>
                <h3>{announcement?.Title}</h3>
                <h5>{announcement?.JobPosition?.Name}</h5>
              </div>
            </div>
            <div
              id="SalaryInfo"
              className="d-flex align-items-center justify-content-around"
            >
              <FontAwesomeIcon icon={faWallet} />
              <div className="d-flex flex-column text-center">
                <b>
                  {announcement?.MinWage +
                    " - " +
                    announcement?.MaxWage +
                    " zł"}
                </b>
                <b>brutto/miesiac</b>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-wrap w-100 flex-column flex-md-row">
            <div className="d-flex align-items-center justify-content-around InfoElementWrapper text-center">
              <div className="w-50">
                <div className="IconBackground">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
              </div>
              <div className="w-50 d-flex justify-content-left">
                <span>{announcement?.Company?.Address.Address}</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-around InfoElementWrapper text-center">
              <div className="w-50">
                <div className="IconBackground">
                  <FontAwesomeIcon icon={faClock} />
                </div>
              </div>
              <div className="w-50 d-flex justify-content-left">
                <span>{`Wazne jeszcze ${announcement?.daysUntilExpiration} dni`}</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-around InfoElementWrapper text-center">
              <div className="w-50">
                <div className="IconBackground">
                  <FontAwesomeIcon icon={faFile} />
                </div>
              </div>
              <div className="w-50 d-flex justify-content-left">
                <span>{`Rodzaj umowy: ${announcement?.TypeOfContract?.Name}`}</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-around InfoElementWrapper text-center">
              <div className="w-50">
                <div className="IconBackground">
                  <FontAwesomeIcon icon={faHourglassStart} />
                </div>
              </div>
              <div className="w-50 d-flex justify-content-left">
                <span>{`Czas pracy: ${announcement?.WorkingTime?.Name}`}</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-around InfoElementWrapper text-center">
              <div className="w-50">
                <div className="IconBackground">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
              </div>
              <div className="w-50 d-flex justify-content-left">
                <span>{`Typ pracy: ${announcement?.WorkType?.Name}`}</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-around InfoElementWrapper text-center">
              <div className="w-50">
                <div className="IconBackground">
                  <FontAwesomeIcon icon={faLayerGroup} />
                </div>
              </div>
              <div className="w-50 d-flex justify-content-left">
                <span>{announcement?.JobLevel?.Name}</span>
              </div>
            </div>
          </div>
          <hr />
          <p>{announcement?.Description}</p>
        </header>
        <section className="ElementsList">
          <h2>Obowiazki</h2>
          <div className="d-flex flex-column ListElements">
            {announcement?.Duties && announcement?.Duties?.length > 0 ? (
              announcement?.Duties?.map((e, i) => {
                return (
                  <div key={i} className="d-flex IconListContainer">
                    <div className="IconList">
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                    <div className="IconListContent">{e.Name}</div>
                  </div>
                );
              })
            ) : (
              <h5>Nie podano</h5>
            )}
          </div>
        </section>
        <section className="ElementsList">
          <h2>Wymagania</h2>
          <div className="d-flex flex-column ListElements">
            {announcement?.Requirements &&
            announcement?.Requirements.length > 0 ? (
              announcement?.Requirements.map((e, i) => {
                return (
                  <div key={i} className="d-flex IconListContainer">
                    <div className="IconList">
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                    <div className="IconListContent">{e.Name}</div>
                  </div>
                );
              })
            ) : (
              <h5>Nie podano</h5>
            )}
          </div>
        </section>
        <section className="ElementsList">
          <h2>Oferowane przez pracodawce</h2>
          <div className="d-flex flex-column ListElements">
            {announcement?.WhatTheEmployerOffers &&
            announcement?.WhatTheEmployerOffers.length > 0 ? (
              announcement?.WhatTheEmployerOffers.map((e, i) => {
                return (
                  <div key={i} className="d-flex IconListContainer">
                    <div className="IconList">
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                    <div className="IconListContent">{e.Name}</div>
                  </div>
                );
              })
            ) : (
              <h5>Nie podano</h5>
            )}
          </div>
        </section>
        <section className="CompanyInformations ElementsList d-flex flex-column flex-md-row justify-content-center align-items-center w-100">
          <iframe
            src={`https://maps.google.com/maps/place?q=${announcement?.Company?.Address.Longitude}, ${announcement?.Company?.Address.Latitude}&z=15&output=embed`}
            width="600"
            height="450"
            style={{ border: "0px" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="d-flex Company flex-column">
            <img src={announcement?.Company?.Image} alt="Logo firmy" />
            <div className="text-center">
              <h2>{announcement?.Company?.Name}</h2>
              <p>{announcement?.Company?.Description}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AnnouncementView;
