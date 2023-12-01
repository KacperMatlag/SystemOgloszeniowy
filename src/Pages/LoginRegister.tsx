import axios from "axios";
import "../CSS/PagesCSS/LoginRegister.css";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const LoginRegister = () => {
  const navigate=useNavigate();
  const [user, SetUser] = useState<any>({
    Login: "",
    Password: "",
    PasswordVerification: "",
    ProfileID: 0,
    Name: "",
    Surname: "",
    Email: "",
  });

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
      .min(2, "Imie musi mieć minimum 2 znaki.")
      .max(30, "Imie nie może mieć więcej niż 30 znaków."),
    Surname: Yup.string()
      .required("Nazwisko jest wymagane")
      .min(2, "Nazwisko musi mieć minimum 2 nzaki.")
      .max(30, "Nazwisko musi mieć maksymlanie 30 znaków"),
    Email: Yup.string()
      .email("Nieprawidłowy format email")
      .required("Email jest wymagany"),
  });

  const HandleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await userSchema.validate(user, { abortEarly: false });
      await axios.post("http://localhost:2137/user/", user)
        .then(async(res)=>{
          if(res.status==201){
            navigate("/")
          }else{
            alert("Cos poszlo nie tak");
          }
        })
      // const profileResponse = await axios.post("http://localhost:2137/profile/", profile);
      // if (profileResponse.status === 201) {
      //   SetUser({ ...user, ProfileID: profileResponse.data.ID });
      //   setTimeout(() => {
      //     axios.post("http://localhost:2137/user/", user);
      //   }, 0);
      //   alert("Dodano pomyślnie");
      //   navigate("/");
      // }

    } catch (error) {
      console.error("Błąd walidacji:", error);
      alert(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row forms-container">
        <div className="col-lg-6 col-md">
          <div className="register-form-wrapper">
            <form onSubmit={HandleRegister}>
              <h2>Login</h2>
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
              <h2>Hasło</h2>
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
              <h2>Potwierdź hasło</h2>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    SetUser({ ...user, PasswordVerification: e.target.value });
                  }}
                />
                <label form="floatingPassword">Password</label>
              </div>
              <h2>Imie</h2>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name@example.com"
                  onChange={(e) =>
                    SetUser({ ...user, Name: e.target.value })
                  }
                />
                <label form="floatingInput">Imie</label>
              </div>
              <h2>Nazwisko</h2>
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
              <h2>Email</h2>
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
            </form>
          </div>
        </div>
        <div className="col-6">
          <ul>
            <li style={{maxWidth:"200px",wordBreak:"break-word"}}>{JSON.stringify(user)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
