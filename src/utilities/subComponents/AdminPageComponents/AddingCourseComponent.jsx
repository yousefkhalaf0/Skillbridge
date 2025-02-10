import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./components_style/AddCourseComponent.css"
import CourseModule from"./AddingModule"

const CourseForm = ({ navHeight, userId }) => {
  const [modules, setModules] = useState([]);
  const [moduleTitle, setModuleTitle] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");

  const addLesson = () => {
    if (!lessonTitle || !lessonDuration) return;
    setModules([...modules, { moduleTitle, lessonTitle, lessonDuration }]);
    setLessonTitle("");
    setLessonDuration("");
  };

  const addModule = () => {
    if (!moduleTitle) return;
    setModules([...modules, { moduleTitle, lessons: [] }]);
    setModuleTitle("");
  };

  return (
    <Box display="flex" sx={{ fontFamily: "inherit" }}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2} mt={3}>
          <Grid item lg={2} xs={12} md={12}></Grid>
          <Box sx={{ maxWidth: 700,width:"100%", margin: "auto", padding: 3, }}>
            <Typography variant="p" gutterBottom>Course Title</Typography>

            <TextField fullWidth label="Course Title" sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none" }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
              <Typography variant="p" gutterBottom>Level</Typography>
                <TextField fullWidth label="Level"  sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none" }} />
              </Grid>
              <Grid item xs={6}>
              <Typography variant="p" gutterBottom>Subject</Typography>
                <TextField fullWidth label="Subject" sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none" }} />
              </Grid>
            </Grid>

            <TextField fullWidth label="Description" variant="outlined" multiline rows={3} sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none" }}/>
            <CourseModule/>

            {modules.map((module, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{module.moduleTitle}</Typography>
                  <Typography variant="body2">{module.lessonTitle}</Typography>
                  <Typography variant="body2"><AccessTimeIcon sx={{ fontSize: 16 }} /> {module.lessonDuration} Minutes</Typography>
                </CardContent>
              </Card>
            ))}

           
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default CourseForm;