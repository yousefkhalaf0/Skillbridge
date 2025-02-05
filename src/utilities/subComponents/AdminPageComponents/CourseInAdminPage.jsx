import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import courseImage from '../../../assets/dashboard_assets/images/course_image.png';
import "./components_style/CourseInAdminPage.css";
import { useSelector } from 'react-redux';
const CourseCard = () => {
  const theme = useSelector((state) => state.themeReducer);
  return (
    <Box
      p={2}
      display="flex" justifyContent="center" alignItems="start" minHeight="100vh"
    >
      <Card
        className="Card"
        sx={{
          maxWidth: { lg: "80%", xs: 300, sm: 400 },
          width: '100%',
          borderRadius: 2,
          boxShadow: 3,
          p: { lg: 3, xs: 1, sm: 2 },
          overflow: "hidden",
          bgcolor:theme=="light"?"#FFFFFF":"#D0D0D0",
        }}
      >
        <CardMedia
          component="img"
          height="20"
          className="courseImage"
          image={courseImage}
          alt="Web Design Fundamentals"

          sx={{
            height: { lg: 170, xs: 150, sm: 200 },
            borderRadius: 1,

          }}
        />
        <CardContent 
        sx={{
          px:{lg:"0",sm:"3"},
          py:2
        }}
        
        
        >
          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { lg: '0.85rem',md:'0.85rem', xs: '0.85rem', sm: '0.85rem' }, fontFamily: "inherit" }}>
            Web Design Fundamentals
          </Typography>
          <Box mt={4} display="flex" flexDirection="column" gap={1}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                bgcolor: theme=="light"?"black":"#1E1E1E",
                '&:hover': { bgcolor: "#333" },
                fontSize: { lg: '0.75rem', xs: '0.65rem', sm: '0.65rem' },
               
                fontWeight:"normal",
                textTransform: "none"
              }}
            >
              Go to the course
            </Button>
            <Button
              variant="contained"
              color="black"
              fullWidth
              sx={{
                bgcolor: theme=="light"?"#D0D0D0":"#fff",
                '&:hover': { bgcolor: "#B8B8B8" },
                fontSize: { lg: '0.75rem', xs: '0.65rem', sm: '0.65rem'  },
            
                textTransform: "none"
              }}
            >
             edit the course
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{
                bgcolor: theme=="light"?"#CA5541":"#922F1E",
                '&:hover': { bgcolor: "#B9361F" },
                fontSize: { lg: '0.75rem', xs: '0.65rem', sm: '0.65rem'  },
           
                textTransform: "none"
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