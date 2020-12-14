import React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

type Props = {
  open: boolean;
  onClose?: () => void;
  onAgree?: () => void;
  title?: string;
  content?: string;
  refuseButtonTitle?: string;
  agreeButtonTitle?: string;
};

const Dialog: React.FC<Props> = ({
  open,
  title,
  content,
  refuseButtonTitle,
  agreeButtonTitle,
  onClose,
  onAgree,
}) => {
  return (
    <MuiDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {refuseButtonTitle}
        </Button>
        <Button onClick={onAgree} color="primary" autoFocus>
          {agreeButtonTitle}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
