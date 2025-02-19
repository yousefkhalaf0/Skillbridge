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
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  onSnapshot,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "../../../utilities/firebase";
import { Delete } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../ConfirmComponent"; // Import the ConfirmationDialog component
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
const WatchLater = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.languageReducer);
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [watchLaterCourses, setWatchLaterCourses] = useState([]);
  const theme = useSelector((state) => state.themeReducer);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);

        // Check if the user is an admin
        const adminRef = doc(db, "admins", user.uid);
        getDoc(adminRef).then((adminSnap) => {
          setIsAdmin(adminSnap.exists());
          fetchWatchLaterCourses(user.uid, adminSnap.exists());
        });
      } else {
        navigate("/signIn");
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [auth, navigate]);

  // Fetch Watch Later courses from Firestore
  const fetchWatchLaterCourses = async (userId, isAdmin) => {
    try {
      setLoading(true);

      const watchLaterRef = isAdmin
        ? collection(db, "admins", userId, "watchLaterList")
        : collection(db, "users", userId, "watchLaterList");

      const snapshot = await getDocs(watchLaterRef);
      const watchLaterData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch course details for each item in the Watch Later list
      const courses = await Promise.all(
        watchLaterData.map(async (item) => {
          const courseRef = doc(db, "Courses", item.courseId);
          const courseSnap = await getDoc(courseRef);
          if (courseSnap.exists()) {
            return {
              id: item.courseId,
              addingTime: item.timestamp?.toDate?.() || new Date(),
              ...courseSnap.data(),
            };
          }
          return null;
        })
      );

      const validCourses = courses.filter((course) => course !== null);
      setWatchLaterCourses(validCourses);
    } catch (error) {
      console.error("Error fetching Watch Later courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a course from the Watch Later list
  const handleRemove = async (courseId) => {
    if (userId) {
      try {
        const watchLaterRef = isAdmin
          ? doc(db, "admins", userId, "watchLaterList", courseId)
          : doc(db, "users", userId, "watchLaterList", courseId);

        await deleteDoc(watchLaterRef);
        console.log("Course deleted from Watch Later:", courseId);

        // Refresh the Watch Later list
        fetchWatchLaterCourses(userId, isAdmin);
      } catch (error) {
        console.error("Error removing course:", error);
      }
    }
  };

  // Handle course click
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // Handle delete icon click
  const handleDeleteClick = (courseId) => {
    setCourseToDelete(courseId);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (courseToDelete) {
      handleRemove(courseToDelete);
    }
    setDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  // Close the delete confirmation dialog
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
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: theme == "light" ? "black" : "white" }}
        >
          {lang == "en" ? "Watch Later" : "شاهد لاحقا"}
        </Typography>
      </Box>

      {loading ? (
        <Typography sx={{ color: theme == "light" ? "black" : "white" }}>
          {lang == "en" ? "Loading..." : "...تحميل"}
        </Typography>
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
              bgcolor: theme == "light" ? "#FFFFFF" : "#D0D0D0",
              borderRadius: 2,
              position: "relative", // For positioning the delete icon
            }}
          >
            {/* Delete Icon */}

            <IconButton
              onClick={() => handleDeleteClick(course.id)}
              sx={{
                color: "#E8A710",
                position: "absolute",
                top: 8,
                right: 8,
                color: "error.main",
              }}
            >
              <Delete />
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
                sx={{
                  cursor: "pointer",
                  mt: 1,
                  color: theme == "light" ? "#E8A710" : "#0A0A0A",
                }}
              >
                {lang == "en" ? "Go to the course" : "اذهب إلى الدورة"}{" "}
                <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography sx={{ color: theme == "light" ? "black" : "gray" }}>
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
