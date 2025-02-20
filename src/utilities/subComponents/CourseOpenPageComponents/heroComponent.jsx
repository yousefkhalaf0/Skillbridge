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
  collection,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { auth, db, checkIfAdmin } from "../../firebase.js";
import { Snackbar, Alert } from "@mui/material";

export default function HeroComponent({ course }) {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [watchLaterStatus, setWatchLaterStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [isUser, setUser] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const checkWatchLaterStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const isAdmin = await checkIfAdmin(user.uid);
        isAdmin ? setUser(false) : setUser(true);
        const userRef = isAdmin
          ? doc(db, "admins", user.uid)
          : doc(db, "users", user.uid);
        const watchLaterRef = collection(userRef, "watchLaterList");
        const courseDocRef = doc(watchLaterRef, course.id);
        const courseDoc = await getDoc(courseDocRef);

        if (courseDoc.exists()) {
          setWatchLaterStatus((prev) => ({ ...prev, [course.id]: true }));
        }
      }
    };

    checkWatchLaterStatus();
  }, [course.id, isUser]);

  useEffect(() => {
    const checkEnrollment = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setIsEnrolled(userData.courses?.includes(course.id));
        }
      }
    };
    checkEnrollment();
  }, [course.id]);

  const handleWatchLater = async (courseId) => {
    const user = auth.currentUser;
    if (!user) {
      setSnackbar({
        open: true,
        message:
          lang === "en"
            ? "Please sign in to use Watch Later."
            : "يرجى تسجيل الدخول لاستخدام المشاهدة لاحقًا.",
        severity: "error",
      });
      return;
    }

    try {
      const isAdmin = await checkIfAdmin(user.uid);
      const userRef = isAdmin
        ? doc(db, "admins", user.uid)
        : doc(db, "users", user.uid);
      const watchLaterRef = collection(userRef, "watchLaterList");
      const courseDocRef = doc(watchLaterRef, courseId);
      const courseDoc = await getDoc(courseDocRef);

      if (courseDoc.exists()) {
        setSnackbar({
          open: true,
          message:
            lang === "en"
              ? "Course is already in Watch Later."
              : "الدورة موجودة بالفعل في المشاهدة لاحقًا.",
          severity: "error",
        });
        setWatchLaterStatus((prev) => ({ ...prev, [courseId]: true }));
        return;
      }

      await setDoc(courseDocRef, {
        courseId: courseId,
        timestamp: serverTimestamp(),
      });

      setWatchLaterStatus((prev) => ({ ...prev, [courseId]: true }));
      setSnackbar({
        open: true,
        message:
          lang === "en"
            ? "Course added to Watch Later!"
            : "تمت إضافة الدورة إلى المشاهدة لاحقًا!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error adding to Watch Later:", error);
      setSnackbar({
        open: true,
        message:
          lang === "en"
            ? "Error adding to Watch Later."
            : "حدث خطأ أثناء إضافة الدورة إلى المشاهدة لاحقًا.",
        severity: "error",
      });
    }
  };

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
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        courses: arrayUnion(course.id),
      });

      const adminRef = doc(db, "admins", course.course_creator_id);
      await updateDoc(adminRef, {
        students: arrayUnion(user.uid),
      });

      setIsEnrolled(true);
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
        {isUser && (
          <Button
            className={`${theme}EnrollBtn`}
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleEnroll}
            disabled={isEnrolled || loading}
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
        )}
        {isUser && (
          <Button
            className={`${theme}EnrollBtn`}
            variant="contained"
            sx={{
              marginLeft: 2,
              textTransform: "none",
              maxWidth: 200,
              backgroundColor: "#E8A710",
              "&:hover": { backgroundColor: "#D18F0C" },
            }}
            onClick={() => handleWatchLater(course.id)}
            disabled={watchLaterStatus[course.id]}
          >
            {watchLaterStatus[course.id]
              ? lang === "en"
                ? "Added to Watch Later"
                : "تمت الإضافة إلى المشاهدة لاحقًا"
              : lang === "en"
              ? "Watch Later"
              : "المشاهدة لاحقا"}
          </Button>
        )}
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
