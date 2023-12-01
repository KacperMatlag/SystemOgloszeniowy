class User {
  public ID: number;
  public Login: string;
  public Password: string;
  public ProfileID: number | null;
  constructor(
    ID: number,
    Login: string,
    Password: string,
    ProfileID: number | null
  ) {
    this.ID = ID;
    this.Login = Login;
    this.Password = Password;
    this.ProfileID = ProfileID;
  }
}
export default User;
