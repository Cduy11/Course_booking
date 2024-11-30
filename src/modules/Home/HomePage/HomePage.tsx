import { Box } from "@mui/material";
import SliderComponent from "./SliderComponent/SliderComponent";
import "./HomePage.css";
import InfoCourseComponent from "./InfoCourseComponent/InfoCourseComponent";

export default function HomePage() {
  return (
    <>
      <Box className="home-page">
        <Box sx={{ flexGrow: 1 }}>
          <SliderComponent />
        </Box>

        <InfoCourseComponent />
      </Box>
    </>
  );
}
