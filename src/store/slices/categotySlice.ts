import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";

// trạng thái ban đầu
const initialState = {
  categoryList: [],
  catelogList: [],
  isLoading: false,
  error: null,
};

// call api danh mục
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    try {
      const response = await fetcher.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

// call api danh mục khoá học
export const fetchCatelog = createAsyncThunk(
  "categoty/fetchCatelog",
  async (maDanhMuc: string) => {
    try {
      const response = await fetcher.get(
        `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching catelog:", error);
      throw error.response ? error.response.data : error.message;
    }
  }
);


// tạo slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categoryList = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchCatelog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCatelog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.catelogList = action.payload;
    });
    builder.addCase(fetchCatelog.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Có lỗi xảy ra khi gọi API";
    })
  },
});

export default categorySlice.reducer;
