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

const CourseForm = ({ navHeight }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [courseSubject, setCourseSubject] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDescriptionAR, setCourseDescriptionAR] = useState("");
  const [courseImages, setCourseImages] = useState(["", "", ""]);
  const [modules, setModules] = useState([]);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set the userId
        setUserId(user.uid);
      } else {
        // User is signed out, set userId to null
        setUserId(null);
      }
    });
    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    // Check if userId is available
    if (!userId) {
      console.error("Error: User is not authenticated.");
      return;
    }

    const courseData = {
      course_creator_id: userId,
      course_name: courseTitle || "Untitled Course",
      course_description: courseDescription || "",
      course_descriptionAR: courseDescriptionAR || "",
      level: courseLevel || "Not Specified",
      subject: courseSubject || "Not Specified",
      course_images: courseImages.filter((url) => url !== ""),
    };

    try {
      // Add the course document to the 'courses' collection
      const courseRef = await addDoc(collection(db, "Courses"), courseData);

      // Add modules and lessons as sub-collections
      for (const module of modules) {
        const moduleData = {
          title: module.title || "Untitled Module",
        };
        const moduleRef = await addDoc(
          collection(courseRef, "modules"),
          moduleData
        );

        for (const lesson of module.lessons) {
          const lessonData = {
            title: lesson.title || "Untitled Lesson",
            duration: lesson.duration || "Not Specified",
          };
          await addDoc(collection(moduleRef, "lessons"), lessonData);
        }
      }

      console.log("Course uploaded successfully with ID: ", courseRef.id);
    } catch (error) {
      console.error("Error uploading course data:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container mt={3}>
        <Grid item lg={8} xs={12} md={12}>
          <Box
            sx={{ maxWidth: "70%", width: "100%", margin: "auto", padding: 3 }}
          >
            <Box sx={{ mb: 1 }}>
              {" "}
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
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="p" gutterBottom>
                  Level
                </Typography>
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
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="p" gutterBottom>
                  Subject
                </Typography>
                <TextField
                  fullWidth
                  label="Subject"
                  value={courseSubject}
                  onChange={(e) => setCourseSubject(e.target.value)}
                  sx={{
                    mb: 2,
                    bgcolor: "#F0F0F0",
                    borderRadius: 3,
                    border: "none",
                  }}
                />
              </Grid>
            </Grid>

            <Typography variant="p" gutterBottom>
              Description
            </Typography>
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
              }}
            />

            <Typography variant="p" gutterBottom>
              Description (Arabic)
            </Typography>
            <TextField
              fullWidth
              label="Description (Arabic)"
              variant="outlined"
              multiline
              rows={3}
              value={courseDescriptionAR}
              onChange={(e) => setCourseDescriptionAR(e.target.value)}
              sx={{
                mb: 2,
                bgcolor: "#F0F0F0",
                borderRadius: 3,
                border: "none",
              }}
            />

            <CourseModule modules={modules} setModules={setModules} />

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 2, bgcolor: "#000000", color: "#ffffff" }}
            >
              Submit Course
            </Button>
          </Box>
        </Grid>
        <Grid>
          <ImageUploader
            courseImages={courseImages}
            setCourseImages={setCourseImages}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseForm;
