import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React from "react";
interface DialogSuccessProps {
  message: string;
  isOpen: boolean;
  onClose: ()=> void;
}
const DialogSuccess: React.FC<DialogSuccessProps> = ({ message, isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="success-dialog-title"
    >
      <DialogTitle
        id="success-dialog-title"
        sx={{
          color: "#388E3C",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckCircleIcon sx={{ marginRight: "8px" }} />
        Xoá thành công
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          {message} 
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          autoFocus
          sx={{
            textTransform: "none",
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSuccess;
