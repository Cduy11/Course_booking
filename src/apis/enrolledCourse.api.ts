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

export const getUserEnrolledCourses = async (taiKhoan: string) => {
    try {
        const response = await fetcher.post("/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", { taiKhoan })
        return response.data
    } catch (error) {
        throw error
    }
}