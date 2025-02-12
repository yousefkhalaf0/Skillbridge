import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from "../../muiComponents.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import "../smallCourseCard/smallCourseCard.css";

export default function SmallCourseCard() {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const { courses, loading, error } = useSelector(
    (state) => state.courseReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const currentCourses = courses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
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

  return (
    <Box>
      <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
        {currentCourses.map((course) => (
          <Grid item xs={12} md={6} key={course.id} sx={{ display: "flex" }}>
            <Box
              className={`${theme}SmallCourseCard`}
              sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <Box
                className="courseImgBox"
                component="img"
                src={course.course_images[1]}
                alt="courseImg"
              />
              <Grid className="courseCardRow" container spacing={2}>
                <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
                  <Typography
                    className={`${theme}WeeksLevelBox`}
                    variant="caption"
                    sx={{ marginRight: 1 }}
                  >
                    {lang == "en" ? course.duration : course.durationAR}
                  </Typography>
                  <Typography
                    className={`${theme}WeeksLevelBox`}
                    variant="caption"
                  >
                    {lang == "en" ? course.level : course.levelAR}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ textAlign: { xs: "left", sm: "right" } }}
                >
                  <Typography className={`${theme}Vendor`} variant="subtitle1">
                    {lang == "en"
                      ? "By " + course.course_creator_id
                      : course.course_creator_id + " بواسطة"}
                  </Typography>
                </Grid>
              </Grid>
              <Typography className="courseTitle" variant="h5" gutterBottom>
                {lang == "en" ? course.course_name : course.course_nameAR}
              </Typography>
              <Typography
                className="courseDescription"
                variant="body1"
                sx={{ flexGrow: 1 }}
              >
                {lang == "en"
                  ? course.course_description.slice(0, 170)
                  : course.course_descriptionAR.slice(0, 170)}{" "}
                ...
              </Typography>
              <Button
                className={`${theme}ExploreCourseBtn`}
                variant="contained"
                sx={{ textTransform: "none" }}
                onClick={() => handleCourseClick(course.id)}
              >
                {lang == "en" ? "Get it Now" : "احصل عليه الآن"}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* pagination */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: 4, gap: 2 }}
      >
        {page > 1 && (
          <Button
            onClick={handlePrevious}
            sx={{
              textTransform: "none",
              color: theme === "dark" ? "#fff" : "#000",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#333" : "#f5f5f5",
              },
            }}
          >
            {lang == "en" ? "Previous" : "السابق"}
          </Button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              sx={{
                textTransform: "none",
                color:
                  pageNumber === page
                    ? "#fff"
                    : theme === "dark"
                    ? "#fff"
                    : "#000",
                backgroundColor:
                  pageNumber === page ? "#E8A710" : "transparent",
                borderRadius: "4px",
                minWidth: "32px",
                "&:hover": {
                  backgroundColor:
                    pageNumber === page
                      ? "#E8A710"
                      : theme === "dark"
                      ? "#333"
                      : "#f5f5f5",
                },
              }}
            >
              {pageNumber}
            </Button>
          )
        )}
        {page < totalPages && (
          <Button
            onClick={handleNext}
            sx={{
              textTransform: "none",
              color: theme === "dark" ? "#fff" : "#000",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#333" : "#f5f5f5",
              },
            }}
          >
            {lang == "en" ? "Next" : "التالي"}
          </Button>
        )}
      </Box>
    </Box>
  );
}
