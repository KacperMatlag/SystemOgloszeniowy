import React, { createContext, useContext, useState } from "react";
import ApiManager from "./ApiManager"; // Assuming the correct file name is ApiManager

// Create a context with undefined initial value
const AuthContext = createContext<ApiManager | undefined>(undefined);

// AuthProviderProps type definition
interface AuthProviderProps {
  children: React.ReactNode;
}

// AuthProvider functional component
const ApiProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Use useState inside the component to initialize ApiManager
  const [api] = useState<ApiManager>(new ApiManager());

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
};

// Custom hook to use the context
const useApi = (): ApiManager => {
  const context = useContext(AuthContext);
  if (!context) {
    // Ensure the error message matches the hook and provider naming
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

export { ApiProvider, useApi };
