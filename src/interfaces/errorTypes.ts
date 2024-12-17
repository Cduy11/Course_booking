export interface ApiError {
  message: string; // Thông điệp lỗi
  code?: number;   // Mã lỗi (tùy chọn)
}

export interface ErrorState {
  message: string; // Thông điệp lỗi
  code?: number;   // Mã lỗi (tùy chọn)
}
