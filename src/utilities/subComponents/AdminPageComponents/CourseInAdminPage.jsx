import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

const CourseCard = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#E0E0E0">
      <Card sx={{ maxWidth: 500, borderRadius: 3, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image="https://source.unsplash.com/featured/?webdesign"
          alt="Web Design Fundamentals"
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Web Design Fundamentals
          </Typography>
          <Box mt={2} display="flex" flexDirection="column" gap={1}>
            <Button variant="contained" color="primary" fullWidth sx={{ bgcolor: "black", '&:hover': { bgcolor: "#333" } }}>
              Go to the course
            </Button>
            <Button variant="contained" color="error" fullWidth>
              Remove the course
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;
