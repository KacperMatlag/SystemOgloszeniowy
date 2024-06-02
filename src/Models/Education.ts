import { School } from "./";

export default interface Education {
  ID?: number;
  SchoolName?: string;
  City?: string;
  schoolType?: School;
  FieldOfStudy?: string;
  StartDate?: number;
  EndDate?: number;
  ProfileID: number;
}
