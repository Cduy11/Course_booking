import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";
import { toast } from "react-toastify";
import { ErrorState, ApiError } from "../../interfaces/errorTypes";
import { UserRegisterData } from "../../interfaces/auth";


const userLocal = localStorage.getItem("currentUser") 
  ? JSON.parse(localStorage.getItem("currentUser")!) 
  : null;

const initialState = {
  isLoading: false,
  error: null as ErrorState | null,
  currentUser: userLocal,
};

// login
export const loginApi = createAsyncThunk(
  "auth/loginApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", data);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.message || "Có lỗi xảy ra khi gọi API"
      );
    }
  }
);

// register
export const registerApi = createAsyncThunk(
  "auth/registerApi",
  async (data: UserRegisterData, { rejectWithValue }) => {
    try {
      const response = await fetcher.post("/QuanLyNguoiDung/DangKy", data);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || "Có lỗi xảy ra khi gọi API");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.currentUser = payload;
      localStorage.setItem("currentUser", JSON.stringify(payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
      toast.success("Đăng xuất thành công");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload;
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      state.isLoading = false;
      state.error = { message: action.payload as string || "Có lỗi xảy ra" };
    });
    builder.addCase(registerApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload;
    });
    builder.addCase(registerApi.rejected, (state, action) => {
      state.isLoading = false;
      state.error = { message: action.payload as string || "Có lỗi xảy ra khi gọi API" };
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
