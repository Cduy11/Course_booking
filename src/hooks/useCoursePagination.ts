import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursePagination } from "../store/slices/courseSlice";
import { AppDispatch, RootState } from "../store";

export const useCoursePagination = (page: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { coursePagination, isLoading } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(
      fetchCoursePagination({
        MaNhom: "GP09",
        SoTrang: page,
        SoPhanTuTrang: 12,
      })
    );
  }, [dispatch, page]);

  return { coursePagination, loading: isLoading };
};
