import { Typography, Box, Grid, Button } from "@mui/material";
import "./DetailsContentCourse.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { useEffect } from "react";
import { fetchCourseDetails } from "../../../../store/slices/courseSlice";
import { useParams } from "react-router-dom";

import type { CourseDetails } from "../../../../interfaces/course";
import { courseSections, learningOutcomes } from "./FakeData";

interface CourseDetailsState {
  courseDetails: CourseDetails | null;
  isLoading: boolean;
  error: string | null;
}

export default function CourseDetails() {
  const { maKhoaHoc } = useParams<{ maKhoaHoc: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { courseDetails, isLoading, error } = useSelector(
    (state: RootState) => state.course
  ) as CourseDetailsState;

  useEffect(() => {
    if (maKhoaHoc) {
      dispatch(fetchCourseDetails({ MaKhoaHoc: maKhoaHoc }));
    }
  }, [dispatch, maKhoaHoc]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!courseDetails) {
    return <Typography>No course details available.</Typography>;
  }

  return (
    <Box className="details_content_course">
      <Grid container spacing={4}>
        {/* Phần thông tin khóa học */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className="font-bold mb-4">
            {courseDetails.tenKhoaHoc}
          </Typography>
          <Box className="header_details_course">
            <Grid container>
              <Grid item xs={12} md={4} className="info_details_course">
                <img
                  className="details_course_img"
                  src="https://demo2.cybersoft.edu.vn/static/media/instrutor5.2e4bd1e6.jpg"
                  alt=""
                />
                <Box className="info_details_course_text">
                  <Typography>Giáo Viên</Typography>
                  <Typography>{courseDetails.nguoiTao.hoTen}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} className="info_details_course">
                <img
                  className="details_course_img"
                  src="https://demo2.cybersoft.edu.vn/static/media/instrutor5.2e4bd1e6.jpg"
                  alt=""
                />
                <Box className="info_details_course_text">
                  <Typography>Lĩnh Vực</Typography>
                  <Typography>
                    {courseDetails.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} className="info_details_course">
                <img
                  className="details_course_img"
                  src="https://demo2.cybersoft.edu.vn/static/media/instrutor5.2e4bd1e6.jpg"
                  alt=""
                />
                <Box className="info_details_course_text">
                  <Typography>Lượt Xem</Typography>
                  <Typography>{courseDetails.luotXem}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Typography className="info_details_description">
            {courseDetails.moTa}
          </Typography>
          <Box className="mb-4 box_course_learn">
            <Typography className="font-bold box_course_learn_title">
              Những gì bạn sẽ học:
            </Typography>
            <Grid container spacing={2} mt={4}>
              {learningOutcomes.map((outcomeList, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <ul className="course_learn_item">
                    {outcomeList.map((outcome, idx) => (
                      <li key={idx}>{outcome}</li>
                    ))}
                  </ul>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box>
            <Typography className="course-content-title font-bold">
              Nội dung khóa học:
            </Typography>
            <ul className="course-content-list">
              {courseSections.map((section, index) => (
                <li key={index}>
                  <Typography
                    className="course-content-title"
                    display="flex"
                    alignItems="center"
                  >
                    {section.title}
                    <Button
                      variant="outlined"
                      className="course-content-button ml-2"
                    >
                      Xem trước
                    </Button>
                  </Typography>

                  <ul className="course-content-sublist">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex}>
                        <Typography>
                          <PlayCircleOutlineIcon sx={{ color: "#4bab90" }} /> {lesson.title}
                        </Typography>
                        <span className="course-content-time">
                          <AccessTimeIcon
                            className="icons_time"
                            sx={{ color: "#4bab90" }}
                          />
                          {lesson.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>

        {/* Phần hình ảnh và thông tin thêm */}
        <Grid item xs={12} md={4} className="silideBarCourseDetails">
          <Box className="silideBarCourseDetails_box">
            <Box className="flex justify-center mb-4 silideBarCourseDetails_img">
              <img src={courseDetails.hinhAnh} alt="Course" className="w-3/4" />
            </Box>
            <Typography className="text-center font-bold silideBarCourseDetails_price">
              500.000 <sup>đ</sup>
            </Typography>
            <Button variant="outlined" className="silideBarCourseDetails_button" fullWidth>
              Đăng ký
            </Button>
            <Box className="mt-4">
              <Typography>
                Ghi danh: {courseDetails.soLuongHocVien} học viên
              </Typography>
              <Typography>Thời gian: 18 giờ</Typography>
              <Typography>Bài học: 10</Typography>
              <Typography>Video: 14</Typography>
              <Typography>Trình độ: Người mới bắt đầu</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
