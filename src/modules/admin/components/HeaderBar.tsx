import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";

interface HeaderBarProps {
  buttonLabel: string;
  searchPlaceholder: string;
  onSearch: (query: string) => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  buttonLabel,
  searchPlaceholder,
  onSearch,
}) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onSearch(searchText.trim());
    }
  };

  const handleSearchClick = () => {
    onSearch(searchText.trim());
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const isSmallScreen = useMediaQuery("(max-width:1024px)");

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarAnchorEl(event.currentTarget);
  };
  const handleAvatarMenuClose = () => {
    setAvatarAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "20px 25px",
        justifyContent: "space-between",
      }}
    >
      {isSmallScreen && (
        <Button
          onClick={handleMenuClick}
          sx={{
            backgroundColor: "#f8f9fb",
            color: "black",
            padding: "6px 10px",
            fontSize: "16px",
            marginRight: "10px",
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
            height: "40px",
          }}
        >
          <MenuIcon
            sx={{ marginRight: "5px", height: "24px", width: "24px" }}
          />
        </Button>
      )}
      <Button
        style={{
          color: "white",
          backgroundColor: "#41b294",
          textTransform: "none",
          padding: "0.25rem .5rem",
          fontSize: "16px",
          height: "40px",
        }}
      >
        {buttonLabel}
      </Button>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <TextField
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          placeholder={searchPlaceholder}
          variant="outlined"
          size="small"
          sx={{
            width: "60%",
            maxWidth: "600px",
            "& .MuiOutlinedInput-root": {
              height: "40px",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginLeft: "8px",
            backgroundColor: "#41b294",
            color: "white",
            height: "40px",
            minWidth: "40px",
          }}
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", marginRight: "5px" }}
        >
          Chào,
        </Typography>
        <Avatar
          alt="User Avatar"
          src="https://cdn.dribbble.com/users/2364329/screenshots/6676961/02.jpg?compress=1&resize=800x600"
          sx={{ width: 40, height: 40, cursor: "pointer" }}
          onClick={handleAvatarClick}
        />
      </Box>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleNavigate(PATH.ADMIN.USERS_MANAGEMENT)}>
          Quản lý người dùng
        </MenuItem>
        <MenuItem onClick={() => handleNavigate(PATH.ADMIN.COURSES_MANAGEMENT)}>
          Quản lý khoá học
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={avatarAnchorEl}
        open={Boolean(avatarAnchorEl)}
        onClose={handleAvatarMenuClose}
      >
        <MenuItem onClick={() => {}}>Cập nhật thông tin</MenuItem>
        <MenuItem onClick={() => {}}>Đăng xuất</MenuItem>
      </Menu>
    </Box>
  );
};

export default HeaderBar;
