import { Box, Button, Typography, Grid } from "@mui/material";
import paper_plane from "../../../../assets/paper_plane.93dfdbf5.png";
import slider_img from "../../../../assets/slider2.f170197b.png";
import message_slider from "../../../../assets/message_slider.6835c478.png";
import cloudes from "../../../../assets/clouds.15eb556c (1).png";
import cloudes_2 from "../../../../assets/clouds.15eb556c.png";
import code_plane from "../../../../assets/code_slider.8c12bbb4.png";
import "./SliderComponent.css";

export default function SliderComponent() {
  return (
    <Box className="slider-container" sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box className="slider-slogan">
            <img className="slider-img" src={paper_plane} alt="paper plane" />
            <Typography>
              <span className="slider-slogan-text">
                Chào mừng <br /> đến với môi trường <br />
              </span>

              <span className="slider-slogan-text slider-slogan-text-animate">
                V Learning
              </span>
            </Typography>
            <Button className="slider-button">Bắt đầu nào</Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className="slider-right">
          <Typography variant="h6" className="slider-img-main">
            <img src={slider_img} alt="paper plane" />
          </Typography>
          <Typography variant="h6" className="slider-img-message">
            <img src={message_slider} alt="paper plane" />
          </Typography>
          <Typography variant="h6" className="slider-img-clouds">
            <img src={cloudes} alt="paper plane" />
          </Typography>
          <Typography variant="h6" className="slider-img-clouds-2">
            <img src={cloudes_2} alt="paper plane" />
          </Typography>
          <Typography variant="h6" className="slider-img-code">
            <img src={code_plane} alt="paper plane" />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
