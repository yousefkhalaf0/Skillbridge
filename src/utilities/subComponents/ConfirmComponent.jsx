import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const theme = useSelector((state) => state.themeReducer);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="200px">
      <DialogTitle sx={{ backgroundColor: "#D0D0D0", fontWeight: "bold" }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#D0D0D0", fontSize: "0.3rem" }}>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ height: "50px" }}>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: " #D0D0D0",
            color: "#2C2C2C",
            textTransform: "none",
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          sx={{
            backgroundColor: " #CA5541",
            color: "#FFFFFF",
            textTransform: "none",
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
