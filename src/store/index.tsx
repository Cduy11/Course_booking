import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categotySlice";
import courseSlice from "./slices/courseSlice";
import authSlice from "./slices/authSlice";
import bookingSlice from "./slices/bookingSlice";
import infoSlice from "./slices/infoSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    course: courseSlice,
    auth: authSlice,
    bookingCourse: bookingSlice,
    inforUser: infoSlice,
  },
});

// định nghĩa type cho state và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
