import React, { useState } from "react";
import { Box, Typography, TextField, Button, Switch, FormControlLabel, Paper } from "@mui/material";

const Settings = () => {
  const [profile, setProfile] = useState({
    username: "AdminUser",
    email: "admin@example.com",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
        Settings
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Profile Section */}
        <Typography variant="h6" sx={{ mb: 1 }}>Profile</Typography>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={profile.username}
          onChange={handleProfileChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>

        {/* Preferences */}
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Preferences</Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
          label="Dark Mode"
        />
        <FormControlLabel
          control={<Switch checked={notifications} onChange={() => setNotifications(!notifications)} />}
          label="Enable Notifications"
        />
      </Paper>
    </Box>
  );
};

export default Settings;
