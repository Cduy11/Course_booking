import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import "./Footer.css";

export default function Footer() {
  return (
    <Box className="footer">
      <Box className="footer-contact">
        <Box className="footer-section">
          <Box>
            <Typography className="footersection-logo">
              V <span className="footersection-logo-text">learning</span>
            </Typography>
          </Box>
          <Box className="footerSection-contact">
            <Box className="footer-contact-item">
              <LocalPhoneIcon className="footer-icon" />
              <Typography>1800-123-4567</Typography>
            </Box>
            <Box className="footer-contact-item">
              <EmailIcon className="footer-icon" />
              <Typography>cduy@gmail.com</Typography>
            </Box>
            <Box className="footer-contact-item">
              <PlaceIcon className="footer-icon" />
              <Typography>Đà Nẵng</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="footer-section">
          <Typography variant="h6" className="footer-section-title">
            Liên kết
          </Typography>
          <Typography className="footer-link-item"> 
            <NavigateNextIcon className="footer-link-icon" /> Trang chủ
          </Typography>
          <Typography className="footer-link-item"> 
            <NavigateNextIcon className="footer-link-icon" /> Dịch vụ
          </Typography>
          <Typography className="footer-link-item"> 
            <NavigateNextIcon className="footer-link-icon" /> Nhóm
          </Typography>
          <Typography className="footer-link-item"> 
            <NavigateNextIcon className="footer-link-icon" /> Blog
          </Typography>
        </Box>
        <Box className="footer-section">
          <Typography variant="h6" className="footer-section-title">
            Khóa học
          </Typography>
          <Typography className="footer-link-item"> 
            <NavigateNextIcon className="footer-link-icon" /> Front End
          </Typography>
          <Typography className="footer-link-item"> 
            <NavigateNextIcon className="footer-link-icon" /> Back End
          </Typography>
          <Typography className="footer-link-item"> 
            <NavigateNextIcon className="footer-link-icon" /> Full stack
          </Typography>
          <Typography className="footer-link-item"> 
            <NavigateNextIcon className="footer-link-icon" /> Node Js
          </Typography>
        </Box>
        <Box className="footer-section">
          <Typography variant="h6" className="footer-section-title">
            Đăng kí tư vấn
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField 
                className="footer-contact-input" 
                label="Họ và tên"  
                size="small" 
                fullWidth 
                InputLabelProps={{
                  style: { color: '#49ae94' } // Màu xanh lá khi focus
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#49ae94', // Màu xanh lá khi focus
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField className="footer-contact-input" label="Email"  size="small" fullWidth  InputLabelProps={{
                  style: { color: '#49ae94' } // Màu xanh lá khi focus
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#49ae94', // Màu xanh lá khi focus
                    },
                  },
                }} />
            </Grid>
            <Grid item xs={6}>
              <TextField className="footer-contact-input" label="Số điện thoại"  size="small" fullWidth  InputLabelProps={{
                  style: { color: '#49ae94' } // Màu xanh lá khi focus
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#49ae94', // Màu xanh lá khi focus
                    },
                  },
                }}/>
            </Grid>
            <Grid item xs={6}>
             
            </Grid>
            <Button variant="contained" className="footer-contact-button">
                ĐĂNG KÍ
            </Button>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
