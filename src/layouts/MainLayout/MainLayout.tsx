import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from "../../components/Header/Header";
import LoggedHeader from "../../components/LoggedHeader/LoggedHeader";
import Footer from "../../components/Footer/Footer";


interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const storedUser = localStorage.getItem("currentUser");
  const isUserLoggedIn = currentUser || storedUser !== null;

  return (
    <div>
      {isUserLoggedIn ? <LoggedHeader /> : <Header />}
      {children || <Outlet />}
      <Footer />
    </div>
  );
};

export default MainLayout;