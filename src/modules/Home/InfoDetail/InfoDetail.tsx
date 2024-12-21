import { Box, Grid, Tabs, Tab, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import logoHuman from "../../../assets/avatar2.bb9626e2.png";
import "./InfoDetail.css";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import InfoCourse from "./InfoCourse/InfoCourse";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { fetchInfoUserApi } from "../../../store/slices/infoSlice";

export default function InfoDetail() {
  const [value, setValue] = useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const dispatch = useDispatch<AppDispatch>();
  
  // Lấy dữ liệu từ state
  const { inforUser, isLoading, error } = useSelector(
    (state: RootState) => state.inforUser
  );

  // Gọi API khi component mount
  useEffect(() => {
    dispatch(fetchInfoUserApi());
  }, [dispatch]);

  return (
    <Box className="info-detail">
      <Box className="coursePagination-title">
        <Typography variant="h4" className="title">
          Thông tin cá nhân
        </Typography>
        <Typography className="subtitle">Thông tin học viên</Typography>
      </Box>

      <Box className="infoDetail-container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box className="infoDetail-left">
              <img
                src={logoHuman}
                alt="Avatar"
                className="avatar"
              />
              <Typography variant="h6" mb={1} fontWeight={600}>
                Nguyễn Văn A
              </Typography>
              <Typography variant="body1" mb={1} fontWeight={500}>
                Lập trình viên Fullstack
              </Typography>
              <Button variant="contained" className="infoDetail-button">
                Hồ sơ cá nhân
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box className="infoDetail-right">
              <Box className="tabs-container">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab value="one" label="Thông tin cá nhân" />
                  <Tab value="two" label="Khóa học đã đăng ký" />
                </Tabs>

                <Box className="tab-content">
                  {value === "one" && <PersonalInfo />}
                  {value === "two" && <InfoCourse />}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
