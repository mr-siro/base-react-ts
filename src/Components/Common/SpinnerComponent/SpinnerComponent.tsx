import React, { PropsWithChildren } from "react";
import { CircularProgress, Box } from "@mui/material";

export interface SpinnerProps {
  isLoading: boolean;
}

export default function SpinnerComponent(
  props: PropsWithChildren<SpinnerProps>
): JSX.Element {
  const { isLoading } = props;
  return (
    <div className={`spinner-component ${isLoading ? "" : "visually-hidden"}`}>
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 99999,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(0.2rem)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            size={44}
            color="success"
            sx={{
              width: "3rem",
              height: "3rem",
              zIndex: 1003,
              borderWidth: "4px",
            }}
          />
        </Box>
      )}
      {!isLoading && props.children}
    </div>
  );
}
