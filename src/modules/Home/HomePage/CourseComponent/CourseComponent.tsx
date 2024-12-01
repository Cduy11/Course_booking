import { Box, Grid, Typography } from "@mui/material";
import { useCourses } from "../../../../hooks/useCourse";
import "./CourseComponent.css";
import CoursePurchase from "./CoursePurchase/CoursePurchase";
import ReferenceCourse from "./ReferenceCourse/ReferenceCourse";

export default function CourseComponent() {
  const { topCourses, referenceCourses } = useCourses();

  return (
    <Box className="course-component">
      <Box className="course-component-title">
        <Typography variant="h6" className="course-component-title-text">
          Khoá học phổ biến
        </Typography>
      </Box>
      <Box className="course-component-content">
        <Grid container spacing={2} style={{ padding: "0px 40px" }}>
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
        <Grid container spacing={2} style={{ padding: "0px 40px" }}>
          {referenceCourses.map((course, index) => {
            const positionClass =
              index === 0 || index === referenceCourses.length - 2
                ? "outer-card"
                : "middle-card";

            return (
              <Grid item xs={12} sm={6} md={3} key={course.maKhoaHoc}>
                <ReferenceCourse course={course} position={positionClass} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
