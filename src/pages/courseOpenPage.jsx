import React, { useEffect, useState } from "react";
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
import { db } from "../utilities/firebase.js";
import "./pagesStyle/courseOpenPage.css";
import {
  doc,
  onSnapshot,
  collection,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

export default function CourseOpenPage() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.languageReducer);
  const showScroll = useSelector((state) => state.scrollReducer.showScroll);
  const [selectedCourse, setselectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const courseRef = doc(db, "Courses", courseId);

    // Listen for real-time updates to the course
    const unsubscribeCourse = onSnapshot(
      courseRef,
      (courseDoc) => {
        if (courseDoc.exists()) {
          const courseData = { id: courseDoc.id, ...courseDoc.data() };
          setselectedCourse(courseData);
          setLoading(false);
        } else {
          setError("Course not found");
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching course:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    // Clean up the listener on unmount
    return () => unsubscribeCourse();
  }, [courseId]);

  // Fetch modules and lessons in real-time
  useEffect(() => {
    if (!courseId) return;

    const modulesRef = collection(db, "Courses", courseId, "modules");

    // Listen for real-time updates to modules
    const unsubscribeModules = onSnapshot(
      modulesRef,
      (modulesSnapshot) => {
        const modules = [];
        modulesSnapshot.forEach((moduleDoc) => {
          const moduleData = { id: moduleDoc.id, ...moduleDoc.data() };

          // Listen for real-time updates to lessons
          const lessonsRef = collection(
            db,
            "Courses",
            courseId,
            "modules",
            moduleDoc.id,
            "lessons"
          );

          const unsubscribeLessons = onSnapshot(
            lessonsRef,
            (lessonsSnapshot) => {
              moduleData.lessons = lessonsSnapshot.docs.map((lessonDoc) => ({
                id: lessonDoc.id,
                ...lessonDoc.data(),
              }));

              // Update the course with the latest modules and lessons
              setselectedCourse((prevCourse) => ({
                ...prevCourse,
                modules: prevCourse.modules
                  ? prevCourse.modules.map((m) =>
                      m.id === moduleData.id ? moduleData : m
                    )
                  : [moduleData], // Initialize modules if undefined
              }));
            }
          );

          modules.push(moduleData);
        });

        // Update the course with the latest modules
        setselectedCourse((prevCourse) => ({
          ...prevCourse,
          modules,
        }));
      },
      (error) => {
        console.error("Error fetching modules:", error);
        setError(error.message);
      }
    );

    // Clean up the listener on unmount
    return () => unsubscribeModules();
  }, [courseId]);

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
          {lang === "en" ? "Course not found." : "لم يتم العثور على الدورة."}
        </Alert>
      </Box>
    );
  }

  // Add default values for undefined properties
  const courseWithDefaults = {
    ...selectedCourse,
    modules: selectedCourse.modules || [],
  };

  return (
    <Box
      className="courseOpenPageContainer disableSelecting"
      sx={{ width: { xs: "95%", md: "90%", lg: "85%" } }}
    >
      <CourseHeroComponent course={courseWithDefaults} />
      <BodyComponent course={courseWithDefaults} />

      {showScroll && (
        <Button onClick={scrollTop} className="courseOpenPageScrollBtn">
          <KeyboardArrowUpIcon />
        </Button>
      )}
    </Box>
  );
}
