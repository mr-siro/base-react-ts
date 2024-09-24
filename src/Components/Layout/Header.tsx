import { Box, styled, Typography } from "@mui/material";
import React from "react";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useAppSelector } from "@src/App/Store";
import { styles } from "./styles";
import ExportQueueIcon from "../Icons/ExportQueueIcon";
import { AccountPopover } from "./AccountPopover";
import HomeIcon from "@mui/icons-material/Home";
import ShieldIcon from "@mui/icons-material/Shield";
import SettingsIcon from "@mui/icons-material/Settings";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Header = ({ title = "" }: { title: string }): React.ReactElement => {
  const { openDrawer, newNotify } = useAppSelector((state) => state.layout);
  const classes = styles.header;
  return (
    <AppBar position="fixed" open={openDrawer} sx={classes.wrapper}>
      <Box
        display={"flex"}
        alignItems={"center"}
        alignSelf={"flex-end"}
        width={"100%"}
      >
        <Box
          sx={classes.nameCont}
          display={"flex"}
          marginLeft={openDrawer ? "240px" : "60px"}
        >
          <Typography>{title}</Typography>
          {newNotify > 0 && (
            <Box component={"span"} ml={1.25}>
              {newNotify}
            </Box>
          )}
        </Box>

        <Box display={"flex"}>
          <Box sx={classes.stackCont} mr={1.75}>
            <ExportQueueIcon />
            <Typography>Xuất hàng chờ</Typography>
          </Box>

          <AccountPopover
            data={[
              {
                label: "Home",
                href: "/",
                icon: <HomeIcon width={22} />,
              },
              {
                label: "Profile",
                href: "#",
                icon: <ShieldIcon width={22} />,
              },
              {
                label: "Settings",
                href: "#",
                icon: <SettingsIcon width={22} />,
              },
            ]}
          />
        </Box>
      </Box>
    </AppBar>
  );
};
export default Header;
