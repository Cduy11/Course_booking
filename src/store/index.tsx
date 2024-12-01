import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categotySlice";
import courseSlice from "./slices/courseSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    course: courseSlice,
  },
});

// định nghĩa type cho state và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
