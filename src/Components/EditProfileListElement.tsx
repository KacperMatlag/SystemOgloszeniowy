import { Link } from "react-router-dom";
import ApiManager from "../ApiMenager/ApiManager";

interface EditProfileListElementProps {
  imageLink?: string;
  text?: string;
  editLink?: string;
  deleteEndpoint?: string;
  api: ApiManager;
  ID: number;
  onDelete?: (id: number | undefined) => void;
}

const EditProfileListElement: React.FC<EditProfileListElementProps> = ({
  imageLink,
  text,
  editLink,
  deleteEndpoint,
  api,
  ID,
  onDelete,
}) => {
  return (
    <div className="d-flex align-items-center justify-content-between UserCompanies">
      <img src={imageLink} alt="zdjecie" />
      <p>{text && text?.length > 30 ? text?.substring(0, 27) + "..." : text}</p>
      <div className="d-flex" style={{ gap: "10px" }}>
        <Link to={editLink || "/"}>
          <button className="btn btn-info">Edytuj</button>
        </Link>
        <button
          className="btn btn-danger"
          onClick={async () => {
            await api.delete(`${deleteEndpoint}`, ID).then((res) => {
              if (res.status == 200) {
                alert("Poprawnie usunieto");
                if (onDelete) onDelete(ID);
              }
            });
          }}
        >
          Usun
        </button>
      </div>
    </div>
  );
};
export default EditProfileListElement;
