import ErrorIcon from "@mui/icons-material/Error";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface DialogDeleteProps {
  open: boolean;
  handleClose: () => void;
  message: string;
  isPending: boolean | undefined;
  handleDelete: () => void;
}
const DialogDelete: React.FC<DialogDeleteProps> = ({
  open,
  handleClose,
  message,
  isPending,
  handleDelete,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#fff",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#D32F2F",
        }}
      >
        <ErrorIcon
          sx={{ marginRight: "8px", fontSize: "24px", color: "#D32F2F" }}
        />
        Xoá {message} này?
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{
            fontSize: "16px",
            textAlign: "center",
            color: "#333",
            padding: "10px 0",
          }}
        >
          Bạn có chắc chắn muốn xoá {message} này? Việc này sẽ không thể khôi
          phục lại!
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "space-between",
          padding: "15px 20px",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          disabled={isPending}
          onClick={handleClose}
          sx={{
            width: "48%",
            fontWeight: "bold",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#f2f2f2",
            },
          }}
        >
          Hủy
        </Button>
        <LoadingButton
          loading={isPending}
          variant="contained"
          color="error"
          disabled={isPending}
          onClick={handleDelete}
          sx={{
            width: "48%",
            fontWeight: "bold",
            borderRadius: "8px",
            backgroundColor: "#D32F2F",
            "&:hover": {
              backgroundColor: "#C2185B",
            },
          }}
        >
          Xoá
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDelete;
