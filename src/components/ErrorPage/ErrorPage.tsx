import { Link } from "react-router-dom";
import errorImg from "../../assets/errorimg.gif";
import "./ErrorPage.css";
import { PATH } from "../../routes/path";
import { Box, Button } from "@mui/material";
export default function ErrorPage() {
  return (
    <Box className="error-page">
      <h1 className="error-title">404</h1>
      <img className="error-img" src={errorImg} alt="404" />
      <p className="error-text">Có gì đó sai ở đây</p>
      <Button className="error-button">
        <Link to={PATH.HOME} className="error-button-link">Quay về trang chủ</Link>
      </Button>
    </Box>
  );
}
