import { Outlet, useRoutes } from "react-router-dom";
import { PATH } from "./path";
import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import Auth from "../modules/Auth/Auth";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import HomePage from "../modules/Home/HomePage/HomePage";

const useRouteElements = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout> 
      ),
    },
    {
      path: PATH.AUTH.ROOT,
      element: <Outlet />,
      children: [
        {
          path: PATH.AUTH.LOGIN, 
          element: (
            <AuthLayout>
              <Auth />
            </AuthLayout>
          ),
        },
        {
          path: PATH.AUTH.REGISTER, 
          element: (
            <AuthLayout>
              <Auth />
            </AuthLayout>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  return { routes };
};

export default useRouteElements;
