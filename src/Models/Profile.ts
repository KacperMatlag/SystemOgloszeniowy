class Profile {
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

  constructor(
    id: number,
    name: string,
    surname: string,
    dateOfBirth: Date,
    email: string,
    phoneNumber: string | null,
    profilePicture: string | null,
    addressID: number | null,
    professionalSummary: string | null,
    currentJobPositionID: number | null,
    currentJobPositionDescription: string | null,
    skills: string | null
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.profilePicture = profilePicture;
    this.addressID = addressID;
    this.professionalSummary = professionalSummary;
    this.currentJobPositionID = currentJobPositionID;
    this.currentJobPositionDescription = currentJobPositionDescription;
    this.skills = skills;
  }
}
export default Profile;
