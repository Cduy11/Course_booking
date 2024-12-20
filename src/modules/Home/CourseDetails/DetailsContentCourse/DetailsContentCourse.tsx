import { Typography, Box, Grid, Button, Stack, Rating } from "@mui/material";
import "./DetailsContentCourse.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { useEffect, useState } from "react";
import { fetchCourseDetails } from "../../../../store/slices/courseSlice";
import { useNavigate, useParams } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import StorageIcon from "@mui/icons-material/Storage";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import type { CourseDetails } from "../../../../interfaces/course";
import { courseSections, learningOutcomes } from "./FakeData";
import { bookingCouseApi } from "../../../../store/slices/bookingSlice";
import { toast } from "react-toastify";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { PATH } from "../../../../routes/path";


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

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (maKhoaHoc) {
      dispatch(fetchCourseDetails({ MaKhoaHoc: maKhoaHoc }));
    }
  }, [dispatch, maKhoaHoc]);


  // LOGIC XỬ LÝ ĐĂNG KÝ
  const handleRegister = async () => {
    if (!maKhoaHoc) return;
    const userJson = localStorage.getItem("currentUser");
    if (!userJson) {
      toast.info("Bạn cần đăng nhập để đăng ký khóa học!");
      navigate(PATH.AUTH.LOGIN);
      return;
    }

    const currentUser = JSON.parse(userJson);
    const data = {
      maKhoaHoc,
      taiKhoan: currentUser.taiKhoan,
    };

    try {
      await dispatch(bookingCouseApi(data)).unwrap();
      toast.success("Đăng ký khóa học thành công!");
    } catch (error: any) {
      alert(`Đăng ký thất bại: ${error}`);
    } finally {
      handleClose();
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!courseDetails)
    return <Typography>No course details available.</Typography>;
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
                  <Typography sx={{ fontWeight: "bold" }}>Giáo Viên</Typography>
                  <Typography>{courseDetails.nguoiTao.hoTen}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} className="info_details_course">
                <SchoolIcon className="info_details_course_icon" />
                <Box className="info_details_course_text">
                  <Typography sx={{ fontWeight: "bold" }}>Lĩnh Vực</Typography>
                  <Typography>
                    {courseDetails.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} className="info_details_course">
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={5}
                    precision={0.5}
                    readOnly
                  />
                  <Box className="info_details_course_text">
                    <Typography>{courseDetails.luotXem} Lượt Xem</Typography>
                  </Box>
                </Stack>
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
            <Typography className="course-content-title1">
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
                          <PlayCircleOutlineIcon sx={{ color: "#4bab90" }} />{" "}
                          {lesson.title}
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
            <Typography className="text-center font-bold silideBarCourseDetails_price d-flex align-items-center">
              <ElectricBoltIcon className="icon-right" />
              <span>
                500.000 <sup>đ</sup>
              </span>
            </Typography>
            <Button
              variant="outlined"
              className="silideBarCourseDetails_button"
              fullWidth
              onClick={handleOpen}
            >
              Đăng ký
            </Button>
            <Box className="mt-4 silideBarCourseDetails_info">
              <Typography className="silideBarCourseDetails_info">
                Ghi danh:{" "}
                <span className="silideBarCourseDetails_text">
                  {courseDetails.soLuongHocVien} học viên{" "}
                  <SchoolIcon className="icon-right" />
                </span>
              </Typography>
              <Typography className="silideBarCourseDetails_info">
                Thời gian:{" "}
                <span className="silideBarCourseDetails_text">
                  18 giờ <AccessTimeIcon className="icon-right" />{" "}
                </span>
              </Typography>
              <Typography className="silideBarCourseDetails_info">
                Bài học:{" "}
                <span className="silideBarCourseDetails_text">
                  10 <MenuBookIcon className="icon-right" />{" "}
                </span>
              </Typography>
              <Typography className="silideBarCourseDetails_info">
                Video:{" "}
                <span className="silideBarCourseDetails_text">
                  14 <VideoLibraryIcon className="icon-right" />{" "}
                </span>
              </Typography>
              <Typography className="silideBarCourseDetails_info">
                Trình độ:{" "}
                <span className="silideBarCourseDetails_text">
                  Người mới bắt đầu <StorageIcon className="icon-right" />
                </span>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận đăng ký</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn đăng ký khóa học này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleRegister} color="primary" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
