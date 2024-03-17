import React, { useState } from "react";
import "../css/PagesCSS/AddCompany.css";
import "../css/PagesCSS/EditProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const AddCompany: React.FC = () => {
  const [address, SetAddress] = useState<string>("");
  return (
    <div style={{ minHeight: "calc(100vh - 200px)" }} className="container-xl">
      <div className="row">
        <div className="col-6">
          <div className="ProfileStyle">
            <div>
              <h4 className="text-center">Glowne informacje</h4>
              <hr />
            </div>
            <form
              className="d-flex flex-column align-center p-3"
              style={{ gap: "15px" }}
            >
              <img
                src="https://img.freepik.com/darmowe-wektory/ptak-kolorowe-logo-wektor-gradientu_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.946239694.1710633600&semt=ais"
                alt="Logo"
                className="CompanyImage"
              />
              <input type="file" id="file" className="d-none" />
              <span>Nazwa firmy</span>
              <input type="text" name="" id="" className="form-control" />
              <span>Opis firmy</span>
              <textarea rows={5} className="form-control"></textarea>
              <button className="btn btn-primary">Dodaj</button>
            </form>
          </div>
        </div>
        <div className="col-6">
          <div className="ProfileStyle h-100">
            <div>
              <h4 className="text-center">Lokalizacja</h4>
              <hr />
            </div>
            <div className="SearchLocation">
              <div className="SearchBar m-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    SetAddress(e.target.value);
                  }}
                  placeholder="np: Limanowa 34 34-600"
                />
                <button onClick={async () => {}}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCompany;
