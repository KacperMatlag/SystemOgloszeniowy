import React from "react";
import { UserLinks } from "../Models";
import ApiManager from "../ApiMenager/ApiManager";
import { useAuth } from "../AuthContext/authContect";
import { DefaultResponseAction } from "../Utils/EditProfileUtils";

interface ServiceProps {
  data: UserLinks;
  api: ApiManager;
}

export const ServiceListElement: React.FC<ServiceProps> = (props) => {
  const { _ReloadUser } = useAuth();
  return (
    <li key={props.data.ID} className="ServiceListElement d-flex">
      <div className="ServiceImage">
        <img
          src={props.data.Service.ImageUrl}
          alt={props.data.Service.ImageUrl}
        />
      </div>
      <p className="text-middle m-0">{props.data.Service.Name}</p>
      <div className="Link text-middle">{props.data.Link}</div>
      <button
        className="btn btn-danger"
        id={props.data.ID.toString()}
        onClick={async () => {
          await props.api
            .dekete("services/deleteuserLink", props.data.ID)
            .then((res) => {
              DefaultResponseAction(_ReloadUser, res);
            });
        }}
      >
        Delete
      </button>
    </li>
  );
};
export default ServiceListElement;
