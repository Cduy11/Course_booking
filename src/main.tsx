import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer position="top-center" />
      <App />
    </Provider>
  </BrowserRouter>
);
