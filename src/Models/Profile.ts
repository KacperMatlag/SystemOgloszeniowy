interface Profile {
  id: number;
  name: string;
  surname: string;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string | null;
  profilePicture: string | null;
  addressID: number | null;
  professionalSummary: string | null;
  currentJobPositionID: number | null;
  currentJobPositionDescription: string | null;
  skills: string | null;
}
export default Profile;
