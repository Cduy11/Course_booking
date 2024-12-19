import {
  Button,
  Grid,
  Tab,
  Tabs,
  Typography,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import { Box } from "@mui/material";
import "./InfoDetail.css";
import { useState } from "react";

export default function InfoDetail() {
  const [value, setValue] = useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="info-detail">
      <Box className="coursePagination-title">
        <Typography variant="h4" className="title">
          Thông tin cá nhân
        </Typography>
        <Typography className="subtitle">thông tin học viên</Typography>
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
                  {value === "one" && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <MenuItem>
                            <Typography variant="body1">
                              Tên: Nguyễn Văn A
                            </Typography>
                          </MenuItem>
                          <MenuItem>
                            <Typography variant="body1">
                              Email: nguyenvana@example.com
                            </Typography>
                          </MenuItem>
                          <MenuItem>
                            <Typography variant="body1">
                              Số điện thoại: 0123 456 789
                            </Typography>
                          </MenuItem>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <MenuItem>
                            <Typography variant="body1">
                              Tài khoảng: A527
                            </Typography>
                          </MenuItem>
                          <MenuItem>
                            <Typography variant="body1">Nhóm: GP01</Typography>
                          </MenuItem>
                          <MenuItem>
                            <Typography variant="body1">
                              Đối tượng: Học viên
                            </Typography>
                          </MenuItem>
                        </Box>
                        <Box>
                          <Button onClick={handleOpen}>Open modal</Button>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box className="modal-style">
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                Chỉnh sửa thông tin cá nhân
                              </Typography>
                              <Box mt={2}>
                                <TextField
                                  label="Họ và tên"
                                  placeholder="Họ và tên"
                                  fullWidth
                                  margin="normal"
                                />
                                <TextField
                                  label="Mật khẩu"
                                  placeholder="Mật khẩu"
                                  fullWidth
                                  margin="normal"
                                />
                                <TextField
                                  label="Email"
                                  placeholder="Email"
                                  fullWidth
                                  margin="normal"
                                />
                                <TextField
                                  label="Số điện thoại"
                                  placeholder="Số điện thoại"
                                  fullWidth
                                  margin="normal"
                                />
                                <Box mt={2}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClose}
                                    style={{ marginRight: 10 }}
                                  >
                                    Hoàn Thành
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleClose}
                                  >
                                    Đóng
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          </Modal>
                        </Box>
                      </Grid>
                    </Grid>
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
