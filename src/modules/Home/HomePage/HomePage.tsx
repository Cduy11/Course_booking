import { Box } from "@mui/material";
import SliderComponent from "./SliderComponent/SliderComponent";
import "./HomePage.css";

export default function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }} className="home-page">
     <SliderComponent />
    </Box>
  );
}
