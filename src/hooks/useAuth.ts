import { useDispatch } from "react-redux";
import { loginApi } from "../store/slices/authSlice";
import { AppDispatch } from "../store";

interface LoginFormData {
  taiKhoan: string;
  matKhau: string;
}

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const login = async (data: LoginFormData) => {
    const response = await dispatch(loginApi(data));
    const user = response.payload;

    if (response.error) {
      console.error("Đăng nhập không thành công:", response.error.message);
      return null;
    }

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      return user;
    } else {
      return null;
    }
  };

  return { login };
};

export default useAuth;
