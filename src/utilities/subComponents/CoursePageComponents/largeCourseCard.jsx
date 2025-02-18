import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "../../muiComponents.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./componentsStyle/largeCourseCard.css";
import { db, auth } from "../../firebase.js"; // Import Firebase Firestore
import {
  doc,
  getDoc,
  setDoc,
  collection,
  serverTimestamp,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { Snackbar, Alert } from "@mui/material";
import { checkIfAdmin } from "../../firebase.js";
export default function LargeCourseCard({ courses }) {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const navigate = useNavigate();
  const [watchLaterStatus, setWatchLaterStatus] = useState({});
  const [adminNames, setAdminNames] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch admin names
  useEffect(() => {
    const fetchAdminNames = async () => {
      const names = {};
      for (const course of courses) {
        if (course?.course_creator_id) {
          names[course.course_creator_id] = await fetchAdminName(
            course.course_creator_id
          );
        }
      }
      setAdminNames(names);
    };
    fetchAdminNames();
  }, [courses]);

  // Fetch user's Watch Later list
  useEffect(() => {
    const fetchWatchLaterList = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const isAdmin = await checkIfAdmin(user.uid);
        const userRef = isAdmin
          ? doc(db, "admins", user.uid)
          : doc(db, "users", user.uid);
        const watchLaterRef = collection(userRef, "watchLaterList");
        const snapshot = await getDocs(watchLaterRef);

        const watchLaterList = snapshot.docs.map((doc) => doc.id);
        setWatchLaterStatus((prev) => ({
          ...prev,
          ...watchLaterList.reduce((acc, courseId) => {
            acc[courseId] = true;
            return acc;
          }, {}),
        }));
      } catch (error) {
        console.error("Error fetching Watch Later list:", error);
      }
    };

    fetchWatchLaterList();
  }, []);

  const fetchAdminName = async (adminId) => {
    try {
      const adminRef = doc(db, "admins", adminId);
      const adminSnap = await getDoc(adminRef);
      if (adminSnap.exists()) {
        return adminSnap.data().username;
      }
      return lang === "en" ? "Unknown Admin" : "مسؤول غير معروف";
    } catch (error) {
      console.error("Error fetching admin data:", error);
      return lang === "en" ? "Unknown Admin" : "مسؤول غير معروف";
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

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

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (!Array.isArray(courses) || courses.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 20, mb: 40 }}>
        <Alert severity="info">
          {lang === "en" ? "No courses available." : "لا توجد دورات متاحة."}
        </Alert>
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {courses.map((course) => (
        <Box
          key={course.id}
          className={`${theme}LargeCourseCardContainer`}
          sx={{ mb: 4 }}
        >
          <Typography
            className={`${theme}CourseTitle`}
            variant="h6"
            gutterBottom
          >
            {lang == "en" ? course.course_name : course.course_nameAR}
          </Typography>

          <Grid mb={4} container spacing={2}>
            <Grid className={`courseDiscreption`} item sm={9} xs={12}>
              {lang == "en"
                ? course.course_description.slice(0, 200)
                : course.course_descriptionAR.slice(0, 200)}
            </Grid>
            <Grid item sm={3} xs={12}>
              <Box
                sx={{
                  textAlign: { xs: "left", sm: "right" },
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 2, // ✅ Adds space between buttons
                }}
              >
                <Button
                  className="viewCourseBtn"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    maxWidth: 160,
                    backgroundColor: "#E8A710",
                    "&:hover": { backgroundColor: "#D18F0C" },
                  }}
                  onClick={() => handleWatchLater(course.id)}
                  disabled={watchLaterStatus[course.id]} // Disable button if already added
                >
                  {watchLaterStatus[course.id]
                    ? lang === "en"
                      ? "Added to Watch Later"
                      : "تمت الإضافة إلى المشاهدة لاحقًا"
                    : lang === "en"
                    ? "Watch Later"
                    : "المشاهدة لاحقا"}
                </Button>

                <Button
                  className="viewCourseBtn"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    maxWidth: 160,
                    backgroundColor: "#1976D2",
                  }}
                  onClick={() => handleCourseClick(course.id)}
                >
                  {lang === "en" ? "View Course" : "عرض الدورة"}
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <Grid container spacing={1.5}>
                  {course.course_images &&
                    course.course_images.map((image, index) => (
                      <Grid
                        item
                        xs={4}
                        key={index}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Box
                          className={`imgContainer`}
                          component="img"
                          src={image}
                          alt={`courseImg-${index}`}
                          sx={{
                            width: "100%",
                            height: "250px",
                            objectFit: "fill",
                            borderRadius: "8px",
                          }}
                        />
                      </Grid>
                    ))}
                </Grid>

                <Grid className={`largeCourseCardRow`} container spacing={2}>
                  <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
                    <Typography
                      className={`${theme}LargeWeeksLevelBox`}
                      variant="caption"
                      sx={{ mr: 1 }}
                    >
                      {lang == "en" ? course.duration : course.durationAR}
                    </Typography>
                    <Typography
                      className={`${theme}LargeWeeksLevelBox`}
                      variant="caption"
                    >
                      {lang == "en" ? course.level : course.levelAR}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{ textAlign: { xs: "left", sm: "right" } }}
                  >
                    <Typography
                      className={`${theme}LargeVendor`}
                      variant="body2"
                    >
                      {lang === "en"
                        ? `By ${
                            adminNames[course.course_creator_id] || "Loading..."
                          }`
                        : `بواسطة ${
                            adminNames[course.course_creator_id] ||
                            "جاري التحميل..."
                          }`}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  sx={{ display: "flex", flexWrap: "wrap" }}
                >
                  <Grid item xs={12} sx={{ display: "flex" }}>
                    <Box
                      className={`curriculumContainer`}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        className={`${theme}Header`}
                        variant="subtitle1"
                        sx={{ flexGrow: 1 }}
                      >
                        {lang == "en" ? "Curriculum" : "المنهج"}
                      </Typography>
                      <Grid className={`${theme}ModulesContainer`} container>
                        {Array.isArray(course.modules) &&
                        course.modules.length > 0 ? (
                          course.modules
                            .filter((module) => module.number !== undefined)
                            .sort((a, b) => a.number - b.number)
                            .map((module, index, modulesArray) => (
                              <Grid
                                item
                                xs={12}
                                md={2}
                                key={module.id}
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "start",
                                  position: "relative",
                                  mx: 1,
                                  py: 2,
                                }}
                              >
                                <Typography
                                  className={`modulesNumber`}
                                  variant="h3"
                                >
                                  {String(module.number).padStart(2, "0")}
                                </Typography>
                                <Typography
                                  className={`modulesName`}
                                  variant="body1"
                                >
                                  {lang == "en"
                                    ? module.title || "Untitled Module"
                                    : module.titleAR || "موديول غير مسمى"}
                                </Typography>

                                {index !== modulesArray.length - 1 && (
                                  <Box
                                    sx={{
                                      display: { xs: "none", md: "block" },
                                      position: "absolute",
                                      right: 0,
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      height: "60%",
                                      width: "1px",
                                      bgcolor:
                                        theme === "light"
                                          ? "#F1F1F3"
                                          : "#656567",
                                    }}
                                  />
                                )}
                                {index !== modulesArray.length - 1 && (
                                  <Box
                                    sx={{
                                      display: { xs: "block", md: "none" },
                                      width: "100%",
                                      height: "1px",
                                      bgcolor:
                                        theme === "light"
                                          ? "#F1F1F3"
                                          : "#656567",
                                      my: 2,
                                    }}
                                  />
                                )}
                              </Grid>
                            ))
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            {lang == "en"
                              ? "No modules available."
                              : "لا توجد وحدات متاحة."}
                          </Typography>
                        )}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
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
    </Box>
  );
}
