import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

const Settings = () => {
  const lang = useSelector((state) => state.languageReducer);

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
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
      >
        {lang == "en" ? "Settings" : "الإعدادات"}
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Profile Section */}
        <Typography variant="h6" sx={{ mb: 1 }}>
          {lang == "en" ? "Profile" : "الحساب الشخصي"}
        </Typography>
        <TextField
          fullWidth
          label={lang == "en" ? "Username" : "اسم المستخدم"}
          name="username"
          value={profile.username}
          onChange={handleProfileChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label={lang == "en" ? "Email" : "البريد الإلكتروني"}
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" fullWidth>
          {lang == "en" ? "Save Changes" : "حفظ التغييرات"}
        </Button>

        {/* Preferences */}
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          {lang == "en" ? "Preferences" : "التفضيلات"}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          }
          label={lang == "en" ? "Dark Mode" : "الوضع المظلم"}
        />
        <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          }
          label={lang == "en" ? "Enable Notifications" : "تفعيل الإشعارات"}
        />
      </Paper>
    </Box>
  );
};

export default Settings;
