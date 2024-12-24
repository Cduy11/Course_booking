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
export default function SearchCourse() {
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
                  <FormControlLabel
                    control={<Checkbox className="custom-checkbox" />}
                    label="Tất cả"
                  />
                  <FormControlLabel
                    control={<Checkbox className="custom-checkbox" />}
                    label="Front End"
                  />
                  <FormControlLabel
                    control={<Checkbox className="custom-checkbox" />}
                    label="Back End"
                  />
                  <FormControlLabel
                    control={<Checkbox className="custom-checkbox" />}
                    label="Di Động"
                  />
                  <FormControlLabel
                    control={<Checkbox className="custom-checkbox" />}
                    label="Full Stack"
                  />
                  <FormControlLabel
                    control={<Checkbox className="custom-checkbox" />}
                    label="Tư duy lập trình "
                  />
                  <FormControlLabel
                    control={<Checkbox className="custom-checkbox" />}
                    label="Web"
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={10}>
            <Typography className="filter__title_right">
              Hiện thị 0 kết quả
            </Typography>
            <Box mt={3}>
              <Card className="info-details-card">
                <CardMedia
                  component="img"
                  className="info-details-image"
                  // image={course.hinhAnh}
                  alt="Course Image"
                />

                <CardContent className="info-details-content">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    className="info-details-title"
                  >
                    Javaa
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="info-details-description"
                  >
                    hattt
                  </Typography>

                  <Box className="info-details-info">
                    <Typography
                      variant="body2"
                      className="info-details-duration"
                    >
                      <FeedbackIcon style={{ color: "#ef6b00" }} /> 10 Đánh giá
                    </Typography>
                    <Typography
                      variant="body2"
                      className="info-details-duration"
                    >
                      <VisibilityIcon style={{ color: "#f5c002" }} /> 1000 Lượt
                      xem
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
                  >
                    Xem chi tiết
                  </Button>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
