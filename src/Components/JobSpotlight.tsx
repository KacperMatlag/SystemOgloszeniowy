import "../CSS/ComponentsCSS/JobSpotlightControl.css";
import { Annoucement } from "../Models";
const JobSpotlight: React.FC<any> = ({ data }: { data: Annoucement }) => {
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

  return (
    <div className="w-100 SpotlightAd d-flex flex-column align-items-center">
      <div className="SpotlightBanner d-flex flex-column align-items-center justify-content-evenly">
        <img src={data.Company.Image} alt="" />
        <h4>{data.Company.Name}</h4>
      </div>
      <hr />
      <div className="d-flex flex-column align-items-center justify-content-evenly h-100 SpotlightInfo">
        <h2>{data.JobPosition.Name}</h2>
        <p>{data.Description}</p>
        <b>{data.MinWage + "-" + data.MaxWage + " zł/mies"}</b>
        <button
          style={{ width: "200px" }}
          className={`btn btn-${getColor(data.WorkType.Name)}`}
        >
          {data.WorkType.Name}
        </button>
      </div>
    </div>
  );
};
export default JobSpotlight;
