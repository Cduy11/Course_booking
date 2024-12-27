import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import "./CourseDetails.css";
import DetailsContentCourse from "./DetailsContentCourse/DetailsContentCourse";
import Courses from "../HomePage/CourseComponent/Courses/Courses";
import { useCourses } from "../../../hooks/useCourse";

export default function CourseDetails() {
  const { maKhoaHoc } = useParams();
  const { courses } = useCourses();
  return (
    <Box className="details_course_details">
      <Box className="title_course_details">
        <Typography fontSize={25} fontWeight={600}>
          Thông Tin Khoá Học
        </Typography>
        <Typography fontSize={13} fontWeight={400}>
          Tiến lên và không Chần chừ !!! {maKhoaHoc}
        </Typography>
      </Box>
      <Box mt={5}>
        <DetailsContentCourse />
      </Box>
      <Box className="details_course_details_footer">
        <Typography className="details_course_details_footer_title">
          Các khóa học liên quan
        </Typography>
        <Box className="course-component-content" >
        <Grid container spacing={2} style={{ padding: "0px 40px", marginLeft: "100px"}}>
          {courses.map((course, index) => {
            const positionClass =
              index === 0 || index === courses.length - 2
                ? "outer-card"
                : "middle-card";

            return (
              <Grid item xs={12} sm={6} md={3} key={course.maKhoaHoc}>
                <Courses course={course} position={positionClass} />
              </Grid>
            );
          })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
