import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "../Models";
import { useApi } from "../ApiMenager/ApiContext";

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
  const api = useApi();
  const _login = (res: User) => {
    setUserData(res);
    setIsAuthenticated(true);
  };

  const _logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
  };

  const _ReloadUser = async () => {
    const fetchUser = async () => {
      await api.get("user/" + userData?.ID).then((res) => {
        setUserData(res.data);
        console.log(userData);
      });
    };
    fetchUser();
  };

  const _extendSession = async () => {
    await api.post("user/extendsession", userData);
  };

  useEffect(() => {
    const checkSession = async () => {
      await api.get("user/check").then((res) => {
        if (res.data.user) {
          _login(res.data.user);
        } else if (isAuthenticated && userData) {
          if (confirm("Sesja wygasła")) {
            _extendSession();
          } else _logout();
        }
      });
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
