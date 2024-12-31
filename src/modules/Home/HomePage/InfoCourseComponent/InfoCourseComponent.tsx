import { Box, Grid, Typography } from "@mui/material";
import "./InfoCourseComponent.css";
import DoneIcon from "@mui/icons-material/Done";
import astronaut from "../../../../assets/astronaut.3c90d598.png";
const mockData = [
  {
    title: "KHÓA HỌC",
    description:
      "Học qua dự án thực tế, học đi đôi với hành, không lý thuyết lan man, phân tích cội nguồn của vấn đề, xây dựng từ các ví dụ nhỏ đến thực thi một dự án lớn ngoài thực tế để học viên học xong làm được ngay",
    details: [
      "Hơn 1000 bài tập và dự án thực tế",
      "Công nghệ cập nhật mới nhất",
      "Hình ảnh, ví dụ, bài giảng sinh động trực quan",
      "Học qua dự án thực tế",
      "Xây dựng từ các ví dụ nhỏ đến thực thi một dự án lớn ngoài thực tế",
      "Phân tích cội nguồn của vấn đề",
    ],
  },
  {
    title: "Hệ thống học tập",
    description: "Lộ trình bài bản từ zero tới chuyên nghiệp, nâng cao...",
    details: [
      "Thống kê lượt xem video, làm bài, điểm số theo chu kỳ",
      "Học tập theo nhóm, cùng học viên khác",
    ],
  },
  {
    title: "Giảng viên",
    description:
      "Tự động chấm điểm trắc nghiệm và đưa câu hỏi tùy theo mức độ học viên...",
    details: [
      "Tương tác cùng mentor và giảng viên qua phần thảo luận",
      "Review code và đưa ra các nhận xét góp ý",
      "Hỗ trợ học viên từng bước trong suốt quá trình học",
    ],
  },
  {
    title: "LỘ TRÌNH PHÙ HỢP ",
    description: "Lộ trình bài bản từ zero tới chuyên nghiệp, nâng cao...",
    details: [
      "Lộ trình bài bản từ zero tới chuyên nghiệp, nâng cao",
      "Học, luyện tập code, kỹ thuật phân tích, soft skill",
    ],
  },
  {
    title: "Chứng nhận",
    description:
      "Tự động chấm điểm trắc nghiệm và đưa câu hỏi tùy theo mức độ học viên...",
    details: [
      "Chấm bài và có thể vấn đáp trực tuyến để review",
      "Hệ thống tạo ra cho bạn một CV trực tuyến độc đáo",
      "Kết nối CV của bạn đến với các đối tác của V learning",
    ],
  },
];

export default function InfoCourseComponent() {
  return (
    <Box className="info-course-box">
      <Grid container spacing={3} className="info-course-grid">
        <Grid item xs={12} sm={6} md={4} className="infoItemHome infoLargeItem" style={{ flex: '1' }}>
          <img src={astronaut} alt="astronaut" />
          <Typography className="info-course-title">
            {mockData[0].title}
          </Typography>
          <Typography variant="body1">{mockData[0].description}</Typography>
          <ul className="info-course-ul">
            {mockData[0].details.map((detail, i) => (
              <li className="info-course-li" key={i}>
                <DoneIcon className="info-course-li-icon" />
                {detail}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="info-course-grid-small ">
          {mockData.slice(1, 3).map((data, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={12}
              key={index}
              className={`infoSmallItem${index}`}
              style={{ flex: '1' }}
            >
              <Typography className="info-course-title">
                {data.title}
              </Typography>
              <ul className="info-course-ul">
                {data.details.map((detail, i) => (
                  <li className="info-course-li" key={i}>
                    <DoneIcon className="info-course-li-icon" />
                    {detail}
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="info-course-grid-small">
          {mockData.slice(3).map((data, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={12}
              key={index}
              className={`infoSmallItem${index}`}
              style={{ flex: '1' }}
            >
              <Typography className="info-course-title">
                {data.title}
              </Typography>
              <ul className="info-course-ul">
                {data.details.map((detail, i) => (
                  <li className="info-course-li" key={i}>
                    <DoneIcon className="info-course-li-icon" />
                    {detail}
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
