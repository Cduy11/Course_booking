import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
interface DialogEnrollSuccessProps {
  isOpen: boolean;
  onClose: ()=> void;
}
const DialogEnrollSuccess: React.FC<DialogEnrollSuccessProps> = ({isOpen, onClose}) => {
  return (
    <div>
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
          Ghi danh thành công
        </DialogTitle>
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
    </div>
  );
};

export default DialogEnrollSuccess;
