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

const CourseModule = () => {
  const [modules, setModules] = useState([{ title: "", lessons: [] }]);

  const addLesson = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons.push({
      title: "Understanding UI/UX Design Principles",
      duration: "45 Minutes",
    });
    setModules(updatedModules);
  };

  const addModule = () => {
    setModules([...modules, { title: "", lessons: [] }]);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3, border: "3px dashed #000", borderRadius: 2,}}>
      {modules.map((module, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          {/* Module Title */}
          <Typography variant="h6" gutterBottom>Module title</Typography>
          <TextField
    
            placeholder="Enter course title"
            variant="outlined"
         
            sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none" ,width:"460px"}} 
            value={module.title}
            onChange={(e) => {
              const updatedModules = [...modules];
              updatedModules[index].title = e.target.value;
              setModules(updatedModules);
            }}
          />

          {/* Lesson Input Fields */}
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField fullWidth placeholder="Enter course level" variant="outlined"  sx={{ mb: 2, bgcolor: "#F0F0F0", borderRadius: 3, border: "none" }} />
            <TextField placeholder="Duration" variant="outlined"  sx={{ width: "250px" }} />
            <Button variant="contained"  sx={{ width: "250px",height:"40px" ,bgcolor:"#000000"}} onClick={() => addLesson(index)} startIcon={<Add />}>
              Add lesson
            </Button>
          </Stack>

          {/* Lesson List */}
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

      {/* Add Module Button */}
      <Button  variant="contained" onClick={addModule} sx={{ mt: 2 ,width: "190px",height:"50px" ,bgcolor:"#000000"}}>
        Add module
      </Button>
    </Box>
  );
};

export default CourseModule;
