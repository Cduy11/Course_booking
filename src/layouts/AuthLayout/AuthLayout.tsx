import React from 'react'

interface AuthLayoutProps{
    children: React.ReactNode
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return <div>
    AuthLayout
    {children}
  </div>;
}

export default AuthLayout