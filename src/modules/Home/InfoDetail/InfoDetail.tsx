import { Button, Grid, Tab, Tabs, Typography, MenuItem } from "@mui/material";
import { Box } from "@mui/material";
import "./InfoDetail.css";
import { useState } from "react";

export default function InfoDetail() {
  const [value, setValue] = useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className="info-detail">
      <Box className="coursePagination-title">
        <Typography variant="h4" sx={{ fontSize: "1.75rem" }}>
          Thông tin cá nhân
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>thông tin học viên</Typography>
      </Box>

      <Box className="infoDetail-container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box className="infoDetail-left">
              <img
                src="https://cdn.dribbble.com/users/2364329/screenshots/6676961/02.jpg?compress=1&resize=800x600"
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
              <Box sx={{ width: "100%" }}>
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

                {/* Nội dung các tab */}
                <Box sx={{ mt: 2 }}>
                  {value === "one" && (
                    <Box>
                      <Typography variant="h6" mb={2}>
                        Thông tin cá nhân
                      </Typography>
                      <MenuItem>
                        <Typography variant="body1">Tên: Nguyễn Văn A</Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant="body1">Email: nguyenvana@example.com</Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant="body1">Số điện thoại: 0123 456 789</Typography>
                      </MenuItem>
                    </Box>
                  )}
                  {value === "two" && (
                    <Typography variant="body1">
                      Danh sách khóa học đã đăng ký:
                      <ul>
                        <li>Khóa học 1: JavaScript cơ bản</li>
                        <li>Khóa học 2: React nâng cao</li>
                      </ul>
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
