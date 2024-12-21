import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";
import { ErrorState, ApiError } from "../../interfaces/errorTypes";
const initialState = {
    inforUser: [],
    isLoading:false,
    error: null as ErrorState | null,
}


//call api info
export const fetchInfoUserApi = createAsyncThunk(
    "inforUser/fetchInfoUserApi",
    async() => {
        try {
            const response = await fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan")
            console.log(response.data)
            return response.data
        } catch (error) {
            const apiError = error as ApiError;
            throw apiError.message || "Có lỗi xảy ra khi gọi API";
        }
    }
)

const infoSlice = createSlice({
    name: "inforUser",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchInfoUserApi.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchInfoUserApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.inforUser = action.payload;
            state.error = null;
        })
        builder.addCase(fetchInfoUserApi.rejected, (state, action) => {
            state.isLoading = false;
            state.error = { message: action.error.message || "Có lỗi xảy ra" };
        })
    }
})

export default infoSlice.reducer