import { WorkCategory, JobPosition } from "./index";
interface CategoryWithPositions {
  ID: number;
  JobPositionID: number;
  WorkCategoryID: number;
  JobPosition: JobPosition;
  WorkCategory: WorkCategory;
}
export default CategoryWithPositions;
