import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";


// trạng thái ban đầu
const initialState = {
  categoryList: [],
  isLoading: false,
  error: null,
};

// call api danh mục
export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async () => {
    try {
      const response = await fetcher.get(
        "/QuanLyKhoaHoc/LayDanhMucKhoaHoc"
      );
      return response.data;
    } catch (error:any) {
      console.error("API Error:", error); 
      throw error.response.data;
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
      state.error = action.error.message ;
    });
  },
});

export default categorySlice.reducer;
