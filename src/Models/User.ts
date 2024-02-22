import { Profile } from ".";

interface User {
  ID: number;
  Login: string;
  Password: string;
  ProfileID: number | null;
  Profile: Profile;
}
export default User;
