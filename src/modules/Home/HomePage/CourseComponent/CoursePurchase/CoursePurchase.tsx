import {
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Typography,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import logoHuman from "../../../../../assets/avatar2.bb9626e2.png";
import { Course } from "../../../../../interfaces/course";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../../routes/path";
  


function CoursePurchase({ course }: { course: Course }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${PATH.HOME.COURSE_DETAILS}/${course.maKhoaHoc}`);
  };

  return (
    <Card className="course-item-card" onClick={handleClick}>
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
          {course.moTa.slice(0, 50)}...
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
          <Box className="course-card-footer-item-rating-star">
            <span> Đánh giá: 4.5</span>
            <span>
              <StarIcon style={{ fontSize: "15px" }} />
            </span>
          </Box>
          <span className="course-card-footer-item-rating-view">
            Lượt xem: {course.luotXem}
          </span>
        </Box>
      </CardActions>
    </Card>
  );
}

export default CoursePurchase;