import Address from "./Address";

interface Company {
  ID: number;
  Name: string;
  CompanyLocationID: number;
  Map: string;
  Description: string;
  Image: string;
  Address: Address;
}

export default Company;
