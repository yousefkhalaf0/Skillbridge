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
import { Add, Edit, AccessTime, Delete } from "@mui/icons-material";

const CourseModule = ({ modules = { title: "", lessons: [] }, setModules }) => {
  const [editingLesson, setEditingLesson] = useState({
    moduleIndex: null,
    lessonIndex: null,
  });
  const [newLesson, setNewLesson] = useState({ title: "", duration: "" });

  // Add a new lesson or update an existing one
  const handleAddOrUpdateLesson = (moduleIndex) => {
    if (!newLesson.title.trim() || !newLesson.duration.trim()) {
      return; // Prevent adding/updating if fields are empty
    }

    const updatedModules = [...modules];
    if (
      editingLesson.moduleIndex !== null &&
      editingLesson.lessonIndex !== null
    ) {
      // Update existing lesson
      updatedModules[editingLesson.moduleIndex].lessons[
        editingLesson.lessonIndex
      ] = { ...newLesson };
    } else {
      // Add new lesson
      updatedModules[moduleIndex].lessons.push({ ...newLesson });
    }

    setModules(updatedModules);
    setNewLesson({ title: "", duration: "" });
    setEditingLesson({ moduleIndex: null, lessonIndex: null });
  };

  // Delete a lesson
  const deleteLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1);
    setModules(updatedModules);
  };

  // Add a new module
  const addModule = () => {
    setModules([...modules, { title: "", lessons: [] }]);
  };

  // Delete a module
  const deleteModule = (moduleIndex) => {
    const updatedModules = modules.filter((_, index) => index !== moduleIndex);
    setModules(updatedModules);
  };

  // Handle module title change
  const handleModuleTitleChange = (moduleIndex, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].title = value;
    setModules(updatedModules);
  };

  // Handle clicking on a lesson to edit it
  const handleLessonClick = (moduleIndex, lessonIndex) => {
    const lesson = modules[moduleIndex].lessons[lessonIndex];
    setNewLesson({ title: lesson.title, duration: lesson.duration });
    setEditingLesson({ moduleIndex, lessonIndex });
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        mx: "auto",
        p: 3,
        border: "3px dashed #000",
        borderRadius: 2,
      }}
    >
      {modules.map((module, moduleIndex) => (
        <Box key={moduleIndex} sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              placeholder="Enter module title"
              variant="outlined"
              sx={{
                mb: 2,
                bgcolor: "#F0F0F0",
                borderRadius: 3,
                border: "none",
                width: "460px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "2px solid #000" },
                },
              }}
              value={module.title}
              onChange={(e) =>
                handleModuleTitleChange(moduleIndex, e.target.value)
              }
            />
            <IconButton
              onClick={() => deleteModule(moduleIndex)}
              sx={{ color: "#E8A710" }}
            >
              <Delete />
            </IconButton>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              fullWidth
              placeholder="Lesson Title"
              variant="outlined"
              sx={{
                mb: 2,
                bgcolor: "#F0F0F0",
                borderRadius: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "2px solid #000" },
                },
              }}
              value={newLesson.title}
              onChange={(e) =>
                setNewLesson({ ...newLesson, title: e.target.value })
              }
            />
            <TextField
              placeholder="Duration"
              variant="outlined"
              sx={{
                mb: 2,
                bgcolor: "#F0F0F0",
                borderRadius: 3,
                width: "250px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "2px solid #000" },
                },
              }}
              value={newLesson.duration}
              onChange={(e) =>
                setNewLesson({ ...newLesson, duration: e.target.value })
              }
            />
            <Button
              variant="contained"
              sx={{
                width: "260px",
                height: "40px",
                bgcolor: "#000000",
                borderRadius: 2,
                fontSize: 10,
                textTransform: "none",
              }}
              onClick={() => handleAddOrUpdateLesson(moduleIndex)}
              endIcon={
                editingLesson.moduleIndex === moduleIndex &&
                editingLesson.lessonIndex !== null ? (
                  <Edit sx={{ height: "15px" }} />
                ) : (
                  <Add />
                )
              }
            >
              {editingLesson.moduleIndex === moduleIndex &&
              editingLesson.lessonIndex !== null
                ? "Update Lesson"
                : "Add lesson"}
            </Button>
          </Stack>

          {module.lessons.map((lesson, lessonIndex) => (
            <Card
              key={lessonIndex}
              sx={{ mt: 2, bgcolor: "#e0e0e0", cursor: "pointer" }}
              onClick={() => handleLessonClick(moduleIndex, lessonIndex)}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {lesson.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lesson {lessonIndex + 1}
                  </Typography>
                </Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTime fontSize="small" />
                  <Typography>{lesson.duration}</Typography>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click event
                      deleteLesson(moduleIndex, lessonIndex);
                    }}
                    sx={{ color: "#E8A710" }}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}

      <Button
        variant="contained"
        onClick={addModule}
        sx={{
          mt: 2,
          width: "150px",
          height: "45px",
          bgcolor: "#000000",
          borderRadius: 2,
          textTransform: "none",
        }}
      >
        Add module
      </Button>
    </Box>
  );
};

export default CourseModule;
