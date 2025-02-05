import React from "react";
import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Badge } from "@mui/material";
import { MenuBook, People, BarChart, ChatBubble, Settings, ExitToApp, Visibility } from "@mui/icons-material";

const Sidebar = () => {
  return (
    <Box sx={{ width: 160, borderRight: "1px solid white", p: 2, position:{lg:"absolute"} ,top:{lg:"20.4vh"}}}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box sx={{ width: 24, height: 24, bgcolor: "black", borderRadius: "50%", mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">Omni.</Typography>
      </Box>
      
      <Typography variant="subtitle1" gutterBottom>Menu</Typography>
      <List>
        <ListItem sx={{ bgcolor: "#fcb900", borderRadius: 1 }}>
          <ListItemIcon><MenuBook sx={{ color: "white" }} /></ListItemIcon>
          <ListItemText primary="Courses" sx={{ color: "white" }} />
        </ListItem>
        <ListItem sx={{ color: "gray" }}>
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem sx={{ color: "gray" }}>
          <ListItemIcon><BarChart /></ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItem>
      </List>
      
      <Box sx={{ my: 2, borderBottom: "1px solid gray" }} />
      <Typography variant="subtitle1" gutterBottom>Account</Typography>
      <List>
        <ListItem sx={{ color: "gray" }}>
          <ListItemIcon>
            <Badge badgeContent={5} color="error">
              <ChatBubble />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
        <ListItem sx={{ color: "gray" }}>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem sx={{ color: "gray" }}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;


