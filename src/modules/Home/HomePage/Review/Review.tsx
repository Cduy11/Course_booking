import { Box, Grid } from "@mui/material";
import reviewImg from "../../../../assets/avatarReview.2f5a1f3c.png";
import "./Review.css";

const reviews = [
  {
    id: 1,
    text: "Chương trình giảng dạy được biên soạn dành riêng cho các bạn Lập trình từ trái ngành hoặc đã có kiến thức theo cường độ cao, luôn được tinh chỉnh và tối ưu hóa theo thời gian bởi các thành viên sáng lập và giảng viên dày kinh nghiệm. Thực sự rất hay và hấp dẫn.",
    name: "Duy Dev",
    title: "Học viên xuất sắc",
  },
];

export default function Review() {
  return (
    <Box className="review-container">
      <Box className="review-student">
        <Box className="triangleTopRight"></Box>
        <Box className="smallBox smallboxLeftTop"></Box>
        <Box className="smallBox smallboxLeftBottom"></Box>
        <Box className="smallBox smallboxRightTop"></Box>
        <Grid container spacing={2} className="review-col">
          <Grid item xs={12} sm={6} md={6} className="review-left">
            <div className="reviewImg">
              <div className="bgreviewImg"></div>
              <img src={reviewImg} alt="" />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} className="review-right">
            <div className="review-textQoute">
              <p>{reviews[0].text}</p>
              <p className="review-textQoute-name">{reviews[0].name}</p>
              <span>{reviews[0].title}</span>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
