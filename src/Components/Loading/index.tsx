import React from "react";
// styles
import { Box, CircularProgress, CircularProgressProps } from "@mui/material";
const classes = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    WebkitTransform: "translateY(-50%) translateX(-50%)",
    outline: "none",
    zIndex: 2000,
  },
}

export const Loading = (props: CircularProgressProps): React.ReactElement => {
  const { ...rest } = props;
  return (
    <Box sx={classes.container} tabIndex={-1}>
      <CircularProgress {...rest} color="primary" size={100} />
    </Box>
  );
};