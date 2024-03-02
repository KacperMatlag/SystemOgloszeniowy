import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ApiProvider } from "./ApiMenager/ApiContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApiProvider>
    <App />
  </ApiProvider>
);
