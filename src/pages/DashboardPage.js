import React, { useState, useEffect } from "react";
import "./pages style/DashboardPageStyle.css";
import { Box, Grid, Typography, Select, MenuItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../utilities/subComponents/AdminPageComponents/SideBarComponent";
import CourseCard from "../utilities/subComponents/AdminPageComponents/CourseInAdminPage";
import Students from "../utilities/subComponents/AdminPageComponents/StudentComponent";
import Settings from "../utilities/subComponents/AdminPageComponents/settingComponent";
import {
  fetchUserCourses,
  checkIfAdmin,
  checkUserAuthorization,
} from "../../src/utilities/firebase";
import InboxMessages from "../utilities/subComponents/AdminPageComponents/inboxComponent";
import WatchLater from "../utilities/subComponents/AdminPageComponents/WhatchLaterComponent";
import CoursesProgress from "../utilities/subComponents/AdminPageComponents/progressComponent";
import AddIcon from "@mui/icons-material/Add";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import en from "../utilities/localization/en.js";
import ar from "../utilities/localization/ar.js";

const stats = [
  { count: 11, label: "Courses completed", labelAR: "الدورات المكتملة" },
  { count: 4, label: "Courses in progress", labelAR: "الدورات قيد التنفيذ" },
];

const Dashboard = ({ navHeight }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.userCourseReducer?.userCourses);
  const auth = getAuth();
  const [selectedSection, setSelectedSection] = useState("Courses");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [showCourseForm, setShowCourseForm] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const lang = useSelector((state) => state.languageReducer);
  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const theme = useSelector((state) => state.themeReducer);
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const uid = await checkUserAuthorization();
        setUserId(uid);

        const adminStatus = await checkIfAdmin(uid);
        console.log("User ID:", uid, "Is Admin:", adminStatus);
        setIsAdmin(adminStatus);

        dispatch(fetchUserCourses(uid, adminStatus));
      } catch (error) {
        console.error("Authorization error:", error);
        navigate("/signIn");
      }
    };

    initializeDashboard();
  }, [dispatch, navigate]);

  console.log(courses);
  return (
    <Box display="flex" sx={{ fontFamily: "inherit" }}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2} mt={3}>
          <Grid item lg={2} xs={12} md={12}>
            <Sidebar
              navHeight={navHeight}
              setSelectedSection={setSelectedSection}
              selectedSection={selectedSection}
            />
          </Grid>
          <Grid item lg={6} xs={12} md={8}>
            <Box
              mt={3}
              p={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: theme == "light" ? "black" : "white",
                }}
              >
                {selectedSection === "Courses"
                  ? lang == "en"
                    ? en.adminDashboard.myCourses
                    : ar.adminDashboard.myCourses
                  : lang == "en"
                  ? en.adminDashboard.students
                  : ar.adminDashboard.students}
              </Typography>
              {selectedSection === "Courses"
                ? isAdmin && (
                    <Button
                      variant="body2"
                      sx={{
                        backgroundColor: "#E8A710",
                        textTransform: "none",
                        borderRadius: 2,
                      }}
                      onClick={() => navigate("/addCourse")}
                    >
                      {lang == "en"
                        ? en.adminDashboard.addCourse
                        : ar.adminDashboard.addCourse}{" "}
                      <AddIcon sx={{ width: "20px", paddingLeft: 1 }} />
                    </Button>
                  )
                : selectedSection === "Students" &&
                  courses.length > 0 && (
                    <Select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      displayEmpty
                      size="small"
                      sx={{
                        bgcolor: "black",
                        color: "white",
                        borderRadius: 3,
                        textAlign: "center",
                        paddingRight: "0px",
                      }}
                    >
                      <MenuItem value="" disabled sx={{ pr: 0 }}>
                        <Box display="flex" alignItems="center">
                          {lang == "en"
                            ? en.adminDashboard.chooseCourse
                            : ar.adminDashboard.chooseCourse}{" "}
                          <ExpandMoreIcon
                            sx={{
                              color: "white",
                              ml: 1,
                              paddingRight: "0px",
                              width: "20px",
                              marginRight: "0px",
                            }}
                          />
                        </Box>
                      </MenuItem>
                      {courses.map((course) => (
                        <MenuItem
                          key={course.id}
                          value={course.id}
                          sx={{ pr: 0 }}
                        >
                          <Box display="flex" alignItems="center">
                            {course.course_name}{" "}
                            <ExpandMoreIcon sx={{ color: "white", ml: 1 }} />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  )}
            </Box>
            {selectedSection === "Courses" ? (
              <Box>
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <Typography
                    sx={{ color: theme == "light" ? "black" : "gray" }}
                  >
                    {lang == "en"
                      ? en.adminDashboard.noCoursesAvailable
                      : ar.adminDashboard.noCoursesAvailable}
                  </Typography>
                )}
              </Box>
            ) : selectedSection === "Messages" ? (
              <InboxMessages />
            ) : selectedSection === "Settings" ? (
              <Settings />
            ) : (
              <Students selectedCourse={selectedCourse} adminId={userId} />
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                borderRadius: 2,
                flexDirection: { lg: "row", md: "column" },
              }}
            >
              {stats.map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    bgcolor: theme == "light" ? "#FFFFFF" : "#D0D0D0",
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                    minWidth: 120,
                    flexDirection: "row",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      width: { lg: "1.9rem" },
                      paddingRight: 1,
                      fontFamily: "BeVietnam",
                      fontWeight: "bolder",
                    }}
                  >
                    {stat.count}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "start", fontWeight: "normal" }}
                  >
                    {lang == "en" ? stat.label : stat.labelAR}
                  </Typography>
                </Box>
              ))}
            </Box>
            <WatchLater courses={courses} />
            <CoursesProgress />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
