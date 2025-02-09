import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const courses = [
  { name: "Java Code", value: 75, color: "#ff9800" },
  { name: "Design Basic", value: 65, color: "#2196f3" },
  { name: "Team Building", value: 30, color: "#673ab7" },
  { name: "Business Marketing", value: 20, color: "#e91e63" },
];

const CoursesProgress = () => {
  return (
    <Box sx={{ maxWidth: 500, p: 2, borderRadius: 2 }} >
      <Typography variant="h6" gutterBottom>
        Completed Course
      </Typography>
      {courses.map((course) => (
        <Box key={course.name} sx={{ mb: 2, background:"white" ,p:2,borderRadius:2}}>
          <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between" }}>
            {course.name} <strong>{course.value}/100</strong>
          </Typography>
          <LinearProgress
            variant="determinate"
            value={course.value}
            sx={{ height: 12,  backgroundColor: "#e0e0e0", "& .MuiLinearProgress-bar": { backgroundColor: course.color,borderRadius: 2, } }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CoursesProgress;
