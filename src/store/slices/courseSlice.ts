import fetcher from "../../apis/fetcher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
  courseList: [],
  courseDetails: null,
  isLoading: false,
  error: null,
};

// call api danh sách khóa học
export const fetchCourseList = createAsyncThunk(
  "course/fetchCourseList",
  async ({ MaNhom}: { MaNhom: string}, { rejectWithValue }) => {
    try {
      const reponse = await fetcher.get(
        `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${MaNhom}`
      );
      console.log(reponse.data);
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

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export default courseSlice.reducer;
