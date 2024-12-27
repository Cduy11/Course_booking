
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/slices/categotySlice";
import { RootState } from "../store";
import { AppDispatch } from "../store";

export const useCategories = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categoryList, isLoading, error } = useSelector(
    (state: RootState) => state.category
  ) as {
    categoryList: { tenDanhMuc: string; maDanhMuc: string }[];
    isLoading: boolean;
    error: string | null;
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return { categoryList, isLoading, error };
};