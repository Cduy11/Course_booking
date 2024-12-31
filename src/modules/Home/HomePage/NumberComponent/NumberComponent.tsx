import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import numberImg1 from "../../../../assets/003-students.e1a7c67b.png";
import numberImg2 from "../../../../assets/003-students.e1a7c67b.png";
import numberImg3 from "../../../../assets/003-students.e1a7c67b.png";
import numberImg4 from "../../../../assets/003-students.e1a7c67b.png";
import CountUp from "react-countup";
import "./NumberComponent.css";

export default function NumberComponent() {
  const data = [
    { img: numberImg1, end: 9000, title: "Học viên" },
    { img: numberImg2, end: 1000, title: "Khóa học" },
    { img: numberImg3, end: 33200, title: "Giờ học" },
    { img: numberImg4, end: 400, title: "Giảng viên" },
  ];

  return (
    <Box className="number_container">
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box className="number-content">
              <div className="number-img">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="number-text">
                <CountUp
                  start={0}
                  end={item.end}
                  duration={5}
                  className="text-number"
                />
              </div>
              <span className="text-title">{item.title}</span>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
