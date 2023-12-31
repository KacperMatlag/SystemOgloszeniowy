import "../CSS/ComponentsCSS/JobRowControl.css";
import "react-bootstrap/Button";
import { Annoucement } from "../Models";
const JobRowControl: React.FC<any> = ({ data }: { data: Annoucement }) => {
  function getColor(name: string) {
    switch (name) {
      case "hybrydowo":
        return "success";
      case "zdalnie":
        return "warning";
      case "stacjonarnie":
        return "danger";
      default:
        return "primary";
    }
  }
  const subText = (string: string) => {
    return string.substring(0, 50) + (string.length > 50 ? "..." : "");
  };
  return (
    <div className="RowContainer d-flex align-items-center justify-content-evenly Container">
      <img src={data.Company.Image} alt="Logo Firmy" />
      <div className="Informations">
        <div className="d-flex flex-column align-items-center justify-content-evenly">
          <span className="Title">{data.Title}</span>
          <span className="Description">{subText(data.Description)}</span>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-evenly">
          <span className="Company">{data.Company.Name}</span>
          <span>{data.WorkCategory.Name}</span>
          <span>Nazwa Miasta</span>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-evenly">
          <button className={`btn btn-${getColor(data.WorkType.Name)} w-75`}>
            {data.WorkType.Name}
          </button>
          <span>
            <b>{data.MinWage + "-" + data.MaxWage + "zl"}</b>
          </span>
          <span>Dni do wygaśnięcia: {data.daysUntilExpiration} dni</span>
        </div>
      </div>
    </div>
  );
};

export default JobRowControl;
