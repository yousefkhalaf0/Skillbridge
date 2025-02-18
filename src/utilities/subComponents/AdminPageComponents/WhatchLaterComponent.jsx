import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserCourses,
  checkIfAdmin,
  fetchAdminWatchLaterCourses,
  removeWatchLaterCourse,
  checkUserAuthorization,
} from "../../../utilities/firebase";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../ConfirmComponent"; // Import the ConfirmationDialog component

const WatchLater = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.languageReducer);
  const auth = getAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const watchLaterCourses = useSelector(
    (state) => state.adminWatchLaterReducer.watchLaterCourses
  );
  const loading = useSelector((state) => state.adminWatchLaterReducer.loading);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const uid = await checkUserAuthorization();
        setUserId(uid);

        const adminStatus = await checkIfAdmin(uid);
        console.log("User ID:", uid, "Is Admin:", adminStatus);
        setIsAdmin(adminStatus);

        dispatch(fetchUserCourses(uid, adminStatus));
      } catch (error) {
        console.error("Authorization error:", error);
        navigate("/signIn");
      }
    };

    initializeDashboard();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAdminWatchLaterCourses(userId, isAdmin));
    }
  }, [dispatch, userId, isAdmin]);

  const handleRemove = async (courseId) => {
    if (userId) {
      console.log("Deleting course with ID:", courseId);
      await dispatch(removeWatchLaterCourse(userId, courseId, isAdmin));
      dispatch(fetchAdminWatchLaterCourses(userId, isAdmin));
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleDeleteClick = (courseId) => {
    setCourseToDelete(courseId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (courseToDelete) {
      handleRemove(courseToDelete);
    }
    setDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCourseToDelete(null);
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
          {lang == "en" ? "Watch Later" : "شاهد لاحقا"}
        </Typography>
      </Box>

      {loading ? (
        <Typography>{lang == "en" ? "Loading..." : "...تحميل"}</Typography>
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
              position: "relative", // For positioning the delete icon
            }}
          >
            {/* Delete Icon */}
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "error.main",
              }}
              onClick={() => handleDeleteClick(course.id)}
            >
              <CloseIcon />
            </IconButton>

            <CardMedia
              component="img"
              image={course.course_images[0]}
              alt={lang == "en" ? course.course_name : course.course_nameAR}
              sx={{ width: 60, height: 60, ml: 2, mb: 2, borderRadius: 1 }}
            />
            <CardContent sx={{ flexGrow: 1, pt: 3 }}>
              <Typography variant="body1" fontWeight="bold"></Typography>
              <Typography variant="body1" fontWeight="bold">
                {lang == "en" ? course.course_name : course.course_nameAR}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(course.addingTime).toLocaleString(
                  lang == "en" ? "en-US" : "ar-EG",
                  {
                    month: "long", // "December"
                    day: "2-digit", // "14"
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // 12-hour format with AM/PM
                  }
                )}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                display="flex"
                alignItems="center"
                onClick={() => handleCourseClick(course.id)}
                sx={{ cursor: "pointer", mt: 1 }}
              >
                {lang == "en" ? "Go to the course" : "اذهب إلى الدورة"}{" "}
                <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>
          {lang == "en"
            ? "No courses in Watch Later."
            : "لا توجد دورات في شاهد لاحقًا."}
        </Typography>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        title={lang == "en" ? "Delete Course" : "حذف الدورة"}
        message={
          lang == "en"
            ? "Are you sure you want to remove this course from Watch Later?"
            : "هل أنت متأكد أنك تريد حذف هذه الدورة من قائمة المشاهدة لاحقًا؟"
        }
        confirmText={lang == "en" ? "Delete" : "حذف"}
        cancelText={lang == "en" ? "Cancel" : "إلغاء"}
      />
    </Box>
  );
};

export default WatchLater;
