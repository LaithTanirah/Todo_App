import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  IconButton,
} from "@mui/material";
import {
  ListAlt,
  CheckCircle,
  HourglassEmpty,
  Today,
  Add,
  Logout,
  Person,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ onOpenAdd = () => {} }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const collapsedWidth = 72;
  const expandedWidth = 240;

  const gradient =
    "radial-gradient(circle at 30% 30%, rgba(0, 0, 0, 1),  rgba(73, 73, 73, 1) 70%)";

  const navItems = [
    { to: "/dashboard", label: "All Todos", icon: <ListAlt />, end: true },
    { to: "/dashboard/completed", label: "Completed", icon: <CheckCircle /> },
    { to: "/dashboard/pending", label: "Pending", icon: <HourglassEmpty /> },
    { to: "/dashboard/today", label: "Today", icon: <Today /> },
  ];

  const activeStyles = {
    "&.active": {
      bgcolor: expanded ? "rgba(255,255,255,0.18)" : "action.selected",
      borderRadius: 1,
    },
  };

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch (e) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Box
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: expanded ? expandedWidth : collapsedWidth,
        transition: "width 220ms ease, background 220ms ease, color 220ms ease",
        bgcolor: expanded ? undefined : "background.paper",
        background: gradient,
        color: "white",
        borderRight: "1px solid",
        borderColor: "divider",
        zIndex: 1100,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: 1.5,
      }}
    >
      <Box>
        <Box
          sx={{
            px: 1.25,
            mb: 1,
            fontWeight: 700,
            whiteSpace: "nowrap",
            textAlign: expanded ? "left" : "center",
            opacity: expanded ? 1 : 0.9,
            fontSize: 20,
          }}
        >
          {expanded ? "My Todos" : "🗂️"}
        </Box>

        <List sx={{ py: 0 }}>
          {navItems.map(({ to, label, icon, end }) => (
            <Tooltip
              key={to}
              title={label}
              placement="right"
              disableHoverListener={expanded}
            >
              <ListItemButton
                component={NavLink}
                to={to}
                end={end}
                sx={{
                  px: 1.25,
                  mx: 1,
                  my: 0.5,
                  minHeight: 44,
                  color: "inherit",
                  ...activeStyles,
                  "&:hover": {
                    bgcolor: expanded
                      ? "rgba(255,255,255,0.12)"
                      : "action.hover",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  sx={{
                    opacity: expanded ? 1 : 0,
                    width: expanded ? "auto" : 0,
                    transition: "opacity 160ms ease, width 160ms ease",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    color: "inherit",
                  }}
                />
              </ListItemButton>
            </Tooltip>
          ))}

          <Tooltip
            title="Add Todo"
            placement="right"
            disableHoverListener={expanded}
          >
            <ListItemButton
              onClick={onOpenAdd}
              sx={{
                px: 1.25,
                mx: 1,
                my: 0.5,
                minHeight: 44,
                color: "inherit",
                "&:hover": {
                  bgcolor: expanded ? "rgba(255,255,255,0.12)" : "action.hover",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                <Add />
              </ListItemIcon>
              <ListItemText
                primary="Add Todo"
                sx={{
                  opacity: expanded ? 1 : 0,
                  width: expanded ? "auto" : 0,
                  transition: "opacity 160ms ease, width 160ms ease",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  color: "inherit",
                }}
              />
            </ListItemButton>
          </Tooltip>
        </List>
      </Box>

      <Box>
        <Divider sx={{ mb: 1, opacity: 0.4 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1,
            pb: 1,
            justifyContent: expanded ? "space-between" : "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <Person fontSize="small" />
            {expanded && <span style={{ fontSize: 14 }}>{user}</span>}
          </Box>
          <IconButton
            onClick={handleLogout}
            sx={{ color: "inherit", ml: expanded ? 1 : 0 }}
          >
            <Logout fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
