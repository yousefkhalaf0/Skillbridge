import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
} from "@mui/material";
import { Add, AccessTime } from "@mui/icons-material";

const CourseModule = ({ modules, setModules }) => {
  const addLesson = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons.push({
      title: "New Lesson",
      duration: "00:00",
    });
    setModules(updatedModules);
  };

  const addModule = () => {
    setModules([...modules, { title: "", lessons: [] }]);
  };

  const handleModuleTitleChange = (moduleIndex, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].title = value;
    setModules(updatedModules);
  };

  const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
    const updatedModules = [...modules];
  
    // Ensure lessons array exists
    if (!updatedModules[moduleIndex].lessons[lessonIndex]) {
      updatedModules[moduleIndex].lessons[lessonIndex] = { title: "", duration: "" };
    }
  
    updatedModules[moduleIndex].lessons[lessonIndex][field] = value;
    setModules(updatedModules);
  };
  

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", p: 3, border: "3px dashed #000", borderRadius: 2 }}>
      {modules.map((module, moduleIndex) => (
        <Box key={moduleIndex} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>Module title</Typography>
          <TextField
            placeholder="Enter module title"
            variant="outlined"
            sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none", width: "460px" }}
            value={module.title}
            onChange={(e) => handleModuleTitleChange(moduleIndex, e.target.value)}
          />

          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              fullWidth
              placeholder="Lesson Title"
              variant="outlined"
              sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none" }}
              onChange={(e) => {
                if (module.lessons.length > 0) {
                  handleLessonChange(moduleIndex, module.lessons.length - 1, "title", e.target.value);
                }
              }}
            />
            <TextField
              placeholder="Duration"
              variant="outlined"
              sx={{ width: "250px" }}
              onChange={(e) => handleLessonChange(moduleIndex, module.lessons.length - 1, "duration", e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ width: "250px", height: "40px", bgcolor: "#000000" }}
              onClick={() => addLesson(moduleIndex)}
              startIcon={<Add />}
            >
              Add lesson
            </Button>
          </Stack>

          {module.lessons.map((lesson, lessonIndex) => (
            <Card key={lessonIndex} sx={{ mt: 2, bgcolor: "#e0e0e0" }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">{lesson.title}</Typography>
                  <Typography variant="body2" color="text.secondary">Lesson {lessonIndex + 1}</Typography>
                </Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTime fontSize="small" />
                  <Typography>{lesson.duration}</Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}

      <Button variant="contained" onClick={addModule} sx={{ mt: 2, width: "190px", height: "50px", bgcolor: "#000000" }}>
        Add module
      </Button>
    </Box>
  );
};

export default CourseModule;