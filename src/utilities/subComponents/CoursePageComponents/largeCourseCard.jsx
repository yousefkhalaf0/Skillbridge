import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "../../muiComponents.js";
import { fetchData } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import "./componentsStyle/largeCourseCard.css";

export default function LargeCourseCard() {
  const theme = useSelector((state) => state.themeReducer);
  const { courses, loading, error } = useSelector(
    (state) => state.courseReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <CircularProgress sx={{ color: "#E8A710" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  if (!Array.isArray(courses) || courses.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Alert severity="info">No courses available.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {courses.map((course) => (
        <Box
          key={course.id}
          className={`${theme}LargeCourseCardContainer`}
          sx={{ mb: 4 }}
        >
          <Typography
            className={`${theme}CourseTitle`}
            variant="h6"
            gutterBottom
          >
            {course.course_name}
          </Typography>

          <Grid mb={4} container spacing={2}>
            <Grid className={`courseDiscreption`} item sm={9} xs={12}>
              {course.course_description}
            </Grid>
            <Grid item sm={3} xs={12}>
              <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                <Button
                  className={`viewCourseBtn`}
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={() => handleCourseClick(course.id)}
                >
                  View Course
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <Grid container spacing={1.5}>
                  {course.course_images &&
                    course.course_images.map((image, index) => (
                      <Grid
                        item
                        xs={4}
                        key={index}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Box
                          className={`imgContainer`}
                          component="img"
                          src={image}
                          alt={`courseImg-${index}`}
                          sx={{
                            width: "100%",
                            height: "250px",
                            objectFit: "fill",
                            borderRadius: "8px",
                          }}
                        />
                      </Grid>
                    ))}
                </Grid>

                <Grid className={`largeCourseCardRow`} container spacing={2}>
                  <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
                    <Typography
                      className={`${theme}LargeWeeksLevelBox`}
                      variant="caption"
                      sx={{ mr: 1 }}
                    >
                      {course.duration}
                    </Typography>
                    <Typography
                      className={`${theme}LargeWeeksLevelBox`}
                      variant="caption"
                    >
                      {course.level}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{ textAlign: { xs: "left", sm: "right" } }}
                  >
                    <Typography
                      className={`${theme}LargeVendor`}
                      variant="body2"
                    >
                      By {course.course_creator_id}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  sx={{ display: "flex", flexWrap: "wrap" }}
                >
                  <Grid item xs={12} sx={{ display: "flex" }}>
                    <Box
                      className={`curriculumContainer`}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        className={`${theme}Header`}
                        variant="subtitle1"
                        sx={{ flexGrow: 1 }}
                      >
                        Curriculum
                      </Typography>
                      <Grid className={`${theme}ModulesContainer`} container>
                        {Array.isArray(course.modules) &&
                        course.modules.length > 0 ? (
                          course.modules
                            .filter((module) => module.number !== undefined)
                            .sort((a, b) => a.number - b.number)
                            .map((module, index, modulesArray) => (
                              <Grid
                                item
                                xs={12}
                                md={2}
                                key={module.id}
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "start",
                                  position: "relative",
                                  mx: 1,
                                  py: 2,
                                }}
                              >
                                <Typography
                                  className={`modulesNumber`}
                                  variant="h3"
                                >
                                  {String(module.number).padStart(2, "0")}
                                </Typography>
                                <Typography
                                  className={`modulesName`}
                                  variant="body1"
                                  gutterBottom
                                >
                                  {module.title || "Untitled Module"}
                                </Typography>

                                {index !== modulesArray.length - 1 && (
                                  <Box
                                    sx={{
                                      display: { xs: "none", md: "block" },
                                      position: "absolute",
                                      right: 0,
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      height: "60%",
                                      width: "1px",
                                      bgcolor:
                                        theme === "light"
                                          ? "#F1F1F3"
                                          : "#656567",
                                    }}
                                  />
                                )}
                                {index !== modulesArray.length - 1 && (
                                  <Box
                                    sx={{
                                      display: { xs: "block", md: "none" },
                                      width: "100%",
                                      height: "1px",
                                      bgcolor:
                                        theme === "light"
                                          ? "#F1F1F3"
                                          : "#656567",
                                      my: 2,
                                    }}
                                  />
                                )}
                              </Grid>
                            ))
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            No modules available for this course.
                          </Typography>
                        )}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
