import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Avatar,
  CardContent,
  Rating,
  Card,
  CardMedia,
} from "@mui/material";
import "./SearchCourse.css";
import FeedbackIcon from "@mui/icons-material/Feedback";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import logoHuman from "../../../assets/avatar2.bb9626e2.png";
import { useState, useEffect } from "react";
import { useCourses } from "../../../hooks/useCourse";
import { useLocation } from "react-router-dom";

// Hàm để lấy tham số từ URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function SearchCourse() {
  const query = useQuery();
  const searchTermFromUrl = query.get("searchTerm") || "";
  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);
  const { filteredCourses } = useCourses(searchTerm);

  // Thêm trạng thái cho các danh mục đã chọn
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    setSearchTerm(searchTermFromUrl);
  }, [searchTermFromUrl]);

  // Hàm để xử lý thay đổi checkbox
  const handleCategoryChange = (category: string) => {
    setSelectedCategories([category]); 
  };

  // Cập nhật hàm lọc để chỉ hiển thị các khóa học thuộc danh mục đã chọn
  const filteredByCategory = filteredCourses(searchTerm).filter(
    (course) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.danhMucKhoaHoc.maDanhMucKhoahoc)
  );

  return (
    <Box className="searchPageContainer">
      <Box className="coursePagination-title">
        <Typography variant="h4" sx={{ fontSize: "1.75rem" }}>
          Tìm Kiếm
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>
          Kết quả tìm kiếm khóa học !!!
        </Typography>
      </Box>
      <Box className="searchPage">
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={2}>
            <Typography className="filter__title_left">Lọc</Typography>
            <Box className="filterContainer">
              <Box className="filterItems">
                <Typography className="filter__title_content">
                  Khóa Học
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  className="filter__control"
                >
                  {[
                    "BackEnd",
                    "Design",
                    "FullStack",
                    "TuDuy",
                    "FrontEnd",
                    "DiDong",
                  ].map((category) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="custom-checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                      }
                      label={category}
                      key={category}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography className="filter__title_right">
              Hiện thị {filteredByCategory.length} kết quả
            </Typography>
            <Box mt={3}>
              {filteredByCategory.map((course) => {
                return (
                  <Card className="info-details-card" key={course.maKhoaHoc}>
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
                        {course.moTa}
                      </Typography>
                      <Box className="info-details-info">
                        <Typography
                          variant="body2"
                          className="info-details-duration"
                        >
                          <FeedbackIcon style={{ color: "#ef6b00" }} />{" "}
                          {course.soLuongHocVien} Đánh giá
                        </Typography>
                        <Typography
                          variant="body2"
                          className="info-details-duration"
                        >
                          <VisibilityIcon style={{ color: "#f5c002" }} />{" "}
                          {course.luotXem} Lượt xem
                        </Typography>
                        <Typography variant="body2">
                          <AutoGraphIcon style={{ color: "#42b294" }} /> All
                          level
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
                      >
                        Xem chi tiết
                      </Button>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
