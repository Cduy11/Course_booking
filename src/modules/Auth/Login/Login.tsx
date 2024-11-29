import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
interface RegisterProps {
  onToggle: () => void;
}

//định nghĩa kiểu dữ liệu cho form
interface FormData {
  taiKhoan: string;
  matKhau: string;
}

const Login: React.FC<RegisterProps> = () => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div className="auth-form-container auth-sign-in">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Đăng nhập</h1>
        <Stack spacing={3} width="100%">
          <TextField
            {...register("taiKhoan")}
            className="text-field"
            type="text"
            placeholder="Tài khoản"
            label="Tài khoản"
            fullWidth
          />
          <TextField
            {...register("matKhau")}
            className="text-field "
            type="password"
            placeholder="Mật khẩu"
            label="Mật khẩu"
            fullWidth
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
