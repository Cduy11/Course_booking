import {
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Typography,
  Grid,
} from "@mui/material";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "./CourseComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../store";
import { fetchCourseList } from "../../../../store/slices/courseSlice";
import { useEffect } from "react";
import logoHuman from "../../../../assets/avatar2.bb9626e2.png";

// Định nghĩa interface trực tiếp trong component
interface Course {
  hinhAnh: string;
  tenKhoaHoc: string;
  moTa: string;
  nguoiTao: {
    hoTen: string;
  };
}

interface CourseState {
  courseList: Course[];
  isLoading: boolean;
  error: string | null;
}

export default function CourseComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { courseList, } = useSelector(
    (state: RootState) => state.course
  ) as CourseState;

  useEffect(() => {
    dispatch(fetchCourseList({ MaNhom: "GP09"}));
  }, [dispatch]);

  return (
    <>
      <Box className="course-component">
        <Box className="course-component-title">
          <Typography variant="h6" className="course-component-title-text">
            Khoá học phổ biến
          </Typography>
        </Box>
        <Box className="course-component-content">
          <Grid container spacing={2}>
            {courseList.map((course) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card className="course-item-card">
                  <CardMedia
                    className="course-item-card-media"
                    sx={{ height: 185 }}
                    image={course.hinhAnh}
                    title={course.tenKhoaHoc}
                  />
                  <CardContent className="course-item-card-content">
                    <Typography
                      gutterBottom
                      component="div"
                      className="course-item-card-content-title"
                    >
                      {course.tenKhoaHoc}
                    </Typography>
                    <Typography className="course-item-card-content-description">
                      {course.moTa}
                    </Typography>
                    <Box className="course-title-maker">
                      <img
                        className="course-title-maker-image"
                        src={logoHuman}
                        alt=""
                      />
                      <span className="course-title-maker-name">
                        {course.nguoiTao.hoTen}
                      </span>
                    </Box>
                  </CardContent>
                  <CardActions className="course-card-footer">
                    <Box className="course-card-footer-item">
                      <p className="course-card-footer-price-old">
                        800.000
                        <sup>đ</sup>
                      </p>
                      <span className="course-card-footer-price-discount">
                        100.000
                        <sup>đ</sup>
                      </span>
                    </Box>
                    <Box className="course-card-footer-item-rating">
                      <span>4.5</span>
                      <span>
                        <StarIcon />
                      </span>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
