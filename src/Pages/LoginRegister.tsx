import axios, { AxiosError } from "axios";
import bcrypt from "bcryptjs-react";
import "../CSS/PagesCSS/LoginRegister.css";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Alert } from "../Components";
import { useAuth } from "../AuthContext/authContect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
const LoginRegister: React.FC = () => {
  const navigate = useNavigate();
  const [user, SetUser] = useState<any>({
    Login: "",
    Password: "",
    PasswordVerification: "",
    ProfileID: 0,
    Name: "",
    Surname: "",
    Email: "",
  });
  const [login, SetLogin] = useState<any>({
    Login: "",
    Password: "",
  });
  const [errorAlert, SetErrorAlert] = useState<string | undefined>(undefined);
  const loginShema = Yup.object().shape({
    Login: Yup.string().required("Wprowadź Login"),
    Password: Yup.string().required("Wprowadź Hasło"),
  });
  const { _login } = useAuth();
  const userSchema = Yup.object().shape({
    Login: Yup.string()
      .required("Login jest wymagany")
      .min(5, "Login musi mieć minimum 5 znaków.")
      .max(50, "Login nie może mieć więcej niż 50 znaków."),
    Password: Yup.string()
      .required("Hasło jest wymagane")
      .min(8, "Hasło musi mieć co najmniej 8 znaków"),
    PasswordVerification: Yup.string()
      .oneOf([Yup.ref("Password")], "Hasła muszą być identyczne")
      .required("Potwierdzenie hasła jest wymagane"),
    ProfileID: Yup.number().optional().nullable(),
    Name: Yup.string()
      .required("Imię jest wymagane")
      .matches(/^[a-zA-ZęóąśłżźćńĘÓĄŚŁŻŹĆŃ]*$/, "Nieprawidłowy format imienia")
      .min(2, "Imie musi mieć minimum 2 znaki.")
      .max(30, "Imie nie może mieć więcej niż 30 znaków."),
    Surname: Yup.string()
      .required("Nazwisko jest wymagane")
      .matches(/^[a-zA-ZęóąśłżźćńĘÓĄŚŁŻŹĆŃ]*$/, "Nieprawidłowy format nazwiska")
      .min(2, "Nazwisko musi mieć minimum 2 znaki.")
      .max(30, "Nazwisko musi mieć maksymalnie 30 znaków"),
    Email: Yup.string()
      .email("Nieprawidłowy format email")
      .required("Email jest wymagany"),
  });

  const DisplayError = (msg: string) => {
    SetErrorAlert(msg);
    setTimeout(() => {
      SetErrorAlert(undefined);
    }, 2000);
  };

  const HandleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await userSchema.validate(user, { abortEarly: false });
      const salt = await bcrypt.genSalt(10);
      const res = await axios.post("http://localhost:2137/user/", {
        ...user,
        Password: await bcrypt.hash(user.Password, salt),
      });
      if (res.status === 201) navigate("/");
    } catch (error: any) {
      if (error.response) DisplayError(error.response.data.error);
      else DisplayError(error.errors[0]);
    }
  };
  const HandleLogin = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await loginShema.validate(login, { abortEarly: false });
      await axios
        .post("http://localhost:2137/user/Login", login, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then(async (res) => {
          if (res.status == 200) {
            _login(res.data);
            navigate("/");
          }
        })
        .catch((err: AxiosError) => {
          if (err.response?.status == 401)
            DisplayError("Niepoprawny login lub haslo");
          console.log(err);
        });
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid">
      {errorAlert && <Alert data={errorAlert} />}
      <div className="row forms-container">
        <div className="col-lg-6 col-md">
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
                    onChange={(e) =>
                      SetUser({ ...user, Surname: e.target.value })
                    }
                  />
                  <label form="floatingInput">Nazwisko</label>
                </div>
                <h4>Email</h4>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    onChange={(e) =>
                      SetUser({ ...user, Email: e.target.value })
                    }
                  />
                  <label form="floatingInput">Email</label>
                </div>
                <button type="submit" className="btn btn-primary text-center">
                  Zarejestruj
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-6 col-md">
          <div className="login-form-wrapper">
            <form onSubmit={HandleLogin}>
              <header>
                <h1>Logowanie</h1>
              </header>
              <hr />
              <h4>Login</h4>
              <div className="loginInputs">
                <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    placeholder="Login"
                    onChange={(e) => {
                      SetLogin({ ...login, Login: e.target.value });
                    }}
                  />
                </div>
                <h4>Hasło</h4>
                <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    className="form-control shadow-none"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    placeholder="Login"
                    onChange={(e) => {
                      SetLogin({ ...login, Password: e.target.value });
                    }}
                  />
                </div>
                <button className="btn btn-primary">Zaloguj</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
