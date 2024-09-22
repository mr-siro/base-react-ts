import React, { PropsWithChildren, ReactElement } from "react";
// material-ui
import { Box, CssBaseline } from "@mui/material";

interface LayoutProps {
  title?: string;
  subTitle?: string;
  icon?: string;
}

const PublicLayout: React.FC<PropsWithChildren<LayoutProps>> = ({
  title = "",
  subTitle = "",
  icon = "",
  children,
}): ReactElement => {
  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      sx={{ height: "100vh" }}
    >
      <CssBaseline />
      <Box component="main" flex={1}>
        {children}
      </Box>
    </Box>
  );
};

export default PublicLayout;
