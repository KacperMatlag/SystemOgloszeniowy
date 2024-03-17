import React from "react";
import { UserLanguage } from "../Models";
import ApiManager from "../ApiMenager/ApiManager";
import {
  DefaultResponseAction,
  LanguageColor,
} from "../Utils/EditProfileUtils";

interface LanguageListElementProps {
  element: UserLanguage;
  api: ApiManager;
  _ReloadUser: () => void;
}

const LanguageListElement: React.FC<LanguageListElementProps> = (prop) => {
  return (
    <li key={prop.element.ID}>
      <p className="m-0 text-middle">{prop.element.Language.Name}</p>
      <div
        className="LanguageLevel text-middle"
        style={{
          backgroundColor: LanguageColor(prop.element.Level),
        }}
      >
        {prop.element.Level}
      </div>
      <button
        className="btn btn-danger"
        id={prop.element.ID.toString()}
        onClick={async () => {
          await prop.api
            .dekete("languages/userlanguage/", prop.element.ID)
            .then((res) => {
              DefaultResponseAction(prop._ReloadUser, res);
            });
        }}
      >
        Delete
      </button>
    </li>
  );
};
export default LanguageListElement;
