import fetcher from "./fetcher"
interface DataEnroll {
    maKhoaHoc: string,
    taiKhoan: string | null;
}
export const unenrolledCourse = async (userId: string) => {
    try {
        const response = await fetcher.post(`/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${userId}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const enrollCourse = async (data: DataEnroll) => {
    try {
        const response = await fetcher.post(`/QuanLyKhoaHoc/GhiDanhKhoaHoc`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getUserEnrolledCourses = async (taiKhoan: string | null) => {
    try {
        const response = await fetcher.post("/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", { taiKhoan })
        return response.data
    } catch (error) {
        throw error
    }
}

export const cancelEnrollCourse = async (data: DataEnroll) => {
    try {
        const response = await fetcher.post(`/QuanLyKhoaHoc/HuyGhiDanh`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getPendingCourseList = async (taiKhoan: string | null) => {
    try {
        const response = await fetcher.post(`/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`, { taiKhoan })
        return response.data
    } catch (error) {
        throw error
    }
}