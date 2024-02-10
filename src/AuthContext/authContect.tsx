import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "../Models";

interface AuthContextProps {
  isAuthenticated: boolean;
  _login: (res: User) => void;
  _logout: () => void;
  _User: User | null; // Allow user to be null
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);

  const _login = (res: User) => {
    setUserData(res);
    setIsAuthenticated(true);
  };

  const _logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:2137/user/check", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.user) {
          _login(res.data.user);
        } else {
          if (isAuthenticated) {
            console.log(123);
            alert("Sesja wygasła");
            _logout();
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    // Call checkSession immediately when the component mounts
    checkSession();

    // Set up interval for periodic checks
    const intervalId = setInterval(checkSession, 10000);

    // Clean up interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [isAuthenticated]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      _login,
      _logout,
      _User: userData,
    }),
    [isAuthenticated, userData]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
