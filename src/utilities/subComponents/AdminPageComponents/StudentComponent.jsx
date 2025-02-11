import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const StudentCard = ({ student }) => (
  <Card sx={{ borderRadius: 3, p: 2, textAlign: "center", bgcolor: "#F5F5F5" }}>
    <CardMedia
      component="img"
      sx={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto" }}
      image={student.user_image_URL}
      alt={student.username}
    />
    <CardContent>
      <Typography variant="h6">{student.username}</Typography>
      <Button
        variant="contained"
        sx={{ bgcolor: "black", color: "white", mt: 2, textTransform: "none" }}
      >
        Message {student.username.split(" ")[0]}
      </Button>
    </CardContent>
  </Card>
);

const Students = ({ selectedCourse, adminId }) => {
  const [students, setStudents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFetching) return; // Prevent multiple fetches
    setIsFetching(true);

    const fetchStudents = async () => {
      try {
        const db = getFirestore();

        if (selectedCourse) {
          // Fetch students enrolled in the selected course
          const courseRef = doc(db, "Courses", selectedCourse);
          const courseSnap = await getDoc(courseRef);
          if (!courseSnap.exists()) {
            console.error("Course not found");
            setIsFetching(false);
            return;
          }

          const courseData = courseSnap.data();
          const adminRef = doc(db, "admins", courseData.course_creator_id);
          const adminSnap = await getDoc(adminRef);
          if (!adminSnap.exists()) {
            console.error("Admin not found");
            setIsFetching(false);
            return;
          }

          const adminData = adminSnap.data();
          const studentIds = adminData.Students || [];
          const studentsData = await Promise.all(
            studentIds.map(async (studentId) => {
              const studentRef = doc(db, "users ", studentId);
              const studentSnap = await getDoc(studentRef);

              if (studentSnap.exists()) {
                const studentData = studentSnap.data();
                if (studentData.Courses?.includes(selectedCourse)) {
                  return { id: studentSnap.id, ...studentData };
                }
              }
              return null;
            })
          );

          const validStudents = studentsData.filter((student) => student !== null);
          setStudents(validStudents);
        } else {
          // Fetch all students associated with the admin
          const adminRef = doc(db, "admins", adminId);
          const adminSnap = await getDoc(adminRef);
          if (!adminSnap.exists()) {
            console.error("Admin not found");
            setIsFetching(false);
            return;
          }

          const adminData = adminSnap.data();
          const studentIds = adminData.Students || [];
          const studentsData = await Promise.all(
            studentIds.map(async (studentId) => {
              const studentRef = doc(db, "users ", studentId);
              const studentSnap = await getDoc(studentRef);

              if (studentSnap.exists()) {
                return { id: studentSnap.id, ...studentSnap.data() };
              }
              return null;
            })
          );

          const validStudents = studentsData.filter((student) => student !== null);
          setStudents(validStudents);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchStudents();
  }, [selectedCourse, adminId]);

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {students.length === 0 ? (
          <Typography>No students found.</Typography>
        ) : (
          students.map((student) => (
            <Grid item xs={12} sm={6} md={4} lg={6} key={student.id}>
              <StudentCard student={student} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Students;