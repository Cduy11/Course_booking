import React from "react";
import "../../assets/css/admin.css";
import {
  Box,
  Button,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import PersonIcon from "@mui/icons-material/Person";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { Outlet, useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

interface MenuItemType {
  path: string;
  icon: React.ReactNode;
  label: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const menuItems: MenuItemType[] = [
    {
      path: PATH.ADMIN.USERS_MANAGEMENT,
      icon: <PersonIcon />,
      label: "Quản lý người dùng",
    },
    {
      path: PATH.ADMIN.COURSES_MANAGEMENT,
      icon: <HomeRepairServiceIcon />,
      label: "Quản lý khoá học",
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <Box className="container-fluid align-middle bg-all">
        <Box id="content" className="text-center align-middle">
          <nav className="align-middle" id="sidebar">
            <Button
              onClick={() => handleNavigate(PATH.HOME.ROOT)}
              id="button_sidebar"
              sx={{
                backgroundColor: "#f8f9fa",
                width: "50px",
                height: "40px",
                minWidth: "unset",
                marginTop: "1.5rem",
                borderRadius: "4px",
              }}
            >
              <HouseIcon id="icon" sx={{ color: "black" }} />
            </Button>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Button onClick={() => handleNavigate(item.path)}>
                    <Box>
                      {item.icon} {item.label}
                    </Box>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <Box className="details container-fluid text-center">
            <Outlet />
          </Box>
        </Box>
      </Box>
      {children}
    </div>
  );
};

export default AdminLayout;
