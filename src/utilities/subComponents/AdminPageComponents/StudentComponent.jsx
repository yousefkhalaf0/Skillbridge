import React from "react";
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, MenuItem, Select } from "@mui/material";

const students = [
  { name: "Maureen Nvidia", image: "https://i.pinimg.com/736x/1c/a0/84/1ca0849910f7ecc5bed6ff8546af2176.jpg" },
  { name: "Joan Gitari", image: "https://i.pinimg.com/736x/12/49/51/1249511d06c783b0c29b7785c3fa970c.jpg" },
];

const StudentCard = ({ student }) => (
  <Card sx={{ borderRadius: 3, p: 2, textAlign: "center", bgcolor: "#F5F5F5" }}>
    <CardMedia
      component="img"
      sx={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto" }}
      image={student.image}
      alt={student.name}
    />
    <CardContent>
      <Typography variant="h6">{student.name}</Typography>
      <Button
        variant="contained"
        sx={{ bgcolor: "black", color: "white", mt: 2, textTransform: "none" }}
      >
        Message {student.name.split(" ")[0]}
      </Button>
    </CardContent>
  </Card>
);

const Students = () => {
  const [selectedCourse, setSelectedCourse] = React.useState("");
  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Students</Typography>
        <Select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          displayEmpty
          sx={{ bgcolor: "black", color: "white", borderRadius: 2, p: 1 }}
        >
          <MenuItem value="" disabled>Choose the course</MenuItem>
          <MenuItem value="course1">Course 1</MenuItem>
          <MenuItem value="course2">Course 2</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={3}>
        {Array(4).fill(students).flat().map((student, index) => (
          <Grid item xs={12} sm={6} md={4} lg={6} key={index}>
            <StudentCard student={student} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Students;
