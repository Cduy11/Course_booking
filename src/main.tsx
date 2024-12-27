import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
      <ToastContainer position="top-center" />
      <App />
    </Provider>
  </QueryClientProvider>
   
  
  </BrowserRouter>
);
