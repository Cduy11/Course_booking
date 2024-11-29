import { Button, Menu, MenuItem, Box } from "@mui/material";
import logo from "../../assets/logo.png";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PATH } from "../../routes/path";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/categotySlice";
import { AppDispatch } from "../../store";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [eventAnchorEl, setEventAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const eventOpen = Boolean(eventAnchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEventClick = (event: React.MouseEvent<HTMLElement>) => {
    setEventAnchorEl(event.currentTarget);
  };

  // lấy danh mục từ redux
  const dispatch: AppDispatch = useDispatch();
  const { categoryList, isLoading, error } = useSelector((state: RootState) => state.category) as {
    categoryList: { tenDanhMuc: string }[];
    isLoading: boolean;
    error: string | null;
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  return (
    <div className="header__layout">
      <div className="header__left">
        <div className="logo">
          <img src={logo} alt="Logo" />
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
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Danh Mục
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <Box className="menu-item-box">
              {isLoading ? (
                <MenuItem className="menu-item">Đang tải...</MenuItem>
              ) : error ? (
                <MenuItem className="menu-item">Lỗi: {error}</MenuItem>
              ) : (
                Array.isArray(categoryList) && categoryList.map((category, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => setAnchorEl(null)}
                    className="menu-item"
                  >
                    <span className="menu-item-text">{category.tenDanhMuc}</span>
                  </MenuItem>
                ))
              )}
            </Box>
          </Menu>
          <Button className="header__menu-button">Khóa học</Button>
          <Button className="header__menu-button">Blog</Button>
          <Button
            className="header__menu-button"
            id="event-button"
            aria-controls={eventOpen ? "event-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={eventOpen ? "true" : undefined}
            onClick={handleEventClick}
          >
            Sự kiện
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            id="event-menu"
            MenuListProps={{
              "aria-labelledby": "event-button",
            }}
            anchorEl={eventAnchorEl}
            open={eventOpen}
            onClose={() => setEventAnchorEl(null)}
          >
            <Box className="menu-item-box">
              <MenuItem onClick={() => setEventAnchorEl(null)} className="menu-item">
                <Link to={PATH.ERROR} className="menu-item-text">
                  Sự Kiện Cuối Năm
                </Link>
              </MenuItem>
              <MenuItem onClick={() => setEventAnchorEl(null)} className="menu-item">
                <Link to={PATH.ERROR} className="menu-item-text">
                  Sự kiện Giáng Sinh
                </Link>
              </MenuItem>
              <MenuItem onClick={() => setEventAnchorEl(null)} className="menu-item">
                <Link to={PATH.ERROR} className="menu-item-text">
                  Sự kiện Năm Mới
                </Link>
              </MenuItem>
            </Box>
          </Menu>
          <Button className="header__menu-button">Thông tin</Button>
        </div>
      </div>
      <div className="login">
        <button>ĐĂNG NHẬP</button>
      </div>
    </div>
  );
}
