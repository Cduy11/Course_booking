import { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

export default function Auth() {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`auth-container ${isActive ? "auth-active" : ""}`} id="container">
      <Register onToggle={toggleActive} />
      <Login onToggle={toggleActive} />
      <div className="auth-toggle-container">
        <div className="auth-toggle">
          <div className="auth-toggle-panel auth-toggle-left">
            <h1>Chào mừng bạn đã trở lại!</h1>
            <p>Vui lòng đăng nhập để kết nối với tài khoản của bạn</p>
            <button className="auth-hidden" onClick={toggleActive}>
              Đăng Nhập
            </button>
          </div>
          <div className="auth-toggle-panel auth-toggle-right">
            <h1>Xin chào!</h1>
            <p>
              Vui lòng nhấn đăng ký để thiết lập thông tin tài khoản của bạn!
            </p>
            <button className="auth-hidden" onClick={toggleActive}>
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}