import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import imgAnimation from "../../../assets/img/it.ef68b551.png";
import img1 from "../../../assets/instrutor5.2e4bd1e6.jpg";
import img2 from "../../../assets/instrutor6.64041dca.jpg";
import img3 from "../../../assets/instrutor7.edd00a03.jpg";
import img4 from "../../../assets/instrutor8.aec2f526.jpg";
import img5 from "../../../assets/instrutor9.504ea6c5.jpg";
import img6 from "../../../assets/instrutor10.89946c43.jpg";
import img7 from "../../../assets/instrutor11.0387fe65.jpg";
import img8 from "../../../assets/instrutor12.90a80820.jpg";

import imgMeta from "../../../assets/img/meta.10fa2fa1.jpg";
import imgMRC from "../../../assets/img/microsoft.318b3280.jpg";
import imgGoogle from "../../../assets/img/Google-logo.f11902b5.jpg";
import imgAmz from "../../../assets/img/amazon.996890c4.jpg";

import "./EventPage.css";

const speakers = [
  {
    name: "Nguyễn Nhật",
    title: "CEO TECHVIET PRODUCTION",
    image: img1,
  },
  {
    name: "Nguyễn Nhật Nam",
    title: "CEO TECHVIET PRODUCTION",
    image: img2, // Thay thế bằng đường dẫn hình ảnh
  },
  {
    name: "Nguyễn Nam",
    title: "CEO TECHVIET PRODUCTION",
    image: img3,
  },
  {
    name: "Jhonny Đặng",
    title: "CEO TECHVIET PRODUCTION",
    image: img4,
  },
  {
    name: "Jhonny Đặng",
    title: "CEO TECHVIET PRODUCTION",
    image: img5,
  },
  {
    name: "Jhonny Đặng",
    title: "CEO TECHVIET PRODUCTION",
    image: img6,
  },
  {
    name: "Jhonny Đặng",
    title: "CEO TECHVIET PRODUCTION",
    image: img7,
  },
  {
    name: "Jhonny Đặng",
    title: "CEO TECHVIET PRODUCTION",
    image: img8,
  },
];

const donors = [
  {
    name: "FACEBOOK",
    image: imgMeta,
  },
  {
    name: "MICROSOFT",
    image: imgMRC,
  },
  {
    name: "GOOGLE",
    image: imgGoogle,
  },
  {
    name: "AMAZON",
    image: imgAmz,
  },
];

export default function EventPage() {
  return (
    <Box>
      <section className="sliderEvent">
        <Box className="timeEvent">
          <Box className="countDownEvent">
            <Box className="events">
              <Typography className="dayEvent" sx={{ color: "#ffbe0b" }}>
                00
              </Typography>
              <Typography variant="body2">
                <small>Ngày</small>
              </Typography>
            </Box>
            <Box className="events">
              <Typography className="dayEvent" sx={{ color: "#fb5607" }}>
                00
              </Typography>
              <Typography variant="body2">
                <small>Giờ</small>
              </Typography>
            </Box>
            <Box className="events">
              <Typography className="dayEvent" sx={{ color: "#ff006e" }}>
                00
              </Typography>
              <Typography variant="body2">
                <small>Phút</small>
              </Typography>
            </Box>
            <Box className="events">
              <Typography className="dayEvent" sx={{ color: "#8338ec" }}>
                00
              </Typography>
              <Typography variant="body2">
                <small>Giây</small>
              </Typography>
            </Box>
          </Box>
          <Typography variant="h4" className="eventTitle">
            Sự kiện công nghệ lớn nhất 2021
          </Typography>
          <Typography variant="h6" className="eventDate">
            20 - 25 tháng 12, 2022, Việt Nam
          </Typography>
        </Box>
      </section>
      <section className="eventDetails">
        <Grid container spacing={2}>
          <Grid item xs={6} className="imgEvent">
            <img src={imgAnimation} alt="img " />
          </Grid>
          <Grid item xs={6} className="infoEvent">
            <Typography variant="h4">
              Sự kiện công nghệ dành cho startup
            </Typography>
            <Typography variant="h5">
              Nơi gặp gỡ của những tư tưởng lớn
            </Typography>
            <Typography variant="h6">
              Innovatube Frontier Summit (IFS) là sự kiện đầu tiên tại Việt Nam
              tập trung vào cả bốn mảng tiêu biểu của công nghệ tiên phong, bao
              gồm Artificial Intelligence (trí tuệ nhân tạo), Internet of Things
              (Internet vạn vật), Blockchain (Chuỗi khối) và Augmented
              reality/Virtual Reality (Thực tế tăng cường/Thực tế ảo)
            </Typography>
            <Box className="btnGlobal">
              <Button className="btnJoin">Tham Gia</Button>
              <Button className="btnLearnMore">Tìm hiểu thêm</Button>
            </Box>
          </Grid>
        </Grid>
      </section>
      <section className="speecher">
        <Typography variant="h6">Các nhà đồng sáng tạo</Typography>
        <Grid container spacing={2} className="speechDetail">
          {speakers.map((speaker, index) => (
            <Grid item xs={3} key={index}>
              <Card
                className="speakerCard"
                style={{ position: "relative", zIndex: 1 }}
              >
                <CardMedia
                  className="speakerImg"
                  component="img"
                  height="auto"
                  image={speaker.image}
                  alt={speaker.name}
                />
                <CardContent className="speakerDes">
                  <Typography variant="body2" className="body2">
                    {speaker.name}
                  </Typography>
                  <Typography variant="body2" className="body2">
                    {speaker.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
      <section className="donors">
        <Typography variant="h6">Nhà tài trợ chương trình</Typography>
        <Grid container spacing={2}>
          {donors.map((donor, index) => (
            <Grid item xs={3} key={index}>
              <Card className="donordImg">
                <img src={donor.image} alt={donor.name} />
                <CardContent>
                  <Typography
                    variant="body2"
                    align="center"
                    className="donorName"
                  >
                    {donor.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
    </Box>
  );
}
