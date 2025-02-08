import React from "react";
import { Box, Typography, Select, MenuItem, Card, CardContent, CardMedia } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WatchLaterImage from "../../../assets/dashboard_assets/images/whatch_later_image.png"
const courses = [
  {
    id: 1,
    title: "3D Animation Conference",
    date: "December 14, 08:30 PM",
    image: WatchLaterImage,
  },
  {
    id: 2,
    title: "3D Animation Conference",
    date: "December 14, 08:30 PM",
    image: WatchLaterImage,
  },
  {
    id: 3,
    title: "3D Animation Conference",
    date: "December 14, 08:30 PM",
    image: WatchLaterImage,
  },
];

const WatchLater = () => {
  return (
    <Box p={2} sx={{ borderRadius: 2, fontFamily: "inherit"}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Watch Later</Typography>
        <Select
          defaultValue="week"
          size="small"
          sx={{ bgcolor: "black", color: "white", borderRadius: 3, textAlign: "center", paddingRight: "0px" }}
        >
          <MenuItem value="week" sx={{ pr: 0 }}>
            <Box display="flex" alignItems="center">
              Week <ExpandMoreIcon sx={{ color: "white", ml: 1, paddingRight: "0px", width: "20px ", marginRight: "0px" }} IconComponent={() => null} />
            </Box>
          </MenuItem>
          <MenuItem value="month" sx={{ pr: 0 }}>
            <Box display="flex" alignItems="center">
              Month <ExpandMoreIcon sx={{ color: "white", ml: 1 }} IconComponent={() => null} />
            </Box>
          </MenuItem>
        </Select>

      </Box>

      {courses.map((course) => (
        <Card key={course.id} sx={{ display: "flex", alignItems: "center", justifyContent: "start", mb: 2, boxShadow: 1, borderRadius: 2 }}>
          <CardMedia component="img" image={course.image} alt={course.title} sx={{ width: 60, height: 60, ml: 2, mb: 2, borderRadius: 1 }} />
          <CardContent sx={{ flexGrow: 1, pt: 3 }}>
            <Typography variant="body1" fontWeight="bold">{course.title}</Typography>
            <Typography variant="body2" color="text.secondary">{course.date}</Typography>
            <Typography variant="body2" color="primary" display="flex" alignItems="center" sx={{ cursor: "pointer", mt: 1 }}>
              Go to the course <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default WatchLater;
