import React from "react";
import { Education, Profile } from "../../Models";
import ApiManager from "../../ApiMenager/ApiManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { EducationElement } from "../../Utils/EditProfileUtils";

interface EducationTableRowProps {
  Education: Education;
  Profile: Profile;
  SetProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>;
  Api: ApiManager;
}

const EducationTableRow: React.FC<EducationTableRowProps> = ({
  Education,
  Profile,
  SetProfile,
  Api,
}) => {
  return (
    <tr className="m-3">
      <td>{Education.SchoolName}</td>
      <td>{Education.FieldOfStudy ?? "-"}</td>
      <td>{Education.City}</td>
      <td>{Education.StartDate}</td>
      <td>{Education.EndDate ?? "-"}</td>
      <th>
        <button
          className="btn btn-danger"
          onClick={async () => {
            await Api.delete("education", Education.ID).then((res) => {
              if (res.status === 200)
                SetProfile({
                  ...Profile,
                  Education: Profile.Education.filter(
                    (u) => u.ID !== Education.ID
                  ),
                });
            });
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </th>
    </tr>
  );
};
export default EducationTableRow;
