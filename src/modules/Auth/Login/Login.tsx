import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PATH } from "../../../routes/path";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import "../Auth.css";

interface RegisterProps {
  onToggle: () => void;
}

//định nghĩa kiểu dữ liệu cho form
interface LoginFormData {
  taiKhoan: string;
  matKhau: string;
}

const Login: React.FC<RegisterProps> = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
  });

  // check url không cho thay đổi khi đăng nhập rồi
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate(PATH.HOME.ROOT);
    }
  }, [navigate]);

  const onSubmit = (data: LoginFormData) => {
    login(data)
      .then((user) => {
        if (user) {
          toast.success("Đăng nhập thành công!");
          if (user.maLoaiNguoiDung === "GV") {
            navigate(PATH.ADMIN.COURSES_MANAGEMENT);
          } else {
            navigate(PATH.HOME.ROOT);
          }
        } else {
          toast.error("Đăng nhập thất bại!");
        }
      })
      .catch(() => {
        toast.error("Đăng nhập thất bại!");
      });
  };

  return (
    <div className="auth-form-container auth-sign-in">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Đăng nhập</h1>
        <Stack spacing={3} width="100%">
          <TextField
            {...register("taiKhoan")}
            className="text-field small-placeholder"
            type="text"
            placeholder="Tài khoản"
            label="Tài khoản"
            fullWidth
            variant="outlined"
          />
          <TextField
            {...register("matKhau")}
            className="text-field small-placeholder"
            type="password"
            placeholder="Mật khẩu"
            label="Mật khẩu"
            fullWidth
            variant="outlined"
          />
        </Stack>
        <Typography>
          <Link to="/">Quên mật khẩu?</Link>
        </Typography>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
