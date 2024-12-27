import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";
import { RootState } from "../../store";
import { ApiError } from "../../interfaces/errorTypes";

// Interface cho thông tin người dùng
export interface InforUser {
  taiKhoan: string;
  hoTen: string;
  email: string;
  matKhau: string;
  soDT: string;
  maNhom?: string;
  maLoaiNguoiDung?: string;
}

// Interface cho state
interface InfoState {
  inforUser: InforUser;
  isLoading: boolean;
  error: string | null;
}

const initialState: InfoState = {
  inforUser: {
    taiKhoan: "",
    hoTen: "",
    email: "",
    matKhau: "",
    soDT: "",
  },
  isLoading: false,
  error: null,
};

// Call API để lấy thông tin người dùng
export const fetchInfoUserApi = createAsyncThunk(
  "inforUser/fetchInfoUserApi",
  async () => {
    try {
      const response = await fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw apiError.message || "Có lỗi xảy ra khi gọi API";
    }
  }
);

// Call API để cập nhật thông tin người dùng
export const updateInforUser = createAsyncThunk(
  "inforUser/updateInforUser",
  async (data: InforUser) => {
    try {
      const response = await fetcher.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        data
      );
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw apiError.message || "Có lỗi xảy ra khi gọi API";
    }
  }
);

const infoSlice = createSlice({
  name: "inforUser",
  initialState,
  reducers: {
    setInforUser: (state, action) => {
      state.inforUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfoUserApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInfoUserApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.inforUser = action.payload;
        state.error = null;
      })
      .addCase(fetchInfoUserApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateInforUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInforUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.inforUser = action.payload;
        state.error = null;
      })
      .addCase(updateInforUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectInforUser = (state: RootState) => state.inforUser;
export const { setInforUser } = infoSlice.actions; 
export default infoSlice.reducer;
