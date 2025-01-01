export interface Courses {
    maKhoaHoc: string;
    biDanh: string;
    tenKhoaHoc: string;
    moTa: string;
    luotXem: number;
    hinhAnh: string;
    danhGia: number;
    maNhom: string;
    ngayTao: string;
    soLuongHocVien?: number;
    nguoiTao?: NguoiTAO;
    danhMucKhoaHoc?: DanhMucKhoaHoc;
}

export interface DanhMucKhoaHoc {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
}

export interface NguoiTAO {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
}