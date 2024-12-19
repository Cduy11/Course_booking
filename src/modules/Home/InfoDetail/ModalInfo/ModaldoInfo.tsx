import React from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";

// Định nghĩa kiểu cho props
interface ModalInfo {
  open: boolean; 
  onClose: () => void; 
}

const ModalInfo: React.FC<ModalInfo> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-style">
        <Typography id="modal-modal-title" variant="h6" component="h2">
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
              onClick={onClose}
              style={{ marginRight: 10 }}
            >
              Hoàn Thành
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Đóng
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalInfo;
