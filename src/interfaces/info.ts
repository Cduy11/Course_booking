export interface ChiTietKhoaHoc {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  ngayDangKy: string;
  hinhAnh: string;
  moTa: string;
  luotXem: string;
  danhGia: string;
}

export interface InforUser {
  hoTen: string;
  email: string;
  soDT: number;
  maLoaiNguoiDung: string;
  maNhom: string;
  taiKhoan: string;
  chiTietKhoaHocGhiDanh: ChiTietKhoaHoc[];
}


