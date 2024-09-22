import React from "react";
import { Grid, Box, styled, Typography, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface IModalTitle {
  title: string;
  handleClose: () => void;
  newStyles?: Record<string, any>;
  isHideCloseIcon?: boolean;
}
const classes = {
  dialogTitleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "7%",
    
  },
  dialogItemStyle: {
    display: "flex",
    maxWidth: "100%",
    position: 'absolute',
  },
  titleStyle: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#182026",
    lineHeight: "42px",
    display: "flex",
    alignItems: "center",
  },
  closeButton: {
    top: "0px",
    right: "0px",
    width: "65px",
    height: "65px",
    transform: "scale(0.48)",
    position: 'absolute',

    "&:hover": {
      transform: "scale(0.58)",
    },
    "&:before": {
      top: "6px",
      left: "27px",
      width: "10px",
      height: "50px",
      borderRadius: "4px",
    },
    "&:after": {
      top: "6px",
      left: "27px",
      width: "10px",
      height: "50px",
      borderRadius: "4px",
    },
  },
};

const CustomTypography = (props: any) => {
  const { children, ...other } = props;

  return (
    <Typography noWrap {...other}>
      {children}
    </Typography>
  );
};

const StyledTypography = styled(CustomTypography)(({ theme }) => ({
  fontWeight: "bold",
  textOverflow: "ellipsis",
  color: "#FFF",
  letterSpacing: "1px",
  whiteSpace: "pre-line",
  [theme.breakpoints.up("sm")]: {
    overflow: "hidden",
  },
  [theme.breakpoints.up("lg")]: {
    overflow: "visible",
  },
  [theme.breakpoints.down("xl")]: {
    fontSize: "1rem",
  },
}));

const ModalTitle = ({
  title,
  handleClose,
  newStyles,
  isHideCloseIcon,
}: IModalTitle) => {
  const handleCloseModal = () => {
    handleClose();
  };

  return (
    <Grid
      container
      sx={[classes.dialogTitleContainer, newStyles?.dialogTitleContainer ?? {}]}
    >
      <Grid
        item
        sx={[classes.dialogItemStyle, newStyles?.dialogItemStyle ?? {}]}
      >
        <StyledTypography
          sx={[classes.titleStyle, newStyles?.titleStyle ?? {}]}
        >
          {title}
        </StyledTypography>
      </Grid>
      <Grid item>
        {!isHideCloseIcon && (
          <IconButton
            aria-label="delete"
            size="large"
            sx={[classes.closeButton, newStyles?.closeButton]}
            onClick={handleCloseModal}
          >
            <CancelIcon
              sx={{
                width: "65px",
                height: "65px",
              }}
            />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default ModalTitle;
