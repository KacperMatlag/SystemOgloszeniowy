class Company {
  public ID: number;
  public Name: string;
  public CompanyLocationID: number;
  public Map: string;
  public Description: string;
  public Image: string;

  constructor(ID: number, Name: string, CompanyLocationID: number, Map: string, Description: string, Image: string) {
    this.ID = ID;
    this.Name = Name;
    this.CompanyLocationID = CompanyLocationID;
    this.Map = Map;
    this.Description = Description;
    this.Image = Image;
  }
}

export default Company;
