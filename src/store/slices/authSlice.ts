import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";
import { toast } from "react-toastify";

const userLocal = localStorage.getItem("currentUser") 
  ? JSON.parse(localStorage.getItem("currentUser")!) 
  : null;

const initialState = {
  isLoading: false,
  error: null,
  currentUser: userLocal,
};

export const loginApi = createAsyncThunk(
  "auth/loginApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
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
      toast.success("Đăng xuất thành công")
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
      state.error = action.payload as string | null;
      state.isLoading = false;
    });
  },
});

export const {logout} = authSlice.actions
export default authSlice.reducer;
