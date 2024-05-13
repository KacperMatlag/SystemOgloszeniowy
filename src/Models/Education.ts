import { School } from "./";

export default interface Education {
  ID?: number;
  SchoolName?: string;
  City?: string;
  SchoolType?: School;
  FieldOfStudy?: string;
  StartDate?: number;
  EndDate?: number;
  ProfileID: number;
}
