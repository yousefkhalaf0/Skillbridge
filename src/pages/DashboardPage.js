import React, { useState } from "react";
import "./pages style/DashboardPageStyle.css";
import { Box, Grid, Typography, Select, MenuItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../utilities/subComponents/AdminPageComponents/SideBarComponent";
import CourseCard from "../utilities/subComponents/AdminPageComponents/CourseInAdminPage";
import Students from "../utilities/subComponents/AdminPageComponents/StudentComponent";
import Settings from "../utilities/subComponents/AdminPageComponents/settingComponent";
import { fetchUserCourses, checkIfAdmin } from "../../src/utilities/firebase";
import InboxMessages from "../utilities/subComponents/AdminPageComponents/inboxComponent";
import WatchLater from "../utilities/subComponents/AdminPageComponents/WhatchLaterComponent";
import CoursesProgress from "../utilities/subComponents/AdminPageComponents/progressComponent";
import AddIcon from '@mui/icons-material/Add';
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const stats = [
  { count: 11, label: "Courses completed" },
  { count: 5, label: "Courses in progress" },
];

const Dashboard = ({ navHeight, adminData }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.userCourseReducer?.userCourses || []);
  const auth = getAuth();
  const [selectedSection, setSelectedSection] = useState("Courses");
  const [selectedCourse, setSelectedCourse] = useState('');

  return (
    <Box display="flex" sx={{ fontFamily: "inherit" }}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2} mt={3}>
          <Grid item lg={2} xs={12} md={12}>
            <Sidebar navHeight={navHeight} setSelectedSection={setSelectedSection} selectedSection={selectedSection} />
          </Grid>
          <Grid item lg={6} xs={12} md={8}>
            <Box mt={3} p={2} display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{selectedSection === "Courses" ? "My Courses" : "Students"}</Typography>
              {selectedSection === "Courses" ? (
                <Button variant="body2" sx={{ backgroundColor: "#E8A710", textTransform: "none", borderRadius: 2 }}>
                  Add Course <AddIcon sx={{ width: "20px", paddingLeft: 1 }} />
                </Button>
              ) : selectedSection === "Students" && (
                courses.length > 0 ? (
                  <Select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)} // Store course ID
                    displayEmpty
                    size="small"
                    sx={{ bgcolor: "black", color: "white", borderRadius: 3, textAlign: "center", paddingRight: "0px" }}
                  >
                    <MenuItem value="" disabled sx={{ pr: 0 }}>
                      <Box display="flex" alignItems="center">
                        Choose the course <ExpandMoreIcon sx={{ color: "white", ml: 1, paddingRight: "0px", width: "20px", marginRight: "0px" }} />
                      </Box>
                    </MenuItem>
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id} sx={{ pr: 0 }}> {/* Use course.id as value */}
                        <Box display="flex" alignItems="center">
                          {course.course_name} <ExpandMoreIcon sx={{ color: "white", ml: 1 }} />
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Typography>No courses available.</Typography>
                )
              )}
            </Box>
            {selectedSection === "Courses" ? (
              <Box>
                {courses.length > 0 ? (
                  courses.map((course) => <CourseCard key={course.id} course={course} />)
                ) : (
                  <Typography>No courses available.</Typography>
                )}
              </Box>
            ) : selectedSection === "Messages" ? (
              <InboxMessages />
            ) : selectedSection === "Settings" ? (
              <Settings />
            ) : (
              <Students selectedCourse={selectedCourse} />
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", gap: 2, p: 2, borderRadius: 2, flexDirection: { lg: "row", md: "column" } }}>
              {stats.map((stat, index) => (
                <Box key={index} sx={{ display: "flex", bgcolor: "#e0e0e0", p: 3, borderRadius: 2, textAlign: "center", minWidth: 120, flexDirection: "row" }}>
                  <Typography variant="h4" sx={{ width: { lg: "1.9rem" }, paddingRight: 1, fontFamily: "BeVietnam", fontWeight: "bolder" }}>
                    {stat.count}
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "start", fontWeight: "normal" }}>{stat.label}</Typography>
                </Box>
              ))}
            </Box>
            <WatchLater />
            <CoursesProgress />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;