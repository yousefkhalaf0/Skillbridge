import React from "react";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Badge, ButtonBase } from "@mui/material";
import { MenuBook, People, BarChart, ChatBubble, Settings, ExitToApp } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
const Sidebar = ({ navHeight }) => {
  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`);
    // Implement navigation logic (e.g., React Router or window.location)
  };
 
  const theme = useTheme();
  
  const navHeightWithmargin = navHeight + 16;
  console.log(`${navHeightWithmargin}px`);
  return (
    <Box sx={{ display: "flex", width: 160, borderRight: { lg: "1px solid white", }, borderBottom: { md: "1px solid white", sm: "1px solid white", xs: "1px solid white", lg: "0px" }, p: 2, position: { lg: "absolute" }, top: { lg: `${navHeightWithmargin}px` }, flexDirection: { lg: "column", md: "row" } }}>

      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box sx={{ width: 24, height: 24, bgcolor: "black", borderRadius: "50%", mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">Omni.</Typography>
      </Box>
      <Box><Typography variant="subtitle1" gutterBottom>Menu</Typography>
        <List >
          {[
            { text: "Courses", icon: <MenuBook sx={{ color: "white" }} />, path: "/courses", bg: "#fcb900", textColor: "white" },
            { text: "Students", icon: <People />, path: "/students" },

          ].map((item, index) => (
            <ButtonBase key={index} sx={{ width: "100%", borderRadius: 2 }} onClick={() => handleNavigation(item.path)}>
              <ListItem sx={{ bgcolor: item.bg || "transparent", color: item.textColor || "gray", borderRadius: 3 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </ButtonBase>
          ))}
        </List></Box>


      <Box sx={{ my: 2, borderBottom: "1px solid gray" }} />
      <Box><Typography variant="subtitle1" gutterBottom>Account</Typography>
        <List>
          {[
            { text: "Messages", icon: <Badge badgeContent={5} color="error"><ChatBubble /></Badge>, path: "/messages" },
            { text: "Settings", icon: <Settings />, path: "/settings" },
            { text: "Log out", icon: <ExitToApp />, path: "/logout" },
          ].map((item, index) => (
            <ButtonBase key={index} sx={{ width: "100%", borderRadius: 1 }} onClick={() => handleNavigation(item.path)}>
              <ListItem sx={{ color: "gray", borderRadius: 1 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </ButtonBase>
          ))}
        </List></Box>

    </Box>
  );
};

export default Sidebar;
