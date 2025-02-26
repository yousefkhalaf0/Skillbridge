import { useSelector } from "react-redux";
import { Grid, Typography, Box, AccessTimeIcon } from "../../muiComponents.js";
import "./componentsStyle/bodyComponent.css";
import { useState, useEffect } from "react";

export default function BodyComponent({ course }) {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [clickedLessons, setClickedLessons] = useState(new Set());

  useEffect(() => {
    if (course?.course_images?.length) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % course.course_images.length
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [course?.course_images?.length]);

  if (!course) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Typography variant="h6">No course data available.</Typography>
      </Box>
    );
  }

  // Ensure modules is an array before calling slice
  const sortedModules = (course.modules || [])
    .slice()
    .sort((a, b) => a.number - b.number);

  const handleLessonClick = (lessonId) => {
    setClickedLessons((prevClickedLessons) => {
      const newClickedLessons = new Set(prevClickedLessons);
      if (newClickedLessons.has(lessonId)) {
        newClickedLessons.delete(lessonId);
      } else {
        newClickedLessons.add(lessonId);
      }
      return newClickedLessons;
    });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        className="bodyImg"
        component="img"
        src={course.course_images?.[currentImageIndex]}
        alt="course header image"
      />

      <Grid container spacing={2}>
        {sortedModules.map((module) => {
          // Ensure lessons is an array before calling slice
          const sortedLessons = (module.lessons || [])
            .slice()
            .sort((a, b) => a.number - b.number);

          return (
            <Grid item xs={12} md={6} key={module.id} sx={{ display: "flex" }}>
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
                  {lang == "en" ? module.title : module.titleAR}
                </Typography>

                {sortedLessons.map((lesson) => (
                  <Box
                    className={`${theme}LessonsContainer lessonsContainer ${
                      clickedLessons.has(lesson.id) ? "clicked" : ""
                    }`}
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#262626",
                            fontWeight: "bold",
                          }}
                        >
                          {lang == "en" ? lesson.title : lesson.titleAR}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#262626",
                          }}
                        >
                          {lang == "en" ? "Lesson" : "الدرس"}{" "}
                          {String(lesson.number).padStart(2, "0")}
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
                        <Box
                          className={`${theme}LessonTime lessonTime ${
                            clickedLessons.has(lesson.id) ? "clicked" : ""
                          }`}
                        >
                          <AccessTimeIcon />{" "}
                          {lang == "en" ? lesson.duration : lesson.durationAR}
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
