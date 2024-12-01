import { Box } from "@mui/material";
import SliderComponent from "./SliderComponent/SliderComponent";
import "./HomePage.css";
import InfoCourseComponent from "./InfoCourseComponent/InfoCourseComponent";
import CourseComponent from "./CourseComponent/CourseComponent";

export default function HomePage() {
  return (
    <>
      <Box className="home-page">
        <Box sx={{ flexGrow: 1 }}>
          <SliderComponent />
        </Box>

        <Box>
          <InfoCourseComponent />
        </Box>
        <Box>
          <CourseComponent />
        </Box>
      </Box>
    </>
  );
}
