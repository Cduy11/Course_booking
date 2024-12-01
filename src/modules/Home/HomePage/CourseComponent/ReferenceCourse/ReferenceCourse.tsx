import {
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Typography,
  Box,
} from "@mui/material";

import { Course } from "../../../../../interfaces/course";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import logoHuman from "../../../../../assets/avatar2.bb9626e2.png";
import SellIcon from "@mui/icons-material/Sell";
import { useState } from "react";

function ReferenceCourse({ course }: { course: Course }) {
  const [isOuterCard, setIsOuterCard] = useState(false);
  return (
    <div className="card-container">
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
      <div
        className={`tooltip ${isOuterCard ? "tooltip-inner" : "tooltip-outer"}`}
      >
        {/* Nội dung tooltip */}
      </div>
    </div>
  );
}

export default ReferenceCourse;