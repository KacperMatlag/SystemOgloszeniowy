import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import {} from "../CSS/PagesCSS/AnnouncementView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faLocationDot,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import type { Annoucement } from "../Models/index";

function AnnouncementView() {
  const { id } = useParams();
  const [announcement, SetAnnouncement] = useState<Annoucement>(
    {} as Annoucement
  );
  const [loading, Setloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      axios.get("http://localhost:2137/announcement/" + id).then((res) => {
        SetAnnouncement(res.data);
        Setloading(false);
      });
    };
    fetchData();
  }, []);
  if (loading) return <LoadingScreen />;
  return (
    <div className="container-xl">
      <header>
        <p>Dodano: {announcement.CreatedAt}</p>
        <h1>{announcement.Title}</h1>
        <h3>{announcement.JobPosition.Name}</h3>
        <hr />
        <ul>
          <li>
            <FontAwesomeIcon icon={faWallet} />
            <b>
              {announcement.MinWage + "-" + announcement.MaxWage + " zł/mies"}
            </b>
          </li>
          <li>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{"Lokalizacja"}</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faBriefcase} />
            <span>{announcement.WorkingTime.Name}</span>
          </li>
        </ul>
        <div className="d-flex flex-wrap WorkInfo justify-content-sm-start justify-content-center" style={{ gap: "10px" }}>
          <p>Kategoria: {announcement.WorkCategory.Name}</p>
          <p>Typ umowy: {announcement.TypeOfContract.Name}</p>
          <p>Poziom pracy: {announcement.JobLevel.Name}</p>
          <p>Typ pracy: {announcement.WorkType.Name}</p>
        </div>
        <hr />
      </header>
      <section>
        <b>Opis</b>
        <p>{announcement.Description}</p>
        <b>Wymagania</b>
        <p>{announcement.Requirements}</p>
        <b>Obowiązki</b>
        <p>{announcement.Responsibilities}</p>
        <b>Co oferuje pracodawca</b>
        <p>{announcement.WhatTheEmployerOffers}</p>
      </section>
      <hr />
      <section className="CompanyInformations d-flex justify-content-center align-items-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20489.978263788085!2d19.921366329460113!3d50.06293042684066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b11bb2ba5ed%3A0x4e9197ac6101863a!2sStare%20Miasto%2C%20Krak%C3%B3w!5e0!3m2!1spl!2spl!4v1699194599422!5m2!1spl!2spl"
          width="600"
          height="450"
          style={{ border: "0px" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="d-flex">
            <img src={announcement.Company.Image} alt="Logo firmy" />
            <div>
            <h2>{announcement.Company.Name}</h2>
            <p>{announcement.Company.Description}</p>
            </div>
        </div>
      </section>
    </div>
  );
}

export default AnnouncementView;
