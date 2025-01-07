import { useForm } from "react-hook-form";
import "../Auth.css";
import { Stack, TextField, Select, MenuItem } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerApi } from "../../../store/slices/authSlice";
import { toast } from "react-toastify";
import { PATH } from "../../../routes/path";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";

//định nghĩa kiểu dữ liệu cho props
interface RegisterProps {
  onToggle: () => void;
}

//định nghĩa kiểu dữ liệu cho form
interface UserRegisterData {
  taiKhoan: string;
  hoTen: string;
  matKhau: string;
  email: string;
  soDT: string;
  maNhom: string;
}

const schema = yup.object().shape({
  taiKhoan: yup
    .string()
    .min(2, "Tài khoản phải có ít nhất 2 ký tự")
    .required("Tài khoản là bắt buộc"),
  hoTen: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Họ tên không chứa ký tự đặc biệt")
    .required("Họ tên là bắt buộc"),
  matKhau: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  soDT: yup
    .string()
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  maNhom: yup.string().required("Mã nhóm là bắt buộc"),
});

const Register: React.FC<RegisterProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterData>({
    defaultValues: {
      taiKhoan: "",
      hoTen: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: UserRegisterData) => {
    try {
      await dispatch(registerApi(data));
      toast.success("Đăng ký thành công");
      navigate(PATH.AUTH.LOGIN);
    } catch {
      toast.error("Đăng ký thất bại");
    }
  };
  return (
    <div className="auth-form-container auth-sign-up">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Đăng ký</h1>
        <Stack spacing={2} width="100%">
          <div style={{ position: 'relative' }}>
            <TextField
              {...register("taiKhoan")}
              className="text-field"
              type="text"
              label="Tài khoản"
              variant="outlined"
              fullWidth
            />
            {errors.taiKhoan && (
              <span className="text-error" style={{ position: 'absolute', top: '100%', left: 0 }}>
                {errors.taiKhoan.message}
              </span>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <TextField
              {...register("hoTen")}
              className="text-field"
              type="text"
              label="Họ tên"
              variant="outlined"
              fullWidth
            />
            {errors.hoTen && (
              <span className="text-error" style={{ position: 'absolute', top: '100%', left: 0 }}>
                {errors.hoTen.message}
              </span>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <TextField
              {...register("matKhau")}
              className="text-field"
              type="password"
              label="Mật khẩu"
              variant="outlined"
              fullWidth
            />
            {errors.matKhau && (
              <span className="text-error" style={{ position: 'absolute', top: '100%', left: 0 }}>
                {errors.matKhau.message}
              </span>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <TextField
              {...register("email")}
              className="text-field"
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
            />
            {errors.email && (
              <span className="text-error" style={{ position: 'absolute', top: '100%', left: 0 }}>
                {errors.email.message}
              </span>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <TextField
              {...register("soDT")}
              className="text-field"
              type="text"
              label="Số Điện Thoại"
              variant="outlined"
              fullWidth
            />
            {errors.soDT && (
              <span className="text-error" style={{ position: 'absolute', top: '100%', left: 0 }}>
                {errors.soDT.message}
              </span>
            )}
          </div>
          <Select
            className="text-field"
            {...register("maNhom")}
            variant="outlined"
            fullWidth
            defaultValue=""
          >
            {Array.from({ length: 9 }, (_, i) => (
              <MenuItem key={i} value={`GP0${i + 1}`}>
                GP0{i + 1}
              </MenuItem>
            ))}
          </Select>
          {errors.maNhom && (
            <span className="text-error" style={{ position: 'absolute', top: '100%', left: 0 }}>
              {errors.maNhom.message}
            </span>
          )}
        </Stack>
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;
