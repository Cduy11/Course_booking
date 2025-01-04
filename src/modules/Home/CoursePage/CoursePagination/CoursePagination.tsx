import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";

import "./CoursePagination.css";
import CountUp from "react-countup";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CoursePurchase from "../../HomePage/CourseComponent/CoursePurchase/CoursePurchase";
import { useCoursePagination } from "../../../../hooks/useCoursePagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Course } from "../../../../interfaces/course";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../routes/path";
import { fakeData } from "../FakeData/FakeData";
import Loadiing from "../../../../components/Loading/Loadiing";

export default function CoursePagination() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { coursePagination, loading } = useCoursePagination(page);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleClick = (course: Course) => {
    navigate(`${PATH.HOME.COURSE_DETAILS}/${course.maKhoaHoc}`);
  };

  return (
    <Box>
      <Box className="coursePagination-title">
        <Typography variant="h4" sx={{ fontSize: "1.75rem" }}>
          Khóa học
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>
          Bắt đầu hành trinh nào !!!
        </Typography>
      </Box>
      <Box className="coursePagination-container">
        <Box className="coursePagination-banner">
          <Grid container>
            {fakeData.map((item, index) => (
              <Grid item xs={12} sm={6} md={2} key={index}>
                <Box
                  className="coursePagination-item"
                  sx={{ backgroundColor: item.backgroundColor }}
                >
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography>{item.icon}</Typography>
                  <Typography variant="h5">
                    <CountUp end={item.count} duration={2.5} />
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box className="coursePagination-content">
          <Box className="coursePagination-content-title">
            <Typography variant="h6">
              <BookmarkIcon sx={{ color: "#eb86aa" }} /> Danh sách khoá học
            </Typography>
            <Box className="course-component-content">
              {loading ? (
                <Loadiing />
              ) : (
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  style={{ padding: "0px 40px" }}
                  className="course-component-grid1"
                >
                  {coursePagination.map((course: Course) => (
                    <Grid item xs={12} sm={6} md={3} key={course.maKhoaHoc}>
                      <Box onClick={() => handleClick(course)}>
                        <CoursePurchase course={course} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
              <Stack spacing={2} mt={5}>
                <Pagination
                  count={8}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChange}
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
