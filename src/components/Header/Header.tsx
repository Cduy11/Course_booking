import { Button, Menu, MenuItem, Box } from "@mui/material";
import logo from "../../assets/logo.png";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/categotySlice";
import { AppDispatch } from "../../store";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { fetchCatelog } from "../../store/slices/categotySlice";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { categoryList, isLoading, error } = useSelector(
    (state: RootState) => state.category
  ) as {
    categoryList: { tenDanhMuc: string; maDanhMuc: string }[];
    isLoading: boolean;
    error: string | null;
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (maDanhMuc: string) => {
    dispatch(fetchCatelog(maDanhMuc));
    setAnchorEl(null);
    navigate(PATH.HOME.CATALOG_COURSE + `/${maDanhMuc}`);
  };

  return (
    <div className="header__layout">
      <div className="header__left">
        <div className="logo">
          <img
            src={logo}
            alt="Logo"
            onClick={() => navigate(PATH.HOME.ROOT)}
          />
        </div>
        <div className="search">
          <input type="text" placeholder="Tìm kiếm" />
          <Button className="search__button">
            <SearchIcon />
          </Button>
        </div>
      </div>
      <div className="header__right">
        <div className="header__menu">
          <Button
            className="header__menu-button"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            Danh Mục
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <Box className="menu-item-box">
              {isLoading ? (
                <MenuItem className="menu-item">Đang tải...</MenuItem>
              ) : error ? (
                <MenuItem className="menu-item">Lỗi: {error}</MenuItem>
              ) : (
                categoryList.map((category) => (
                  <MenuItem
                    key={category.maDanhMuc}
                    onClick={() => handleCategoryClick(category.maDanhMuc)}
                    className="menu-item"
                  >
                    {category.tenDanhMuc}
                  </MenuItem>
                ))
              )}
            </Box>
          </Menu>
          <Button className="header__menu-button" onClick={() => navigate(PATH.HOME.COURSE_PAGINATION)}>
            Khóa học
          </Button>
          <Button className="header__menu-button">Blog</Button>
          <Button className="header__menu-button">Thông tin</Button>
        </div>
      </div>
      <div className="login">
        <button>ĐĂNG NHẬP</button>
      </div>
    </div>
  );
}
