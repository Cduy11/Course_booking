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

const InfoCourse = () => {
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
        />
      </Box>

      <Card className="info-details-card">
        <CardMedia
          component="img"
          className="info-details-image"
          image={logoHuman}
          alt="Course Image"
        />

        <CardContent className="info-details-content">
          <Typography
            variant="h6"
            fontWeight="bold"
            className="info-details-title"
          >
            Javascript
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="info-details-description"
          >
            ES6 là một chuẩn Javascript mới được đưa ra vào năm 2015 với nhiều
            quy tắc và cách sử dụng khác nhau...
          </Typography>

          <Box className="info-details-info">
            <Typography variant="body2" className="info-details-duration">
              ⏳ 8 giờ
            </Typography>
            <Typography variant="body2" className="info-details-duration">
              🗓️ 23 giờ
            </Typography>
            <Typography variant="body2">📈 All level</Typography>
          </Box>

          <Rating
            value={5}
            readOnly
            size="small"
            className="info-details-rating"
          />

          <Box className="info-details-author">
            <Avatar src={logoHuman} alt="Author Avatar" />
            <Typography variant="body2">Nguyễn Nam</Typography>
          </Box>
        </CardContent>

        <Box className="info-details-actions">
          <Button
            variant="contained"
            color="warning"
            sx={{ textTransform: "none" }}
          >
            Hủy Khóa Học
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default InfoCourse;
