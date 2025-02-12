import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowScroll } from "../utilities/redux/store.jsx";
import { fetchData } from "../utilities/firebase.js";
import {
  Box,
  Button,
  KeyboardArrowUpIcon,
  CircularProgress,
  Alert,
} from "../utilities/muiComponents.js";
import {
  HeroComponent,
  LargeCourseCard,
  SearchComponent,
} from "../utilities/subComponentsLinks.js";
import "./pagesStyle/coursePage.css";

export default function CoursePage() {
  const showScroll = useSelector((state) => state.scrollReducer.showScroll);
  const { courses, loading, error } = useSelector(
    (state) => state.courseReducer
  );
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.languageReducer);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
    window.scrollTo({ top: 0 });
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.course_name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ??
      false;

    const matchesFilter = filter
      ? course.level?.toLowerCase() === filter.toLowerCase()
      : true;

    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];
  const filterOptionsAR = [
    { value: "beginner", label: "مبتدئ" },
    { value: "intermediate", label: "متوسط" },
    { value: "advanced", label: "متقدم" },
  ];

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 40, mb: 40 }}>
        <CircularProgress sx={{ color: "#E8A710" }} />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 40, mb: 40 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      className="coursePageContainer disableSelecting"
      sx={{ width: { xs: "95%", md: "90%", lg: "85%" } }}
    >
      <HeroComponent />
      <SearchComponent
        onSearch={setSearchTerm}
        onFilter={setFilter}
        filterOptions={lang === "en" ? filterOptions : filterOptionsAR}
      />
      <LargeCourseCard courses={filteredCourses} />

      {showScroll && (
        <Button onClick={scrollTop} className="coursePageScrollBtn">
          <KeyboardArrowUpIcon />
        </Button>
      )}
    </Box>
  );
}
