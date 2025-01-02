
import fetcher from "./fetcher"


export const getUnenrolledUser = async (maKhoaHoc: string | null) => {
    try {
        const res = await fetcher.post(`/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`, { maKhoaHoc })
        return res.data
    } catch (error) {
        throw error
    }
}

export const getEnrolledUsers = async (maKhoaHoc: string | null) => {
    try {
        const response = await fetcher.post(`/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`, { maKhoaHoc });
        return response.data
    } catch (error) {
        throw error
    }
};

export const getPendingUsers = async (maKhoaHoc: string | null) => {
    try {
        const response = await fetcher.post(`/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`, { maKhoaHoc });
        return response.data
    } catch (error) {
        throw error
    }
};

