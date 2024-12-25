import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCourseList } from "../store/slices/courseSlice";
import { AppDispatch, RootState } from "../store";
import { Course } from "../interfaces/course";

interface CourseState {
  courseList: Course[];
  isLoading: boolean;
  error: string | null;
}

export const useCourses = (searchTerm: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { courseList } = useSelector(
    (state: RootState) => state.course
  ) as CourseState;

  useEffect(() => {
    dispatch(fetchCourseList({ MaNhom: "GP09", searchTerm }));
  }, [dispatch, searchTerm]);

  // Sắp xếp theo luotXem
  const topCourses = [...courseList]
    .sort((a, b) => b.luotXem - a.luotXem)
    .slice(0, 4);

  // Khoá học tham khảo
  const referenceCourses = [...courseList].slice(4, 8);

  // Khoá học theo danh mục
  const courses = courseList
    .filter((course) => {
      return course.danhMucKhoaHoc.maDanhMucKhoahoc === "BackEnd";
    })
    .slice(0, 4);

  // filter khóa học theo tên
  const filteredCourses = (searchTerm: string) => {
    return courseList.filter(
      (course) =>
        course.tenKhoaHoc &&
        course.tenKhoaHoc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return { topCourses, referenceCourses, courses, filteredCourses };
};
