import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";

const courses = [
  { nameAR: "كود جافا", name: "Java Code", value: 75, color: "#ff9800" },
  {
    nameAR: "التصميم الأساسي",
    name: "Design Basic",
    value: 65,
    color: "#2196f3",
  },
  { nameAR: "بناء الفريق", name: "Team Building", value: 30, color: "#673ab7" },
  {
    nameAR: "تسويق الأعمال",
    name: "Business Marketing",
    value: 20,
    color: "#e91e63",
  },
];

const CoursesProgress = () => {
  const lang = useSelector((state) => state.languageReducer);
  const theme = useSelector((state) => state.themeReducer);
  return (
    <Box sx={{ maxWidth: 500, p: 2, borderRadius: 2 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: theme == "light" ? "black" : "white" }}
      >
        {lang == "en" ? "Completed Course" : "دورة مكتملة"}
      </Typography>
      {courses.map((course) => (
        <Box
          key={course.name}
          sx={{
            mb: 2,
            bgcolor: theme == "light" ? "#FFFFFF" : "#D0D0D0",
            p: 2,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {lang == "en" ? course.name : course.nameAR}{" "}
            <strong>{course.value}/100</strong>
          </Typography>
          <LinearProgress
            variant="determinate"
            value={course.value}
            sx={{
              height: 12,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: course.color,
                borderRadius: 2,
              },
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CoursesProgress;
