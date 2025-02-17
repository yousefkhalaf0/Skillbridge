import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

const initialRequests = [
  {
    id: 1,
    name: "Maureen Nvidia",
    avatar: "https://via.placeholder.com/50",
    course: "React Development",
    courseAR: "تطوير React",
    status: "Pending",
    statusAR: "قيد الانتظار",
  },
  {
    id: 2,
    name: "Joan Gitari",
    avatar: "https://via.placeholder.com/50",
    course: "Node.js Backend",
    courseAR: "الخلفية Node.js",
    status: "Pending",
    statusAR: "قيد الانتظار",
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar: "https://via.placeholder.com/50",
    course: "Machine Learning",
    courseAR: "التعلم الآلي",
    status: "Pending",
    statusAR: "قيد الانتظار",
  },
];

const InboxRequests = () => {
  const lang = useSelector((state) => state.languageReducer);
  const [requests, setRequests] = useState(initialRequests);

  const handleDecision = (id, decision) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: decision } : req
      )
    );
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, bgcolor: "transparent" }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {requests.map((request) => (
            <ListItem
              key={request.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderBottom: "1px solid #ddd",
                pb: 2,
                mb: 2,
              }}
            >
              <ListItemAvatar>
                <Avatar src={request.avatar} alt={request.name} />
              </ListItemAvatar>
              <ListItemText
                primary={`${request.name} - ${
                  lang == "en" ? request.course : request.courseAR
                }`}
                secondary={`Status: ${
                  lang == "en" ? request.status : request.statusAR
                }`}
                sx={{ flex: 1 }}
              />
              {request.status === "Pending" && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleDecision(request.id, "Accepted")}
                  >
                    {lang == "en" ? "Accept" : "اقبل"}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDecision(request.id, "Declined")}
                  >
                    {lang == "en" ? "Decline" : "ارفض"}
                  </Button>
                </>
              )}
              {request.status !== "Pending" && (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: request.status === "Accepted" ? "green" : "red",
                  }}
                >
                  {lang == "en" ? request.status : request.statusAR}
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default InboxRequests;
