import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminWatchLaterCourses,
  removeWatchLaterCourse,
  fetchUserCourses,
} from "../../../utilities/firebase";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const WatchLater = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const watchLaterCourses = useSelector(
    (state) => state.adminWatchLaterReducer.watchLaterCourses
  );
  const loading = useSelector((state) => state.adminWatchLaterReducer.loading);
  console.log(watchLaterCourses);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      dispatch(fetchUserCourses("XiXJ0oesnkwweeAUscnq", true));
    });
    return () => unsubscribe();
  }, [dispatch]);
  useEffect(() => {
    if (!user) {
      dispatch(fetchAdminWatchLaterCourses("XiXJ0oesnkwweeAUscnq"));
    }
  }, [dispatch, user]);
  // Remove course from Firestore
  const handleRemove = async (courseId) => {
    if (user) {
      await dispatch(removeWatchLaterCourse(user.uid, courseId));
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <Box p={2} sx={{ borderRadius: 2, fontFamily: "inherit" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Watch Later
        </Typography>
        <Select
          defaultValue="week"
          size="small"
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: 3,
            textAlign: "center",
            paddingRight: "0px",
          }}
        >
          <MenuItem value="week" sx={{ pr: 0 }}>
            <Box display="flex" alignItems="center">
              Week{" "}
              <ExpandMoreIcon
                sx={{
                  color: "white",
                  ml: 1,
                  paddingRight: "0px",
                  width: "20px ",
                  marginRight: "0px",
                }}
                IconComponent={() => null}
              />
            </Box>
          </MenuItem>
          <MenuItem value="month" sx={{ pr: 0 }}>
            <Box display="flex" alignItems="center">
              Month{" "}
              <ExpandMoreIcon
                sx={{ color: "white", ml: 1 }}
                IconComponent={() => null}
              />
            </Box>
          </MenuItem>
        </Select>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : watchLaterCourses.length > 0 ? (
        watchLaterCourses.map((course, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              mb: 2,
              boxShadow: 1,
              borderRadius: 2,
            }}
          >
            <CardMedia
              component="img"
              image={course.course_images[0]}
              alt={course.course_name}
              sx={{ width: 60, height: 60, ml: 2, mb: 2, borderRadius: 1 }}
            />
            <CardContent sx={{ flexGrow: 1, pt: 3 }}>
              <Typography variant="body1" fontWeight="bold"></Typography>
              <Typography variant="body1" fontWeight="bold">
                {course.course_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(course.addingTime).toLocaleString("en-US", {
                  month: "long", // "December"
                  day: "2-digit", // "14"
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // 12-hour format with AM/PM
                })}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                display="flex"
                alignItems="center"
                onClick={() => handleCourseClick(course.id)}
                sx={{ cursor: "pointer", mt: 1 }}
              >
                Go to the course{" "}
                <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No courses in Watch Later.</Typography>
      )}
    </Box>
  );
};

export default WatchLater;
