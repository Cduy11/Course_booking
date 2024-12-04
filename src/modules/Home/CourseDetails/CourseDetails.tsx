import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import "./CourseDetails.css";
import DetailsContentCourse from "./DetailsContentCourse/DetailsContentCourse";
export default function CourseDetails() {
  const { maKhoaHoc } = useParams();

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
    </Box>
  );
}
