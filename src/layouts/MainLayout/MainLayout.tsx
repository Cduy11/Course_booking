import Header from "../../components/Header/Header";

interface MainLayoutProps {
    children: React.ReactNode;
}


const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
        <Header />
        {children}

    </div>
  )
}

export default MainLayout