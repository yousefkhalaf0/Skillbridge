import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Grid, Typography } from "../../muiComponents.js";
import "./componentsStyle/heroComponent.css";
import en from "../../localization/en.js";
import ar from "../../localization/ar.js";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { auth, db } from "../../firebase.js";
import { Snackbar, Alert } from "@mui/material";
export default function HeroComponent({ course }) {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const [isEnrolled, setIsEnrolled] = useState(false); // Track enrollment status
  const [loading, setLoading] = useState(false); // Track loading state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Check if the user is enrolled in the course
  useEffect(() => {
    const checkEnrollment = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setIsEnrolled(userData.courses?.includes(course.id)); // Update enrollment status
        }
      }
    };
    checkEnrollment();
  }, [course.id]);

  // Handle enrollment
  const handleEnroll = async () => {
    const user = auth.currentUser;
    if (!user) {
      setSnackbar({
        open: true,
        message:
          lang === "en"
            ? "You must be logged in to enroll!"
            : "يجب تسجيل الدخول للتسجيل!",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      // Step 1: Add the course to the user's document
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        courses: arrayUnion(course.id), // Add course ID to the array
      });

      // Step 2: Add the user's ID to the admin's students array
      const adminRef = doc(db, "admins", course.course_creator_id);
      await updateDoc(adminRef, {
        students: arrayUnion(user.uid), // Add user ID to the admin's students array
      });

      setIsEnrolled(true); // Update enrollment status
      setSnackbar({
        open: true,
        message: lang === "en" ? "Enrolled successfully!" : "تم التسجيل بنجاح!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error enrolling:", error);
      setSnackbar({
        open: true,
        message:
          lang === "en"
            ? "Failed to enroll. Try again."
            : "فشل التسجيل. يرجى المحاولة مرة أخرى.",
        severity: "error",
      });
    }
    setLoading(false);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (!course) {
    return (
      <Grid className="largeHeroComponentContainer" container spacing={2}>
        <Grid item md={12}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {lang == "en"
              ? en.courseOpenPageHero.noCourseData
              : ar.courseOpenPageHero.noCourseData}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid className={`largeHeroComponentContainer`} container spacing={2}>
      <Grid item md={5}>
        <Typography
          variant="h4"
          sx={{
            color: theme === "dark" ? "white" : "#262626",
            fontWeight: "bold",
          }}
        >
          {lang == "en" ? course.course_name : course.course_nameAR}
        </Typography>

        <Button
          className={`${theme}EnrollBtn`}
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleEnroll}
          disabled={isEnrolled || loading} // Disable button if enrolled or loading
        >
          {isEnrolled
            ? lang === "en"
              ? "Enrolled"
              : "تم التسجيل"
            : loading
            ? lang === "en"
              ? "Enrolling..."
              : "جاري التسجيل..."
            : lang === "en"
            ? en.courseOpenPageHero.enrollButton
            : ar.courseOpenPageHero.enrollButton}
        </Button>
      </Grid>

      <Grid item md={7}>
        <Typography
          variant="body2"
          sx={{
            color: theme === "dark" ? "#CFCFD0 " : "#5B5B5C",
          }}
        >
          {lang == "en"
            ? course.course_description
            : course.course_descriptionAR}
        </Typography>
      </Grid>

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
    </Grid>
  );
}
