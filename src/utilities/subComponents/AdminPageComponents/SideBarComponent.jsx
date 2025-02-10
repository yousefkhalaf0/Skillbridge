import React from "react";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Badge, ButtonBase } from "@mui/material";
import { MenuBook, People, BarChart, ChatBubble, Settings, ExitToApp } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import navLogo from "../../../assets/dashboard_assets/icons/dot_sidebar_icon.png"
const Sidebar = ({ navHeight, setSelectedSection, selectedSection }) => {
  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`);
    // Implement navigation logic (e.g., React Router or window.location)
  };
 
  const theme = useTheme();
  
  const navHeightWithmargin = navHeight + 16;
  console.log(`${navHeightWithmargin}px`);
  return (
    <Box sx={{ display: "flex", width: 160, borderRight: { lg: "1px solid white", }, borderBottom: { md: "1px solid white",  xs: "1px solid white", lg: "0px" }, p: 2, position: { lg: "absolute" }, top: { lg: `${navHeightWithmargin}px` }, flexDirection: { lg: "column", xs: "column" } }}>

      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box
      component="img"
      sx={{
        height: 24,
        width: 24,
        mr: 1 ,
        maxHeight: { xs: 200, md: 300 },
        maxWidth: { xs: 200, md: 300 },
      }}
      alt="Descriptive Alt Text"
      src={navLogo}
    />
        <Typography variant="h6" fontWeight="bold">Omni.</Typography>
      </Box>
      <Box  ><Typography variant="subtitle1" gutterBottom>Menu</Typography>
      <Box>
      <List sx={{display: "flex",flexDirection: { lg: "column", xs: "row" } }}>
        {[
          { text: "Courses", icon: <MenuBook />, section: "Courses" },
          { text: "Students", icon: <People />, section: "Students" },
        ].map((item, index) => (
          <ButtonBase key={index} sx={{ width: "100%", borderRadius: 2 }} onClick={() => setSelectedSection(item.section)}>
            <ListItem
              sx={{
                bgcolor: selectedSection === item.section ? "#E8A710" : "transparent",
                boxShadow:selectedSection === item.section ? 2:0,
                color: selectedSection === item.section ? "white" : "gray",
                borderRadius: 2,
              }}
            >
              <ListItemIcon sx={{ color: selectedSection === item.section ? "white" : "gray" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </ButtonBase>
        ))}
      </List>
      </Box>
    </Box>


      <Box/>
      <Box><Typography variant="subtitle1" gutterBottom>Account</Typography>
        <List  sx={{display: "flex",flexDirection: { lg: "column", xs: "row" } }}>
          {[
            { text: "Messages", icon: <Badge badgeContent={5} color="error" bgcolor="#E8A710"><ChatBubble /></Badge>, section: "Messages" },
            { text: "Settings", icon: <Settings />, section: "Settings" },
            { text: "Log out", icon: <ExitToApp />, section: "/logout" },
          ].map((item, index) => (
            <ButtonBase key={index} sx={{ width: "100%", borderRadius: 2 }} onClick={() => setSelectedSection(item.section)}>
            <ListItem
              sx={{
                bgcolor: selectedSection === item.section ? "#fcb900" : "transparent",
                color: selectedSection === item.section ? "white" : "gray",
                boxShadow:selectedSection === item.section ? 2:0,
                borderRadius: 3,
              }}
            >
              <ListItemIcon sx={{ color: selectedSection === item.section ? "white" : "gray" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </ButtonBase>
          ))}
        </List></Box>

    </Box>
  );
};

export default Sidebar;
