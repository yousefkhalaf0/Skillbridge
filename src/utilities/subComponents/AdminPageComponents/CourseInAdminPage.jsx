import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { useNavigate } from "react-router-dom";
import { checkIfAdmin } from "../../firebase";
import { db, getDoc, updateDoc } from "../../firebase";
import {
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import ConfirmationDialog from "../ConfirmComponent";

const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const auth = getAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'delete', 'remove', or 'edit'
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleEditClick = (courseId) => {
    navigate(`/editCourse/${courseId}`);
  };

  const handleRemoveCourse = async (courseId) => {
    try {
      if (isAdmin) {
        const courseRef = doc(db, "Courses", courseId);
        await deleteDoc(courseRef);

        setSnackbar({
          open: true,
          message: "Course deleted successfully!",
          severity: "success",
        });
      } else {
        const userRef = doc(db, "users", userId);
        const usrData = await getDoc(userRef);
        var userCourses = usrData.data().courses;
        const index = userCourses.indexOf(courseId);
        userCourses.splice(index, 1);

        await updateDoc(userRef, { courses: userCourses });

        setSnackbar({
          open: true,
          message: "Course removed successfully!",
          severity: "success",
        });
      }

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error deleting course: " + error.message,
        severity: "error",
      });
    }
  };

  const handleOpenDeleteDialog = (courseId, action) => {
    setSelectedCourseId(courseId);
    setActionType(action);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedCourseId(null);
    setActionType(null);
  };

  const handleConfirmDelete = () => {
    if (actionType === "delete" || actionType === "remove") {
      handleRemoveCourse(selectedCourseId);
    } else if (actionType === "edit") {
      handleEditClick(selectedCourseId);
    }
    handleCloseDeleteDialog();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);
        const adminStatus = await checkIfAdmin(user.uid);
        setIsAdmin(adminStatus);
      }
    });
    return () => unsubscribe();
  }, [dispatch, auth]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

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
                onClick={() => handleOpenDeleteDialog(course.id, "edit")}
              >
                {lang == "en" ? "Edit the course" : "تعديل الدورة"}
              </Button>
            )}
            {isAdmin ? (
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
                onClick={() => handleOpenDeleteDialog(course.id, "delete")}
              >
                {lang == "en" ? "Delete the course" : "حذف الدورة"}
              </Button>
            ) : (
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
                onClick={() => handleOpenDeleteDialog(course.id, "remove")}
              >
                {lang == "en" ? "Remove the course" : "إزالة الدورة"}
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        title={
          actionType === "delete"
            ? lang == "en"
              ? "Delete Course"
              : "حذف الدورة"
            : actionType === "remove"
            ? lang == "en"
              ? "Remove Course"
              : "إزالة الدورة"
            : lang == "en"
            ? "Edit Course"
            : "تعديل الدورة"
        }
        message={
          actionType === "delete"
            ? lang == "en"
              ? "Are you sure you want to delete this course?"
              : "هل أنت متأكد أنك تريد حذف هذه الدورة؟"
            : actionType === "remove"
            ? lang == "en"
              ? "Are you sure you want to remove this course from your list?"
              : "هل أنت متأكد أنك تريد إزالة هذه الدورة من قائمتك؟"
            : lang == "en"
            ? "Are you sure you want to edit this course?"
            : "هل أنت متأكد أنك تريد تعديل هذه الدورة؟"
        }
        confirmText={lang == "en" ? "Confirm" : "تأكيد"}
        cancelText={lang == "en" ? "Cancel" : "إلغاء"}
      />
    </Box>
  );
};

export default CourseCard;
