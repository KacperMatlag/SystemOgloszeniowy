import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "../Models";

interface AuthContextProps {
  isAuthenticated: boolean;
  _login: (res: User) => void;
  _logout: () => void;
  _User: User | null;
  _extendSession: () => Promise<void>;
  _ReloadUser: () => void;
  _SetUser: React.Dispatch<React.SetStateAction<User | null>>;
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

  const _ReloadUser = async () => {
    setTimeout(async () => {
      const fetchUser = async () => {
        await axios
          .get("http://localhost:2137/user/" + userData?.ID)
          .then((res) => {
            setTimeout(() => {
              setUserData(res.data);
            }, 100);
            console.log(userData);
          });
      };
      fetchUser();
    });
  };

  const _extendSession = async () => {
    await axios.post("http://localhost:2137/user/extendsession", userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
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
          if (isAuthenticated && userData) {
            if (confirm("Sesja wygasła")) {
              _extendSession();
            } else _logout();
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    // Call checkSession immediately when the component mounts
    checkSession();

    // Set up interval for periodic checks
    const intervalId = setInterval(checkSession, 60000);

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
      _extendSession,
      _ReloadUser,
      _SetUser: setUserData,
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
