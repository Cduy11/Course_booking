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
    
    if (response.meta.requestStatus === 'rejected') {
      return null;
    }

    const user = response.payload;
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      return user;
    }
    return null;
  };

  return { login };
};

export default useAuth;
