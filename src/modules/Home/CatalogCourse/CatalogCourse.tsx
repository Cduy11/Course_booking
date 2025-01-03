// src/modules/Home/CatalogCourse/CatalogCourse.tsx
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import "./CatalogCourse.css";
import ComputerIcon from "@mui/icons-material/Computer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useEffect, useState } from "react";
import { fetchCatelog } from "../../../store/slices/categotySlice";
import { Course } from "../../../interfaces/course";
import { useNavigate, useParams } from "react-router-dom";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SellIcon from "@mui/icons-material/Sell";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import logoHuman from "../../../assets/avatar2.bb9626e2.png";
import { PATH } from "../../../routes/path";
import Loadiing from "../../../components/Loading/Loadiing";

export default function CatalogCourse() {
  const { maDanhMucKhoaHoc } = useParams<{ maDanhMucKhoaHoc: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { catelogList } = useSelector((state: RootState) => state.category) as {
    catelogList: Course[];
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (maDanhMucKhoaHoc) {
      setLoading(true);
      dispatch(fetchCatelog(maDanhMucKhoaHoc)).finally(() => setLoading(false));
    }
  }, [dispatch, maDanhMucKhoaHoc]);

  const renderCourses = (catelogList: Course[]) => {
    return catelogList.map((course, index) => {
      const isLastInRow = (index + 1) % 4 === 0;
      const positionClass = isLastInRow ? "last-card-inner" : "outer-card";
      const handleClick = () => {
        navigate(`${PATH.HOME.COURSE_DETAILS}/${course.maKhoaHoc}`);
      };
      return (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={course.maKhoaHoc}
          className="course-card-grid"
        >
          <div
            className={`card-container ${positionClass}`}
            onClick={handleClick}
          >
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
            <Card className={`tooltip ${index > 3 ? "tooltip-multiple" : ""}`}>
              <Box className="tooltip-content">
                <Box className="tooltip-content-header">
                  <img
                    className="tooltip-content-header-image"
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
                    <span className="tooltip-content-footer-item-text">
                      1000+
                    </span>
                  </Typography>
                </Box>
                <Button
                  className="tooltip-content-footer-item-button"
                  onClick={handleClick}
                >
                  Xem chi tiết
                </Button>
              </Box>
            </Card>
            <Card className="card-sale">
              <span>Sale</span>
            </Card>
          </div>
        </Grid>
      );
    });
  };

  return (
    <Box>
      {loading ? (
        <Loadiing />
      ) : (
        <Box className="catalog">
          <Typography className="catalog__title" sx={{ fontSize: "1.75rem" }}>
            Khoá học theo danh mục
          </Typography>
          <Typography sx={{ fontSize: "13px" }}>
            Hãy chọn khoá học mong muốn !!!
          </Typography>
        </Box>
      )}
      <Box className="catelog_listCourse">
        <Typography className="catelog__cateName">
          <Typography className="catelog_button">
            <ComputerIcon />{" "}
            {catelogList.length > 0
              ? catelogList[0].danhMucKhoaHoc.tenDanhMucKhoaHoc
              : "Chưa có danh mục"}
          </Typography>
        </Typography>

        <Grid
          container
          spacing={2}
          mt={5}
          style={{ padding: "0px 40px", marginLeft: "60px" }}
          className="catelog_grid"
        >
          {renderCourses(catelogList)}
        </Grid>
      </Box>
    </Box>
  );
}
