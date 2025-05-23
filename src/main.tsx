
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Provider } from "react-redux";
import { store } from "./Store/Store/Store.ts";


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
