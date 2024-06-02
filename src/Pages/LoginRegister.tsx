import "../CSS/PagesCSS/LoginRegister.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, LoginForm } from "../Components";
import { useAuth } from "../AuthContext/authContect";
import RegisterForm from "../Components/RegisterForm";
import {
  LoginAction,
  RegisterAction,
  UserShema,
} from "../Utils/LoginRegisterUtils";

const LoginRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, SetUser] = useState<UserShema>();
  const [login, SetLogin] = useState({
    Login: "",
    Password: "",
  });
  const [errorAlert, SetErrorAlert] = useState<string | undefined>(undefined);
  const { _login } = useAuth();
  const [action, SetAction] = useState<boolean>(false);
  //false => Login
  //true  => Register

  const DisplayError = (msg: string) => {
    SetErrorAlert(msg);
    setTimeout(() => {
      SetErrorAlert(undefined);
    }, 2000);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [action]);

  const HandleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    RegisterAction(user, navigate, DisplayError);
  };
  const HandleLogin = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    LoginAction(login, navigate, _login, DisplayError);
  };
  return (
    <div className="container-fluid">
      {errorAlert && <Alert data={errorAlert} />}
      <div className="forms-container">
        {action ? (
          <RegisterForm
            HandleRegister={HandleRegister}
            SetUser={SetUser}
            user={user as UserShema}
            SetState={SetAction}
          />
        ) : (
          <LoginForm
            HandleLogin={HandleLogin}
            SetLogin={SetLogin}
            login={login}
            SetState={SetAction}
          />
        )}
      </div>
    </div>
  );
};

export default LoginRegisterPage;
