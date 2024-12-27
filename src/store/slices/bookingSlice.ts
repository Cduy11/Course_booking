import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";
import { BookingCourseState } from "../../interfaces/bookingType";

const initialState: BookingCourseState = {
  bookingCourse: null,
  cancelCourse: null,
  isLoading: false,
  error: null,
};

export const bookingCouseApi = createAsyncThunk(
  "bookingCourse/bookingCouseApi",
  async (
    data: { maKhoaHoc: string; taiKhoan: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetcher.post("/QuanLyKhoaHoc/DangKyKhoaHoc", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as { response?: { data: string } })?.response?.data ||
          "Lỗi không xác định"
      );
    }
  }
);

export const cancelCourseApi = createAsyncThunk(
  "bookingCourse/cancelCourseApi",
  async (
    data: { maKhoaHoc: string; taiKhoan: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("Dữ liệu gửi đi:", data);
      const response = await fetcher.post("/QuanLyKhoaHoc/HuyGhiDanh", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as { response?: { data: string } })?.response?.data ||
          "Lỗi không xác định"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "bookingCourse",
  initialState,
  reducers: {
    updateCourseHistory: (state, action) => {
      state.bookingCourse = action.payload;
    },
  },
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
      })
      .addCase(cancelCourseApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelCourseApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cancelCourse = action.payload;
      })
      .addCase(cancelCourseApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateCourseHistory } = bookingSlice.actions;
export default bookingSlice.reducer;
