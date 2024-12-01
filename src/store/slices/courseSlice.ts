import fetcher from "../../apis/fetcher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
  courseList: [],
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
  },
});

export default courseSlice.reducer;
