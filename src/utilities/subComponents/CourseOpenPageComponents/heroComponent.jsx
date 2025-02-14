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
export default function HeroComponent({ course }) {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleEnroll = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to enroll!");
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        courses: arrayUnion(course.id), // Add course ID to the array
      });
      setIsEnrolled(true); // Update UI
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Failed to enroll. Try again.");
    }
    setLoading(false);
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
  if (!course) {
    return (
      <Grid className={`largeHeroComponentContainer`} container spacing={2}>
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
        >
          {lang == "en"
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
    </Grid>
  );
}
