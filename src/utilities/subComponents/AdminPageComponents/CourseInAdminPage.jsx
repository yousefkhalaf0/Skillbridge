import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import courseImage from '../../../assets/dashboard_assets/images/course_image.png';
import "./CourseInAdminPage.css";
const CourseCard = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      p={2}
    >
      <Card 
        sx={{ 
          maxWidth: { xs: '100%', sm: 500 }, // Full width on extra small screens, max 500px on small and up
          width: '100%', // Ensure the card takes up the full width on xs screens
          borderRadius: 3, 
          boxShadow: 3,
          p: { xs: 1, sm: 2 } // Adjust padding based on screen size
        }}
      >
        <CardMedia
          component="img"
          height="20"
          className="courseImage"
          image={courseImage}
          alt="Web Design Fundamentals"
          
          sx={{
            height: { lg:170, xs: 150, sm: 200 },
            borderRadius:6
          
          }}
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontFamily:"inherit"}}>
            Web Design Fundamentals
          </Typography>
          <Box mt={2} display="flex" flexDirection="column" gap={1}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ 
                bgcolor: "black", 
                '&:hover': { bgcolor: "#333" },
                fontSize: { xs: '0.875rem', sm: '1rem' } // Adjust button font size based on screen size
              }}
            >
              Go to the course
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              fullWidth
              sx={{ 
                fontSize: { xs: '0.875rem', sm: '1rem' } // Adjust button font size based on screen size
              }}
            >
              Remove the course
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;