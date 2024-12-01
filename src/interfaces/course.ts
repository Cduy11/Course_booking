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