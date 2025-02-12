import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowScroll } from "../utilities/redux/store.jsx";
import {
  Box,
  Button,
  KeyboardArrowUpIcon,
  CircularProgress,
  Alert,
} from "../utilities/muiComponents.js";
import {
  CourseHeroComponent,
  BodyComponent,
} from "../utilities/subComponentsLinks.js";
import { setSelectedCourse } from "../utilities/redux/store.jsx";
import { fetchData } from "../utilities/firebase.js";
import "./pagesStyle/courseOpenPage.css";

export default function CourseOpenPage() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.languageReducer);
  const showScroll = useSelector((state) => state.scrollReducer.showScroll);
  const { courses, selectedCourse, loading, error } = useSelector(
    (state) => state.courseReducer
  );
  console.log(selectedCourse);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (courses.length === 0) {
      dispatch(fetchData());
    } else {
      const course = courses.find((c) => c.id === courseId);
      dispatch(setSelectedCourse(course));
    }
  }, [courseId, courses, dispatch]);

  const checkScrollTop = () => {
    const shouldShow = window.pageYOffset > 400;
    if (shouldShow !== showScroll) {
      dispatch(setShowScroll(shouldShow));
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll, dispatch]);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 40,
          marginBottom: 40,
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

  if (!selectedCourse) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Alert severity="info">
          {lang == "en" ? "Course not found." : "لم يتم العثور على الدورة."}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      className="courseOpenPageContainer disableSelecting"
      sx={{ width: { xs: "95%", md: "90%", lg: "85%" } }}
    >
      <CourseHeroComponent course={selectedCourse} />
      <BodyComponent course={selectedCourse} />

      {showScroll && (
        <Button onClick={scrollTop} className="courseOpenPageScrollBtn">
          <KeyboardArrowUpIcon />
        </Button>
      )}
    </Box>
  );
}
