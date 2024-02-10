interface Profile {
  ID: number | null;
  Name: string | null;
  Surname: string | null;
  DateOfBirth: Date | null;
  Email: string | null;
  PhoneNumber: string | null;
  ProfilePicture: string | null;
  AddressID: number | null;
  ProfessionalSummary: string | null;
  CurrentJobPositionID: number | null;
  CurrentJobPositionDescription: string | null;
  Skills: string | null;
}
export default Profile;
