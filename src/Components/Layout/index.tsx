import React, { PropsWithChildren, ReactElement } from "react";
// components
import Header from "./Header";
// material-ui
import { Box, CssBaseline, Typography } from "@mui/material";

import AppDrawer from "./Drawer";
import { theme } from "@src/theme";

interface LayoutProps {
  title?: string;
  subTitle?: string;
  icon?: string;
}

const classes = {
  wrapper: {
    width: '100%',
    margin: '0 auto',
    padding: '2rem',
    background: '#F5F7FB',
    height: '100vh',
    overflowY: 'auto',
  }
}
const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  title = "",
  subTitle = "",
  icon = "",
  children,
}): ReactElement => {
  return (
    <Box display={"flex"} sx={classes.wrapper}>
      <CssBaseline />
      <Header title={title} />
      <AppDrawer />
      <Box component="main" flex={1} mt={4}>
        {subTitle && (
          <Typography
            color={theme.palette.text.secondary}
            fontSize={20}
            fontWeight={600}
            textAlign={"left"}
            my={1.75}
          >
            {subTitle}
          </Typography>
        )}
        <>{children}</>
      </Box>
    </Box>
  );
};

export default Layout;
