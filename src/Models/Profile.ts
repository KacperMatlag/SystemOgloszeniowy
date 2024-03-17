import { JobPosition, UserLanguage, UserLinks, Address } from ".";

interface Profile {
  ID: number | undefined;
  Name: string | undefined;
  Surname: string | undefined;
  DateOfBirth: Date | undefined;
  Email: string | undefined;
  PhoneNumber: string | undefined;
  ProfilePicture: string | undefined;
  AddressID: number | undefined;
  ProfessionalSummary: string | undefined;
  CurrentJobPositionID: number | undefined;
  CurrentJobPositionDescription: string | undefined;
  Skills: string | undefined;
  JobPosition: JobPosition | undefined;
  Languages: UserLanguage[] | [];
  Services: UserLinks[] | [];
  ProfilePictureURL: string | undefined;
  Address: Address | undefined;
}
export default Profile;
