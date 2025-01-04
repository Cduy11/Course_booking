import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

interface DialogErrorProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}
const DialogError: React.FC<DialogErrorProps> = ({
  isOpen,
  onClose,
  errorMessage,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="error-dialog-title"
    >
      <DialogTitle
        id="error-dialog-title"
        sx={{
          color: "#D32F2F",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorIcon sx={{ marginRight: "8px" }} />
        Lỗi
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogError;
