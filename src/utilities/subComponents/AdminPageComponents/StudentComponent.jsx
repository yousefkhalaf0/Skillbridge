import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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

const Students = ({ selectedCourse }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedCourse) return;

      const db = getFirestore();

      try {
        // Step 1: Fetch the selected course document
        const courseRef = doc(db, "Courses", selectedCourse);
        const courseSnap = await getDoc(courseRef);

        if (!courseSnap.exists()) {
          console.error("Course not found");
          return;
        }

        const courseData = courseSnap.data();
        const courseCreatorId = courseData.course_creator_id;

        // Step 2: Fetch the admin document using the course_creator_id
        const adminRef = doc(db, "admins", courseCreatorId);
        const adminSnap = await getDoc(adminRef);

        if (!adminSnap.exists()) {
          console.error("Admin not found");
          return;
        }

        const adminData = adminSnap.data();
        const studentIds = adminData.Students || [];

        // Step 3: Fetch student details for each student ID
        const studentsData = [];
        for (const studentId of studentIds) {
          const studentRef = doc(db, "users", studentId);
          const studentSnap = await getDoc(studentRef);

          if (studentSnap.exists()) {
            const studentData = studentSnap.data();

            // Step 4: Check if the student is enrolled in the selected course
            if (studentData.Courses && studentData.Courses.includes(selectedCourse)) {
              studentsData.push({ id: studentSnap.id, ...studentData });
            }
          }
        }

        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [selectedCourse]);

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {students.map((student, index) => (
          <Grid item xs={12} sm={6} md={4} lg={6} key={index}>
            <StudentCard student={student} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Students;