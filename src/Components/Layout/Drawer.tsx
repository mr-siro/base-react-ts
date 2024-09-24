import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { DRAWER_WIDTH } from "@src/Common/Constants";
import { useAppDispatch, useAppSelector } from "@src/App/Store";
import { setOpenDrawer } from "@src/App/Features/Layout";
import { styles } from "./styles";
import { config } from "@src/Config";
import { Link } from "@mui/material";
import ChartIcon from "../Icons/ChartIcon";
import SettingIcon from "../Icons/SettingIcon";
import CalendarIcon from "../Icons/CalendarIcon";
import BillingIcon from "../Icons/BillingIcon";
import { useLocation } from "react-router-dom";
import { theme } from "@src/theme";

const openedMixin = (theme: any) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  transitionDelay: `0.2s`,
  overflowX: "hidden",
  ".MuiListItemIcon-root": {},
  ".MuiListItemText-root ": {
    opacity: 1,
    transitionDelay: `0.2s`,
  },
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  ".MuiListItemIcon-root": {},
  ".MuiListItemText-root ": {
    opacity: 0,
  },
});

const DrawerWrapper = styled(Box)(({ theme }) => ({}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, hover }: any) => ({
  width: DRAWER_WIDTH,
  height: `100%`,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
    ".toggle-button": {
      opacity: 1,
      transitionDelay: `0.2s`,
    },
    "+ .toggle-button": {
      opacity: 0,
      "&:not([open]):active": {
        pointerEvents: `none`,
      },
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
    ".toggle-button": { opacity: 0 },
    "+ .toggle-button": { opacity: 1 },
    "&:hover ": {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
      ".toggle-button": {
        opacity: 1,
        left: DRAWER_WIDTH,
        transitionDelay: `0.2s`,
        svg: {
          transform: `rotate(180deg)`,
        },
      },
      "+ .toggle-button": {
        opacity: 0,
      },
    },
  }),
}));

export default function AppDrawer() {
  const { openDrawer } = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();
  const classes = styles.drawer;
  const location = useLocation();

  const handleToggle = (status: boolean) => {
    dispatch(setOpenDrawer(status));
  };

  const menus = [
    {
      icon: <ChartIcon active={location.pathname === "/thong-ke"} />,
      name: "Thống kê",
      link: "/thong-ke",
    },
    {
      icon: <SettingIcon active={location.pathname === "/setting"} />,
      name: "Cài đặt",
      link: "/setting",
    },
    {
      icon: <CalendarIcon active={location.pathname === "/booking"} />,
      name: "Đặt lịch",
      link: "/booking",
    },
    {
      icon: (
        <BillingIcon fill="#FFFFFF" active={location.pathname === "/billing"} />
      ),
      name: "Viện phí",
      link: "/billing",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <DrawerWrapper>
        <Drawer
          sx={{
            "& > div": {
              background: "#2B3076",
            },
          }}
          variant="permanent"
          open={openDrawer}
          onMouseEnter={() => handleToggle(true)}
          onMouseLeave={() => handleToggle(false)}
          PaperProps={{
            sx: {
              width: openDrawer ? 240 : 60,
              transition: 'width 0.2s',
              position: 'absolute',
              left: 0,
              zIndex: 99999,
              overflowX: 'hidden',
            },
          }}
        >
          <Box
            mt={3}
            sx={{ cursor: "pointer" }}
            display={"flex"}
            justifyContent={"center"}
          >
            <Link href="/">
              <img
                src={`${config.publicUrl}/Images/app-logo.png`}
                alt="app-logo"
              />
            </Link>
          </Box>
          <List>
            {menus.map((menu) => (
              <ListItem
                key={menu.link}
                disablePadding
                sx={{ display: "block" }}
              >
                <Link href={menu.link}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: "center",
                      px: 2.5,
                      backgroundColor:
                        location.pathname === menu.link
                          ? theme.palette.primary.main
                          : "transparent",
                    }}
                  >
                    <ListItemIcon sx={classes.icon}>{menu.icon}</ListItemIcon>
                    <ListItemText
                      primary={menu.name}
                      sx={[classes.itemText(location.pathname === menu.link)]}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </DrawerWrapper>
    </Box>
  );
}
