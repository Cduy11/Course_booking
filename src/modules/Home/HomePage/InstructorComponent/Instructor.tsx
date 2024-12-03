import { Box, Card, CardContent, Grid, Stack, Rating } from "@mui/material";
import { Typography } from "@mui/material";
import instructor from "../../../../assets/instrutor5.2e4bd1e6.jpg";
import instructor2 from "../../../../assets/instrutor6.64041dca.jpg";
import instructor3 from "../../../../assets/instrutor7.edd00a03.jpg";
import instructor4 from "../../../../assets/instrutor8.aec2f526.jpg";
import instructor5 from "../../../../assets/instrutor9.504ea6c5.jpg";
import instructor6 from "../../../../assets/instrutor10.89946c43.jpg";


import "./Intrustor.css";

// Dữ liệu giả cho giảng viên
const instructors = [
  {
    id: 1,
    name: "Giảng viên 1",
    role: "Chuyên Gia lập trình",
    reviews: 100,
    image: instructor,
  },
  {
    id: 2,
    name: "Giảng viên 2",
    role: "Chuyên Gia thiết kế",
    reviews: 80,
    image: instructor2,
  },
  {
    id: 3,
    name: "Giảng viên 3",
    role: "Chuyên Gia marketing",
    reviews: 120,
    image: instructor3,
  },
  {
    id: 4,
    name: "Giảng viên 4",
    role: "Chuyên Gia quản lý",
    reviews: 90,
    image: instructor4,
  },
  {
    id: 5,
    name: "Giảng viên 5",
    role: "Chuyên Gia phân tích",
    reviews: 110,
    image: instructor5,
  },
  {
    id: 6,
    name: "Giảng viên 6",
    role: "Chuyên Gia phát triển",
    reviews: 95,
    image: instructor6,
  },
];

export default function Instructor() {
  return (
    <Box className="instructor-container">
      <Typography className="instructor-title">Giảng viên hàng đầu</Typography>
      <Grid container spacing={2} className="instructor-items">
        {instructors.map((instructor) => (
          <Grid item xs={2} key={instructor.id}>
            <Card className="instructor-content">
              <CardContent>
                <img
                  className="intructor-img"
                  src={instructor.image}
                  alt="logo"
                />
                <Typography className="intructor-name">
                  {instructor.name}
                </Typography>
                <Typography className="instructor-role">
                  {instructor.role}
                </Typography>
                <Typography className="instructor-review">
                  <Box>
                    <Stack spacing={1} className="instructor-rating-box">
                      <Rating name="half-rating" defaultValue={5} readOnly />
                    </Stack>
                    <span className="instructor-review-bot">
                      {instructor.reviews} đánh giá
                    </span>
                  </Box>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
