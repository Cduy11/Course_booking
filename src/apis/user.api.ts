import { ApiResponse } from "../interfaces/api.interface";
import { Users } from "../interfaces/users.interface";
import fetcher from "./fetcher";

export const userApi = {
  getUserListPagination: async ({ page = 1, pageSize = 5 }) => {
    try {
      const response = await fetcher.get<ApiResponse<Users[]>>(
        "/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang",
        {
          params: {
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
  searchUser: async ({ keyword, page, pageSize }: { keyword: string; page: number; pageSize: number }) => {
    try {
      const response = await fetcher.get<ApiResponse<Users[]>>(
        "/QuanLyNguoiDung/TimKiemNguoiDung",
        {
          params: {
            MaNhom: "GP01",
            tuKhoa: keyword,
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
  deleteUser: async (userId: string) => {
    try {
      const response = await fetcher.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userId}`)
      return response.data
    } catch (error) {
      throw error;
    }
  },
  addUser: async (formData: Users) => {
    try {
      const response = await fetcher.post("/QuanLyNguoiDung/ThemNguoiDung", formData)
      return response.data.content
    } catch (error) {
      throw error
    }
  },
  updateUser: async (formData: Users) => {
    try {
      const response = await fetcher.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", formData)
      return response.data.content
    } catch (error) {
      throw error
    }
  }
};
