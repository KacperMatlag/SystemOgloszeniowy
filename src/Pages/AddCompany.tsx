import React, { useEffect, useRef, useState } from "react";
import "../css/PagesCSS/AddCompany.css";
import "../css/PagesCSS/EditProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import BingMapResponse from "../Models/BingMapsResponse";
import { useApi } from "../ApiMenager/ApiContext";
import { Address } from "../Utils/EditProfileUtils";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/authContect";
const AddCompany: React.FC = () => {
  const { _User } = useAuth();
  interface CompanyInfo {
    Name: string;
    Description: string;
  }
  interface AddressProps {
    Address: string;
    Longitude: number | undefined | null;
    Latitude: number | undefined | null;
  }
  const [address, SetAddress] = useState<Address>({
    BlockNumber: "",
    Town: "",
    PostCode: "",
  });
  const [selectedAddress, SetSelectedAddress] = useState<AddressProps>({
    Address: "",
    Longitude: 0,
    Latitude: 0,
  });
  const navigate = useNavigate();
  const [searchedAddress, SetSearchedAddress] = useState<BingMapResponse>();
  const api = useApi();
  const inputFile = useRef<HTMLInputElement>(null);
  const companyImage = useRef<HTMLImageElement>(null);
  const [file, SetFile] = useState<File>();
  const [companyInfo, SetCompanyInfo] = useState<CompanyInfo>({
    Name: "",
    Description: "",
  });
  const SearchForAddress = async () => {
    const request = `https://dev.virtualearth.net/REST/v1/Locations?addressline=${
      address.Town
    }+${address.BlockNumber}+${address.PostCode}&key=${
      import.meta.env.VITE_BING_MAP_KEY
    }&limit=1`;
    await api.customCall(request).then((res: AxiosResponse) => {
      if (res.status == 200) SetSearchedAddress(res.data);
    });
  };
  useEffect(() => {
    const load = () => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          if (typeof reader.result === "string") {
            if (companyImage && companyImage.current) {
              companyImage.current.src = reader.result;
            }
          }
        });
      }
    };
    load();
  }, [file]);
  return (
    <div style={{ minHeight: "100vh" }} className="container-xl">
      <div className="row gy-3">
        <div className="col-xl-6 col-md-12 ">
          <div className="ProfileStyle">
            <div>
              <h4 className="text-center">Glowne informacje</h4>
              <hr />
            </div>
            <form
              encType="multipart/form-data"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = new FormData();
                if (file) form.append("files", file);
                form.append("Name", companyInfo.Name);
                form.append("Description", companyInfo.Description);
                form.append("address", selectedAddress.Address);
                form.append("Longitude", String(selectedAddress.Longitude));
                form.append("Latitude", String(selectedAddress.Latitude));
                form.append("ProfileID", String(_User?.Profile.ID));

                await api.post("company/", form).then((res) => {
                  if (res.status == 200) {
                    alert("Pomyslnie utworzono firme");
                    navigate(-1);
                  }
                });
              }}
              className="d-flex flex-column align-center p-3"
              style={{ gap: "15px" }}
            >
              <div className="ImageContainer">
                <img
                  ref={companyImage}
                  src={
                    "https://fotoblysk.com/wp-content/uploads/2016/07/xRing-light-portret-1.jpg.pagespeed.ic.PuM47N375f.jpg"
                  }
                  alt="profile image"
                  className="ProfilePicture"
                />
                <img
                  src="https://static.thenounproject.com/png/3322766-200.png"
                  alt="change image"
                  className="ImageChange"
                  onClick={() => {
                    inputFile.current?.click();
                  }}
                />
              </div>
              <input
                type="file"
                id="file"
                className="d-none"
                ref={inputFile}
                onChange={(e) => {
                  if (e.target.files?.length) SetFile(e.target.files[0]);
                }}
              />
              <span>Nazwa firmy</span>
              <input
                type="text"
                className="form-control"
                value={companyInfo.Name}
                onChange={(e) => {
                  SetCompanyInfo({ ...companyInfo, Name: e.target.value });
                }}
              />
              <span>Opis firmy</span>
              <textarea
                rows={5}
                className="form-control"
                value={companyInfo.Description}
                onChange={(e) => {
                  SetCompanyInfo({
                    ...companyInfo,
                    Description: e.target.value,
                  });
                }}
              ></textarea>
              <button className="btn btn-primary" type="submit">
                Dodaj
              </button>
            </form>
          </div>
        </div>
        <div className="col-xl-6 col-md-12 ">
          <div className="ProfileStyle h-100">
            <div>
              <h4 className="text-center">Lokalizacja</h4>
              <hr />
            </div>
            <div className="SearchLocation">
              <div className="SearchBar m-3">
                <input
                  type="text"
                  value={address?.Town}
                  onChange={(e) => {
                    SetAddress({ ...address, Town: e.target.value });
                  }}
                  placeholder="np. Limanowa"
                />
                <input
                  type="text"
                  value={address?.BlockNumber}
                  onChange={(e) => {
                    SetAddress({ ...address, BlockNumber: e.target.value });
                  }}
                  placeholder="np. 123"
                />
                <input
                  type="text"
                  value={address?.PostCode}
                  onChange={(e) => {
                    SetAddress({ ...address, PostCode: e.target.value });
                  }}
                  placeholder="np. 34-600"
                />
                <button onClick={SearchForAddress}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
            <div className="AddressList">
              <div className="mapwrapper">
                {searchedAddress && searchedAddress.resourceSets?.length ? (
                  searchedAddress?.resourceSets[0]?.resources?.map((z) => {
                    const baseUrl = "https://maps.google.com/maps";
                    const defaultCoordinates = [0, 0];
                    const embedUrl = z.point.coordinates
                      ? `${baseUrl}/place?q=${z.point.coordinates[0]},${z.point.coordinates[1]}&z=15&output=embed`
                      : `${baseUrl}/place?q=${defaultCoordinates[0]},${defaultCoordinates[1]}&z=15&output=embed`;
                    return (
                      <div
                        className="mapelement"
                        key={z.address.formattedAddress}
                      >
                        <iframe
                          src={embedUrl}
                          style={{ border: "0px" }}
                          loading="lazy"
                          height={"400"}
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            if (z.point.coordinates) {
                              SetSelectedAddress({
                                ...selectedAddress,
                                Address: z.address.formattedAddress,
                                Longitude: z.point.coordinates[0],
                                Latitude: z.point.coordinates[1],
                              });
                              console.log(selectedAddress);
                            }
                          }}
                        >
                          {z.address.formattedAddress}
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <h4></h4>
                )}
              </div>
              <div className="Footer d-flex align-items-center justify-content-center">
                {selectedAddress && (
                  <span className="text-center">
                    Wybrany adres: <b>{selectedAddress.Address}</b>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCompany;
