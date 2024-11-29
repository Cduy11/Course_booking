import React from "react"

interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({children}) => {
  return (
    <div>
        AdminLayout
        {children}
    </div>
  )
}

export default AdminLayout