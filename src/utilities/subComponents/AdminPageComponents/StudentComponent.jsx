import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const StudentCard = ({ student }) => (
  <Card sx={{ borderRadius: 3, p: 2, textAlign: "center", bgcolor: "#F5F5F5" }}>
    <CardMedia
      component="img"
      sx={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto" }}
      image={student.user_image_URL}
      alt={student.username}
      image={student.user_image_URL}
      alt={student.username}
    />
    <CardContent>
      <Typography variant="h6">{student.username}</Typography>
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
  const [isFetching, setIsFetching] = useState(false); // State to prevent infinite fetching

  useEffect(() => {
    if (!selectedCourse || isFetching) return; // Prevent multiple fetches
    setIsFetching(true);

    const fetchStudents = async () => {
      try {
        const db = getFirestore();

        // Step 1: Fetch the course document
        const courseRef = doc(db, "Courses", selectedCourse);
        const courseSnap = await getDoc(courseRef);
        if (!courseSnap.exists()) {
          console.error("Course not found");
          setIsFetching(false);
          return;
        }

        const courseData = courseSnap.data();
        console.log("Course Data:", courseData);

        // Step 2: Fetch the admin document using the course_creator_id
        const adminRef = doc(db, "admins", courseData.course_creator_id);
        const adminSnap = await getDoc(adminRef);
        if (!adminSnap.exists()) {
          console.error("Admin not found");
          setIsFetching(false);
          return;
        }

        const adminData = adminSnap.data();
        console.log("Admin Data:", adminData);

        // Step 3: Fetch student details
        const studentIds = adminData.Students || [];
        const studentsData = await Promise.all(
          studentIds.map(async (studentId) => {
            const studentRef = doc(db, "users", studentId);
            const studentSnap = await getDoc(studentRef);
        
            if (studentSnap.exists()) {
              const studentData = studentSnap.data();
              console.log("Fetched Student Data:", studentData); // Debugging log
        
              if (studentData.Courses.map((id) => id.trim()).includes(selectedCourse.trim())) {
                console.log("Student Courses:", studentData.Courses, "Selected Course:", selectedCourse);
        
                if (studentData.Courses.includes(selectedCourse)) {
                  return { id: studentSnap.id, ...studentData };
                } else {
                  console.warn(`Course ID not found in student's courses: ${studentData.Courses}`);
                }
              } else {
                console.warn("Student does not have a Courses array:", studentData);
              }
            }
            return null;
          })
        );
        

        // Filter out null values and update state
        const validStudents = studentsData.filter((student) => student !== null);
        console.log("Valid Students List:", validStudents);
        setStudents(validStudents);
        
        console.log("Students Data:", studentsData);

      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsFetching(false); // Reset fetching state
      }
    };

    fetchStudents();
  }, [selectedCourse]);

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {students.length === 0 ? (
          <Typography>No students enrolled in this course.</Typography>
        ) : (
          students.map((student, index) => (
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
