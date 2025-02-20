import React from "react";
import { Avatar, Badge, Box, IconButton } from "@mui/material";
import { ChatBubbleOutline, NotificationsNone } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { setUser } from "../../redux/store";
const NotificationBar = () => {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {/* Message Icon with Badge */}
      <IconButton>
        <Badge color="#191919" variant="dot">
          <ChatBubbleOutline fontSize="medium" />
        </Badge>
      </IconButton>

      {/* Notification Bell with Badge */}
      <IconButton>
        <Badge color="warning" variant="dot">
          <NotificationsNone fontSize="medium" />
        </Badge>
      </IconButton>

      {/* Profile Picture with Circular Background */}
      <IconButton
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        <Avatar
          src={
            userInfo?.user_image_URL
              ? userInfo.user_image_URL
              : "https://via.placeholder.com/80"
          }
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/80";
          }}
          sx={{ bgcolor: "#FFCC99", width: 40, height: 40 }}
        />
      </IconButton>
    </Box>
  );
};

export default NotificationBar;
