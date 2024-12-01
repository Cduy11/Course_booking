import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCourseList } from "../store/slices/courseSlice";
import { AppDispatch, RootState } from "../store";


interface Course {
  maKhoaHoc: string;
  hinhAnh: string;
  tenKhoaHoc: string;
  moTa: string;
  nguoiTao: {
    hoTen: string;
  };
  luotXem: number;
}

interface CourseState {
  courseList: Course[];
  isLoading: boolean;
  error: string | null;
}

export const useCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courseList } = useSelector(
    (state: RootState) => state.course
  ) as CourseState;

  useEffect(() => {
    dispatch(fetchCourseList({ MaNhom: "GP09" }));
  }, [dispatch]);

  // Sắp xếp theo luotXem
  const topCourses = [...courseList]
    .sort((a, b) => b.luotXem - a.luotXem)
    .slice(0, 4);

  const referenceCourses = [...courseList].slice(4, 8);

  return { topCourses, referenceCourses };
};