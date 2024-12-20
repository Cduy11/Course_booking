import { Box, Grid, Typography } from "@mui/material";
import { useCourses } from "../../../../hooks/useCourse";
import "./CourseComponent.css";
import CoursePurchase from "./CoursePurchase/CoursePurchase";
import Courses from "./Courses/Courses";
import ReferenceCourse from "./ReferenceCourse/ReferenceCourse";

export default function CourseComponent() {
  const { topCourses, referenceCourses, courses } = useCourses();

  return (
    <Box className="course-component">
      <Box className="course-component-title">
        <Typography variant="h6" className="course-component-title-text">
          Khoá học phổ biến
        </Typography>
      </Box>
      <Box className="course-component-content">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ padding: "0px 40px" }}
        >
          {topCourses.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course.maKhoaHoc}>
              <CoursePurchase course={course} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box className="course-component-title">
        <Typography variant="h6" className="course-component-title-text">
          Khoá học tham khảo
        </Typography>
      </Box>
      <Box className="course-component-content">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ padding: "0px 40px" }}
        >
          {referenceCourses.map((course, index) => {
            const positionClass =
              index === 0 || index === referenceCourses.length - 2
                ? "outer-card"
                : "middle-card";

            return (
              <Grid item xs={12} sm={6} md={3} key={course.maKhoaHoc}>
                <ReferenceCourse course={course} position={positionClass}  />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box className="course-component-title">
        <Typography variant="h6" className="course-component-title-text">
          Khoá Học Back End
        </Typography>
      </Box>
      <Box className="course-component-content">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ padding: "0px 40px" }}
        >
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
  );
}
