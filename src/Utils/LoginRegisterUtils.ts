import axios, { AxiosError } from "axios";
import * as Yup from "yup";
import bcrypt from "bcryptjs-react";
import { NavigateFunction } from "react-router-dom";
import { User } from "../Models";
export const userSchema = Yup.object().shape({
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
export const RegisterAction = async (
  user: UserShema | undefined,
  navigate: NavigateFunction,
  DisplayError: (msg: string) => void
) => {
  try {
    await userSchema.validate(user, { abortEarly: false });
    const salt = await bcrypt.genSalt(10);
    if (!user) return;
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
export interface UserShema {
  Login: string;
  Password: string;
  PasswordVerification: string;
  ProfileID: number;
  Name: string;
  Surname: string;
  Email: string;
}
export const loginShema = Yup.object().shape({
  Login: Yup.string().required("Wprowadź Login"),
  Password: Yup.string().required("Wprowadź Hasło"),
});
export const LoginAction = async (
  login: { Login: string; Password: string },
  navigate: NavigateFunction,
  _login: (res: User) => void,
  DisplayError: (msg: string) => void
) => {
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
