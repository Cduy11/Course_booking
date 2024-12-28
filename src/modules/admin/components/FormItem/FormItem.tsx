import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface FormItemProps {
  icon: React.ReactNode;
  placeholder?: string;
  isDropdown?: boolean;
}
const FormItem: React.FC<FormItemProps> = ({
  icon,
  placeholder,
  isDropdown,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ border: "1px solid #cacaca", borderRadius: "4px" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          backgroundColor: "#e8ecef",
          height: "40px",
          width: "40px",
          borderRight: "1px solid #cacaca",
        }}
      >
        {icon}
      </Box>
      {isDropdown ? (
        <Select
          value={selectedOption}
          onChange={handleChange}
          displayEmpty
          sx={{
            flex: 1,
            height: "40px",
            borderRadius: "0",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          {!selectedOption && (
            <MenuItem value="">
              <Typography color="#adadad">{placeholder}</Typography>
            </MenuItem>
          )}
          <MenuItem value="option1">Lập trình BackEnd-BackEnd</MenuItem>
          <MenuItem value="option2">Thiết kế Web-Design</MenuItem>
          <MenuItem value="option3">Lập trình di động-DiDong</MenuItem>
          <MenuItem value="option4">Lập trình FrontEnd-FrontEnd</MenuItem>
          <MenuItem value="option5">Lập trình FullStack-FullStack</MenuItem>
          <MenuItem value="option6">Tư duy lập trình-TuDuy</MenuItem>
        </Select>
      ) : (
        <TextField
          placeholder={placeholder}
          sx={{
            "& .MuiInputBase-root": {
              height: "40px",
              borderRadius: "0 4px 4px 0",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              display: "none",
            },
          }}
        />
      )}
    </Box>
  );
};

export default FormItem;
