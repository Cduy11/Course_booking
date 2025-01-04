import React from "react";
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface FormItemProps {
  icon: React.ReactNode;
  placeholder?: string;
  isDropdown?: boolean;
  dropdownItems?: { content: string; value: string }[];
  control?: any;
  name: string;
  error?: string;
  defaultValue?: string;
  disabled?: boolean;
}

const FormItem: React.FC<FormItemProps> = ({
  icon,
  placeholder,
  isDropdown,
  dropdownItems,
  control,
  name,
  error,
  defaultValue = "",
  disabled,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      sx={{ width: "100%" }}
    >
      <Box
        display="flex"
        alignItems="center"
        sx={{ border: "1px solid #cacaca", borderRadius: "4px", width: "100%" }}
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
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
              <Select
                {...field}
                disabled={disabled}
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
                {!field.value && (
                  <MenuItem value="">
                    <Typography color="#adadad">{placeholder}</Typography>
                  </MenuItem>
                )}
                {dropdownItems?.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.content}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        ) : (
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={disabled}
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
          />
        )}
      </Box>
      {error && (
        <FormHelperText error sx={{ paddingLeft: "10px", paddingTop: "5px" }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
};

export default FormItem;
