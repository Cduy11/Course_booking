import React from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Định nghĩa kiểu cho form
interface FormData {
  hoTen: string;
  email: string;
  matKhau: string;
  soDt: string;
}

// Định nghĩa kiểu cho props
interface ModalInfoProps {
  open: boolean;
  onClose: () => void;
}

// Schema validate với Yup
const schema = yup.object({
  hoTen: yup.string().required("Họ và tên không được bỏ trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được bỏ trống"),
  matKhau: yup.string().required("Mật khẩu không được bỏ trống"),
  soDt: yup
    .string()
    .matches(/^[0-9]+$/, "Số điện thoại chỉ chứa chữ số")
    .required("Số điện thoại không được bỏ trống"),
});

const ModalInfo: React.FC<ModalInfoProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="modal-style"
        sx={{
          width: 400,
          margin: "100px auto",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Chỉnh sửa thông tin cá nhân
        </Typography>
        <Box component="form" mt={2} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Họ và tên"
            placeholder="Họ và tên"
            fullWidth
            margin="normal"
            {...register("hoTen")}
            error={!!errors.hoTen}
            helperText={errors.hoTen?.message}
          />
          <TextField
            label="Email"
            placeholder="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Mật khẩu"
            type="password"
            placeholder="Mật khẩu"
            fullWidth
            margin="normal"
            {...register("matKhau")}
            error={!!errors.matKhau}
            helperText={errors.matKhau?.message}
          />
          <TextField
            label="Số điện thoại"
            placeholder="Số điện thoại"
            fullWidth
            margin="normal"
            {...register("soDt")}
            error={!!errors.soDt}
            helperText={errors.soDt?.message}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
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
