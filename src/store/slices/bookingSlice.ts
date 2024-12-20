import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";

interface BookingCourseState {
  bookingCourse: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingCourseState = {
  bookingCourse: null,
  isLoading: false,
  error: null,
};

export const bookingCouseApi = createAsyncThunk(
  "bookingCourse/bookingCouseApi",
  async (data: { maKhoaHoc: string; taiKhoan: string }, { rejectWithValue }) => {
    try {
      const response = await fetcher.post("/QuanLyKhoaHoc/DangKyKhoaHoc", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  }
);

const bookingSlice = createSlice({
  name: "bookingCourse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookingCouseApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(bookingCouseApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingCourse = action.payload;
      })
      .addCase(bookingCouseApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingSlice.reducer;
