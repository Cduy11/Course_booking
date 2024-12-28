import { ApiResponse } from "../interfaces/api.interface";
import { Courses } from "../interfaces/courses.interface";
import fetcher from "./fetcher";

export const courseApi = {
  getCourseListPagination: async ({ page = 1, pageSize = 5 }) => {
    try {
      const response = await fetcher.get<ApiResponse<Courses[]>>(
        "/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang",
        {
          params: {
            MaNhom: "GP01",
            page,
            pageSize,
          },
        }
      );
      return response.data
    }
    catch (error) {
      throw error
    }
  },
  searchCourse: async ({ keyword, page, pageSize }: { keyword: string; page: number; pageSize: number }) => {
    try {
      const response = await fetcher.get<ApiResponse<Courses[]>>(
        "/QuanLyKhoaHoc/LayDanhSachKhoaHoc",
        {
          params: {
            tenKhoaHoc: keyword,
            MaNhom: "GP01",
            page,
            pageSize,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteCourse: async (courseId: string) => {
    try {
      const response = await fetcher.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${courseId}`)
      return response.data
    } catch (error) {
      throw error;
    }
  },
  // addCourse: async (formData) => {
  //   try {
  //     const response = await fetcher.post("/QuanLyKhoaHoc/ThemKhoaHoc", formData)
  //     return response.data.content
  //   } catch (error) {
  //     throw error
  //   }
  // }
}