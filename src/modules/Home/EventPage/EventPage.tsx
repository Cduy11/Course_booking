import { Box, Button, Grid, Typography } from "@mui/material";
import imgAnimation from "../../../assets/img/it.ef68b551.png";
import "./EventPage.css";

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
              <Button className="btnLearnMore" >
                Tìm hiểu thêm
              </Button>
            </Box>
          </Grid>
        </Grid>
      </section>
    </Box>
  );
}
