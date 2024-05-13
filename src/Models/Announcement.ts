import { AnnouncementOptions, Company } from ".";

interface Annoucement {
  ID?: number;
  Title?: string;
  Description?: string;
  JobPositionID?: number;
  WorkCategoryID?: number;
  JobLevelID?: number;
  TypeOfContractID?: number;
  WorkingTimeID?: number;
  WorkTypeID?: number;
  MinWage?: number;
  MaxWage?: number;
  CreatedAt?: string;
  Responsibilities?: string;
  WhatTheEmployerOffers?: AnnouncementOptions[];
  Requirements?: AnnouncementOptions[];
  ExpirationDate?: string;
  daysSincePosted?: number;
  daysUntilExpiration?: number;
  randomID?: number;
  JobPosition?: { ID: number; Name: string };
  WorkCategory?: { ID: number; Name: string };
  Company?: Company;
  JobLevel?: { ID: number; Name: string };
  TypeOfContract?: { ID: number; Name: string };
  WorkingTime?: { ID: number; Name: string };
  WorkType?: { ID: number; Name: string };
  Duties?: AnnouncementOptions[];
  CompanyID?: number;
}
export default Annoucement;
