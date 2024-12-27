import fetcher from "../../apis/fetcher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorState, ApiError } from "../../interfaces/errorTypes";

const initialState = {
  courseList: [],
  courseDetails: null,
  coursePagination: [],
  isLoading: false,
  error: null as ErrorState | null,
};

// call api danh sách khóa học
export const fetchCourseList = createAsyncThunk(
  "course/fetchCourseList",
  async (
    { MaNhom, searchTerm }: { MaNhom: string; searchTerm?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetcher.get(
        `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${MaNhom}${
          searchTerm ? `&searchTerm=${searchTerm}` : ""
        }`
      );
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || "Có lỗi xảy ra khi gọi API");
    }
  }
);

// call api chi tiết khóa học
export const fetchCourseDetails = createAsyncThunk(
  "course/fetchCourseDetails",
  async ({ MaKhoaHoc }: { MaKhoaHoc: string }, { rejectWithValue }) => {
    try {
      const response = await fetcher.get(
        `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${MaKhoaHoc}`
      );
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || "Có lỗi xảy ra khi gọi API");
    }
  }
);

// call api danh sách khóa học theo trang
export const fetchCoursePagination = createAsyncThunk(
  "course/fetchCoursePagination",
  async (
    {
      MaNhom,
      SoTrang,
      SoPhanTuTrang,
    }: { MaNhom: string; SoTrang: number; SoPhanTuTrang: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetcher.get(
        `/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${SoTrang}&pageSize=${SoPhanTuTrang}&MaNhom=${MaNhom}`
      );
      return response.data.items;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || "Có lỗi xảy ra khi gọi API");
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // call api danh sách khóa học
    builder.addCase(fetchCourseList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourseList.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.courseList = payload;
    });
    builder.addCase(fetchCourseList.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = { message: (payload as string) || "Có lỗi xảy ra" };
    });
    // call api chi tiết khóa học
    builder.addCase(fetchCourseDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourseDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.courseDetails = payload;
    });
    builder.addCase(fetchCourseDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = { message: (payload as string) || "Có lỗi xảy ra" };
    });

    // call api danh sách khóa học theo trang
    builder.addCase(fetchCoursePagination.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCoursePagination.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.coursePagination = payload;
    });
    builder.addCase(fetchCoursePagination.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = { message: (payload as string) || "Có lỗi xảy ra" };
    });
  },
});

export default courseSlice.reducer;
