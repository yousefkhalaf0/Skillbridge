import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { useNavigate } from "react-router-dom";
import { checkIfAdmin } from "../../firebase";

const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const auth = getAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleEditClick = (courseId) => {
    navigate(`/editCourse/${courseId}`);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);
        const adminStatus = await checkIfAdmin(user.uid);
        setIsAdmin(adminStatus);
      } else {
        setUserId(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, [dispatch, auth]);

  return (
    <Box
      p={2}
      display="flex"
      justifyContent="center"
      alignItems="start"
      minHeight="30vh"
    >
      <Card
        className="Card"
        sx={{
          maxWidth: { lg: "100%", xs: 300, sm: 400 },
          width: "100%",
          borderRadius: 2,
          boxShadow: 3,
          p: { lg: 3, xs: 1, sm: 2 },
          overflow: "hidden",
          bgcolor: theme == "light" ? "#FFFFFF" : "#D0D0D0",
        }}
      >
        <CardMedia
          component="img"
          height="20"
          className="courseImage"
          image={course.course_images[1]}
          alt="Course image"
          sx={{
            height: { lg: 170, xs: 150, sm: 200 },
            borderRadius: 1,
          }}
        />
        <CardContent
          sx={{
            px: { lg: "0", sm: "3" },
            py: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              fontSize: {
                lg: "0.85rem",
                md: "0.85rem",
                xs: "0.85rem",
                sm: "0.85rem",
              },
              fontFamily: "inherit",
            }}
          >
            {lang == "en" ? course.course_name : course.course_nameAR}
          </Typography>
          <Box mt={4} display="flex" flexDirection="column" gap={1}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                bgcolor: theme == "light" ? "black" : "#1E1E1E",
                "&:hover": { bgcolor: "#333" },
                fontSize: { lg: "0.75rem", xs: "0.65rem", sm: "0.65rem" },
                fontWeight: "normal",
                textTransform: "none",
              }}
              onClick={() => handleCourseClick(course.id)}
            >
              {lang == "en" ? "Go to the course" : "انتقل إلى الدورة"}
            </Button>
            {isAdmin && (
              <Button
                variant="contained"
                color="black"
                fullWidth
                sx={{
                  bgcolor: theme == "light" ? "#D0D0D0" : "#fff",
                  "&:hover": { bgcolor: "#B8B8B8" },
                  fontSize: { lg: "0.75rem", xs: "0.65rem", sm: "0.65rem" },
                  textTransform: "none",
                }}
                onClick={() => handleEditClick(course.id)}
              >
                {lang == "en" ? "Edit the course" : "تعديل الدورة"}
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{
                bgcolor: theme == "light" ? "#CA5541" : "#922F1E",
                "&:hover": { bgcolor: "#B9361F" },
                fontSize: { lg: "0.75rem", xs: "0.65rem", sm: "0.65rem" },
                textTransform: "none",
              }}
            >
              {lang == "en" ? "Remove the course" : "إزالة الدورة"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;
