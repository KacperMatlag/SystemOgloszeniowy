import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import {} from "../CSS/PagesCSS/AnnouncementView.css";
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
} from "@fortawesome/free-solid-svg-icons";
import type { Annoucement } from "../Models/index";
import { useApi } from "../ApiMenager/ApiContext";

const AnnouncementView: React.FC = () => {
  const { id } = useParams();
  const [announcement, SetAnnouncement] = useState<Annoucement>(
    {} as Annoucement
  );
  const api = useApi();
  const [loading, SetLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`announcement/${id}`);
      SetAnnouncement(res.data);
      SetLoading(false);
    };
    fetchData();
  }, [id]);
  if (loading) return <LoadingScreen />;
  return (
    <div className="container-sm AnnouncementVievContainer">
      <p>Dodano: {new Date(announcement.CreatedAt).toLocaleDateString()}</p>
      <header className="d-flex flex-column">
        <div
          id="MainInfo"
          className="d-flex align-items-center justify-content-around w-100 flex-md-row flex-column"
        >
          <div className="d-flex align-items-center justify-content-around HeaderInfo">
            <img src={announcement.Company.Image} alt="Zdjecie firmy" />
            <div>
              <h3>{announcement.Title}</h3>
              <h5>{announcement.JobPosition.Name}</h5>
            </div>
          </div>
          <div
            id="SalaryInfo"
            className="d-flex align-items-center justify-content-around"
          >
            <FontAwesomeIcon icon={faWallet} />
            <div className="d-flex flex-column text-center">
              <b>
                {announcement.MinWage + " - " + announcement.MaxWage + " zł"}
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
              <span>{announcement.Company.Address.Address}</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-around InfoElementWrapper text-center">
            <div className="w-50">
              <div className="IconBackground">
                <FontAwesomeIcon icon={faClock} />
              </div>
            </div>
            <div className="w-50 d-flex justify-content-left">
              <span>{`Wazne jeszcze ${announcement.daysUntilExpiration} dni`}</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-around InfoElementWrapper text-center">
            <div className="w-50">
              <div className="IconBackground">
                <FontAwesomeIcon icon={faFile} />
              </div>
            </div>
            <div className="w-50 d-flex justify-content-left">
              <span>{`Rodzaj umowy: ${announcement.TypeOfContract.Name}`}</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-around InfoElementWrapper text-center">
            <div className="w-50">
              <div className="IconBackground">
                <FontAwesomeIcon icon={faHourglassStart} />
              </div>
            </div>
            <div className="w-50 d-flex justify-content-left">
              <span>{`Czas pracy: ${announcement.WorkingTime.Name}`}</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-around InfoElementWrapper text-center">
            <div className="w-50">
              <div className="IconBackground">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>
            </div>
            <div className="w-50 d-flex justify-content-left">
              <span>{`Typ pracy: ${announcement.WorkType.Name}`}</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-around InfoElementWrapper text-center">
            <div className="w-50">
              <div className="IconBackground">
                <FontAwesomeIcon icon={faLayerGroup} />
              </div>
            </div>
            <div className="w-50 d-flex justify-content-left">
              <span>{announcement.JobLevel.Name}</span>
            </div>
          </div>
        </div>
        <hr />
        <p>{announcement.Description}</p>
      </header>
      <section className="ElementsList">
        <h2>Obowiazki</h2>
        <div className="d-flex flex-column ListElements">
          {announcement.Duties.length > 0 ? (
            announcement.Duties.map((e, i) => {
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
          {announcement.Requirements.length > 0 ? (
            announcement.Requirements.map((e, i) => {
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
          {announcement.WhatTheEmployerOffers.length > 0 ? (
            announcement.WhatTheEmployerOffers.map((e, i) => {
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
          src={`https://maps.google.com/maps/place?q=${announcement.Company.Address.Longitude}, ${announcement.Company.Address.Latitude}&z=15&output=embed`}
          width="600"
          height="450"
          style={{ border: "0px" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="d-flex Company flex-column">
          <img src={announcement.Company.Image} alt="Logo firmy" />
          <div className="text-center">
            <h2>{announcement.Company.Name}</h2>
            <p>{announcement.Company.Description}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnnouncementView;
