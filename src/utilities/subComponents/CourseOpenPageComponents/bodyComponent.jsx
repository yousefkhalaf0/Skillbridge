import { useSelector } from "react-redux";
import { Grid, Typography, Box, AccessTimeIcon } from "../../muiComponents.js";
import "./componentsStyle/bodyComponent.css";
import { useState, useEffect } from "react";

export default function BodyComponent({ course }) {
  const theme = useSelector((state) => state.themeReducer);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % course.course_images.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [course.course_images.length]);

  if (!course) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Typography variant="h6">No course data available.</Typography>
      </Box>
    );
  }

  const sortedModules = course.modules
    .slice()
    .sort((a, b) => a.number - b.number);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        className="bodyImg"
        component="img"
        src={course.course_images[currentImageIndex]}
        alt="course header image"
      />

      <Grid container spacing={2}>
        {sortedModules.map((module) => {
          const sortedLessons = module.lessons
            .slice()
            .sort((a, b) => a.number - b.number);

          return (
            <Grid item xs={12} md={6} key={module.id}>
              <Box
                className={`${theme}LesonsCard`}
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <Typography
                  className={`modulesCardText modulesNumber`}
                  variant="h2"
                  gutterBottom
                >
                  {String(module.number).padStart(2, "0")}
                </Typography>

                <Typography
                  className={`modulesCardText moduleTitle`}
                  variant="h6"
                >
                  {module.title}
                </Typography>

                {sortedLessons.map((lesson) => (
                  <Box className={`lessonsContainer`} key={lesson.id}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: theme === "dark" ? "white" : "#262626",
                            fontWeight: "bold",
                          }}
                        >
                          {lesson.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: theme === "dark" ? "white" : "#262626",
                          }}
                        >
                          Lesson {String(lesson.number).padStart(2, "0")}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={4}
                        sx={{
                          display: "flex",
                          justifyContent: { xs: "flex-start", sm: "flex-end" },
                        }}
                      >
                        <Box className={`lessonTime`}>
                          <AccessTimeIcon /> {lesson.duration}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
