class Annoucement {
  public ID: number;
  public Title: string;
  public Description: string;
  public JobPositionID: number;
  public WorkCategoryID: number;
  public JobLevelID: number;
  public TypeOfContractID: number;
  public WorkingTimeID: number;
  public WorkTypeID: number;
  public MinWage: number;
  public MaxWage: number;
  public CreatedAt: string;
  public Responsibilities: string;
  public WhatTheEmployerOffers: string;
  public Requirements: string;
  public ExpirationDate: string;
  public daysSincePosted: number;
  public daysUntilExpiration: number;
  public randomID: number;
  public JobPosition: { ID: number; Name: string };
  public WorkCategory: { ID: number; Name: string };
  public Company: { ID: number; Name: string; Description: string; Image: string };
  public JobLevel: { ID: number; Name: string };
  public TypeOfContract: { ID: number; Name: string };
  public WorkingTime: { ID: number; Name: string };
  public WorkType: { ID: number; Name: string };

  constructor(data: any) {
    this.ID = data.ID;
    this.Title = data.Title;
    this.Description = data.Description;
    this.JobPositionID = data.JobPositionID;
    this.WorkCategoryID = data.WorkCategoryID;
    this.JobLevelID = data.JobLevelID;
    this.TypeOfContractID = data.TypeOfContractID;
    this.WorkingTimeID = data.WorkingTimeID;
    this.WorkTypeID = data.WorkTypeID;
    this.MinWage = data.MinWage;
    this.MaxWage = data.MaxWage;
    this.CreatedAt = data.CreatedAt;
    this.Responsibilities = data.Responsibilities;
    this.WhatTheEmployerOffers = data.WhatTheEmployerOffers;
    this.Requirements = data.Requirements;
    this.ExpirationDate = data.ExpirationDate;
    this.daysSincePosted = data.daysSincePosted;
    this.daysUntilExpiration = data.daysUntilExpiration;
    this.randomID = data.randomID;
    this.JobPosition = data.JobPosition;
    this.WorkCategory = data.WorkCategory;
    this.Company = data.Company;
    this.JobLevel = data.JobLevel;
    this.TypeOfContract = data.TypeOfContract;
    this.WorkingTime = data.WorkingTime;
    this.WorkType = data.WorkType;
  }
}
export default Annoucement;