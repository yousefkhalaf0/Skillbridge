import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import CourseModule from "./AddingModule";

const CourseForm = ({ navHeight, userId }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [courseSubject, setCourseSubject] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [modules, setModules] = useState([]);

  const handleSubmit = async () => {
    const courseData = {
      course_creator_id: userId,
      course_name: courseTitle,
      course_description: courseDescription,
      level: courseLevel,
      subject: courseSubject,
      modules: modules,
    };
  
    // Example API call using fetch
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload course data");
      }
  
      const result = await response.json();
      console.log("Course uploaded successfully:", result);
    } catch (error) {
      console.error("Error uploading course data:", error);
    }
  };
  return (
    <Box display="flex" sx={{ fontFamily: "inherit" }}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2} mt={3}>
          <Grid item lg={8} xs={12} md={12}>
            <Box sx={{ maxWidth: "70%", width: "100%", margin: "auto", padding: 3 }}>
              <Typography variant="p" gutterBottom>Course Title</Typography>
              <TextField
                fullWidth
                label="Course Title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none" }}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                
                  <TextField
                    fullWidth
                    label="Level"
                    value={courseLevel}
                    onChange={(e) => setCourseLevel(e.target.value)}
                    sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none" }}
                  />
                </Grid>
                <Grid item xs={6}>
               
                  <TextField
                    fullWidth
                    label="Subject"
                    value={courseSubject}
                    onChange={(e) => setCourseSubject(e.target.value)}
                    sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none" }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none" }}
              />

              <CourseModule modules={modules} setModules={setModules} />

              <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2, bgcolor: "#000000", color: "#ffffff" }}>
                Submit Course
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CourseForm;