import { Outlet, useRoutes } from "react-router-dom";
import { PATH } from "./path";
import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import Auth from "../modules/Auth/Auth";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import HomePage from "../modules/Home/HomePage/HomePage";
import CourseDetails from "../modules/Home/CourseDetails/CourseDetails";

const useRouteElements = () => {
  const routes = useRoutes([
    {
      path: PATH.HOME.ROOT,
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: PATH.HOME.COURSE_DETAILS + "/:maKhoaHoc",
          element: <CourseDetails />,
        },
      ],
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
