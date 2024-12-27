import {
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Typography,
  Box,
  Button,
} from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SellIcon from "@mui/icons-material/Sell";
import logoHuman from "../../../../../assets/avatar2.bb9626e2.png";
import { Course } from "../../../../../interfaces/course";
import logoHuman2 from "../../../../../assets/emoji.6d1b7051.png";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../../routes/path";


interface CoursesProps {
  course: Course;
  position: string;
}

function Courses({ course, position }: CoursesProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${PATH.HOME.COURSE_DETAILS}/${course.maKhoaHoc}`);
  };
  return (
    <div className={`card-container ${position}`}>
        {/* card */}
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
              {course.moTa.slice(0, 50)}...
            </Typography>
            <Box className="course-item-reference-icons">
              <p className="course-item-reference-icons-item">
                <AccessAlarmsIcon style={{ color: "#f1cf4f" }} />
                <span>8 Giờ</span>
              </p>
              <p className="course-item-reference-icons-item">
                <CalendarMonthIcon style={{ color: "#c27c7f" }} />
                <span>4 Tuần</span>
              </p>
              <p className="course-item-reference-icons-item">
                <SignalCellularAltIcon style={{ color: "#6eb4e8" }} />
                <span>1000+</span>
              </p>
            </Box>
          </CardContent>
          <CardActions className="course-card-footer">
            <Box className="course-card-footer-item-reference">
              <Typography className="course-card-footer-item-title">
                <img
                  className="course-card-footer-item-title-image"
                  src={logoHuman}
                  alt="logoHuman"
                />
                <span className="course-card-footer-item-title-text">
                  {course.nguoiTao.hoTen}
                </span>
              </Typography>
              <Typography className="course-card-footer-item-price">
                <span className="course-card-footer-item-price-old">
                  100.000 <sup>đ</sup>
                </span>
                <span className="course-card-footer-item-price-new">
                  80.000 <sup>đ</sup>
                </span>
              </Typography>
              <SellIcon className="course-card-footer-item-sell-icon" />
            </Box>
          </CardActions>
        </Card>
        {/* tooltip */}
        <Card className="tooltip">
          <Box className="tooltip-content">
            <Box className="tooltip-content-header">
              <img
                className="tooltip-content-header-image"
                src={logoHuman2}
                alt="logoHuman2"
              />
              <Typography className="tooltip-content-header-text">
                {course.nguoiTao.hoTen}
              </Typography>
            </Box>
            <Box className="tooltip-content-body">
              <Typography className="tooltip-content-name">
                {course.tenKhoaHoc}
              </Typography>
              <Typography className="tooltip-content-description">
                {course.moTa.slice(0, 200)}...
              </Typography>
            </Box>
            <Box className="tooltip-content-footer">
              <Typography className="tooltip-content-footer-item">
                <FaceIcon style={{ color: "#f1cf4f" }} />
                <span className="tooltip-content-footer-item-text">
                  {course.soLuongHocVien}
                </span>
              </Typography>
              <Typography className="tooltip-content-footer-item">
                <VisibilityIcon style={{ color: "#c27c7f" }} />
                <span className="tooltip-content-footer-item-text">
                  {course.luotXem}
                </span>
              </Typography>
              <Typography className="tooltip-content-footer-item">
                <SignalCellularAltIcon style={{ color: "#6eb4e8" }} />
                <span className="tooltip-content-footer-item-text">1000+</span>
              </Typography>
            </Box>
            <Button className="tooltip-content-footer-item-button" onClick={handleClick}>
              Xem chi tiết
            </Button>
          </Box>
        </Card>
  
        {/* cardSale */}
        <Card className="card-sale">
          <span>Sale</span>
        </Card>
      </div>
    );
}

export default Courses;
