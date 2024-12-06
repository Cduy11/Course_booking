import fetcher from "../../apis/fetcher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
  courseDetails: null,
  coursePagination: [],
  isLoading: false,
  error: null,
};

// call api danh sách khóa học
export const fetchCourseList = createAsyncThunk(
  "course/fetchCourseList",
  async ({ MaNhom }: { MaNhom: string }, { rejectWithValue }) => {
    try {
      const reponse = await fetcher.get(
        `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${MaNhom}`
      );
      return reponse.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// call api chi tiết khóa học
export const fetchCourseDetails = createAsyncThunk(
  "course/fetchCourseDetails",
  async ({ MaKhoaHoc }: { MaKhoaHoc: string }, { rejectWithValue }) => {
    try {
      const reponse = await fetcher.get(
        `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${MaKhoaHoc}`
      );
      console.log("courseDetails", reponse.data);
      return reponse.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
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
      console.log("coursePagination", response.data.items);
      return response.data.items;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
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
      state.error = payload;
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
      state.error = payload as string;
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
      state.error = payload as string;
    });
  },
});

export default courseSlice.reducer;
