import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      {children || <Outlet />}
    </div>
  );
};

export default MainLayout