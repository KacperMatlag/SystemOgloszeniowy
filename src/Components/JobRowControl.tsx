import "../CSS/ComponentsCSS/JobRowControl.css";
import "react-bootstrap/Button";
import { Annoucement } from "../Models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faLocationDot } from "@fortawesome/free-solid-svg-icons";
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

  const getCityFromAddress = (address: string) => {
    return address.split(",")[1];
  };
  const subText = (string: string, lenght = 30) => {
    return string.substring(0, lenght) + (string.length > lenght ? "..." : "");
  };
  return (
    <div className="RowContainer d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center h-100" style={{ gap: "10px" }}>
        <img src={data?.Company?.Image} alt="company image" />
        <div className="d-flex flex-column justify-content-evenly h-100">
          <div>
            <h5>{subText(data.Title ?? "")}</h5>
          </div>
          <p className="d-flex salaryInfo d-md-none d-block">
            <span className="salary">
              {data.MinWage} - {data.MaxWage}
            </span>
            <span className="currency">PLN</span>
          </p>
          <div className="d-flex infoRow">
            <div className="d-flex align-items-center companyInfo">
              <FontAwesomeIcon icon={faBuilding} />
              <p>{subText(data?.Company?.Name ?? "", 20)}</p>
            </div>
            <div className="d-flex align-items-center companyInfo">
              <FontAwesomeIcon icon={faLocationDot} />
              <p>{getCityFromAddress(data?.Company?.Address.Address ?? "")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="iportantInfo h-100 justify-content-evenly d-flex flex-column d-md-flex d-none">
        <div className="d-flex justify-content-center">
          <p className="d-flex salaryInfo">
            <span className="salary">
              {data.MinWage} - {data.MaxWage}
            </span>
            <span className="currency">PLN</span>
          </p>
        </div>
        <button className={"btn btn-" + getColor(data?.WorkType?.Name ?? "")}>
          {data?.WorkType?.Name}
        </button>
      </div>
    </div>
  );
};

export default JobRowControl;
