export interface Course {
  maKhoaHoc: string;
  hinhAnh: string;
  tenKhoaHoc: string;
  moTa: string;
  nguoiTao: {
    hoTen: string;
  };
  luotXem: number;
  soLuongHocVien: number;
  danhMucKhoaHoc: {
    tenDanhMucKhoaHoc: string;
    maDanhMucKhoahoc: string;
  };
} 

export interface CourseDetails {
  maKhoaHoc: string;
  tenKhoaHoc?: string;
  moTa?: string;
  soLuongHocVien?: number;
  danhMucKhoaHoc: {
    tenDanhMucKhoaHoc: string;
  };
  nguoiTao: {
    hoTen: string;
  };
  luotXem: number;  
  hinhAnh: string;
}

export interface CoursePagination {
  maKhoaHoc: string;
  hinhAnh: string;
  tenKhoaHoc: string;
  moTa: string;
  nguoiTao: {
    hoTen: string;
  };
  luotXem: number;
  soLuongHocVien: number;
  danhMucKhoaHoc: {
    tenDanhMucKhoaHoc: string;
    maDanhMucKhoahoc: string; // Thêm dòng này
  };
}

export interface Category {
  maDanhMuc: string;
  tenDanhMuc: string;
}
