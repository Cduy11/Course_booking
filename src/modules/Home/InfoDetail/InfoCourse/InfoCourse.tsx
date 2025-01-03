import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Avatar,
  Button,
} from "@mui/material";
import logoHuman from "../../../../assets/avatar2.bb9626e2.png";
import FeedbackIcon from "@mui/icons-material/Feedback";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useFetchUserInfo } from "../../../../hooks/useInfo";
import { cancelCourseApi } from "../../../../store/slices/bookingSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { ChiTietKhoaHoc } from "../../../../interfaces/info";
import { toast } from "react-toastify";

const InfoCourse = () => {
  const { inforUser } = useFetchUserInfo();
  const [courseHistory, setCourseHistory] = useState<ChiTietKhoaHoc[]>(
    inforUser.chiTietKhoaHocGhiDanh || []
  );

  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourseHistory = courseHistory.filter((course) =>
    course.tenKhoaHoc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancelCourse = async (maKhoaHoc: string) => {
    const action = await dispatch(
      cancelCourseApi({ maKhoaHoc, taiKhoan: inforUser.taiKhoan })
    );

    if (cancelCourseApi.fulfilled.match(action)) {
      setCourseHistory((prev) =>
        prev.filter((course: ChiTietKhoaHoc) => course.maKhoaHoc !== maKhoaHoc)
      );
      toast.success("Hủy khóa học thành công!");
    } else {
      toast.error("Hủy khóa học thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <Box className="info-details-page">
      <Typography variant="h5" className="info-details-header">
        KHÓA HỌC CỦA TÔI
      </Typography>

      <Box className="info-details-search">
        <TextField
          label="Tìm kiếm..."
          variant="outlined"
          size="small"
          className="info-details-search-field"
          onChange={handleSearchChange}
        />
      </Box>

      {filteredCourseHistory.map((course, index) => (
        <Card key={index} className="info-details-card">
          <CardMedia
            component="img"
            className="info-details-image"
            image={course.hinhAnh}
            alt="Course Image"
          />

          <CardContent className="info-details-content">
            <Typography
              variant="h6"
              fontWeight="bold"
              className="info-details-title"
            >
              {course.tenKhoaHoc}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="info-details-description"
            >
              {course.moTa.length > 150
                ? course.moTa.slice(0, 150) + "..."
                : course.moTa}
            </Typography>

            <Box className="info-details-info">
              <Typography variant="body2" className="info-details-duration">
                <FeedbackIcon style={{ color: "#ef6b00" }} /> {course.danhGia}{" "}
                Đánh giá
              </Typography>
              <Typography variant="body2" className="info-details-duration">
                <VisibilityIcon style={{ color: "#f5c002" }} /> {course.luotXem}{" "}
                Lượt xem
              </Typography>
              <Typography variant="body2">
                <AutoGraphIcon style={{ color: "#42b294" }} /> All level
              </Typography>
            </Box>

            <Rating
              value={5}
              readOnly
              size="small"
              className="info-details-rating"
            />

            <Box className="info-details-author">
              <Avatar src={logoHuman} alt="Author Avatar" />
              <Typography variant="body2"> Ẩn danh</Typography>
            </Box>
          </CardContent>

          <Box className="info-details-actions">
            <Button
              variant="contained"
              color="warning"
              sx={{ textTransform: "none" }}
              onClick={() => handleCancelCourse(course.maKhoaHoc)}
            >
              Hủy Khóa Học
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default InfoCourse;
