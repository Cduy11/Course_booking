
interface MainLayoutProps {
    children: React.ReactNode;
}


const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
        MainLayout
        {children}

    </div>
  )
}

export default MainLayout