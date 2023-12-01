import { WorkCategory, JobPosition } from "./index";
class CategoryWithPositions {
  public ID: number;
  public JobPositionID: number;
  public WorkCategoryID: number; // <-- Corrected to lowercase "number"
  public JobPosition: { ID: number; Name: string };
  public WorkCategory: { ID: number; Name: string };

  constructor(
    ID: number,
    JobPositionID: number,
    WorkCategoryID: number,
    JobPosition: JobPosition,
    WorkCategory: WorkCategory
  ) {
    this.ID = ID;
    this.JobPositionID = JobPositionID;
    this.WorkCategoryID = WorkCategoryID;
    this.JobPosition = JobPosition;
    this.WorkCategory = WorkCategory;
  }
}
export default CategoryWithPositions;
