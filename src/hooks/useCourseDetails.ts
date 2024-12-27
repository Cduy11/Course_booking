import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseDetails } from "../store/slices/courseSlice";
import { AppDispatch, RootState } from "../store";
import { CourseDetails } from "../interfaces/course";

interface CourseDetailsState {
    courseDetails: CourseDetails | null;
    isLoading: boolean;
    error: string | null;
  }

export const useCourseDetails = (maKhoaHoc: string) => {
    const dispatch = useDispatch<AppDispatch>();
  const { courseDetails, isLoading, error } = useSelector(
    (state: RootState) => state.course
  ) as CourseDetailsState;

  useEffect(() => {
    if (maKhoaHoc) {
      dispatch(fetchCourseDetails({ MaKhoaHoc: maKhoaHoc }));
    }
  }, [dispatch, maKhoaHoc]);
  return { courseDetails, isLoading, error };
}
