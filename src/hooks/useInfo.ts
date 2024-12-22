import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfoUserApi } from "../store/slices/infoSlice";
import { RootState } from "../store";
import { AppDispatch } from "../store";

export const useFetchUserInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Lấy dữ liệu từ state
  const { inforUser } = useSelector((state: RootState) => state.inforUser);

  // Gọi API khi hook được sử dụng
  useEffect(() => {
    dispatch(fetchInfoUserApi());
  }, []);

  return { inforUser };
};
