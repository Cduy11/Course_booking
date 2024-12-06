import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      {children || <Outlet />}
      <Footer />
    </div>
  );
};

export default MainLayout