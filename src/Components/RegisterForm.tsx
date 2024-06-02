import React from "react";
import { UserShema } from "../Utils/LoginRegisterUtils";

interface RegisterProps {
  HandleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  SetUser: React.Dispatch<React.SetStateAction<UserShema | undefined>>;
  user: UserShema;
  SetState: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterProps> = ({
  HandleRegister,
  SetUser,
  user,
  SetState,
}) => {
  return (
    <div className="register-form-wrapper">
      <form onSubmit={HandleRegister}>
        <header>
          <h1>Rejestracja</h1>
        </header>
        <hr />
        <h4>Login</h4>
        <div className="registerInputs">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Login"
              onChange={(e) => {
                SetUser({ ...user, Login: e.target.value });
              }}
            />
            <label form="floatingInput">Login</label>
          </div>
          <h4>Hasło</h4>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => {
                SetUser({ ...user, Password: e.target.value });
              }}
            />
            <label form="floatingPassword">Password</label>
          </div>
          <h4>Potwierdź hasło</h4>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => {
                SetUser({
                  ...user,
                  PasswordVerification: e.target.value,
                });
              }}
            />
            <label form="floatingPassword">Password</label>
          </div>
          <h4>Imie</h4>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="name@example.com"
              onChange={(e) => SetUser({ ...user, Name: e.target.value })}
            />
            <label form="floatingInput">Imie</label>
          </div>
          <h4>Nazwisko</h4>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="name@example.com"
              onChange={(e) => SetUser({ ...user, Surname: e.target.value })}
            />
            <label form="floatingInput">Nazwisko</label>
          </div>
          <h4>Email</h4>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={(e) => SetUser({ ...user, Email: e.target.value })}
            />
            <label form="floatingInput">Email</label>
          </div>
          <button type="submit" className="btn btn-primary text-center">
            Zarejestruj
          </button>
          <span
            className="goToAction"
            onClick={() => {
              SetState((prev) => !prev);
            }}
          >
            Zaloguj się
          </span>
        </div>
      </form>
    </div>
  );
};
export default RegisterForm;
