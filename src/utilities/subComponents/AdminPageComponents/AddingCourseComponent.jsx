import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import CourseModule from "./AddingModule";
import ImageUploader from "./courseImageUpload";
import { db, auth } from "../../firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { Snackbar, Alert } from "@mui/material";
import EditCourse from "./editCourseComponent.jsx";
import { useNavigate } from "react-router-dom";

const CourseForm = ({ course, onSubmit }) => {
  const [userId, setUserId] = useState(null);
  const [courseTitle, setCourseTitle] = useState(course?.course_name || "");
  const [courseLevel, setCourseLevel] = useState(course?.level || "");
  const [courseSubject, setCourseSubject] = useState(course?.duration || "");
  const navigate = useNavigate();
  const [courseDescription, setCourseDescription] = useState(
    course?.course_description || ""
  );
  const [courseDescriptionAR, setCourseDescriptionAR] = useState(
    course?.course_descriptionAR || ""
  );
  const [courseImages, setCourseImages] = useState(
    course?.course_images || ["", "", ""]
  );
  const [modules, setModules] = useState(course?.modules || []);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!userId) {
      setSnackbar({
        open: true,
        message: "Error: User is not authenticated.",
        severity: "error",
      });
      return;
    }

    const updatedCourse = {
      course_creator_id: userId,
      course_name: courseTitle,
      course_nameAR: courseTitle,
      course_description: courseDescription,
      course_descriptionAR: courseDescriptionAR,
      level: courseLevel,
      levelAR: courseLevel,
      duration: courseSubject,
      durationAR: courseSubject,
      course_images: courseImages.filter((url) => url !== ""),
      modules: modules,
    };

    if (typeof onSubmit === "function") {
      onSubmit(updatedCourse);
    } else {
      if (!courseTitle || !courseLevel || !courseSubject) {
        setSnackbar({
          open: true,
          message: "Please fill in all required fields.",
          severity: "warning",
        });
        return;
      }

      const uploadedImages = courseImages.filter((url) => url !== "");
      if (uploadedImages.length === 0) {
        setSnackbar({
          open: true,
          message: "Please upload at least one image.",
          severity: "warning",
        });
        return;
      }

      if (modules.length === 0) {
        setSnackbar({
          open: true,
          message: "Please add at least one module.",
          severity: "warning",
        });
        return;
      }

      for (let i = 0; i < modules.length; i++) {
        if (!modules[i].title.trim()) {
          setSnackbar({
            open: true,
            message: `Module ${i + 1} title is required.`,
            severity: "warning",
          });
          return;
        }

        if (modules[i].lessons.length === 0) {
          setSnackbar({
            open: true,
            message: `Module ${i + 1} must have at least one lesson.`,
            severity: "warning",
          });
          return;
        }

        for (let j = 0; j < modules[i].lessons.length; j++) {
          if (
            !modules[i].lessons[j].title.trim() ||
            !modules[i].lessons[j].duration.trim()
          ) {
            setSnackbar({
              open: true,
              message: `Lesson ${j + 1} in Module ${
                i + 1
              } is missing a title or duration.`,
              severity: "warning",
            });
            return;
          }
        }
      }

      const courseData = {
        course_creator_id: userId,
        course_name: courseTitle,
        course_nameAR: courseTitle,
        course_description: courseDescription,
        course_descriptionAR: courseDescriptionAR,
        level: courseLevel,
        levelAR: courseLevel,
        duration: courseSubject,
        durationAR: courseSubject,
        course_images: uploadedImages,
      };

      try {
        // Add course to Firestore
        const courseRef = await addDoc(collection(db, "Courses"), courseData);

        // Add modules and lessons
        for (let i = 0; i < modules.length; i++) {
          const moduleData = {
            title: modules[i].title,
            number: i + 1,
          };
          const moduleRef = await addDoc(
            collection(courseRef, "modules"),
            moduleData
          );

          for (let j = 0; j < modules[i].lessons.length; j++) {
            const lessonData = {
              title: modules[i].lessons[j].title,
              duration: modules[i].lessons[j].duration,
              number: j + 1,
            };
            await addDoc(collection(moduleRef, "lessons"), lessonData);
          }
        }

        setSnackbar({
          open: true,
          message: "Course uploaded successfully!",
          severity: "success",
        });

        setCourseTitle("");
        setCourseLevel("");
        setCourseSubject("");
        setCourseDescription("");
        setCourseDescriptionAR("");
        setCourseImages(["", "", ""]);
        setModules([]);
        navigate(`/dashboard`);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Error uploading course: " + error.message,
          severity: "error",
        });
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container mt={3}>
        <Grid item lg={8} xs={12} md={12}>
          <Box
            sx={{ maxWidth: "70%", width: "100%", margin: "auto", padding: 3 }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="p" gutterBottom>
                Course Title
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Course Title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              sx={{
                mb: 2,
                bgcolor: "#F0F0F0",
                borderRadius: 3,
                border: "none",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "2px solid #000" },
                },
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="p" gutterBottom>
                    Level
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Level"
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(e.target.value)}
                  sx={{
                    mb: 2,
                    bgcolor: "#F0F0F0",
                    borderRadius: 3,
                    border: "none",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      "& fieldset": { border: "none" },
                      "&:hover fieldset": { border: "none" },
                      "&.Mui-focused fieldset": { border: "2px solid #000" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="p" gutterBottom>
                    Duration
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Duration"
                  value={courseSubject}
                  onChange={(e) => setCourseSubject(e.target.value)}
                  sx={{
                    mb: 2,
                    bgcolor: "#F0F0F0",
                    borderRadius: 3,
                    border: "none",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      "& fieldset": { border: "none" },
                      "&:hover fieldset": { border: "none" },
                      "&.Mui-focused fieldset": { border: "2px solid #000" },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mb: 2 }}>
              <Typography variant="p" gutterBottom>
                Description
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              sx={{
                mb: 2,
                bgcolor: "#F0F0F0",
                borderRadius: 3,
                border: "none",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "2px solid #000" },
                },
              }}
            />

            <CourseModule modules={modules} setModules={setModules} />

            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
                paddingTop: 1,
              }}
            >
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  mt: 2,
                  bgcolor: "#E8A710",
                  color: "#ffffff",
                  textTransform: "none",
                  width: "30%",
                  height: "50px",
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid>
          <ImageUploader
            courseImages={courseImages}
            setCourseImages={setCourseImages}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CourseForm;
