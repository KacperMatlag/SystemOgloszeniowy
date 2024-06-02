import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface LoginFormProps {
  HandleLogin: (e: React.FormEvent<HTMLElement>) => Promise<void>;
  SetLogin: React.Dispatch<
    React.SetStateAction<{
      Login: string;
      Password: string;
    }>
  >;
  login: { Login: string; Password: string };
  SetState: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginForm: React.FC<LoginFormProps> = ({
  HandleLogin,
  login,
  SetLogin,
  SetState,
}) => {
  return (
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
        <span>
          Nie masz konta?{" "}
          <span
            className="goToAction"
            onClick={() => {
              SetState((prev) => !prev);
            }}
          >
            Zarejestruj sie
          </span>
        </span>
      </form>
    </div>
  );
};
export default LoginForm;
