import { MenuItem, Button, Box, Typography, Grid, Card } from "@mui/material";
import ModalInfo from "../ModalInfo/ModaldoInfo";
import { useState } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LayersIcon from '@mui/icons-material/Layers';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import "./PersonalInfo.css";

const PersonalInfo = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={6}>
          <Box>
            <MenuItem>
              <Typography variant="body1">
                <span style={{ fontWeight: 600 }}>Tên: </span> Nguyễn Văn A
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="body1">
                <span style={{ fontWeight: 600 }}>Email: </span>{" "}
                nguyenvana@example.com
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="body1">
                <span style={{ fontWeight: 600 }}>Số điện thoại: </span> 0123
                456 789
              </Typography>
            </MenuItem>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <MenuItem>
              <Typography variant="body1">
                {" "}
                <span style={{ fontWeight: 600 }}>Tài khoảng: </span>A527
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="body1">
                {" "}
                <span style={{ fontWeight: 600 }}>Nhóm: </span>GP01
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="body1">
                {" "}
                <span style={{ fontWeight: 600 }}>Đối tượng: </span>Học viên
              </Typography>
            </MenuItem>
          </Box>
          <Box>
            <Button className="info-button-modal" onClick={handleOpen}>
              Cập nhật
            </Button>
            <ModalInfo open={open} onClose={handleClose} />
          </Box>
        </Grid>
      </Grid>

      <Box className="info-skills">
        <Typography className="info-title">Kỹ năng của tôi</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            <Box className="skills-all">
              <Box className="my-skills skills-html">
                <Button className="skillBtnCustom html-btn">HTML</Button>
                <Box className="progress html-progress" />
              </Box>
              <Box className="my-skills skills-css">
                <Button className="skillBtnCustom css-btn">CSS</Button>
                <Box className="progress css-progress" />
              </Box>
              <Box className="my-skills skills-js">
                <Button className="skillBtnCustom js-btn">JS</Button>
                <Box className="progress js-progress" />
              </Box>
              <Box className="my-skills skills-react">
                <Button className="skillBtnCustom react-btn">REACT</Button>
                <Box className="progress react-progress" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box className="timeStydy">
              <Card className="timeStudyItem">
                <AccessAlarmIcon />
                <Typography className="time-content">
                  Giờ học <br /> <span>80</span>
                </Typography>
              </Card>
              <Card className="timeStudyItem">
                <LayersIcon />
                <Typography className="time-content">
                  Điểm tổng <br /> <span>80</span>
                </Typography>
              </Card>
              <Card className="timeStudyItem">
                <SignalCellularAltIcon />
                <Typography className="time-content">
                  Cấp độ <br /> <span>Trung cấp</span>
                </Typography>
              </Card>
              <Card className="timeStudyItem">  
                <LibraryBooksIcon />
                <Typography className="time-content">
                  Buổi học <br /> <span>40</span>
                </Typography>
              </Card>
              <Card className="timeStudyItem">
                <SchoolIcon />
                <Typography className="time-content">
                Học lực <br /> <span>Xém Giỏi</span>
                </Typography>
              </Card>
              <Card className="timeStudyItem">
                <MenuBookIcon />
                <Typography className="time-content">
                Bài tập <br /> <span>1001</span>
                </Typography>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
