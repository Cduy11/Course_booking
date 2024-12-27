import { Outlet, useRoutes } from "react-router-dom";
import { PATH } from "./path";
import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import Auth from "../modules/Auth/Auth";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import { UsersManagement } from "../modules/admin/UsersManagement";
import { CoursesManagement } from "../modules/admin/CoursesManagement";
import HomePage from "../modules/Home/HomePage/HomePage";
import CourseDetails from "../modules/Home/CourseDetails/CourseDetails";
import CoursePagination from "../modules/Home/CoursePage/CoursePagination/CoursePagination";
import CatalogCourse from "../modules/Home/CatalogCourse/CatalogCourse";
import InfoDetail from "../modules/Home/InfoDetail/InfoDetail";
import SearchCourse from "../modules/Home/SearchCourse/SearchCourse";
import BlogPage from "../modules/Home/BlogPage/BlogPage";

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
        {
          path: PATH.HOME.COURSE_PAGINATION,
          element: <CoursePagination />,
        },
        {
          path: PATH.HOME.CATALOG_COURSE + "/:maDanhMucKhoaHoc",
          element: <CatalogCourse />,
        },
        {
          path: PATH.HOME.INFO_DETAIL,
          element: <InfoDetail />,
        },
        {
          path: PATH.HOME.SEARCH_COURSE,
          element: <SearchCourse />,
        },
        {
          path: PATH.HOME.BLOG_PAGE,
          element: <BlogPage />,
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
      path: PATH.ADMIN.ROOT,
      element: <AdminLayout />,
      children: [
        {
          path: PATH.ADMIN.USERS_MANAGEMENT,
          element: <UsersManagement />,
        },
        {
          path: PATH.ADMIN.COURSES_MANAGEMENT,
          element: <CoursesManagement />,
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
