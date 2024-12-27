import { Button, Menu, MenuItem, Box } from "@mui/material";
import logo from "../../assets/img/logo.png";
import "./Header.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../store/slices/categotySlice";
import { AppDispatch } from "../../store";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { fetchCatelog } from "../../store/slices/categotySlice";
import { useCategories } from "../../hooks/useCategories";
import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [eventAnchorEl, setEventAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { categoryList, isLoading, error } = useCategories();

  const handleEventClick = (event: React.MouseEvent<HTMLElement>) => {
    setEventAnchorEl(event.currentTarget);
  };

  const handleCloseEventMenu = () => {
    setEventAnchorEl(null);
  };

  const handleCategoryClick = (maDanhMuc: string) => {
    dispatch(fetchCatelog(maDanhMuc));
    setAnchorEl(null);
    navigate(PATH.HOME.CATALOG_COURSE + `/${maDanhMuc}`);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="header__layout">
      <div className="header__left">
        <div className="logo">
          <img src={logo} alt="Logo" onClick={() => navigate(PATH.HOME.ROOT)} />
        </div>
        <SearchBar />
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
          <Button
            className="header__menu-button"
            onClick={() => navigate(PATH.HOME.COURSE_PAGINATION)}
          >
            Khóa học
          </Button>
          <Button
            className="header__menu-button"
            onClick={() => navigate(PATH.HOME.BLOG_PAGE)}
          >
            Blog
          </Button>
          <Button className="header__menu-button" onClick={handleEventClick}>
            Sự kiện <KeyboardArrowDownIcon />
          </Button>
          <Menu
            anchorEl={eventAnchorEl}
            open={Boolean(eventAnchorEl)}
            onClose={handleCloseEventMenu}
          >
            <Box className="menu-item-box">
              <MenuItem className="menu-item" onClick={handleCloseEventMenu}>
                Sự kiện sale cuối năm
              </MenuItem>
              <MenuItem className="menu-item" onClick={handleCloseEventMenu}>
                Sự kiện cuối giáng sinh
              </MenuItem>
              <MenuItem className="menu-item" onClick={handleCloseEventMenu}>
                Sự kiện Tết
              </MenuItem>
            </Box>
          </Menu>
          <Button className="header__menu-button">Thông tin</Button>
        </div>
      </div>
      <div className="login">
        <Button
          onClick={() => navigate(PATH.AUTH.LOGIN)}
          className="login-button"
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}
