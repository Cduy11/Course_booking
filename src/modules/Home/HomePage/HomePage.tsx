import { Box } from "@mui/material";
import SliderComponent from "./SliderComponent/SliderComponent";
import "./HomePage.css";
import InfoCourseComponent from "./InfoCourseComponent/InfoCourseComponent";
import CourseComponent from "./CourseComponent/CourseComponent";
import NumberComponent from "./NumberComponent/NumberComponent";
import Instructor from "./InstructorComponent/Instructor";
import Review from "./Review/Review";
import { useEffect, useState } from "react";
import Loadiing from "../../../components/Loading/Loadiing";


export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loadiing />
      ) : (
        <Box className="home-page">
          <Box className="container-home">
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
          <Box>
            <NumberComponent />
          </Box>
          <Box className="container-home">
            <Instructor />
          </Box>
          <Box>
            <Review />
          </Box>
        </Box>
      )}
    </>
  );
}
