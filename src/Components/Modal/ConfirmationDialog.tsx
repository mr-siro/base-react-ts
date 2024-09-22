import React, { useRef } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
} from "@mui/material";

import ModalTitle from "./ModalTitle";
import { theme } from "@src/theme";

interface IConfirmationDialog extends DialogProps {
  open: boolean;
  newStyles?: Record<string, any>;
  title?: string;
  firstBtnText?: string;
  secondBtnText?: string;
  secondBtnDisabled?: boolean;
  secondBtnNotDisplay?: boolean;
  firstBtnNotDisplay?: boolean;
  firstBtnDisabled?: boolean;
  children: JSX.Element | JSX.Element[];
  disableOutSide?: boolean;
  isHideCloseIcon?: boolean;
  handleClose: () => void;
  firstBtnEvent?: () => void;
  secondBtnEvent?: () => void;
  secondBTnCustom?: React.ReactNode;
  secondBtnLoading?: boolean;
}

const classes = {
  dialogPaper: {
    padding: "48px 58px 70px",
    borderRadius: "10px",
    maxWidth: "765px",
    width: "100%",
  },
  modalTitle: {
    titleStyle: {
      fontSize: "20px",
    },
  },
  content: {},
  contentText: {
    whiteSpace: "pre",
    textAlign: "center",
    padding: "24px 0 10px 0",
  },
  buttonContainer: {
    justifyContent: "center",
    padding: "0",
    transform: "translateY(48px)",
  },
  button: {
    width: "200px",
    "&:first-child": {
      backgroundColor: theme.palette.grey[500],
    },
  },
};

const ConfirmationDialog = ({
  open,
  newStyles,
  title,
  firstBtnText = "Đóng",
  secondBtnText = "Xác nhận",
  secondBtnDisabled = false,
  secondBtnNotDisplay = false,
  children,
  disableOutSide = false,
  handleClose,
  firstBtnEvent,
  secondBtnEvent,
  firstBtnNotDisplay = false,
  firstBtnDisabled = false,
  isHideCloseIcon = false,
  secondBTnCustom,
  secondBtnLoading = false,
  ...props
}: IConfirmationDialog) => {
  const debounceTimeoutRef = useRef<number | null>(null);

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (!disableOutSide || reason !== "backdropClick") {
          handleClose();
        }
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: [classes.dialogPaper, newStyles?.dialogPaper ?? {}] }}
      {...props}
    >
      <ModalTitle
        title={title ?? ""}
        handleClose={handleClose}
        newStyles={{ ...classes.modalTitle, ...(newStyles?.modalTitle ?? {}) }}
        isHideCloseIcon={isHideCloseIcon}
      />
      <DialogContent sx={[classes.content, newStyles?.content ?? {}]}>
        {children}
      </DialogContent>
      <DialogActions
        sx={[classes.buttonContainer, newStyles?.buttonContainer ?? {}]}
      >
        {!firstBtnNotDisplay && (
          <Button
            variant="contained"
            sx={{
              ...classes.button,
              ...(newStyles?.button ?? {}),
              marginRight: "37px",
            }}
            disabled={firstBtnDisabled}
            onClick={firstBtnEvent}
          >
            {firstBtnText}
          </Button>
        )}
        {!secondBtnNotDisplay && (
          <>
            {secondBTnCustom ? (
              secondBTnCustom
            ) : (
              <Button
                variant="contained"
                sx={{
                  ...classes.button,
                  ...(newStyles?.button ?? {}),
                }}
                onClick={() => {
                  if (debounceTimeoutRef.current) {
                    clearTimeout(debounceTimeoutRef.current);
                  }
                  debounceTimeoutRef.current = window.setTimeout(() => {
                    if (secondBtnEvent) {
                      secondBtnEvent();
                    }
                  }, 500);
                }}
                disabled={secondBtnDisabled || secondBtnLoading}
              >
                {secondBtnLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  secondBtnText
                )}
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
