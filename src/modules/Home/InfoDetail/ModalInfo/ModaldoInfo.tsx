import React, { useEffect } from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  updateInforUser,
  setInforUser,
  fetchInfoUserApi,
} from "../../../../store/slices/infoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { selectInforUser } from "../../../../store/slices/infoSlice";
import { toast } from "react-toastify";

// Định nghĩa kiểu cho form
interface FormData {
  taiKhoan: string;
  hoTen: string;
  email: string;
  matKhau: string;
  soDT: string;
}

// Định nghĩa kiểu cho props
interface ModalInfoProps {
  open: boolean;
  onClose: () => void;
}

// Schema validate với Yup
const schema = yup.object({
  taiKhoan: yup.string().required("Tài khoản không được bỏ trống"),
  hoTen: yup.string().required("Họ và tên không được bỏ trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được bỏ trống"),
  matKhau: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
  soDT: yup
    .string()
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
});

const ModalInfo: React.FC<ModalInfoProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const inforUser = useSelector(selectInforUser).inforUser;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      taiKhoan: inforUser.taiKhoan,
      hoTen: inforUser.hoTen,
      email: inforUser.email,
      matKhau: "",
      soDT: inforUser.soDT,
    },
  });

  // Sử dụng reset để cập nhật giá trị khi mở modal
  useEffect(() => {
    if (open) {
      reset({
        taiKhoan: inforUser.taiKhoan,
        hoTen: inforUser.hoTen,
        email: inforUser.email,
        matKhau: "",
        soDT: inforUser.soDT,
      });
    }
  }, [open, inforUser, reset]);

  const onSubmit = async (data: FormData) => {
    const userData = {
      ...data,
      maNhom: "GP01",
      maLoaiNguoiDung: "HV",
      taiKhoan: inforUser.taiKhoan,
    };

    try {
      const response = await dispatch(updateInforUser(userData)).unwrap();
      dispatch(setInforUser(response));
      toast.success("Cập nhật thông tin thành công!");

      dispatch(fetchInfoUserApi());

      onClose();
    } catch (error) {
      toast.error(`Cập nhật thất bại: ${error}`);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: 400,
          margin: "100px auto",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
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
            {...register("soDT")}
            error={!!errors.soDT}
            helperText={errors.soDT?.message}
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
