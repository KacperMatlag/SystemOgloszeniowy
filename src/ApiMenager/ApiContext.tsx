import React, { createContext, useContext, useState } from "react";
import ApiManager from "./ApiManager";

const AuthContext = createContext<ApiManager | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const ApiProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [api] = useState<ApiManager>(new ApiManager());
  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
};

const useApi = (): ApiManager => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

export { ApiProvider, useApi };
